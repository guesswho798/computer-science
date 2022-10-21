import pygame
from navigation import Navigation
from repair import Repair
from sonar import Sonar
from weapon import Weapon
from room import Room
from submarine import Submarine
from task import Task
from player import Player
from submarine import Submarine
from map import Map
import sys
from common import *

class Game_room(Room):
    
	def __init__(self):
  
		super().__init__()
		
		self.map = Map()
		self.submarine = Submarine()
  
		# init tasks
		self.tasks.append(Task((S_X / 10 * 1+20, S_Y / 8 * 4-15)))
		self.tasks.append(Sonar((S_X / 10 * 5+20, S_Y / 8 * 4-15), self.map, self.submarine))
		self.tasks.append(Navigation((S_X / 10 * 8+20, S_Y / 8 * 4-15), self.map, self.submarine))

		self.tasks.append(Repair((S_X /  4 * 1+20, S_Y / 8 * 6-15), self.map, self.submarine))
		self.tasks.append(Weapon((S_X /  4 * 2+20, S_Y / 8 * 6-15), self.map, self.submarine))
		self.tasks.append(Task((S_X /  4 * 3+20, S_Y / 8 * 6-15)))
  
		# DEBUG REMOVE THIS
		self.activated_task = self.tasks[3]


	def main_loop(self):
		global networking_manager

		self.players.append(Player(S_X / 10 + 30, S_Y / 8 * 4 - 80, networking_manager.is_server, 0))
		self.players.append(Player(S_X / 10 + 30, S_Y / 8 * 6 - 80, not networking_manager.is_server, 1))
  
		networking_manager.start_sync()
	
		while not self.done:

			self.update()
	
			self.draw()

			pygame.display.flip()
			clock.tick(fps)


	def update(self):
		global path, networking_manager
  
		# updating path from peer
		if networking_manager.new_coords:
			self.submarine.move(networking_manager.new_coords[0], networking_manager.new_coords[1])
			networking_manager.new_coords = None
		if networking_manager.weapon:
			self.tasks[5].angle = networking_manager.weapon[0]
			if networking_manager.weapon[1]:
				self.tasks[5].shoot()
			networking_manager.weapon = None
    
		self.event()
  
		for player in self.players:
			player.update(self.boxes, self.activated_task)
   
		self.background.update()
  
		if len(path) > 0:
			self.submarine.update()
  
		if self.activated_task:
			self.activated_task.update()


	def draw(self):
     
		self.draw_background()
  
		self.draw_foreground()
  
		if self.activated_task:
			self.activated_task.draw_minigame()


	def event(self):
		global holding

		# --- Event Processing ---
		for event in pygame.event.get():

			# exit game
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()
			if event.type == pygame.KEYDOWN:
				holding = True
				if event.key == pygame.K_ESCAPE:
					if self.activated_task:
						self.activated_task = None
					else:
						pygame.quit()
						sys.exit()
				elif event.key == activate_key:
					if self.activated_task:
						self.activated_task = None
					else:
						if self.players[0].main_player:
							self.activated_task = pygame.sprite.spritecollideany(self.players[0], self.tasks)
						else:
							self.activated_task = pygame.sprite.spritecollideany(self.players[1], self.tasks)
			if event.type == pygame.KEYUP:
				holding = False
      
			if self.activated_task and (event.type == pygame.MOUSEBUTTONDOWN or holding):
				self.activated_task.input(pygame.mouse.get_pos())