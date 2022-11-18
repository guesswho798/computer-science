import pygame
from common import *
import random
from task import Task
import math
import time

class Repair(Task):
	def __init__(self, location, map, submarine):
     
		super().__init__(location)
  
		self.map = map
		self.submarine = submarine
		self.hole_size = 20
		self.holes = list()
		for i in range(0, random.randint(1, 3)):
			self.holes.append([random.randint(self.hole_size, self.map.minigames_size-self.hole_size), random.randint(self.hole_size, self.map.minigames_size-self.hole_size), self.hole_size])

	def input(self, mouse_position):
		global networking_manager
  
		x, y = self.coordinates_to_position(0, 0)
		mousex = mouse_position[0] - x
		mousey = mouse_position[1] - y
	
		to_remove = None
		for hole in self.holes:
			if abs(mousex - hole[0]) <= hole[2] and abs(mousey - hole[1]) <= hole[2]:
				hole[2] -= 2
				if hole[2] <= 5:
					to_remove = hole

		if to_remove:
			self.holes.remove(to_remove)
			if len(self.holes) == 0:
				self.submarine.repair()
				
				if networking_manager:
					networking_manager.send(["repair", self.location])
					networking_manager.repair = self.location
     
	def draw_minigame(self):
     
		# background
		x, y = self.coordinates_to_position(0, 0)
		pygame.draw.rect(screen, BLACK, pygame.Rect(x-10, y-10, self.map.minigames_size+20, self.map.minigames_size+20))
		pygame.draw.rect(screen, GRAY, pygame.Rect(x, y, self.map.minigames_size, self.map.minigames_size))  
  
		# holes
		for hole in self.holes:
			pygame.draw.circle(screen, BLACK, (x+hole[0], y+hole[1]), hole[2])
   
   
	def coordinates_to_position(self, x, y):
		return S_X / 2 - (self.map.minigames_size/2) + (x * self.map.block_size), self.map.minigames_size/4 + (y * self.map.block_size)