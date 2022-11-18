import pygame
from common import *
import random
from task import Task
import math
import time

class Upgrade(Task):
	def __init__(self, location, map, submarine):
     
		super().__init__(location)
  
		self.map = map
		self.submarine = submarine

	def input(self, _):
		pass
     
	def draw_minigame(self):
     
		# background
		x, y = self.coordinates_to_position(0, 0)
		pygame.draw.rect(screen, BLACK, pygame.Rect(x-10, y-10, self.map.minigames_size+20, self.map.minigames_size+20))
		pygame.draw.rect(screen, GRAY, pygame.Rect(x, y, self.map.minigames_size, self.map.minigames_size))  
  
		# holes
		if int(self.submarine.max_health / 20 - self.submarine.health / 20) > len(self.holes):
			self.holes.append([random.randint(self.hole_size, self.map.minigames_size-self.hole_size), random.randint(self.hole_size, self.map.minigames_size-self.hole_size), self.hole_size])
		for hole in self.holes:
			pygame.draw.circle(screen, BLACK, (x+hole[0], y+hole[1]), hole[2])
   
   
	def coordinates_to_position(self, x, y):
		return S_X / 2 - (self.map.minigames_size/2) + (x * self.map.block_size), self.map.minigames_size/4 + (y * self.map.block_size)
