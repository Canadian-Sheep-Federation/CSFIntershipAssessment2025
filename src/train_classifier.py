# src/train_classifier.py
# author: Ashita Diwan

import argparse
import os
import torch
from torch import nn, optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import pandas as pd
from pathlib import Path

# -----------------------------
# Model
# -----------------------------
class CarrotAppleClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.main = nn.Sequential(
            nn.Conv2d(3, 16, (5, 5)),
            nn.ReLU(),
            nn.MaxPool2d((2, 2)),
            nn.Dropout(0.2),

            nn.Conv2d(16, 32, (5, 5)),
            nn.ReLU(),
            nn.MaxPool2d((2, 2)),
            nn.Dropout(0.2),

            nn.Conv2d(32, 32, (3, 3)),
            nn.ReLU(),

            nn.Flatten(),
            nn.Linear(32 * 11 * 11, 128),
            nn.ReLU(),
            nn.Linear(128, 1)
        )

    def forward(self, x):
        return self.main(x)

# -----------------------------
# Training Function
# -----------------------------
def trainer(model, criterion, optimizer, trainloader, validloader, device, epochs=10):
    train_loss, valid_loss, train_acc, valid_acc = [], [], [], []

    for epoch in range(epochs):
        model.train()
        epoch_loss, epoch_acc = 0.0, 0.0

        for X, y in trainloader:
            X, y = X.to(device), y.to(device).float()
            optimizer.zero_grad()
            y_hat = model(X).squeeze()
            loss = criterion(y_hat, y)
            loss.backward()
            optimizer.step()

            preds = (torch.sigmoid(y_hat) > 0.5).float()
            epoch_loss += loss.item()
            epoch_acc += (preds == y).float().mean().item()

        train_loss.append(epoch_loss / len(trainloader))
        train_acc.append(epoch_acc / len(trainloader))

        model.eval()
        val_loss, val_acc = 0.0, 0.0
        with torch.no_grad():
            for X, y in validloader:
                X, y = X.to(device), y.to(device).float()
                y_hat = model(X).squeeze()
                loss = criterion(y_hat, y)
                preds = (torch.sigmoid(y_hat) > 0.5).float()
                val_loss += loss.item()
                val_acc += (preds == y).float().mean().item()

        valid_loss.append(val_loss / len(validloader))
        valid_acc.append(val_acc / len(validloader))

        print(f"Epoch {epoch+1}: Train Loss: {train_loss[-1]:.3f}, Train Acc: {train_acc[-1]:.2f}, "
              f"Val Loss: {valid_loss[-1]:.3f}, Val Acc: {valid_acc[-1]:.2f}")

    return train_loss, train_acc, valid_loss, valid_acc

# -----------------------------
# Main
# -----------------------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data_dir", type=str, required=True, help="Path to data folder with train/val")
    parser.add_argument("--output_dir", type=str, required=True, help="Directory to save model and logs")
    parser.add_argument("--epochs", type=int, default=10)
    args = parser.parse_args()

    # Paths
    train_dir = Path(args.data_dir) / "train"
    val_dir = Path(args.data_dir) / "validation"
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Transforms
    transform = transforms.Compose([
        transforms.Resize((64, 64)),
        transforms.ToTensor(),
        transforms.Normalize([0.5]*3, [0.5]*3)
    ])

    # Data
    train_dataset = datasets.ImageFolder(train_dir, transform=transform)
    val_dataset = datasets.ImageFolder(val_dir, transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32)

    # Model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = CarrotAppleClassifier().to(device)

    criterion = nn.BCEWithLogitsLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    train_loss, train_acc, val_loss, val_acc = trainer(model, criterion, optimizer, train_loader, val_loader, device, args.epochs)

    # Save model
    torch.save(model.state_dict(), output_dir / "carrot_classifier.pth")

    # Save log
    df_log = pd.DataFrame({
        "epoch": list(range(1, args.epochs + 1)),
        "train_loss": train_loss,
        "train_acc": train_acc,
        "val_loss": val_loss,
        "val_acc": val_acc
    })
    df_log.to_csv(output_dir / "training_log.csv", index=False)
