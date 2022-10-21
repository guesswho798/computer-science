import pygame
import random
import math

# colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
PURPLE = (255, 0, 255)
GRAY = (78, 76, 79)
YELLOW = (255, 255, 0)

S_X = 1100      # size of screen x value
S_Y = 600       # size of screen y value

#initializing
pygame.init()
screen = pygame.display.set_mode([S_X, S_Y])
clock = pygame.time.Clock()
done = False

def main():

	start()

	while not done:

		event()

		update()

		draw()

		pygame.display.flip()

		clock.tick(100)

def start():

	pygame.display.set_caption('???')


def event():
	global done
	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			done = True

		#mouse press
		#if pygame.mouse.get_pressed()[0]:

		#keyboard press
		#if event.type == pygame.KEYDOWN:
		#	if event.key == pygame.K_0:
		#
		#if event.type == pygame.KEYUP:
		#	if event.key == pygame.K_0:

def update():
	pass

def draw():

	screen.fill(BLACK)

	pygame.draw.circle(screen, WHITE, (0, 0), 20)
	#pygame.draw.line(screen, WHITE, (x1, y1), (x2, y2), width)

if __name__ == '__main__':
	main()