import cv2 as cv
import numpy as np

length = 500
img = np.zeros((length,length,3), np.uint8)
r = 0
g = 0
b = 0

for row in img:
	for px in row:
		px[0] = r
		px[1] = g
		px[2] = b

		r = r + 1
		if r == 255:
			r = 0
		g = g + 2
		if g == 255:
			g = 0
		b = b + 3
		if b == 255:
			b = 0

# Testing copy
area = img[0:int(length/2), 0:int(length/2)]

img[int(length/4):int((length/4)*3), int(length/4):int((length/4)*3)] = area


# Showing image until escape button is pressed
while True:
	cv.imshow('image', img)
	
	k = cv.waitKey(1) & 0xFF
	if k == 27:
		break