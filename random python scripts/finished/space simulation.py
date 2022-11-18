import pygame
import random
import math

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
PURPLE = (255, 0, 255)
GRAY = (78, 76, 79)
YELLOW = (255, 255, 0)

S_X = 1100      #size of screen x value
S_Y = 600       #size of screen y value
points = list() #[x, y, momentum x, momentum y, teamnumber, health]
numOfPoints = 100

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
	global points
	global numOfPoints

	pygame.display.set_caption('Space And Lasers Simulation')

	for j in range(0, numOfPoints):
		l = list()

		#x and y
		l.append(int(random.random() * S_X))
		l.append(int(random.random() * S_Y))

		#momentum
		if random.randint(0, 1) == 0:
			l.append(random.random() * -1)
		else:
			l.append(random.random() * -1)
		if random.randint(0, 1) == 0:
			l.append(random.random() * -1)
		else:
			l.append(random.random() * -1)
		l.append(random.randint(0, 1))
		l.append(100)
		points.append(l)

def event():
	global done
	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			done = True

		#mouse press
		#if pygame.mouse.get_pressed()[0]:
		#	if pygame.mouse.get_pos()[1] > 50:
		#		mouseToPixle(pygame.mouse.get_pos())
		#	else:
		#		mouseToUI(pygame.mouse.get_pos())

		#keyboard press
		#if event.type == pygame.KEYDOWN:
		#	if event.key == pygame.K_0:
		#		color = 0
		#	if event.key == pygame.K_1:
		#		color = 1
		#	if event.key == pygame.K_2:
		#		color = 2
		#
		#if event.type == pygame.KEYUP:
		#	if event.key == pygame.K_0:
		#		color = 0
		#	if event.key == pygame.K_1:
		#		color = 1
		#	if event.key == pygame.K_2:
		#		color = 

def update():
	global points

	for x in points:
		if x is not None:
			if x[0] + x[2] <= 0 or x[0] + x[2] >= S_X:
				x[2] *= -1
			if x[1] + x[3] <= 0 or x[1] + x[3] >= S_Y:
				x[3] *= -1
	
			x[0] += x[2]
			x[1] += x[3]

def draw():
	global points

	screen.fill(BLACK)

	for x in points:
		if x[5] > 0:
			#drawing the point
			if x[4] == 0:
				pygame.draw.circle(screen, BLUE, (int(x[0]), int(x[1])), 3)
			elif x[4] == 1:
				pygame.draw.circle(screen, GREEN, (int(x[0]), int(x[1])), 3)
	
			#calculating distince between points
			for y in points:
				if y is not x and y[5] > 0:
					if abs(y[0] - x[0]) < 100 and abs(y[1] - x[1]) < 100:
						#drawing line
						if x[4] == y[4]:
							pygame.draw.line(screen, WHITE, (x[0], x[1]), (y[0], y[1]), 3)
							x[5] += 20
							y[5] += 20
						else:
							x[5] -= 10
							y[5] -= 10
							if x[5] != 0 and y[5] != 0:
								pygame.draw.line(screen, RED, (x[0], x[1]), (y[0], y[1]), 3)
							if x[5] <= 0:
								pygame.draw.circle(screen, PURPLE, (int(x[0]), int(x[1])), 20)
							if y[5] <= 0:
								pygame.draw.circle(screen, PURPLE, (int(y[0]), int(y[1])), 20)

if __name__ == '__main__':
	main()