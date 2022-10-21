import pygame
from common import *
from sprite import Sprite

class Task(Sprite):

	def __init__(self, location):
		super().__init__(pygame.transform.scale(pygame.image.load("assets\\box.png"), (44, 32)), location[0], location[1])
		self.location = location

	def draw_background(self):
		#pygame.draw.rect(screen, BLACK, pygame.Rect(S_X / 2 - (S_Y / 1.5/2) - 5, S_Y / 1.5/4 - 5, S_Y / 1.5 + 10, S_Y / 1.5 + 10))
		pygame.draw.rect(screen, BLUE, pygame.Rect(S_X / 2 - (S_Y / 1.5/2), S_Y / 1.5/4, S_Y / 1.5, S_Y / 1.5))
	
	def draw_minigame(self):
		return NotImplementedError

	def update(self):
		return NotImplementedError

	def input(self, mouse_input):
		return NotImplementedError