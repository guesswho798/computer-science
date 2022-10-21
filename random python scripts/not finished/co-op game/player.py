import pygame
from common import *
from sprite import Sprite
import numpy, math
import spritesheet

class Player(Sprite):
	def __init__(self, startx, starty, main=True, skin=0):
     
		image_path = rf'assets\dinos\{skin}.png'
		sprite_sheet = spritesheet.SpriteSheet(pygame.image.load(image_path).convert_alpha())
  
  
		super().__init__(sprite_sheet.get_image(0, 24, 24, 3, BLACK), startx, starty)
		self.stand_image = self.image
		self.jump_image = sprite_sheet.get_image(5, 24, 24, 3, BLACK)
  
		self.main_player = main

		self.walk_cycle = [sprite_sheet.get_image(i+3, 24, 24, 3, BLACK) for i in range(0, 8)]
		self.animation_index = 0
		self.facing_left = False

		self.speed = S_X / 200
		self.jumpspeed = 15
		self.vsp = 0
		self.gravity = 0.75
		self.min_jumpspeed = 4
		self.animation_slowed = 5
  
		if main:
			self.prev_key = pygame.key.get_pressed()
		else:
			self.prev_key = [False, False, False]

	def walk_animation(self):
     
		animation_frame = math.floor(self.animation_index / self.animation_slowed)
		
		self.image = self.walk_cycle[animation_frame]
  
		if self.facing_left:
			self.image = pygame.transform.flip(self.image, True, False).convert_alpha()

		if self.animation_index < len(self.walk_cycle) * self.animation_slowed -1:
			self.animation_index += 1
		else:
			self.animation_index = 0

	def jump_animation(self):
		self.image = self.jump_image
  
		if self.facing_left:
			self.image = pygame.transform.flip(self.image, True, False).convert_alpha()

	def update(self, boxes, activated_task=None):
		global networking_manager
		
		hsp = 0
		onground = self.check_collision(0, 1, boxes)
	
		# check keys for main character
		if self.main_player and not activated_task:
			key = pygame.key.get_pressed()
   
			# sending input to peer
   
			moving = key[left_key] or key[right_key] or key[up_key]
			prev_moving = self.prev_key[left_key] or self.prev_key[right_key] or self.prev_key[up_key]
   
			if networking_manager.connected and (moving or prev_moving or self.vsp != 0):
				networking_manager.send(["move", [key[left_key], key[right_key], key[up_key], self.rect.x, self.rect.y]])
   
			if key[left_key]:
				self.facing_left = True
				self.walk_animation()
				hsp = -self.speed
			elif key[right_key]:
				self.facing_left = False
				self.walk_animation()
				hsp = self.speed
			else:
				if self.facing_left:
					self.image = pygame.transform.flip(self.stand_image, True, False).convert_alpha()
				else:
					self.image = self.stand_image

			if key[up_key] and onground:
				self.vsp = -self.jumpspeed

			# variable height jumping
			if self.prev_key[up_key] and not key[up_key]:
				if self.vsp < -self.min_jumpspeed:
					self.vsp = -self.min_jumpspeed

			self.prev_key = key
   

		# check keys for peer
		if not self.main_player:
			if networking_manager.move:
				if networking_manager.move[0]:
					self.facing_left = True
					self.walk_animation()
				elif networking_manager.move[1]:
					self.facing_left = False
					self.walk_animation()
				else:
					if self.facing_left:
						self.image = pygame.transform.flip(self.stand_image, True, False).convert_alpha()
					else:
						self.image = self.stand_image

				if networking_manager.move[2] and onground:
					self.vsp = -self.jumpspeed
	
				# variable height jumping
				if self.prev_key[2] and not networking_manager.move[2]:
					if self.vsp < -self.min_jumpspeed:
						self.vsp = -self.min_jumpspeed

				self.prev_key = networking_manager.move

		# gravity
		if self.vsp < 10 and not onground:  # 9.8 rounded up
			self.jump_animation()
			self.vsp += self.gravity

		if onground and self.vsp > 0:
			self.vsp = 0

		# movement
		self.move(hsp, self.vsp, boxes)

	def move(self, x, y, boxes):
		global networking_manager
		
		if not self.main_player:
			if networking_manager.move:
				self.rect.x = networking_manager.move[3]
				self.rect.y = networking_manager.move[4]
				networking_manager.move = None
		else:

			dx = x
			dy = y

			while self.check_collision(0, dy, boxes):
				dy -= numpy.sign(dy)

			while self.check_collision(dx, dy, boxes):
				dx -= numpy.sign(dx)

			self.rect.move_ip([dx, dy])

	def check_collision(self, x, y, grounds):
		if grounds is None:
			return None

		self.rect.move_ip([x, y])
		collide = pygame.sprite.spritecollideany(self, grounds)
		self.rect.move_ip([-x, -y])
		return collide