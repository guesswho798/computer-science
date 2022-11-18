import pygame
from common import *
from task import Task

class Navigation(Task):
	def __init__(self, location, map, submarine):
     
		super().__init__(location)
  
		self.map = map
		self.submarine = submarine
		self.line_size = 3
		self.map_image = pygame.transform.scale(pygame.image.load("assets\\navigation.png"), (int(self.map.minigames_size + self.map.block_size + 5), int(self.map.minigames_size + self.map.block_size + 5)))

	def input(self, mouse_position):
		global path, networking_manager
		
		x, y = self.map.mouse_to_cordinates(mouse_position)
  
		if len(path) >= max_path_len or x == -1 or y == -1:
			return
  
		# checking if the offset is next to the sub or the path
		offsetx, offsety = -1, -1
		if len(path) == 0:
			offsetx = abs(self.submarine.x - x)
			offsety = abs(self.submarine.y - y)
		else:
			if (x, y) not in path and (x, y) not in self.map.walls:
				offsetx = abs(path[-1][0] - x)
				offsety = abs(path[-1][1] - y)
  
		if offsetx == 1 and offsety == 0 or offsetx == 0 and offsety == 1:
			self.submarine.move(x, y)
			
			if networking_manager:
				networking_manager.send(["new_coords", (x, y)])
     
	def draw_minigame(self):
     
		# background
		x, y = self.coordinates_to_position(0, 0)
		screen.blit(self.map_image, (x-self.map.block_size, y-self.map.block_size))
  
		# walls
		for x, y in self.map.walls:
			x, y = self.coordinates_to_position(x, y)
			pygame.draw.rect(screen, BLACK, pygame.Rect(x, y, self.map.block_size, self.map.block_size))
   
		# submarine
		x, y = self.coordinates_to_position(self.submarine.x, self.submarine.y)
		pygame.draw.rect(screen, YELLOW, pygame.Rect(x, y, self.map.block_size, self.map.block_size))
  
		# path
		for point in path:
			x, y = self.coordinates_to_position(point[0], point[1])
			pygame.draw.circle(screen, YELLOW, (x + self.map.block_size / 2, y + self.map.block_size / 2), 5)
   
	def coordinates_to_position(self, x, y):
		return S_X / 2 - (self.map.minigames_size/2) + (x * self.map.block_size), self.map.minigames_size/4 + (y * self.map.block_size)