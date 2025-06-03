# Carrot Detection System

## Overview

In today's AI landscape, we have access to powerful pre-trained models that can be readily deployed for various computer vision tasks without extensive training processes. This project leverages YOLO (You Only Look Once) v11, a state-of-the-art object detection model that excels in real-time object detection and classification. The model is already capable of detecting and classifying carrots, making it perfect for our grocery store application.

### Modern AI Landscape

The field of computer vision has been revolutionized by foundation models and transformer architectures. Platforms like Hugging Face have democratized access to these powerful models, allowing developers to fine-tune pre-trained models for specific tasks. This approach significantly reduces development time and computational resources while maintaining high accuracy.

## Setup Instructions

1. Create and activate a virtual environment:
```bash
python -m venv carrots-detector
source carrots-detector/bin/activate  # On Linux/Mac
# OR
.\carrots-detector\Scripts\activate  # On Windows
```

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### 1. Carrot Detection from Images

The `carrots_detection_image.py` script demonstrates how to detect carrots in static images:

```python
from ultralytics import YOLO

# Load the pre-trained YOLO model
model = YOLO("yolo11n.pt")

# Perform detection on an image
results = model("image.jpeg")
results[0].show()  # Display results
```

To run the image detection:
```bash
python carrots_detection_image.py
```

### 2. Live Video Stream Detection

The `carrot_detection_video-liveStream.py` script enables real-time carrot detection from video streams:

```python
from ultralytics import solutions

# Initialize the inference pipeline
inf = solutions.Inference(
    model="yolo11n.pt"
)

# Start the inference
inf.inference()
```

To run the live stream detection:
```bash
streamlit run carrot_detection_video-liveStream.py
```

## Notes

- The system uses YOLO v11, which provides excellent real-time detection capabilities
- The model can be fine-tuned for specific grocery store environments if needed
- The live stream implementation uses Streamlit for easy deployment and monitoring

## References

- [Ultralytics YOLO Documentation](https://docs.ultralytics.com/)
- [Streamlit Documentation](https://docs.streamlit.io/)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/index)
- [YOLO v11 Paper](https://arxiv.org/abs/2402.13694)
- [ONNX Runtime](https://onnxruntime.ai/)
