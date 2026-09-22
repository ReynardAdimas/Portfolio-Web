# Understanding ArUco Dictionary and Implementing Real-Time Marker Detection

Today I continued learning about ArUco Generation and Board Generation. I learned that within an ArUco marker there is also something called a dictionary. The dictionary in an ArUco marker functions as a reference list that determines the set of binary matrix patterns (black-white) that can be recognized by a computer vision system. Without specifying a dictionary, the system doesn't know how to read or validate the marker captured by the camera. Here is an example of generating a marker using OpenCV C++:

```cpp

    // 1. Definition of used dictionary (e.g 6x6 pixel with 250 marker)
    aruco::Dictionary dictionary = aruco::getPredefinedDictionary(aruco::DICT_6X6_250);

    // 2. Empty matrix for saving marker image
    Mat markerImage; 

    // 3. Generate marker
    aruco::generateImageMarker(dictionary, 23, 200, markerImage, 1); 

    // 4. Save marker to directory
    imwrite("marker23.png", markerImage); 
```

Then, here is an example for the board:

```cpp

    cv::aruco::Dictionary dictionary = cv::aruco::getPredefinedDictionary(cv::aruco::DICT_4X4_50);  
    int markersX = 4;
    int markersY = 3;
    cv::Size gridSize(markersX, markersY);
    float markerLength = 0.05f;     
    float markerSeparation = 0.01f; 
    cv::aruco::GridBoard board(
         gridSize,
         markerLength, markerSeparation, dictionary
    ); 
    cv::Mat boardImage;
    board.generateImage(cv::Size(800, 600), boardImage, 20);
    cv::imwrite("gridboard12_markers.png", boardImage); 

```

After I was able to create markers and their boards, I also tried to create a program to detect the ID of the markers. Here is an example of real-time marker detection using a webcam camera:

```cpp
cv::VideoCapture cap(0); 
    if(!cap.isOpened())
    {
        std::cerr << "Failed opened the camera\n"; 
        return -1; 
    } 


    // Choosing used ArUco dictionary
    cv::aruco::Dictionary dictionary = cv::aruco::getPredefinedDictionary(cv::aruco::DICT_4X4_50); 
    cv::aruco::DetectorParameters detectorParams = cv::aruco::DetectorParameters(); 

    // Object Detector
    cv::aruco::ArucoDetector detector(dictionary, detectorParams); 

    cv::Mat frame, outputFrame; 
    std::vector<int> markerIds; 
    std::vector<std::vector<cv::Point2f>> markerCorners; 

    std::cout << "Starting ArUco detection\n"; 

    while (cap.grab())
    {
        cap.retrieve(frame); 
        if(frame.empty()) break; 

        outputFrame = frame.clone(); 


        // Detect markers
        detector.detectMarkers(frame, markerCorners, markerIds); 

        if(!markerIds.empty()) {
            cv::aruco::drawDetectedMarkers(outputFrame, markerCorners, markerIds); 

            std::cout << "Marker id: "; 
            for(int id : markerIds) {
                std::cout << id << " detected";
            } 
            std::cout << "\n";
        }

        cv::imshow("ArUco Id Detection", outputFrame); 

        if(cv::waitKey(1) == 27) break;
    } 

    cap.release(); 
    cv::destroyAllWindows(); 
    return 0;
```

The important part in my opinion is using the same dictionary between the one in the marker and the one used in the program. If the dictionary is different, then the marker will not be detected at all, or in rare cases, detected as an incorrect ID (false-positive). We can create our own dictionary to adapt to conditions such as:

- Requiring a Very Small Grid Size (Low Resolution)
- Requiring a very large number of markers
- Maximizing Inter-marker Distance to avoid False Positives


#### References
- https://docs.opencv.org/4.13.0/d5/dae/tutorial_aruco_detection.html 
- https://docs.opencv.org/4.13.0/db/da9/tutorial_aruco_board_detection.html 
- https://cs-courses.mines.edu/csci507/schedule/24/ArUco.pdf