import pygame as pg 
from pygame.locals import *
import sys, time
import math, random
import socket
import threading


XO = 'x'
winner = None
draw = None
width = 1200
height = 400
white = (255, 255, 255)
black = (0, 0, 0)
background = (34, 34, 51)
foreground = (170, 204, 255)
server = True
ip = ""
port = 0
name = "Raz"
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
opponent_name = ""
client = None
last_move = ""
rcv = False
win = 0
lose = 0
music = True
done = False

# setting up a 3 * 3 * 3 board
board = [[[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3]]

# initializing the pygame window
pg.init()
fps = 60
CLOCK = pg.time.Clock()
screen = pg.display.set_mode((width, height + 100), 0, 32)
pg.display.set_caption("3D multiplayer X's and O's")
pg.mixer.music.load("TR.wav")

# loading the images as python object
x_img = pg.image.load("x.jpg")
y_img = pg.image.load("circle.png")
circle_img = pg.image.load("check.jpg")

# resizing images
x_img = pg.transform.scale(x_img, (80, 80))
o_img = pg.transform.scale(y_img, (80, 80))
circle_img = pg.transform.scale(circle_img, (80, 80))

def add_text(text1, size=15, width=width / 2, height=height / 2, color1=(255, 255, 255)):
    if type(text1) != 'str':
        text1 = str(text1)
    font = pg.font.SysFont("comicsansms", size)
    text = font.render(text1, True, color1)
    loc = (int(width), int(height))
    screen.blit(text, loc)
    return loc

# game loops
def local_multiplayer():
    game_initiating_window()

    back = pg.Rect(width - 105, height + 55, 80, 35)
    done = False
    while(not done):
        for event in pg.event.get():
            if event.type == QUIT:
                pg.quit()
                sys.exit()
            elif event.type is MOUSEBUTTONDOWN:
                if back.collidepoint(event.pos):
                    reset_game(False)
                    done = True
                user_click()
                if(winner or draw):
                    reset_game()

        
        pg.draw.rect(screen, white, (width - 105, height + 55, 80, 35), 3)
        add_text("Back", 30, width - 100, height + 50, white)
        pg.display.update()
        CLOCK.tick(fps)
def online_multiplayer():
    global s, client, last_move, rcv, name, opponent_name, win, lose, done
    game_initiating_window()

    my_turn = False

    if client != None:
        my_turn = True
            
    back = pg.Rect(width / 2 - 25, height + 65, 80, 35)
    done = False
    while(not done):

        # swiching who is first
        str1 = ""
        str2 = ""
        if win + lose % 2 == 0:
            if client != None:
                str1 = name + " is x"
                str2 = opponent_name + " is o"
            else:
                str1 = name + " is o"
                str2 = opponent_name + " is x"
        else:
            if client != None:
                str1 = name + " is o"
                str2 = opponent_name + " is x"
            else:
                str1 = name + " is x"
                str2 = opponent_name + " is o"


        # reciving information
        if my_turn == False and client != None and rcv == True:
            rcv = False
            move = last_move.split("|")
            drawXO(int(move[0]), int(move[1]))
            my_turn = True
            w = check_win()
            if str1[len(str1) - 1] == w:
                win = win + 1
                print("win " + str(win))
                reset_game()
            elif str2[len(str2) - 1] == w:
                lose = lose + 1
                print("lose " + str(lose))
                reset_game()
        elif my_turn == False and client == None and rcv == True:
            rcv = False
            move = last_move.split("|")
            drawXO(int(move[0]), int(move[1]))
            my_turn = True
            w = check_win()
            if str1[len(str1) - 1] == w:
                win = win + 1
                print("win " + str(win))
                reset_game()
            elif str2[len(str2) - 1] == w:
                lose = lose + 1
                print("lose " + str(lose))
                reset_game()
        for event in pg.event.get():
            if event.type == QUIT:
                pg.quit()
                sys.exit()
            elif event.type is MOUSEBUTTONDOWN:
                # if pressed the back button
                if back.collidepoint(event.pos):
                    # senfing the other side to go back
                    if client == None:
                        s.send("done".encode())
                    else:
                        client.send("done".encode())
                    reset_game(False)
                    done = True
                # sending information
                if my_turn:
                    # telling the user click function not to check winner so we could here
                    move = user_click(False)
                    w = check_win()
                    if str1[len(str1) - 1] == w:
                        win = win + 1
                        print("win " + str(win))
                        reset_game()
                    elif str2[len(str2) - 1] == w:
                        lose = lose + 1
                        print("lose " + str(lose))
                        reset_game()
                    if move != None:
                        my_turn = False
                        if client != None:
                            client.send(move.encode())
                        else:
                            s.send(move.encode())

        # deleting backgound of text so it wont overlay
        screen.fill(black, (5, height + 30, 100, 50))
        screen.fill(black, (width - len(str2) * 10, height + 30, 100, 50))

        # text for names
        add_text(str1, 20, 5, height + 30)
        add_text(str2, 20, width - len(str2) * 13, height + 30)
        add_text(str(win), 20, 5 + len(str1), height + 55)
        add_text(str(lose), 20, width - len(str2) * 10, height + 55)

        # back button
        pg.draw.rect(screen, white, (width / 2 - 25, height + 65, 80, 35), 3)
        add_text("Back", 30, width / 2 - 20, height + 60, white)
        pg.display.update()
        CLOCK.tick(fps)

# online stuff
def wait():
    global ip, port, name, s, opponent_name, client
    if ip == "":
        ip = socket.gethostbyname(socket.gethostname())
    if int(port) == 0 or str(port) == "":
        port = str(random.randint(10000,60000))

    screen.fill(background)
    str1 = "waiting for client..."
    str2 = "ip: " + ip
    str3 = "port: " + str(port)
    add_text(str1, 30, width / 2 - len(str1) * 7, height / 7 * 1, foreground)
    add_text(str2, 30, width / 2 - len(str2) * 7, height / 7 * 2, foreground)
    add_text(str3, 30, width / 2 - len(str3) * 7, height / 7 * 3, foreground)

    pg.display.update()
    s.bind(('', int(port)))
    s.listen(1)
    client, address = s.accept()
    opponent_name = client.recv(1024).decode()
    client.send(name.encode())

    t = threading.Thread(target=listener)
    t.start()
def connect():
    global ip, port, name, s, opponent_name

    s.connect((ip, int(port)))
    s.send(name.encode())
    opponent_name = s.recv(1024).decode()
    t = threading.Thread(target=listener)
    t.start()
def listener():
    global client, s, last_move, rcv, done
    while True:
        if client == None:
            last_move = s.recv(1024).decode()
            rcv = True
        else:
            last_move = client.recv(1024).decode()
            rcv = True
        if last_move == "done":
                done = True

# game mechanics
def game_initiating_window():
    
    
    # updating the display 
    pg.display.update()            
    screen.fill(white) 

    # drawing vertical lines 
    pg.draw.line(screen, black, (width / 9, 0), (width / 9, height), 7)
    pg.draw.line(screen, black, (width / 9 * 2, 0), (width / 9 * 2, height), 7)

    pg.draw.line(screen, black, (width / 9 * 4, 0), (width / 9 * 4, height), 7)
    pg.draw.line(screen, black, (width / 9 * 5, 0), (width / 9 * 5, height), 7)

    pg.draw.line(screen, black, (width / 9 * 7, 0), (width / 9 * 7, height), 7)
    pg.draw.line(screen, black, (width / 9 * 8, 0), (width / 9 * 8, height), 7)

    # drawing horizontal lines 
    pg.draw.line(screen, black, (0, height / 3), (width / 3 - 10, height / 3), 7)
    pg.draw.line(screen, black, (0, height / 3 * 2), (width / 3 - 10, height / 3 * 2), 7)

    pg.draw.line(screen, black, (width / 3 + 10, height / 3), (width / 3 * 2 - 10, height / 3), 7)
    pg.draw.line(screen, black, (width / 3 + 10, height / 3 * 2), (width / 3 * 2 - 10, height / 3 * 2), 7)

    pg.draw.line(screen, black, (width / 3 * 2 + 10, height / 3), (width, height / 3), 7)
    pg.draw.line(screen, black, (width / 3 * 2 + 10, height / 3 * 2), (width, height / 3 * 2), 7)



    draw_status() 
def draw_status():
    
    # getting the global variable draw 
    # into action 
    global draw, winner
    
    if winner is None:
        message = XO.upper() + "'s Turn"
    elif draw is None and winner is not None:
        message = winner.upper() + " won!"
    else: 
        message = "Game Draw!"

    # setting a font object
    font = pg.font.Font(None, 30)
    
    # setting the font properties like 
    # color and width of the text 
    text = font.render(message, 1, (255, 255, 255)) 

    # copy the rendered message onto the board 
    # creating a small block at the bottom of the main display 
    # ((left, top), (width, height))
    screen.fill ((0, 0, 0), (0, height, width, 100)) 
    text_rect = text.get_rect(center =(width / 2, 500-50)) 
    screen.blit(text, text_rect)

    add_text("Top", 20, width / 6 * 1 - 40, height + 5)
    add_text("Center", 20, width / 6 * 3 - 40, height + 5)
    add_text("bottom", 20, width / 6 * 5 - 40, height + 5)

    pg.display.update() 
def check_win(tutorial=False):
    global board, winner, draw


    #checking on different boards
    for x in range(3):
        # checking for winning rows 
        for row in range(3):
            if((board[x][row][0] == board[x][row][1] == board[x][row][2]) and (board[x][row][0] is not None)):
                winner = board[x][row][0]
                screen.blit(circle_img, (30 + 133 * 0 + 400 * x, 30 + 133 * row))
                screen.blit(circle_img, (30 + 133 * 1 + 400 * x, 30 + 133 * row))
                screen.blit(circle_img, (30 + 133 * 2 + 400 * x, 30 + 133 * row))
                break
    
        # checking for winning columns
        for col in range(3):
            if((board[x][0][col] == board[x][1][col] == board[x][2][col]) and (board[x][0][col] is not None)): 
                winner = board[x][0][col] 
                screen.blit(circle_img, (30 + 133 * col + 400 * x, 30 + 133 * 0))
                screen.blit(circle_img, (30 + 133 * col + 400 * x, 30 + 133 * 1))
                screen.blit(circle_img, (30 + 133 * col + 400 * x, 30 + 133 * 2))
                break
    
        # check for diagonal winners
        if (board[x][0][0] == board[x][1][1] == board[x][2][2]) and (board[x][0][0] is not None):
           
            # game won diagonally left to right
            winner = board[x][0][0]
            screen.blit(circle_img, (30 + 133 * 0 + 400 * x, 30 + 133 * 0))
            screen.blit(circle_img, (30 + 133 * 1 + 400 * x, 30 + 133 * 1))
            screen.blit(circle_img, (30 + 133 * 2 + 400 * x, 30 + 133 * 2))
           
        if (board[x][0][2] == board[x][1][1] == board[x][2][0]) and (board[x][0][2] is not None):
           
            # game won diagonally right to left
            winner = board[x][0][2]
            screen.blit(circle_img, (30 + 133 * 2 + 400 * x, 30 + 133 * 0))
            screen.blit(circle_img, (30 + 133 * 1 + 400 * x, 30 + 133 * 1))
            screen.blit(circle_img, (30 + 133 * 0 + 400 * x, 30 + 133 * 2))

    #checking for wins between boards
    #this one is three on the same spot on all three boards
    for row in range(3):
        for col in range(3):
            if((board[0][row][col] == board[1][row][col] == board[2][row][col]) and (board[0][row][col] is not None)): 
                winner = board[0][row][col]
                screen.blit(circle_img, (30 + 133 * col + 400 * 0, 30 + 133 * row))
                screen.blit(circle_img, (30 + 133 * col + 400 * 1, 30 + 133 * row))
                screen.blit(circle_img, (30 + 133 * col + 400 * 2, 30 + 133 * row))

    #these four are for the 3d diagonal
    if (board[0][0][0] == board[1][1][1] == board[2][2][2]) and (board[0][0][0] is not None):
        winner = board[0][0][0]
        screen.blit(circle_img, (30, 30))
        screen.blit(circle_img, (563, 163))
        screen.blit(circle_img, (1096, 296))
    if (board[0][2][0] == board[1][1][1] == board[2][0][2]) and (board[0][2][0] is not None):
        winner = board[0][2][0]
        screen.blit(circle_img, (30, 296))
        screen.blit(circle_img, (563, 163))
        screen.blit(circle_img, (1096, 30))
    if (board[0][0][2] == board[1][1][1] == board[2][2][0]) and (board[0][0][2] is not None):
        winner = board[0][0][2]
        screen.blit(circle_img, (30 + 133 * 2, 30))
        screen.blit(circle_img, (30 + 133 * 1 + 400 * 1, 30 + 133 * 1))
        screen.blit(circle_img, (30 + 133 * 0 + 400 * 2, 30 + 133 * 2))
    if (board[0][2][2] == board[1][1][1] == board[2][0][0]) and (board[2][0][0] is not None):
        winner = board[2][0][0]
        screen.blit(circle_img, (30 + 133 * 2, 30 + 133 * 2))
        screen.blit(circle_img, (30 + 133 * 1 + 400 * 1, 30 + 133 * 1))
        screen.blit(circle_img, (30 + 133 * 0 + 400 * 2, 30 + 133 * 0))

    #rows
    for row in range(3):
        if((board[0][row][0] == board[1][row][1] == board[2][row][2]) and (board[1][row][1] is not None)):
            winner = board[1][row][1]
            screen.blit(circle_img, (30 + 133 * 0 + 400 * 0, 30 + 133 * row))
            screen.blit(circle_img, (30 + 133 * 1 + 400 * 1, 30 + 133 * row))
            screen.blit(circle_img, (30 + 133 * 2 + 400 * 2, 30 + 133 * row))
            break
        if ((board[0][row][2] == board[1][row][1] == board[2][row][0]) and (board[1][row][1] is not None)):
            winner = board[1][row][1]
            screen.blit(circle_img, (30 + 133 * 2 + 400 * 0, 30 + 133 * row))
            screen.blit(circle_img, (30 + 133 * 1 + 400 * 1, 30 + 133 * row))
            screen.blit(circle_img, (30 + 133 * 0 + 400 * 2, 30 + 133 * row))
            break

    #colums
    for col in range(3):
        if((board[0][0][col] == board[1][1][col] == board[2][2][col]) and (board[0][0][col] is not None)):
            winner = board[0][0][col]
            screen.blit(circle_img, (30 + 133 * col + 400 * 0, 30 + 133 * 0))
            screen.blit(circle_img, (30 + 133 * col + 400 * 1, 30 + 133 * 1))
            screen.blit(circle_img, (30 + 133 * col + 400 * 2, 30 + 133 * 2))
            break
        if ((board[0][2][col] == board[1][1][col] == board[2][0][col]) and (board[0][2][col] is not None)):
            winner = board[0][2][col]
            screen.blit(circle_img, (30 + 133 * col + 400 * 0, 30 + 133 * 2))
            screen.blit(circle_img, (30 + 133 * col + 400 * 1, 30 + 133 * 1))
            screen.blit(circle_img, (30 + 133 * col + 400 * 2, 30 + 133 * 0))
            break


    draw = True
    for x in range(0,3):
        for y in range(0,3):
            for z in range(0,3):
                if(board[x][y][z] is None):
                    draw = None
                    break

    if tutorial == False:
        draw_status()
    return winner
def drawXO(row, col):
    global board, XO 
    
    # for the first row, the image 
    # should be pasted at a x coordinate 
    # of 30 from the left margin

    posx = row * 133 + 30
    posy = col * 133 + 30

        
    # setting up the required board
    # value to display
    x = 0
    while col >= 3:
        col = col - 3
        x = x + 1

    if board[x][row][col] is None:
        board[x][row][col] = XO
    
        #drawing and turning
        if XO == 'x': 
            screen.blit(x_img, (posy, posx)) 
            XO = 'o'
        else: 
            screen.blit(o_img, (posy, posx))
            XO = 'x'
    pg.display.update()
def user_click(check=True):
    # get coordinates of mouse click 
    x, y = pg.mouse.get_pos()

    #checking if move is valid
    if y < height:
        # get column and row of mouse click (0-8) (0-2)
        sizex = width / 9
        sizey = height / 3
        col = math.floor(x / sizex)
        row = math.floor(y / sizey)
    
        #drawing and checking win
        global XO
        drawXO(row, col)
        if check:
            check_win()
        return str(row) + "|" + str(col)

    return None
def reset_game(wait=True):
    global board, winner, XO, draw
    if wait:
        time.sleep(2)
    XO = 'x'
    draw = None
    winner = None
    board = [[[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3]]
    game_initiating_window()

# menus
def tutorial():

    #which step into the tutorial is the player
    step = 1

    game_initiating_window()
    while(True):
        for event in pg.event.get():
            if event.type == QUIT:
                pg.quit()
                sys.exit()
            elif event.type is MOUSEBUTTONDOWN: 
                x, y = pg.mouse.get_pos()
                #if pressed in button
                if abs(x - (width - 80)) < 60 and y > height + 50 and y < height + 90:
                    step = step + 1

        if step == 1:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("Welcome to the tutorial in 3D Tic Tac Toe.", 20, 5, height + 25, white)
            add_text("I will go through a game and explain some moves.", 20, 5, height + 48, white)
            add_text("Press the 'Next ->' botton on the right to continue...", 20, 5, height + 72, white)
        elif step == 2:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("In front of you are 3 boards, the one on the left", 20, 5, height + 25, white)
            add_text("is the top one the middle one is the center board", 20, 5, height + 48, white)
            add_text("and the right one is the buttom board.", 20, 5, height + 72, white)
        elif step == 3:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("The rules are the same as normal tic tac toe.", 20, 5, height + 25, white)
            add_text("You can win by getting three x's or o's in a row", 20, 5, height + 48, white)
            add_text("a column or a diagonal.", 20, 5, height + 72, white)
        elif step == 4:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("The first move played here was the center of", 20, 5, height + 25, white)
            add_text("center board, a good starting move to control", 20, 5, height + 48, white)
            add_text("a key spot in all boards", 20, 5, height + 72, white)
            drawXO(1, 4)
        elif step == 5:
            screen.fill(black, (0, height + 30, 500, 70))
            drawXO(0, 0)
        elif step == 6:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("Player one is all ready threatening to win in the", 20, 5, height + 25, white)
            add_text("next move with the center of the buttom board", 20, 5, height + 48, white)
            drawXO(1, 1)
        elif step == 7:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("Player two defends", 20, 5, height + 25, white)
            drawXO(1, 7)
        elif step == 8:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("Player one will win in the next move by placing", 20, 5, height + 25, white)
            add_text("an X in the right side of the top board or the", 20, 5, height + 48, white)
            add_text("right side of the buttom board and getting a diagonal", 20, 5, height + 72, white)
            drawXO(1, 0)
        elif step == 9:
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("Player two tries to defend", 20, 5, height + 25, white)
            drawXO(1, 2)
        elif step == 10:
            drawXO(1, 8)
            #sending true so the buttom of the screen wont flicker
            check_win(True)
            screen.fill(black, (0, height + 30, 500, 70))
            add_text("Player one wins.", 20, 5, height + 25, white)
            add_text("Press next to go back to menu", 20, 5, height + 48, white)
        elif step == 11:
            break

        #next button
        pg.draw.rect(screen, white, ((width - 125, height + 50), (115, 40)), 3)
        add_text("Next ->", 30, width - 120, height + 50, white)

        pg.display.update()
        CLOCK.tick(fps)
def options():
    global server, name, ip, port, music

    input_box_name = pg.Rect(width / 10 * 1.8, height / 7 * 3 + 10, 300, 30)
    input_box_ip = pg.Rect(width / 10 * 1.4, height / 7 * 4 + 10, 300, 30)
    input_box_port = pg.Rect(width / 10 * 1.8, height / 7 * 5 + 10, 300, 30)
    music_on = pg.Rect(width / 10 + 95, height / 7 * 6 + 3, 50, 38)
    music_off = pg.Rect(width / 10 + 155, height / 7 * 6 + 3, 65, 40)
    font = pg.font.Font(None, 32)
    color_inactive = black
    color_active = white
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
        text_port = ""
    elif port == 0 and server == False:
        text_port = ""
    else:
        text_port = str(port)
    done = False

    while(not done):

        if server == True:
            text_ip = socket.gethostbyname(socket.gethostname())

        for event in pg.event.get(): 
            if event.type == QUIT: 
                pg.quit() 
                sys.exit() 
            elif event.type is MOUSEBUTTONDOWN: 
                x, y = pg.mouse.get_pos()

                #if pressed in the center of the screen
                if abs(x - width / 10 * 1.4) < 55 and y > height / 7 * 2 and y < height / 7 * 3:
                    server = True
                    text_port = str(random.randint(10000,60000))
                elif abs(x - width / 10 * 2.4) < 55 and y > height / 7 * 2 and y < height / 7 * 3:
                    server = False
                    text_ip = ""
                    text_port = ""
                elif abs(x - width / 10 * 1.4) < 55 and y > height / 7 * 7 and y < height / 7 * 8:
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

                if music_on.collidepoint(event.pos):
                    music = True
                    pg.mixer.music.play(-1)
                if music_off.collidepoint(event.pos):
                    music = False
                    pg.mixer.music.fadeout(1000)
            elif event.type == pg.KEYDOWN:
                if active_ip:
                    if event.key == pg.K_RETURN:
                        ip = text_ip
                        active_ip = not active_ip
                        color_ip = color_active if active_ip else color_inactive
                    elif event.key == pg.K_BACKSPACE:
                        text_ip = text_ip[:-1]
                    else:
                        text_ip += event.unicode
                if active_port:
                    if event.key == pg.K_RETURN:
                        port = text_port
                        active_port = not active_port
                        color_port = color_active if active_port else color_inactive
                    elif event.key == pg.K_BACKSPACE:
                        text_port = text_port[:-1]
                    else:
                        text_port += event.unicode

                if active_name:
                    if event.key == pg.K_RETURN:
                        name = text_name
                        active_name = not active_name
                        color_name = color_active if active_name else color_inactive
                    elif event.key == pg.K_BACKSPACE:
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
        str7 = "music"
        str8 = "Back"

        add_text(str1, 30, width / 10, height / 7 * 1, foreground)
        add_text(str2, 30, width / 10, height / 7 * 2, foreground)
        add_text(str3, 30, width / 10 * 2, height / 7 * 2, foreground)
        if server:
            pg.draw.rect(screen, black, ((width / 10 - 5, height / 7 * 2 + 5), (110, 40)), 4)
        else:
            pg.draw.rect(screen, black, ((width / 10 * 2 - 10, height / 7 * 2 + 5), (100, 40)), 4)
        add_text(str4, 30, width / 10, height / 7 * 3, foreground)
        add_text(str5, 30, width / 10, height / 7 * 4, foreground)
        add_text(str6, 30, width / 10, height / 7 * 5, foreground)
        add_text(str7, 30, width / 10, height / 7 * 6, foreground)
        add_text("On", 30, width / 10 + 100, height / 7 * 6, foreground)
        add_text("Off", 30, width / 10 + 160, height / 7 * 6, foreground)
        if music:
            pg.draw.rect(screen, black, ((width / 10 + 95, height / 7 * 6 + 3), (50, 38)), 4)
        else:
            pg.draw.rect(screen, black, ((width / 10 + 155, height / 7 * 6 + 3), (65, 40)), 4)
        add_text(str8, 30, width / 10, height / 7 * 7, foreground)

        # Render the current text.
        txt_surface_ip = font.render(text_ip, True, color_ip)
        txt_surface_port = font.render(text_port, True, color_port)
        txt_surface_name = font.render(text_name, True, color_name)
        # Blit the text.
        screen.blit(txt_surface_ip, (input_box_ip.x+5, input_box_ip.y+5))
        screen.blit(txt_surface_port, (input_box_port.x+5, input_box_port.y+5))
        screen.blit(txt_surface_name, (input_box_name.x+5, input_box_name.y+5))
        # Blit the input_box rect.
        pg.draw.rect(screen, color_ip, input_box_ip, 2)
        pg.draw.rect(screen, color_port, input_box_port, 2)
        pg.draw.rect(screen, color_name, input_box_name, 2)

        
        pg.display.update()
        CLOCK.tick(fps)
def menu():
    done = False

    play = ""

    while(not done):

        for event in pg.event.get(): 
            if event.type == QUIT: 
                pg.quit() 
                sys.exit() 
            elif event.type is MOUSEBUTTONDOWN: 
                x, y = pg.mouse.get_pos()
                #if pressed in the center of the screen
                if abs(x - width / 2) < 75:
                    if y > height / 7 * 3 and y < height / 7 * 4 and name != "":
                        if server == True:
                            wait()
                            done = True
                            play = "online"
                        elif ip != "" or port != "":
                            connect()
                            done = True
                            play = "online"
                    if y > height / 7 * 4 and y < height / 7 * 5:
                        done = True
                        play = "local"
                    if y > height / 7 * 5 and y < height / 7 * 6:
                        options()
                    if  y > height / 7 * 6 and y < height / 7 * 7:
                        tutorial()
                    if  y > height / 7 * 7 and y < height / 7 * 8:
                        pg.quit() 
                        sys.exit()


        screen.fill(background)

        #draw the text
        str1 = "Totally Normal X's O's"
        str2 = "o_0"
        str3 = "Play Online"
        str4 = "Local Multiplayer"
        str5 = "Options"
        str6 = "Tutorial"
        str7 = "Exit"

        add_text(str1, 30, width / 2 - len(str1) * 7, height / 7 * 0, foreground)
        add_text(str2, 30, width / 2 - len(str2) * 7, height / 7 * 1, foreground)
        add_text(str3, 30, width / 2 - len(str3) * 7, height / 7 * 3, foreground)
        add_text(str4, 30, width / 2 - len(str4) * 7, height / 7 * 4, foreground)
        add_text(str5, 30, width / 2 - len(str5) * 7, height / 7 * 5, foreground)
        add_text(str6, 30, width / 2 - len(str6) * 7, height / 7 * 6, foreground)
        add_text(str7, 30, width / 2 - len(str7) * 7, height / 7 * 7, foreground)
        
        pg.display.update()
        CLOCK.tick(fps)

    return play


def main():

    pg.mixer.music.set_volume(0.01)
    pg.mixer.music.play(-1)

    while True:
        play = menu()
    
        if play == "online":
            online_multiplayer()
        elif play == "local":
            local_multiplayer()

if __name__ == '__main__':
    main()
