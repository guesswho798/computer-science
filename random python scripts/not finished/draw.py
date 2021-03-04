import pygame
import math
import random

	#colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (39, 80, 42)
RED = (255, 0, 0)
PURPLE = (255, 0, 255)
GRAY = (78, 76, 79)
YELLOW = (255, 255, 0)

	#numbers ;)
S_X = 1100      #size of screen x value
S_Y = 600       #size of screen y value
S_P = 20         #size of pixle (brush)
color = WHITE   #the material in use
canvas = list()

	#modes
square = False
Circle = True

	#initializing
pygame.init()
screen = pygame.display.set_mode([S_X, S_Y])
clock = pygame.time.Clock()
done = False


def main():

	start()
	
	while not done:

		event()

		pygame.display.flip()

		clock.tick(500)

def start():
	#filling the canvas with blanks
	global canvas
	for i in range(0, S_X):
		new = []
		for j in range(0, S_Y):
			new.append(0)
		canvas.append(new)
	print(len(canvas))
	print(len(canvas[0]))


	pygame.display.set_caption('Draw')

def event():
	global color
	global done
	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			done = True

		#mouse press
		if pygame.mouse.get_pressed()[0]:
			#if pygame.mouse.get_pos()[1] > 100:
			mouseToPixle(pygame.mouse.get_pos())
			#else:
			#	mouseToUI(pygame.mouse.get_pos())

		#keyboard press
		if event.type == pygame.KEYDOWN:
			if event.key == pygame.K_1:
				color = BLACK
			if event.key == pygame.K_2:
				color = WHITE
			if event.key == pygame.K_3:
				color = BLUE
		
		if event.type == pygame.KEYUP:
			if event.key == pygame.K_1:
				color = BLACK
			if event.key == pygame.K_2:
				color = WHITE
			if event.key == pygame.K_3:
				color = BLUE

def mouseToPixle(pos):
	global color
	global canvas


	pygame.draw.circle(screen, color, pos, S_P)

	#inserting into canvas
	canvas[pos[0]][pos[1]] = 7

def mouseToUI(pos):
	pass

def drawPixle(px, py):
	global canvas

	pygame.draw.rect(screen, canvas[px][py], (px, py, 1, 1))



if __name__ == '__main__':
	main()