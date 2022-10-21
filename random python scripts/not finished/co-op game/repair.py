import pygame
from common import *
from task import Task
import math
import time

class Repair(Task):
	def __init__(self, location, map, submarine):
     
		super().__init__(location)
  
		self.map = map
		self.submarine = submarine
		self.holes = list()

	def input(self, mouse_position):
		global networking_manager
  
		print(mouse_position)
  
		# key = pygame.key.get_pressed()
  
		# if key[right_key]:
		# 	self.angle -= 2
		# elif key[left_key]:
		# 	self.angle += 2
		# elif key[pygame.K_f]:
		# 	self.shoot()
			
		# if networking_manager:
		# 	networking_manager.send(["weapon", [self.angle, key[pygame.K_f]]])
  
	def shoot(self):
		if self.start_timer == 0:
			# starting reload timer
			self.start_timer = time.time()
   
			angle = -self.angle
			if angle < 0:
				angle += 360
   
			# calculating if enemie is hit
			x = self.submarine.x
			y = self.submarine.y
			enemies_to_remove = list()
			for enemie in self.map.enemies:
				offsetx = enemie.x - x
				offsety = enemie.y - y
    
				enemie_angle = 0
				if offsetx == 0 and offsety == 0:
					enemie_angle = angle
				elif offsety == 0 and offsetx > 0:
					enemie_angle = 270
				elif offsety == 0 and offsetx < 0:
					enemie_angle = 90
				elif offsetx == 0 and offsety < 0:
					enemie_angle = 180
				elif offsetx == 0 and offsety > 0:
					enemie_angle = 0
				else:
					enemie_angle = abs(math.degrees(math.atan(offsety/offsetx)) + 90)

					if offsetx < 0:
						enemie_angle += 180
     
				if abs(angle - enemie_angle) < self.acceptable_miss_angle:
					enemies_to_remove.append(enemie)
			for enemie in enemies_to_remove:
				self.map.enemies.remove(enemie)
   
     
	def draw_minigame(self):
     
		# background
		x, y = self.coordinates_to_position(0, 0)
		pygame.draw.rect(screen, BLACK, pygame.Rect(x-10, y-10, self.map.minigames_size+20, self.map.minigames_size+20))
		pygame.draw.rect(screen, GRAY, pygame.Rect(x, y, self.map.minigames_size, self.map.minigames_size))
		# #screen.blit(self.weapon_image, (x, y))
  
		# # arrow
		# x, y = self.coordinates_to_position(4, 2)
		# rotated_image = pygame.transform.rotate(self.arrow_image, self.angle)
		# new_rect = rotated_image.get_rect(center = self.arrow_image.get_rect(topleft = (x+30, y-20)).center)
		# screen.blit(rotated_image, new_rect)
  
		# # reload update, not for drawing
		# if self.time_to_reload == int(time.time() - self.start_timer):
		# 	self.start_timer = 0
   
		# # reload bar and button press "animation"
		# x, y = self.coordinates_to_position(2, 9)
		# max_width = self.map.minigames_size - 160
		# reload_percent = (time.time() - self.start_timer) / self.time_to_reload
  
		# pygame.draw.rect(screen, GRAY, pygame.Rect(x, y+2, max_width * reload_percent, 25))
		# if reload_percent < 0.03:
		# 	x, y = self.coordinates_to_position(4, 7)
		# 	pygame.draw.circle(screen, RED, (x+55, y), self.map.block_size+15)
   
   
	def coordinates_to_position(self, x, y):
		return S_X / 2 - (self.map.minigames_size/2) + (x * self.map.block_size), self.map.minigames_size/4 + (y * self.map.block_size)