import random
import pygame
from navigation import Navigation
from repair import Repair
from sonar import Sonar
from weapon import Weapon
from room import Room
from submarine import Submarine
from reload import Reload
from ammo import Ammo
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
		self.tasks.append(Weapon((S_X / 10 * 5+20, S_Y / 8 * 4-15), self.map, self.submarine))
		self.tasks.append(Navigation((S_X / 10 * 8+20, S_Y / 8 * 4-15), self.map, self.submarine))

		self.tasks.append(Ammo((S_X /  10 * 1 + 40, S_Y / 8 * 6-15)))
		self.tasks.append(Reload((S_X /  4 * 2+20, S_Y / 8 * 6-15)))
		self.tasks.append(Sonar((S_X /  4 * 3+20, S_Y / 8 * 6-15), self.map, self.submarine))

  
		# DEBUG REMOVE THIS
		#self.activated_task = self.tasks[3]


	def main_loop(self):
		global networking_manager

		self.players.append(Player(S_X / 10 + 30, S_Y / 8 * 4 - 80, not networking_manager.is_server, 0))
		self.players.append(Player(S_X / 10 + 30, S_Y / 8 * 6 - 80, networking_manager.is_server, 1))
  
		networking_manager.start_sync()
	
		while not self.done:

			self.update()
	
			self.draw()

			pygame.display.flip()
			clock.tick(fps)


	def update(self):
		global path, networking_manager
  
		self.network_update()
    
		self.event()
  
		for player in self.players:
			player.update(self.boxes, self.activated_task)
   
		self.background.update()

		if networking_manager.is_server:
			for enemie in self.map.enemies:
				if enemie.update(self.submarine, self.map.walls, self.map.enemies):
					self.submarine.hit()
					x = random.randint(int(S_X / 10 * 1 + 50), int(S_X / 10 * 8 - 40))
					y = random.choice([S_Y / 8 * 4 - 20, S_Y / 8 * 6 - 20])
					self.tasks.append(Repair((x, y), self.map, self.submarine))
					networking_manager.send(["hit", (x, y)])
			networking_manager.send(["enemies", self.map.enemies])
		
  
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
		global holding, networking_manager

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
						main_player = 1 - self.players[0].main_player
						self.activated_task = pygame.sprite.spritecollideany(self.players[main_player], self.tasks)
						if type(self.activated_task) == Ammo:
							if networking_manager:
								networking_manager.send(["ammo", 1])
							self.players[main_player].is_carring_ammo = True
						if type(self.activated_task) == Reload and self.players[main_player].is_carring_ammo and not self.tasks[1].has_ammo:
							if networking_manager:
								networking_manager.send(["ammo", 2])
							self.tasks[1].has_ammo = True
							self.players[main_player].is_carring_ammo = False

						if type(self.activated_task) == Reload or type(self.activated_task) == Ammo:
							self.activated_task = None
          
			if event.type == pygame.KEYUP:
				holding = False
      
			if self.activated_task and (event.type == pygame.MOUSEBUTTONDOWN or holding):
				self.activated_task.input(pygame.mouse.get_pos())

	def network_update(self):
		if networking_manager.new_coords:
			self.submarine.move(networking_manager.new_coords[0], networking_manager.new_coords[1])
			networking_manager.new_coords = None
		if networking_manager.weapon:
			self.tasks[1].angle = networking_manager.weapon[0]
			if networking_manager.weapon[1]:
				self.tasks[1].shoot()
			networking_manager.weapon = None
		if networking_manager.repair:
			to_remove = None
			for task in self.tasks:
				if task.location == networking_manager.repair:
					to_remove = task
				if task == self.activated_task:
					self.activated_task = None
			if to_remove:
				self.tasks.remove(to_remove)
			networking_manager.repair = None
		if networking_manager.ammo:
			not_main_player = self.players[0].main_player
			if networking_manager.ammo == 1:
				self.players[not_main_player].is_carring_ammo = True
			else:
				self.tasks[1].has_ammo = True
				self.players[not_main_player].is_carring_ammo = False
			networking_manager.ammo = None
		if networking_manager.enemies:
			self.map.enemies = networking_manager.enemies
			networking_manager.enemies = None
		if networking_manager.hit:
			self.submarine.hit()
			self.tasks.append(Repair(networking_manager.hit, self.map, self.submarine))
			networking_manager.hit = None