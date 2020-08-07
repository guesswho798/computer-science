# importing the required libraries 
import pygame as pg 
from pygame.locals import *
import sys, time
import math, random
import socket

# for storing the 'x' or 'o' 
# value as character
XO = 'x'
winner = None
draw = None

# to set width of the game window 
width = 1200
height = 400
white = (255, 255, 255)
black = (0, 0, 0)
background = (34, 34, 51)
foreground = (170, 204, 255)
server = True
ip = ""
port = 0
name = ""

# setting up a 3 * 3 * 3 board
board = [[[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3]]

# initializing the pygame window
pg.init()
fps = 60
CLOCK = pg.time.Clock()
screen = pg.display.set_mode((width, height + 100), 0, 32)
pg.display.set_caption("3D multiplayer X's and O's")

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
    loc = (width, height)
    screen.blit(text, loc)
    return loc

def menu():
    done = False

    while(not done):

        for event in pg.event.get(): 
            if event.type == QUIT: 
                pg.quit() 
                sys.exit() 
            elif event.type is MOUSEBUTTONDOWN: 
                x, y = pg.mouse.get_pos()
                #if pressed in the center of the screen
                if abs(x - width / 2) < 75:
                    if y > height / 7 * 5 and y < height / 7 * 6:
                        done = True
                    if y > height / 7 * 6 and y < height / 7 * 7:
                        options()
                    if  y > height / 7 * 7 and y < height / 7 * 8:
                        pg.quit() 
                        sys.exit()

        screen.fill(background)

        #draw the text
        str1 = "Totally Normal X's O's"
        str2 = "o_0"
        str3 = "Play"
        str4 = "Options"
        str5 = "Exit"

        add_text(str1, 30, width / 2 - len(str1) * 7, height / 7, foreground)
        add_text(str2, 30, width / 2 - len(str2) * 7, height / 7 * 2, foreground)
        add_text(str3, 30, width / 2 - len(str2) * 7, height / 7 * 5, foreground)
        add_text(str4, 30, width / 2 - len(str2) * 7, height / 7 * 6, foreground)
        add_text(str5, 30, width / 2 - len(str2) * 7, height / 7 * 7, foreground)
        
        pg.display.update()
        CLOCK.tick(fps)

def options():
    global server, name, ip, port

    input_box_name = pg.Rect(width / 10 * 1.8, height / 7 * 3 + 10, 300, 30)
    input_box_ip = pg.Rect(width / 10 * 1.4, height / 7 * 4 + 10, 300, 30)
    input_box_port = pg.Rect(width / 10 * 1.8, height / 7 * 5 + 10, 300, 30)
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
    elif port == 0 and server == False:
        text_port = ""
    else:
        text_port = str(port)
    done = False

    while(not done):

        if server == True:
            text_ip = text_ip = socket.gethostbyname(socket.gethostname())

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
                elif abs(x - width / 10 * 1.4) < 55 and y > height / 7 * 6 and y < height / 7 * 7:
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
        str7 = "Back"

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
    global draw 
    
    if winner is None:
        message = XO.upper() + "'s Turn"
    elif draw is None:
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
    pg.display.update() 
    
def check_win(): 
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

    #these two is for the diagonal
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


    draw_status() 
    
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
    
        if(XO == 'x'): 
            # pasting x_img over the screen
            # at a coordinate position of
            # (pos_y, posx) defined in the
            # above code
            screen.blit(x_img, (posy, posx)) 
            XO = 'o'
        
        else: 
            screen.blit(o_img, (posy, posx))
            XO = 'x'
    pg.display.update()

def user_click(): 
    # get coordinates of mouse click 
    x, y = pg.mouse.get_pos()

    #checking if move is valid
    if y < 400:
        # get column and row of mouse click (0-8) (0-2)
        sizex = width / 9
        sizey = height / 3
        col = math.floor(x / sizex)
        row = math.floor(y / sizey)
    
        # after getting the row and col, 
        # we need to draw the images at 
        # the desired positions
        #if(row and col and board[x][row-1][col-1] is None): 
        global XO
        drawXO(row, col)
        check_win()

def reset_game(): 
    global board, winner, XO, draw 
    time.sleep(2) 
    XO = 'x'
    draw = None
    game_initiating_window()
    winner = None
    board = [[[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3], [[None]*3, [None]*3, [None]*3]]

def main():

    menu()

    game_initiating_window()

    while(True): 
        for event in pg.event.get(): 
            if event.type == QUIT: 
                pg.quit() 
                sys.exit() 
            #if event.type == pg.KEYDOWN:
            #    if event.key == pg.K_ESCAPE:
            #        menu()
            #        game_initiating_window()
            #        reset_game()
            elif event.type is MOUSEBUTTONDOWN:
                user_click() 
                if(winner or draw):
                    reset_game()
        pg.display.update()
        CLOCK.tick(fps)


if __name__ == '__main__':
    main()
