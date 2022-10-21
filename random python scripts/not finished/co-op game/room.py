from background import Background
from box import Box
from common import *

class Room:

	# static variable for the ground
	boxes = pygame.sprite.Group()
 
	def __init__(self):
		self.done = False
		self.players = []
		self.tasks = []
		self.activated_task = None
  
		self.background = Background()
		self.boxes.add(Box(S_X / 10 * 1, S_Y / 8 * 4 + 15))
		self.boxes.add(Box(S_X / 10 * 1, S_Y / 8 * 6 + 15))

	def draw_background(self):
	
		screen.fill(BLUE)

		self.background.draw(screen)
	
		pygame.draw.rect(screen, GRAY, pygame.Rect(S_X / 10, S_Y / 4, S_X / 10 * 8, S_Y / 4 * 2))

		pygame.draw.line(screen, BLACK, (S_X / 10, S_Y / 8 * 4),  (S_X / 10 * 9, S_Y / 8 * 4), 3)
		pygame.draw.line(screen, BLACK, (S_X / 10, S_Y / 8 * 6),  (S_X / 10 * 9, S_Y / 8 * 6), 3)

	def draw_foreground(self):

		for task in self.tasks:
			task.draw(screen)
	
		for player in self.players:
			player.draw(screen)

		if self.activated_task:
			self.activated_task.draw_minigame()
   
	def start(self):
		return NotImplementedError

	def event(self):
		return NotImplementedError