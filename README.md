# Ashita Diwan CSF Intership Assessment 2025: AI Developer

## Carrot vs Apple Classifier

This project is a toy implementation of a binary image classifier that distinguishes between **carrots** and **apples** using a Convolutional Neural Network (CNN) in PyTorch.

It was developed as part of the AI Development Intern skills assessment for CSF.

### Project Structure
```
├── data/                  # Dataset folder (train/validation/test subfolders)
├── outputs/               # Output folder for model and training logs
├── notebooks/             # Development notebook
│   └── carrot_detector.ipynb
├── src/                   # Source code
│   └── train_classifier.py  # Main training script
├── environment.yml        # Conda environment setup file
├── Makefile               # Automation commands (env setup, train, clean)
└── README.md              # Project overview and instructions
```

### Set Up instructions
1. Clone repository 
```bash
cd desired-location
git clone https://github.com/diwanashita/Ashita_Diwan_CSFIntershipAssessmen_t2025_AIDeveloper.git
```

2. Create the environment
```bash
make env
```

3. Activate it
```bash
conda activate carrot-detector
```

### Training Model
To run the training pipeline and save outputs:
```bash
make all
```
This will create the environment, run the training pipeline and save outputs in the output folder.
After training, the following files will be created in the `outputs/` folder:
- `carrot_classifier.pth`: Trained PyTorch model
- `training_log.csv`: Epoch-wise training and validation metrics

To clean up outputs:
```bash
make clean
```
### Notes
- The notebook `notebooks/carrot_detector.ipynb` contains an in-depth walkthrough of the code, including some data exploration, model summary, predictions, and interpretation. 
- The script saves the model and training log after each run. 
- The model uses `BCEWithLogitsLoss` for binary classification.
- Early stopping, schedulers, and prediction scripts can be added as extensions. 

### Author:
**Ashita Diwan**
Master of Data Science | University of British Columbia 
