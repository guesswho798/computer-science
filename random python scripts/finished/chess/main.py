import pygame
import chess
import sys
import socket
import random
import threading
import time

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
background = WHITE
foreground = BLACK

S_X = 400    # size of screen x value
S_Y = 400    # size of screen y value
p = None     # white player
turn = True  # whos turn it is
focus = None # the soldier that is selected
fps = 60     # frames per second

server = True
ip = ""
port = 0
name = "Raz"
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
opponent_name = ""
client = None
rcv = False
t = None

# initializing
pygame.init()
screen = pygame.display.set_mode([S_X, S_Y])
clock = pygame.time.Clock()
done = False
board = chess.Board()

# global pictures
avalibleMove = pygame.image.load('circle.png')
whitePieces = ["", pygame.image.load('white pawn.png'), pygame.image.load('white knight.png'), pygame.image.load('white bishop.png'), pygame.image.load('white rook.png'), pygame.image.load('white queen.png'), pygame.image.load('white king.png')]
blackPieces = ["", pygame.image.load('black pawn.png'), pygame.image.load('black knight.png'), pygame.image.load('black bishop.png'), pygame.image.load('black rook.png'), pygame.image.load('black queen.png'), pygame.image.load('black king.png')]

# classes
class soldier:
	x = 0
	y = 0

	def __init__(self, x, y, p):
		self.x = x * 50
		self.y = y * 50
		self.p = p

	def showMove(self):
		pass

	def Move(self, movex, movey, color):
		global turn, client, s, rcv

		if color == "w" and turn == False or color == "b" and turn == True:
			return False

		if movex == self.x and movey == self.y:
			return False

		if int((S_Y - movey - 50) / 50) == 7 and self.p.symbol().lower() == "p" or int((S_Y - movey - 50) / 50) == 0 and self.p.symbol().lower() == "p":
			m = chess.Move.from_uci(chess.SQUARE_NAMES[int((focus.x / 50) + 8 * ((S_Y - focus.y - 50) / 50))] + chess.SQUARE_NAMES[int((movex / 50) + 8 * ((S_Y - movey - 50) / 50))] + "q")
		else:
			m = chess.Move.from_uci(chess.SQUARE_NAMES[int((focus.x / 50) + 8 * ((S_Y - focus.y - 50) / 50))] + chess.SQUARE_NAMES[int((movex / 50) + 8 * ((S_Y - movey - 50) / 50))])

		if m in board.legal_moves and rcv == False:
			board.push(m)


			if client == None:
				s.send(str(m).encode())
			else:
				client.send(str(m).encode())

			rcv = True
			return True

		return False

# player class to keep pieces
class player:
	focus = None

	def __init__(self, s=""):
		self.s = s

	def click(self, x, y):
		global focus, turn
		x = int(x / 50)
		y = int(y / 50)

		# moving the piece that is in my team
		if focus != None and focus.p.color == turn:
			# wheter the move was legal or not
			if focus.Move(x * 50, y * 50, s) == True:
				# moving a turn
				turn = not turn
				focus = None
				return
			# unselecting when move is illigal but staying in function to see if player selected something else
			focus = None

		# on which soldier did the player click and is it on his team
		for square in chess.SQUARES:
			f = board.piece_at(square)
			if f != None and chess.square_file(square) == x and 7 - chess.square_rank(square) == y and f.color == turn:
				focus = soldier(chess.square_file(square), 7 - chess.square_rank(square), f)
				break

def add_text(text1, size=15, width=S_X / 2, height=S_Y / 2, color1=(255, 255, 255)):
    if type(text1) != 'str':
        text1 = str(text1)
    font = pygame.font.SysFont("comicsansms", size)
    text = font.render(text1, True, color1)
    loc = (int(width), int(height))
    screen.blit(text, loc)
    return loc

def menu():
    done = False

    play = ""

    while(not done):

        for event in pygame.event.get(): 
            if event.type == pygame.QUIT: 
                pygame.quit() 
                sys.exit() 
            elif event.type is pygame.MOUSEBUTTONDOWN: 
                x, y = pygame.mouse.get_pos()
                #if pressed in the center of the screen
                if abs(x - S_X / 2) < 75:
                    if y > S_Y / 7 * 2 and y < S_Y / 7 * 3 and name != "":
                        if server == True:
                            wait()
                            done = True
                            play = "online"
                        elif ip != "" or port != "":
                            connect()
                            done = True
                            play = "online"
                    if y > S_Y / 7 * 3 and y < S_Y / 7 * 4:
                        done = True
                        play = "local"
                    if y > S_Y / 7 * 4 and y < S_Y / 7 * 5:
                        options()
                    if  y > S_Y / 7 * 5 and y < S_Y / 7 * 6:
                        pygame.quit() 
                        sys.exit()


        screen.fill(background)

        #draw the text
        str1 = "chess"
        str2 = "Play Online"
        str3 = "Local Multiplayer"
        str4 = "Options"
        str5 = "Exit"

        add_text(str1, 30, S_X / 2 - len(str1) * 7, S_Y / 7 * 0, foreground)
        add_text(str2, 30, S_X / 2 - len(str2) * 7, S_Y / 7 * 2, foreground)
        add_text(str3, 30, S_X / 2 - len(str3) * 7, S_Y / 7 * 3, foreground)
        add_text(str4, 30, S_X / 2 - len(str4) * 7, S_Y / 7 * 4, foreground)
        add_text(str5, 30, S_X / 2 - len(str5) * 7, S_Y / 7 * 5, foreground)
        
        pygame.display.update()
        clock.tick(fps)

    return play
def options():
    global server, name, ip, port

    input_box_name = pygame.Rect(S_X / 10 * 3.4, S_Y / 7 * 2 + 10, 250, 30)
    input_box_ip = pygame.Rect(S_X / 10 * 2.2, S_Y / 7 * 3 + 10, 295, 30)
    input_box_port = pygame.Rect(S_X / 10 * 3.4, S_Y / 7 * 4 + 10, 250, 30)
    font = pygame.font.Font(None, 32)
    color_inactive = BLACK
    color_active = RED
    color_ip = color_inactive
    color_port = color_inactive
    color_name = color_inactive
    active_ip = False
    active_port = False
    active_name = False
    text_ip = ip
    text_name = name
    if port == 0 and server == True:
        text_port = str(random.randint(10000,60000))
    elif port == 0 and server == False:
        text_port = ""
    else:
        text_port = str(port)
    done = False

    while(not done):

        if server == True:
            text_ip = socket.gethostbyname(socket.gethostname())

        for event in pygame.event.get(): 
            if event.type == pygame.QUIT: 
                pygame.quit() 
                sys.exit() 
            elif event.type is pygame.MOUSEBUTTONDOWN: 
                x, y = pygame.mouse.get_pos()

                # if pressed in the center of the screen
                if abs(x - S_X / 10 * 2.1) < 55 and y > S_Y / 7 * 1 and y < S_Y / 7 * 2:
                    server = True
                    text_port = str(random.randint(10000,60000))
                elif abs(x - S_X / 10 * 5) < 55 and y > S_Y / 7 * 1 and y < S_Y / 7 * 2:
                    server = False
                    text_ip = ""
                    text_port = ""
                elif abs(x - S_X / 10) < 55 and y > S_Y / 7 * 6 and y < S_Y / 7 * 7:
                    done = True

                # ip box collider
                if input_box_ip.collidepoint(event.pos):
                    # Toggle the active variable.
                    active_ip = not active_ip
                else:
                    active_ip = False
                if active_ip == False:
                    ip = text_ip
                # Change color
                color_ip = color_active if active_ip else color_inactive

                # port box collider
                if input_box_port.collidepoint(event.pos):
                    # Toggle the active variable.
                    active_port = not active_port
                else:
                    active_port = False
                if active_port == False:
                    port = text_port
                # Change color
                color_port = color_active if active_port else color_inactive

                # name box collider
                if input_box_name.collidepoint(event.pos):
                    # Toggle the active variable.
                    active_name = not active_port
                else:
                    active_name = False
                if active_name == False:
                    name = text_name
                # Change color
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


        screen.fill(background)

        str1 = "Options"
        str2 = "Server"
        str3 = "Client"
        str4 = "Name: "
        str5 = "IP: "
        str6 = "PORT: "
        str7 = "Back"

        add_text(str1, 30, S_X / 10, S_Y / 7 * 0, foreground)
        add_text(str2, 30, S_X / 10, S_Y / 7 * 1, foreground)
        add_text(str3, 30, S_X / 10 * 4, S_Y / 7 * 1, foreground)
        if server:
            pygame.draw.rect(screen, BLACK, ((S_X / 10 - 5, S_Y / 7 * 1 + 5), (110, 40)), 4)
        else:
            pygame.draw.rect(screen, BLACK, ((S_X / 10 * 4 - 10, S_Y / 7 * 1 + 5), (100, 40)), 4)
        add_text(str4, 30, S_X / 10, S_Y / 7 * 2, foreground)
        add_text(str5, 30, S_X / 10, S_Y / 7 * 3, foreground)
        add_text(str6, 30, S_X / 10, S_Y / 7 * 4, foreground)
        add_text(str7, 30, S_X / 10, S_Y / 7 * 6, foreground)

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
def main():

	while True:
		play = menu()
	
		if play == "online":
			online_multiplayer()
		elif play == "local":
			local_multiplayer()

# online stuff
def wait():
    global ip, port, s, client, t
    if ip == "":
        ip = socket.gethostbyname(socket.gethostname())
    if int(port) == 0 or str(port) == "":
        port = str(random.randint(10000,60000))

    screen.fill(background)
    str1 = "waiting for client..."
    str2 = "ip: " + ip
    str3 = "port: " + str(port)
    add_text(str1, 30, S_X / 2 - len(str1) * 7, S_Y / 7 * 1, foreground)
    add_text(str2, 30, S_X / 2 - len(str2) * 7, S_Y / 7 * 2, foreground)
    add_text(str3, 30, S_X / 2 - len(str3) * 7, S_Y / 7 * 3, foreground)

    pygame.display.update()
    s.bind(('', int(port)))
    s.listen(1)
    client, address = s.accept()

    t = threading.Thread(target=listener)
    t.start()
def connect():
    global ip, port, s, t

    s.connect((ip, int(port)))

    t = threading.Thread(target=listener)
    t.start()
def listener():
	global client, s, board, rcv, turn

	while True:
		if client == None and rcv == True:
			m = s.recv(1024).decode()
			board.push(chess.Move.from_uci(m))
			turn = not turn
			rcv = False
		elif rcv == True and client != None:
			m = client.recv(1024).decode()
			board.push(chess.Move.from_uci(m))
			turn = not turn
			rcv = False

def local_multiplayer():
	global p
	# initiate players
	p = player()

	while not done:

		drawBoard()

		event()

		pygame.display.flip()

		clock.tick(fps)
def online_multiplayer():
	global p, client, rcv

	if client == None:
		p = player("b")
		rcv = True
	else:
		p = player("w")
		rcv = False

	while not done:

		drawBoard()

		event()

		pygame.display.flip()

		clock.tick(fps)
	
def reset():
	global turn
	print(board.result())
	turn = True
	board.reset_board()
def drawBoard():

	# background
	screen.fill(WHITE)

	# horizontal lines
	pygame.draw.line(screen, BLACK, (0, 50), (400, 50))
	pygame.draw.line(screen, BLACK, (0, 100), (400, 100))
	pygame.draw.line(screen, BLACK, (0, 150), (400, 150))
	pygame.draw.line(screen, BLACK, (0, 200), (400, 200))
	pygame.draw.line(screen, BLACK, (0, 250), (400, 250))
	pygame.draw.line(screen, BLACK, (0, 300), (400, 300))
	pygame.draw.line(screen, BLACK, (0, 350), (400, 350))

	# vertical lines
	pygame.draw.line(screen, BLACK, (50, 0), (50, 400))
	pygame.draw.line(screen, BLACK, (100, 0), (100, 400))
	pygame.draw.line(screen, BLACK, (150, 0), (150, 400))
	pygame.draw.line(screen, BLACK, (200, 0), (200, 400))
	pygame.draw.line(screen, BLACK, (250, 0), (250, 400))
	pygame.draw.line(screen, BLACK, (300, 0), (300, 400))
	pygame.draw.line(screen, BLACK, (350, 0), (350, 400))

	# drawing the pieces
	for square in chess.SQUARES:
		p = board.piece_at(square)
		if p is not None:
			if p.color == True:
				screen.blit(whitePieces[board.piece_type_at(square)], (chess.square_file(square) * 50, S_Y - chess.square_rank(square) * 50 - 50))
			else:
				screen.blit(blackPieces[board.piece_type_at(square)], (chess.square_file(square) * 50, S_Y - chess.square_rank(square) * 50 - 50))
	

	# showing the possible moves of the selected piece
	if focus != None:
		focus.showMove()
def event():
	global done
	global turn

	pygame.display.set_caption("chess")

	# --- Event Processing ---
	for event in pygame.event.get():

		# exit game
		if event.type == pygame.QUIT:
			done = True

		# mouse press
		if pygame.mouse.get_pressed()[0]:
			p.click(pygame.mouse.get_pos()[0], pygame.mouse.get_pos()[1])

	if board.is_game_over():
		reset()

if __name__ == '__main__':
	main()
