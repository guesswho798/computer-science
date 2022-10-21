import pygame
from common import *
from enemies import Enemie

class Map:
	def __init__(self):
     
		self.grid_size = 10
		self.minigames_size = S_Y / 1.5
		self.block_size = self.minigames_size / self.grid_size
  
		self.enemies = [Enemie(4, 4), Enemie(3, 3)]
		self.walls = [(4, 0), (4, 1), (3, 3), (3, 4), (3, 0)]
  
		self.collision_blocks = []
		for i in range(self.grid_size):
			row = []

			for j in range(self.grid_size):
				rect = pygame.Rect(S_X / 2 - (self.minigames_size/2) + (j * self.minigames_size / self.grid_size), self.minigames_size/4 + (i * self.minigames_size / self.grid_size), (self.minigames_size)/ self.grid_size, (self.minigames_size)/ self.grid_size)
				row.append(rect)
			self.collision_blocks.append(row)
	
	def mouse_to_cordinates(self, mouse_position):
     
		for i, line in enumerate(self.collision_blocks):
			for j, block in enumerate(line):
				if block.collidepoint(mouse_position):
					return j, i
		return -1, -1