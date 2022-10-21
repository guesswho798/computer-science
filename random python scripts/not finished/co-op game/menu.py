import pygame
import sys
from common import *
import socket
import random

class Menu:

	def __init__(self):

		self.done = False
		self.start_top_floor = False
	
	def main_loop(self):
		
		play = pygame.Rect(S_X / 10 * 4, S_Y / 10 * 5, S_X / 10, S_Y / 10)
		options = pygame.Rect(S_X / 10 * 4, S_Y / 10 * 6, S_X / 10, S_Y / 10)
		tutorial = pygame.Rect(S_X / 10 * 4, S_Y / 10 * 7, S_X / 10, S_Y / 10)
		exit = pygame.Rect(S_X / 10 * 4, S_Y / 10 * 8, S_X / 10, S_Y / 10)
	
		while not self.done:
		
			for event in pygame.event.get():
			
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()
				elif event.type == pygame.MOUSEBUTTONDOWN:
				
					x, y = pygame.mouse.get_pos()
		
					if play.collidepoint(x, y):
						self.online_menu()
						self.done = True
					if options.collidepoint(x, y):
						print("options")
					if tutorial.collidepoint(x, y):
						print("tutorial")
					if exit.collidepoint(x, y):
						pygame.quit()
						sys.exit()
	
	
			screen.fill(BLUE)
	
			#draw the text
			str1 = "co-op sub game"
			str2 = "Play Online"
			str3 = "Options"
			str4 = "Tutorial"
			str5 = "Exit"
	
			add_text(str1, header_size, S_X / 2 - len(str1) * 10, S_Y / 10 * 1, BLACK)
			add_text(str2, font_size, play.left, play.top, BLACK)
			add_text(str3, font_size, options.left, options.top, BLACK)
			add_text(str4, font_size, tutorial.left, tutorial.top, BLACK)
			add_text(str5, font_size, exit.left, exit.top, BLACK)
	
			pygame.display.update()
			clock.tick(fps)
	
	def online_menu(self):
		global networking_manager
	
		input_box_host = pygame.Rect(S_X / 10 * 4 - 5, S_Y / 8 + 5, 90, 40)
		input_box_join = pygame.Rect(S_X / 10 * 6 - 10, S_Y / 8 + 5, 90, 40)
		input_box_name = pygame.Rect(S_X / 10 * 3, S_Y / 8 * 2 + 10, 250, 30)
		input_box_ip   = pygame.Rect(S_X / 10 * 3, S_Y / 8 * 3 + 10, 250, 30)
		input_box_port = pygame.Rect(S_X / 10 * 3, S_Y / 8 * 4 + 10, 250, 30)
		input_box_play = pygame.Rect(S_X / 10, S_Y / 8 * 6, 90, 40)
		font = pygame.font.Font(None, 32)
		color_inactive = BLACK
		networking_manager.is_server = True
		color_active = RED
		color_ip = color_inactive
		color_port = color_inactive
		color_name = color_inactive
		active_ip = False
		active_port = False
		active_name = False
		text_ip = networking_manager.ip
		text_name = networking_manager.name
		if networking_manager.port == 0 and networking_manager.is_server == True:
			text_port = str(random.randint(10000, 60000))
		elif networking_manager.port == 0 and networking_manager.is_server == False:
			text_port = ""
		else:
			text_port = str(networking_manager.port)
		done = False
	
		while not done:
		
			if networking_manager.is_server == True:
				text_ip = socket.gethostbyname(socket.gethostname())
	
			for event in pygame.event.get(): 
				if event.type == pygame.QUIT: 
					pygame.quit() 
					sys.exit() 
				elif event.type == pygame.MOUSEBUTTONDOWN:
					
					# host box collider
					if input_box_host.collidepoint(event.pos):
						networking_manager.is_server = True
						text_port = str(random.randint(10000, 60000))
					
					# join box collider
					if input_box_join.collidepoint(event.pos):
						networking_manager.is_server = False
						#text_ip = ""
						text_port = ""
						
					# play box collider
					if input_box_play.collidepoint(event.pos):
						networking_manager.port = text_port
						done = True
	
					# ip box collider
					if input_box_ip.collidepoint(event.pos):
						active_ip = not active_ip
					else:
						active_ip = False
					if active_ip == False:
						networking_manager.ip = text_ip
					
					color_ip = color_active if active_ip else color_inactive
	
					# port box collider
					if input_box_port.collidepoint(event.pos):
						active_port = not active_port
					else:
						active_port = False
					if active_port == False:
						networking_manager.port = text_port
					color_port = color_active if active_port else color_inactive
	
					# name box collider
					if input_box_name.collidepoint(event.pos):
						active_name = not active_port
					else:
						active_name = False
					if active_name == False:
						networking_manager.name = text_name
					color_name = color_active if active_name else color_inactive
	
				elif event.type == pygame.KEYDOWN:
					if active_ip:
						if event.key == pygame.K_RETURN:
							ip = text_ip
							active_ip = not active_ip
							color_ip = color_active if active_ip else color_inactive
						elif event.key == pygame.K_BACKSPACE:
							text_ip = text_ip[:-1]
						else:
							text_ip += event.unicode
					if active_port:
						if event.key == pygame.K_RETURN:
							port = text_port
							active_port = not active_port
							color_port = color_active if active_port else color_inactive
						elif event.key == pygame.K_BACKSPACE:
							text_port = text_port[:-1]
						else:
							text_port += event.unicode
	
					if active_name:
						if event.key == pygame.K_RETURN:
							name = text_name
							active_name = not active_name
							color_name = color_active if active_name else color_inactive
						elif event.key == pygame.K_BACKSPACE:
							text_name = text_name[:-1]
						else:
							text_name += event.unicode
	
	
			screen.fill(BACKGROUND)
	
			str1 = "Lobby options: "
			str2 = "Host"
			str3 = "Join"
			str4 = "Name: "
			str5 = "IP: "
			str6 = "PORT: "
			str7 = "Play"
	
			add_text(str1, font_size, S_X / 10 * 1, S_Y / 8 * 1, FOREGROUND)
			add_text(str2, font_size, S_X / 10 * 4, S_Y / 8 * 1, FOREGROUND)
			add_text(str3, font_size, S_X / 10 * 6, S_Y / 8 * 1, FOREGROUND)
			add_text(str4, font_size, S_X / 10 * 1, S_Y / 8 * 2, FOREGROUND)
			add_text(str5, font_size, S_X / 10 * 1, S_Y / 8 * 3, FOREGROUND)
			add_text(str6, font_size, S_X / 10 * 1, S_Y / 8 * 4, FOREGROUND)
			add_text(str7, font_size, S_X / 10 * 1, S_Y / 8 * 6, FOREGROUND)
			
			# box on top of host or join
			if networking_manager.is_server:
				pygame.draw.rect(screen, BLACK, input_box_host, 4)
			else:
				pygame.draw.rect(screen, BLACK, input_box_join, 4)
	
			# Render the current text.
			txt_surface_ip = font.render(text_ip, True, color_ip)
			txt_surface_port = font.render(text_port, True, color_port)
			txt_surface_name = font.render(text_name, True, color_name)
			# Blit the text.
			screen.blit(txt_surface_ip, (input_box_ip.x+5, input_box_ip.y+5))
			screen.blit(txt_surface_port, (input_box_port.x+5, input_box_port.y+5))
			screen.blit(txt_surface_name, (input_box_name.x+5, input_box_name.y+5))
			# Blit the input_box rect.
			pygame.draw.rect(screen, color_ip, input_box_ip, 2)
			pygame.draw.rect(screen, color_port, input_box_port, 2)
			pygame.draw.rect(screen, color_name, input_box_name, 2)
	
			
			pygame.display.update()
			clock.tick(fps)