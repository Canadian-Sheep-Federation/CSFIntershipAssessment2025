# 🥕 CSF AI Intern Assessment – Video Object Detection & Classification Demo

## 📌 Overview

This repository contains solutions to the AI Development Intern Assessment for the Canadian Superstore Foundation (CSF). The assessment includes:

1. **Video Object Detection Pipeline** – A pipeline that takes video input and detects objects (e.g., carrots) in each frame using a pre-trained model.
2. **Toy Classification Demo** – A minimal yet functional demonstration of classification fundamentals using Python and Scikit-learn with a Decision Tree classifier.

---

## 📁 Contents

- `Carrot_Video_Pipeline.ipynb`  
  → Jupyter Notebook implementing a pipeline that processes a video, detects objects using `facebook/detr-resnet-50`, and saves a processed video with bounding boxes.

- `Toy_Implementation_of_decision_tree.ipynb`  
  → A toy binary classification model using a Decision Tree on synthetic data to demonstrate the basics of supervised learning.

---

## 🎯 Task 1: Video Detection Pipeline

### Goal
Adapt an image-level object detection model to process live or recorded video inside a grocery store and log any "carrot" detections.

### Tools Used
- Hugging Face Transformers (`facebook/detr-resnet-50`)
- OpenCV for video processing
- PIL for bounding box rendering

### Instructions
1. Upload a video file (`.mp4` or `.avi`) using the interface or notebook cell.
2. The pipeline detects objects per frame and overlays bounding boxes with labels.
3. A new video is saved with the detection visualized frame-by-frame.
4. The `carrot_output.mp4` file is too large for GitHub. You can download it here:
https://drive.google.com/file/d/15wupCDERGk4oa3MFgsRbl_ZHhFGSydRA/view?usp=sharing

---

## 🧪 Task 2: Toy Classification Model (Decision Tree)

This toy implementation uses a Decision Tree classifier trained on synthetic 2D data to showcase classification fundamentals.

### Highlights
- Creation of a linearly separable synthetic dataset
- Visualization of decision boundaries
- Use of scikit-learn’s `DecisionTreeClassifier`
- Evaluation with classification report and accuracy score

---

## ⚙️ Setup Instructions

1. Clone this repository:

```bash
git clone https://github.com/vrutti0507/csf-intern-assessment.git
cd csf-intern-assessment
```

2. Install dependencies manually:

```bash
pip install scikit-learn matplotlib opencv-python transformers timm
```

3. Launch Jupyter:

```bash
jupyter notebook
```



---

## 👤 Author

**Vrutti Tanna**  
Candidate for AI Development Intern @ CSF  
📧 Email: tannavrutti@gmail.com  
🌐 GitHub: [vrutti0507](https://github.com/vrutti0507)  
🔗 LinkedIn: [linkedin.com/in/vrutti-tanna-0375a5a7](https://www.linkedin.com/in/vrutti-tanna-0375a5a7/)

---

## 📄 License

This project is intended for educational and assessment purposes only.

+  ``                                        `````````````
