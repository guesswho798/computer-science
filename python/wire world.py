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
S_P = 10        #size of pixle
material = 1    #the metirial in use -> -1 = electron tail, 0 = nothing, 1 = conductor, 2 = electron head
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

		pygame.display.flip()

		clock.tick(120)

def start():
	#filling the map with blanks
	global map
	for i in range (0, math.floor(S_X / S_P)):
		new = []
		for j in range (0, math.floor(S_Y / S_P)):
			new.append(0)
		map.append(new)


	pygame.display.set_caption('Wire world')
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
		pygame.draw.rect(screen, YELLOW, (px * S_P, py * S_P, S_P, S_P))
	if map[px][py] == 2:
		pygame.draw.rect(screen, BLUE, (px * S_P, py * S_P, S_P, S_P))
	if map[px][py] == -1:
		pygame.draw.rect(screen, RED, (px * S_P, py * S_P, S_P, S_P))

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

			#logic
			if map[j][i] == 1:    #conductor with electron head neighbour -> electron head
				newmap[j][i] = 1
				if i is not len(map[0]) - 1 and map[j][i + 1] == 2 or i is not 0 and map[j][i - 1] == 2 or j is not len(map) - 1 and map[j + 1][i] == 2 or j is not 0 and map[j - 1][i] == 2 or j is not 0 and i is not 0 and map[j - 1][i - 1] == 2 or j is not len(map) - 1 and i is not len(map[0]) - 1 and map[j + 1][i + 1] == 2 or j is not 0 and i is not len(map[0]) - 1 and map[j - 1][i + 1] == 2 or j is not len(map) - 1 and i is not 0 and map[j + 1][i - 1] == 2:
					newmap[j][i] = 2
			elif map[j][i] == -1:     #electron tail -> conductor
				newmap[j][i] = 1
			elif map[j][i] == 2:    #electron head -> electron tail
				newmap[j][i] = -1
	
	map = newmap

	'''if you want fun uncomment this
	for i in range(0, len(map[0])):
		for j in range(0, len(map)):
			map[j][i] = random.randint(-1, 2)
			drawPixle(j, i)
	'''


if __name__ == '__main__':
	main()