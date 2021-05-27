import numpy as np
import cv2 as cv

# Create a black image
img = np.zeros((512,512,3), np.uint8)

# Draw a diagonal blue line with thickness of 5 px
# img, start, end, color, thickness
cv.line(img,(0,5),(511,100),(100,100,100),10)

cv.imshow("Display window", img)

k = cv.waitKey(0)