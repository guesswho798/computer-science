import pygame
import math
import random

	#colors
BLACK = (0, 0, 0)
GREEN = (39, 80, 42)
RED = (255, 0, 0)
WHITE = (255, 255, 255)

	#numbers ;)
S_X = 1100      #size of screen x value
S_Y = 600       #size of screen y value
S_P = 10        #size of pixle
material = 1    #the metirial in use -> 0 = nothing, 1 = predator and 2 = prey
map = list()

	#initializing
pygame.init()
screen = pygame.display.set_mode([S_X, S_Y])
clock = pygame.time.Clock()
done = False


def main():

	start()
	
	while not done:

		event()

		updateMap()

		showInfo()

		pygame.display.flip()

		clock.tick(80)

def start():
	#filling the map with blanks
	global map
	for i in range (0, math.floor(S_X / S_P)):
		new = []
		for j in range (0, math.floor(S_Y / S_P)):
			n = random.randint(0, 10)
			if n == 10:
				new.append(1)
			elif n == 9:
				new.append(2)
			else:
				new.append(0)
		map.append(new)


	pygame.display.set_caption('predator and prey')
	pygame.display.toggle_fullscreen()

def event():
	global material
	global done
	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			done = True

		#mouse press
		if pygame.mouse.get_pressed()[0]:
			mouseToPixle(pygame.mouse.get_pos())

		#keyboard press
		if event.type == pygame.KEYDOWN:
			if event.key == pygame.K_0:
				material = 0
			if event.key == pygame.K_1:
				material = 1
			if event.key == pygame.K_2:
				material = 2
		
		if event.type == pygame.KEYUP:
			if event.key == pygame.K_0:
				material = 0
			if event.key == pygame.K_1:
				material = 1
			if event.key == pygame.K_2:
				material = 2

def mouseToPixle(pos):
	global material
	global map
	x = math.floor(pos[0] / S_P)
	y = math.floor(pos[1] / S_P)

	#inserting into map
	map[int(x)][int(y)] = material

def drawPixle(px, py):
	global map

	if map[px][py] == 0:
		pygame.draw.rect(screen, BLACK, (px * S_P, py * S_P, S_P, S_P))
	if map[px][py] == 1:
		pygame.draw.rect(screen, RED, (px * S_P, py * S_P, S_P, S_P))
	if map[px][py] == 2:
		pygame.draw.rect(screen, GREEN, (px * S_P, py * S_P, S_P, S_P))

def updateMap():
	global map

	newmap = list()
	for i in range (0, math.floor(S_X / S_P)):
		new = []
		for j in range (0, math.floor(S_Y / S_P)):
			new.append(0)
		newmap.append(new)

	
	for i in range(0, len(map[0])):
		for j in range(0, len(map)):

			#drawing
			drawPixle(j, i)

			#logic rules => 0 = nothing, 1 = predator and 2 = prey
			if map[j][i] == 0 and neighbour(i, j, 2) and random.randint(0, 10 - numneighbour(i, j, 2)) < 2:
				newmap[j][i] = 2                                           #nothing with prey neighbour -> prey
			elif map[j][i] == 2 and neighbour(i, j, 1):
				newmap[j][i] = 1                                           #prey with predator neighbour -> predator
			if map[j][i] == 1 and random.randint(0, 1) == 0:
				newmap[j][i] = 0                                           #predator dies
			elif map[j][i] == 1:
				newmap[j][i] = 1                                           #maybe lives
	
	map = newmap

	'''if you want fun uncomment this
	for i in range(0, len(map[0])):
		for j in range(0, len(map)):
			map[j][i] = random.randint(-1, 2)
			drawPixle(j, i)
	'''

def neighbour(i, j, value):
	global map
	if i != len(map[0]) - 1 and map[j][i + 1] == value or i != 0 and map[j][i - 1] == value or j != len(map) - 1 and map[j + 1][i] == value or j != 0 and map[j - 1][i] == value or j != 0 and i != 0 and map[j - 1][i - 1] == value or j != len(map) - 1 and i != len(map[0]) - 1 and map[j + 1][i + 1] == value or j != 0 and i != len(map[0]) - 1 and map[j - 1][i + 1] == value or j != len(map) - 1 and i != 0 and map[j + 1][i - 1] == value:
		return True
	return False

def numneighbour(i, j, value):
	global map
	answer = 0

	if i != len(map[0]) - 1 and map[j][i + 1] == value:
		answer = answer + 1
	if i != 0 and map[j][i - 1] == value:
		answer = answer + 1
	if j != len(map) - 1 and map[j + 1][i] == value:
		answer = answer + 1
	if j != 0 and map[j - 1][i] == value:
		answer = answer + 1
	if j != 0 and i != 0 and map[j - 1][i - 1] == value:
		answer = answer + 1
	if  j != len(map) - 1 and i != len(map[0]) - 1 and map[j + 1][i + 1] == value:
		answer = answer + 1
	if j != 0 and i != len(map[0]) - 1 and map[j - 1][i + 1] == value:
		answer = answer + 1
	if j != len(map) - 1 and i != 0 and map[j + 1][i - 1] == value:
		answer = answer + 1

	return answer

def showInfo():
	global map

	predator = 0
	prey = 0

	#logic rules => 0 = nothing, 1 = predator and 2 = prey
	for i in range(0, len(map[0])):
		for j in range(0, len(map)):
			if map[j][i] == 1:
				predator = predator + 1
			if map[j][i] == 2:
				prey = prey + 1

	#display information
	font = pygame.font.SysFont(None, 24)
	img = font.render('Predator = ' + str(predator), True, WHITE)
	screen.blit(img, (20, S_Y - 50))

	font = pygame.font.SysFont(None, 24)
	img = font.render('Prey = ' + str(prey), True, WHITE)
	screen.blit(img, (20, S_Y - 30))

if __name__ == '__main__':
	main()