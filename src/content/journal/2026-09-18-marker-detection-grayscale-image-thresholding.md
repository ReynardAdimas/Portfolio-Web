---
title: "Marker Detection: Grayscale & Image Thresholding"
date: 2026-09-18
summary: "Journey building a marker detector"
tags: ["Rust", "OpenCV", "Image Thresholding", "Computer Vision"]
--- 

Continuing from yesterday's discussion, I've decided to build a **Marker Detection** project. My plan is to first try building it using `opencv-rust`, since it already has a built-in API for this: `cv::aruco::ArucoDetector`. After that, I plan to re-implement that API using `kornia-rs`, which I hypothesize should be doable, since `kornia-rs` already has the basic functions I need.
 
To build the detector, I first need to understand a few things about how it works. Today I learned how to apply grayscale conversion in both libraries. This matters because marker decoders operate on **binary images** — images that only have 2 possible values: 0 (usually representing black) and 1 (usually representing white). These images have a 1-bit representation characteristic, where each pixel only requires 1 bit of data in the computer (2^1 = 2 possible values).
 
I then studied **Image Thresholding**. Thresholding is important because it acts as the most basic segmentation method, capable of separating an object from its background simply and efficiently. With thresholding, image data that was originally complex can be simplified so the system only processes the parts of the image considered important. Beyond that, this technique can reduce computational load, speed up analysis, and is often used as an early stage in various applications such as object recognition, shape analysis, and computer vision systems — especially on images with sufficiently high contrast.
 
There are several types of thresholding:
 
1. **Binary Thresholding**
   Sets pixels to the maximum value if they are above the threshold, otherwise sets them to zero. Best for clean object segmentation, such as separating dark text from clean white paper or isolating solid foreground objects from a uniform background.
2. **Inverse Binary Thresholding**
   The opposite of binary thresholding: sets pixels to zero if they are above the threshold, otherwise sets them to the maximum value. Perfect when your target object is dark and the background is bright, or when an algorithm requires the foreground to be represented by high pixel values (white) instead of zero.
3. **Truncate Thresholding**
   Sets pixels to the threshold value if they are above it, otherwise leaves them unchanged. Ideal for removing extreme highlights or bright glare in an image without completely blacking out the areas that pass the intensity limit.
4. **To Zero Thresholding**
   Leaves pixels unchanged if they are above the threshold, otherwise sets them to zero. Helpful for suppressing background noise or dim gradients while preserving structures.
5. **Inverse To Zero Thresholding**
   The opposite of To Zero thresholding: sets pixels to zero if they are above the threshold, otherwise leaves them unchanged. Useful for removing bright reflections or sky glare from an image while retaining the natural details of darker shadows or objects below the threshold.
6. **Adaptive Thresholding**
   A method that automatically determines the threshold value locally. In situations where lighting conditions vary across the image, adaptive thresholding is more effective. Instead of using a single global threshold value, it calculates the threshold for smaller regions of the image.
7. **Otsu's Thresholding**
   Otsu's method automatically determines the optimal threshold value by minimizing intra-class intensity variance. It's useful when the image histogram has two distinct peaks.
That's it for today, I think. Tomorrow, I'll likely dig deeper into the paper titled *"Automatic generation and detection of highly reliable fiducial markers under occlusion"*, which is the foundation behind the ArUco Marker Detection API.
 
## References
 
- https://opencv.org/image-thresholding-using-opencv/
- https://docs.rs/opencv/latest/opencv/imgproc/fn.threshold.html
- https://docs.rs/kornia/latest/kornia/imgproc/threshold/index.html
 