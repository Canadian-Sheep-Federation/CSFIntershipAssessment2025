# Makefile for Carrot vs Apple Classifier

# Variables
ENV_NAME=carrot-detector
DATA_DIR=data
OUTPUT_DIR=outputs
TRAIN_SCRIPT=src/train_classifier.py
PYTHON=python

# Default target
all: env activate train

# Create conda envrionment
env: 
	conda env create -f environment.yml || echo "Environment already exists"

# Print how to activate
activate:
	@echo "To activate the environment, run: conda activate $(ENV_NAME)"

# Run training script
train:
	$(PYTHON) $(TRAIN_SCRIPT) --data_dir $(DATA_DIR) --output_dir $(OUTPUT_DIR) --epochs 10

# Clean up saved model and logs
clean:
	rm -rf $(OUTPUT_DIR)