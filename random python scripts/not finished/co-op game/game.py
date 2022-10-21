from menu import Menu
from waiting_room import Waiting_room
from game_room import Game_room
from common import *

class Game:
    
	def __init__(self):
     
		pygame.init()
		self.menu = Menu()
		self.waiting_room = Waiting_room()
		self.game_room = Game_room()
    
	def start(self):
		global networking_manager

		# DEBUG remove this
		self.game_room.main_loop()
  
		# self.menu.main_loop()
		# self.menu.online_menu()
  
		# networking_manager.make_connection()

		# if networking_manager.is_server:
		# 	self.waiting_room.start()

      
		# self.game_room.main_loop()