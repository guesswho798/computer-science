from tokenize import cookie_re
import pygame
from common import *
from task import Task

class Sonar(Task):
	def __init__(self, location, map, submarine):
     
		super().__init__(location)
  
		self.map = map
		self.submarine = submarine
		self.line_size = 3
		self.map_image = pygame.transform.scale(pygame.image.load("assets\\sonar.png"), (int(self.map.minigames_size), int(self.map.minigames_size)))

	def input(self, _):
		pass
     
	def draw_minigame(self):
     
		# background
		x, y = self.coordinates_to_position(0, 0)
		screen.blit(self.map_image, (x, y))
  
		# enemies
		for enemie in self.map.enemies:
			offsetx = enemie.x - self.submarine.x
			offsety = enemie.y - self.submarine.y
	
			if abs(offsetx) + abs(offsety) <= 4 and abs(offsetx) != 4 and abs(offsety) != 4:

				x, y = self.coordinates_to_position(offsetx+5, offsety+5)
				pygame.draw.circle(screen, RED, (x, y), 5)
   
	def coordinates_to_position(self, x, y):
		return S_X / 2 - (self.map.minigames_size/2) + (x * self.map.block_size), self.map.minigames_size/4 + (y * self.map.block_size)