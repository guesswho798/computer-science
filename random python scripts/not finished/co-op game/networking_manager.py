import socket
import threading
import pickle
from common import *

class Networking_manager:
	def __init__(self):
		self.ip = ""
		self.port = 0
		self.is_server = True
		self.name = ""
		self.peer_name = ""
		self.socket = None

		# DEBUG MAKE FALSE
		self.connected = False
  
		# data from peer for serialization
		self.new_coords = None
		self.move = None
		self.weapon = None
		self.repair = None
		self.ammo = None
		self.enemies = None
		self.hit = None
	
	def __del__(self):
  
		if self.socket:
			self.socket.close()
   
	def start_sync(self):
		if self.socket:
			t = threading.Thread(target=self.sync)
			t.setDaemon(True)
			t.start()
	
	def sync(self):
     
		while True:
			obj = pickle.loads(self.socket.recv(1024))
			
			type = obj[0]
			data = obj[1]
   
			if type == "new_coords":
				self.new_coords = data
			elif type == "move":
				self.move = data
			elif type == "weapon":
				self.weapon = data
			elif type == "ammo":
				self.ammo = data
			elif type == "repair":
				self.repair = data
			elif type == "enemies":
				self.enemies = data
			elif type == "hit":
				self.hit = data
   
	def send(self, obj):
		if self.socket:
			self.socket.send(pickle.dumps(obj))
  
	def make_connection(self):
		
		if self.is_server:
			threading.Thread(target=self.host).start()
		else:
			threading.Thread(target=self.connect).start()
  
	def host(self):
     
		if self.ip == 0 or self.ip == "":
			return

		self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.socket.bind((self.ip, int(self.port)))
		self.socket.listen()
		self.socket, _ = self.socket.accept()
  
		self.connected = True
  
	def connect(self):

		if self.ip == 0 or self.ip == "":
			return

		self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.socket.connect((self.ip, int(self.port)))
  
		self.connected = True