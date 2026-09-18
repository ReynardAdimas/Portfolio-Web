---
title: "Rust Interop & OpenCV Binding Exploration"
date: 2026-09-17
summary: "Learning FFI and bindgen in Rust, binding OpenCV C++, and comparing opencv-rust against the native kornia-rs crate."
tags: ["Rust", "OpenCV", "FFI", "Computer Vision"]
---

A few days ago, I started learning about the concept of **interop** in Rust, with the goal of binding OpenCV C++ to Rust. I studied two concepts: **FFI** and **bindgen**.

I first tried a simple calculator project, where the function structure was written in C, and then implemented those functions in Rust using the FFI concept. After that, I tried binding the OpenCV C++ API to Rust using `bindgen`. I experimented with 4 simple APIs:

- Reading an image (`imread`)
- Displaying an image (`imshow`)
- Adding a delay (`waitKey`)
- Closing the window (`destroyAllWindow`)

After that, I searched GitHub for `opencv-rust` and found that OpenCV C++ has actually already been bound to Rust. I studied that repository, looking at things like basic image input/output, how OpenCV is written in Rust, basic image processing, and so on.

Today, I got curious about whether there's a **native Rust** crate for OpenCV-like functionality. I found a crate called `kornia-rs`. `kornia-rs` is a Rust crate for low-level computer vision, offering features such as:

- Written in [Rust](https://www.rust-lang.org/): memory- and thread-safe, no GIL — usable from the free-threaded Python build.
- Fast image I/O and processing: libjpeg-turbo decoding and SIMD (NEON/AVX2) kernels.
- One API, CPU or GPU: the same `Image` and operators dispatch on residency — no separate GPU types.
- Zero-copy ML interop: DLPack and `__cuda_array_interface__` to and from PyTorch, plus numpy views.
- Real-time ready: V4L2 camera capture and a fused NV12/YUYV → normalized CHW CUDA kernel for inference.
- Python bindings via [PyO3/Maturin](https://github.com/PyO3/maturin), packaged for Linux (amd64/arm64, incl. Jetson), macOS, and Windows; the same wheel is CPU-only or activates CUDA when an NVIDIA GPU is present.
- Supported Python versions are 3.8 through 3.14, including the free-threaded (3.13t/3.14t) build.

After that, I got curious about comparing the performance of `opencv-rust` versus `kornia-rs`. I thought about running a benchmark on a project built with both libraries — maybe a barcode decoder or a marker detector. I haven't decided yet as of now.

My first experience using `kornia-rs` (as of writing this journal) was that the documentation felt confusing, because there's a version mismatch between what's shown in the GitHub README (v0.1.9) and what's documented on crates.io (v0.1.14).

However, I eventually decided to follow an LLM's suggestion: to go with the crates.io version and use its sub-crates, which I found to be very well organized. There are some important sub-crates worth studying, such as `kornia-tensor`, `kornia-tensor-ops`, `kornia-image`, and `kornia-imgproc`. Tomorrow, I might start planning out what the pipeline for this project will look like.

## References

- [Rustonomicon — FFI](https://doc.rust-lang.org/nomicon/ffi.html)
- [rust-bindgen](https://rust-lang.github.io/rust-bindgen/)
- [opencv-rust on GitHub](https://github.com/twistedfall/opencv-rust)
- [kornia-rs on crates.io](https://docs.rs/opencv/latest/opencv/)
- [kornia-rs on GitHub](https://github.com/kornia/kornia-rs#features)
- [kornia-rs on crates.io](https://crates.io/crates/kornia-rs)