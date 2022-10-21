import pygame
import spritesheet
import math
import random
from common import *
from fish import Fish

class Background:
	
	def __init__(self):
		
		self.back_image = pygame.transform.scale(pygame.image.load(rf'assets\underwater\environment\background.png'), (S_X, S_Y))
  
		self.floor_offset = 0
		self.floor_max_offset = 250
		self.floor = pygame.transform.scale(pygame.image.load(rf'assets\underwater\environment\floor.png'), (self.floor_max_offset, 55))
  
		self.fish_sprite = [spritesheet.SpriteSheet(pygame.transform.flip(pygame.image.load(rf'assets\underwater\environment\fish1.png').convert_alpha(), True, False)),
							spritesheet.SpriteSheet(pygame.transform.flip(pygame.image.load(rf'assets\underwater\environment\fish2.png').convert_alpha(), True, False)),
							spritesheet.SpriteSheet(pygame.transform.flip(pygame.image.load(rf'assets\underwater\environment\fish3.png').convert_alpha(), True, False))]
		self.fish_width = [(32, 32), (54, 49), (39, 21)]
		self.fish = list()
		
		self.fish_chance_to_spawn = 200

	def draw(self, screen):
		
		# drawing background
		screen.blit(self.back_image, (0, 0))
     
		# drawing fish
		for element in self.fish:
			screen.blit(self.fish_sprite[element.skin].get_image(math.floor(element.frame), self.fish_width[element.skin][0], self.fish_width[element.skin][1], 3, BLACK), (element.x, element.y))
		
		# drawing grass
		x = 0
		for x in range(int(-self.floor_offset), int(S_X + self.floor_max_offset), self.floor_max_offset):
			screen.blit(self.floor, (int(x-self.floor_offset), S_Y - 35))

	def update(self):
		global path
		
		# spawning fish
		if random.randint(0, self.fish_chance_to_spawn) == 0 and len(self.fish) < 6:
			self.fish.append(Fish())
   
		# moving floor
		if len(path) > 0:
			self.floor_offset += 0.5
			if self.floor_offset >= self.floor_max_offset:
				self.floor_offset = 0
	
		# moving fish and removing them
		remove = None
		for element in self.fish:
			element.update()
			if element.is_out():
				remove = element
    
		if remove is not None:
			self.fish.remove(remove)