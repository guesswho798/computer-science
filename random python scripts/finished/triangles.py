import pygame
import random
import math
import numpy as np
import time

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
PURPLE = (255, 0, 255)
GRAY = (78, 76, 79)
YELLOW = (255, 255, 0)

S_X = 1300      # size of screen x value
S_Y = 700       # size of screen y value
points = list() # a list of all points
numOfPoints = 100
speed = 5
size = 5
t = time.time()
t1 = 3000
counter = 0
b = True


#initializing
pygame.init()
screen = pygame.display.set_mode([S_X, S_Y], pygame.FULLSCREEN)
#screen = pygame.display.set_mode([S_X, S_Y])
clock = pygame.time.Clock()
done = False


class Point():

	def __init__(self):
		# x and y
		self.x = random.randint(0, S_X)
		self.y = random.randint(0, S_Y)
		self.z = 0
		#self.x = S_X / 2
		#self.y = S_Y / 2

		# momentum
		self.momentumx = random.uniform(-speed, speed)
		self.momentumy = random.uniform(-speed, speed)
		#self.momentumy = 0
		#self.momentumx = speed

		self.Connected_Points = list()


	def get_x(self):
		return self.x
	def get_y(self):
		return self.y
	def get_z(self):
		return self.z
	def get_mom(self):
		return (self.momentumx, self.momentumy)
	def get_con(self):
		return self.Connected_Points 	
	def fill(self, points):
		dis = list()
		# calculating the distance between all the points
		for x in points:
			if x is not self:
				dis.append(math.sqrt(pow(x.get_x() - self.x, 2) + pow(x.get_y() - self.y, 2)))
			else:
				dis.append(999)

		self.Connected_Points = None
		self.Connected_Points = list()
		self.Connected_Points.append(points[np.argmin(dis)])
		dis[np.argmin(dis)] = 999
		self.Connected_Points.append(points[np.argmin(dis)])


	def move(self):
		# checking if changing direction
		if self.x + self.momentumx <= 0 or self.x + self.momentumx >= S_X:
			self.momentumx *= -1
			self.z = self.z + 1
		if self.y + self.momentumy <= 0 or self.y + self.momentumy >= S_Y:
			self.momentumy *= -1
			self.z = self.z + 1

		# moving
		self.x += self.momentumx
		self.y += self.momentumy


def main():
	global t, b, counter

	start()

	screen.fill(BLACK)

	while not done:

		event()

		update()

		if counter == t1:
			counter = 0
			t = time.time()
			b = not b
			if b:
				screen.fill(BLACK)
			else:
				screen.fill(WHITE)

		draw()

		pygame.display.flip()
		clock.tick(100)
		counter = counter + 1

def start():
	global points
	global numOfPoints

	pygame.display.set_caption('Vibes')
	for j in range(0, numOfPoints):
		points.append(Point())

def event():
	global done
	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			done = True
		elif event.type == pygame.KEYDOWN:
			done = True

def update():
	global points

	for point in points:
		point.fill(points)
		point.move()

def draw():
	global points, size, t, b, counter


	for point in sorted(points, key=lambda x: x.get_z(), reverse=True):

		if b:
			#drawing line
			o1 = (S_X - point.get_x()) / int((time.time() + 0.1 - t) * 20)
			o = int(255 / o1)
		else:
			#drawing line
			o1 = (point.get_x()) / int((time.time() + 0.1 - t) * 20)
			o = 255 - int(255 / o1)


		if o > 255:
			o = 255
		if o < 0:
			o = 0

		#drawing the point
		pygame.draw.circle(screen, (o, o, o), (int(point.get_x()), int(point.get_y())), size)
		#pygame.draw.circle(screen, (random.randint(1, 255), random.randint(1, 255), random.randint(1, 255)), (int(point.get_x()), int(point.get_y())), size)
		
		pygame.draw.line(screen, (o, o, o), (point.get_x(), point.get_y()), (point.get_con()[0].get_x(), point.get_con()[0].get_y()), size)
		pygame.draw.line(screen, (o, o, o), (point.get_x(), point.get_y()), (point.get_con()[1].get_x(), point.get_con()[1].get_y()), size)
		#pygame.draw.line(screen, (random.randint(1, 255), random.randint(1, 255), random.randint(1, 255)), (point.get_x(), point.get_y()), (point.get_con()[0].get_x(), point.get_con()[0].get_y()), size)
		#pygame.draw.line(screen, (random.randint(1, 255), random.randint(1, 255), random.randint(1, 255)), (point.get_x(), point.get_y()), (point.get_con()[1].get_x(), point.get_con()[1].get_y()), size)

if __name__ == '__main__':
	main()