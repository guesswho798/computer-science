from common import *
import time

class Submarine:
	def __init__(self):
		self.max_health = 100
		self.health = 100
		self.x = 5
		self.y = 5
		self.time_to_move = 5
		self.start_move_time = 0
  
	def move(self, x, y):
		global path
     
		if len(path) == 0:
			self.start_move_time = time.time()
   
		path.append((x, y))
  
  
	def update(self):
     
		if self.time_to_move == int(time.time() - self.start_move_time):
			self.x, self.y = path.pop(0)
			self.start_move_time = time.time()
   
	def hit(self):
		self.health -= 20
		# screen shake
  
	def repair(self):
		self.health += 20