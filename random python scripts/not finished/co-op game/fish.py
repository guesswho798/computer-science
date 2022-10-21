from common import *
import random
import math

class Fish:
    
	def __init__(self):
		self.frame = 0
		self.x = S_X + 100
		self.y = random.randint(10, S_Y - 150)
		self.skin = random.randint(0, 2)
  
		speed = random.random()
		self.animation_speed = speed / 12 + 0.02
		self.movement_speed = -math.floor((speed + 1) * 1.5)
  
	def update(self):
	
		self.frame = self.frame + self.animation_speed
		if self.frame >= 4:
			self.frame = 0

		self.x += self.movement_speed
	
	def is_out(self):
		return self.x < -200