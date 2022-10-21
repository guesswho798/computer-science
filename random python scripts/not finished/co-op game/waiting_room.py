import pygame
from common import *
from player import Player
from room import Room
import sys

class Waiting_room(Room):
    
	def __init__(self):
		super().__init__()
		self.players = [Player(S_X / 10 * 1 + 30, S_Y / 8 * 4 - 80, True)]
  
	def start(self):
		global networking_manager

		while not self.done:

			# update
			self.event()
			self.players[0].update(self.boxes)
			self.background.update()
   
			if networking_manager.connected:
				self.done = True

			# draw
			self.draw_background()
			self.players[0].draw(screen)
			str1 = "Waiting for 2nd player"
			str2 = f"ip: {networking_manager.ip}"
			str3 = f"port: {networking_manager.port}"
			add_text(str1, font_size, S_X / 10 * 1, S_Y / 15 * 1)
			add_text(str2, font_size, S_X / 10 * 1, S_Y / 15 * 2)
			add_text(str3, font_size, S_X / 10 * 1, S_Y / 15 * 3)

			pygame.display.flip()
			clock.tick(fps)
   
	def event(self):

		# --- Event Processing ---
		for event in pygame.event.get():

			# exit game
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()
			if event.type == pygame.KEYDOWN:
				if event.key == pygame.K_ESCAPE:
					self.done = True