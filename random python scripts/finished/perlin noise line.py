import pygame
from random import randrange
from noise import pnoise1 as pn

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
holdr = False   # if player is holding right
holdl = False   # if player is holding left
holdu = False   # if player is holding up
holdd = False   # if player is holding down
speed = 0.005    # speed of smooth hold

# perlin values
LENGTH = 100
SMOOTH = 100
X_START = randrange(1000)

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

	pygame.display.set_caption('Template')


def event():
	global done, X_START, holdl, holdr, holdu, holdd, speed

	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			done = True

		#keyboard press
		if event.type == pygame.KEYDOWN:
			if event.key == pygame.K_LEFT:
				holdl = True
			if event.key == pygame.K_RIGHT:
				holdr = True
			if event.key == pygame.K_UP:
				holdu = True
			if event.key == pygame.K_DOWN:
				holdd = True

		
		if event.type == pygame.KEYUP:
			if event.key == pygame.K_LEFT:
				holdl = False
			if event.key == pygame.K_RIGHT:
				holdr = False
			if event.key == pygame.K_UP:
				holdu = False
			if event.key == pygame.K_DOWN:
				holdd = False

	if holdr:
		X_START = X_START + speed
	if holdl:
		X_START = X_START - speed
	if holdu:
		speed = speed + speed / 100
	if holdd:
		speed = speed - speed / 100

def update():
	pass

def draw():

	screen.fill(BLACK)

	# getting values
	x_values = [i*S_X/LENGTH for i in range(LENGTH+1)]
	y_values = [pn(float(X_START + i/SMOOTH + 0.001), 4)*(4*S_Y)/5 for i in range(LENGTH+1)]

	# list of tupels of x and y values
	points = [(x_values[i], y_values[i]+S_Y/2) for i in range(LENGTH+1)]

	#drawing
	pygame.draw.aalines(screen, WHITE, False, points)

	# drawing info
	add_text("right arrow to move right", 25, 30, S_Y / 20 * 15, WHITE)
	add_text("left arrow to move left", 25, 30, S_Y / 20 * 16, WHITE)
	add_text("up arrow to speed up", 25, 30, S_Y / 20 * 17, WHITE)
	add_text("down arrow to speed down", 25, 30, S_Y / 20 * 18, WHITE)


def add_text(text1, size=15, width=S_X / 2, height=S_Y / 2, color1=(255, 255, 255)):
	if type(text1) != 'str':
		text1 = str(text1)
	font = pygame.font.SysFont("comicsansms", size)
	text = font.render(text1, True, color1)
	loc = (int(width), int(height))
	screen.blit(text, loc)
	return loc

if __name__ == '__main__':
	main()