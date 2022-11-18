import time
import random
import math
from common import *

class Enemie:
	def __init__(self, x, y):
		self.x = x
		self.y = y
		self.move_start_timer = 0
		self.time_to_move = random.randint(15, 20)
		self.in_view_start_timer = 0
		self.time_to_shoot = random.randint(15, 20)

	def in_view(self, submarine):
		
		distance = math.sqrt(math.pow(submarine.x - self.x, 2) + math.pow(submarine.y - self.y, 2))

		return distance < 4

	def move(self, submarine, walls, enemies):
		valid_move = False
		while not valid_move:
			newx = random.randint(-1, 1) + self.x
			newy = random.randint(-1, 1) + self.y

			for wall in walls:
				if (newx, newy) == wall:
					continue
			for enemie in enemies:
				if newx == enemie.x and newy == enemie.y and enemie is not self:
					continue

			if newx == submarine.x and newy == submarine.y:
				continue

			valid_move = True
			self.x = newx
			self.y = newy
     

	def update(self, submarine, walls, enemies):

		# moving
		if self.move_start_timer == 0:
			self.move_start_timer = time.time()
		
		if not self.in_view(submarine):
			self.in_view_start_timer = 0

		if time.time() - self.move_start_timer >= self.time_to_move:
			self.move(submarine, walls, enemies)
			self.move_start_timer = 0

		# shooting
		if self.in_view(submarine) and self.in_view_start_timer == 0:
			self.in_view_start_timer = time.time()

		if time.time() - self.in_view_start_timer >= self.time_to_shoot:
			self.in_view_start_timer = 0
			return True
		return False