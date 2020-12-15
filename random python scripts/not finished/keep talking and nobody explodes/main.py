import pygame as pg 
from pygame.locals import *
import sys, os
import random, math
import threading, socket
import time
import string

width = 800
height = 600
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
dark_red = (180, 0, 0)
bright_red = (255, 77, 77)
green = (0, 255, 0)
dark_green = (0, 180, 0)
bright_green = (77, 255, 77)
blue = (0, 0, 255)
dark_blue = (0, 0, 180)
bright_blue = (77, 77, 255)
yellow = (255,255,0)
dark_yellow = (184,184,0)
bright_yellow = (253, 228, 104)
gray = (82, 87, 93)
dark_gray = (72, 77, 83)
light_gray = (105,105,105)
background = gray
foreground = yellow
color_inactive = black
color_active = red
server = True
ip = ""
port = 0
seconds = 0
secondCounter = None
minutes = 5
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client = None
music = True
done = False
mistakes = 0
bomber = None
manual = "manual.pdf"

# box extras
year = random.randint(1900, 2099)
date = "date: " + str(random.randint(1, 25)) + "." + str(random.randint(1, 12)) + "." + str(year)
s = ''.join(random.choice(["A", "U", "I", "O", "E", "B", "H", "T", "F", "G", "U", "A", "J", "E", "L"]) for i in range(4))
insert = random.randint(0, 4)
insertnum = random.randint(0, 9)
serial_number = "SERIAL NO. " + s[:insert] + str(insertnum) + s[insert:]

# initializing the pygame window
pg.init()
fps = 60
CLOCK = pg.time.Clock()
screen = pg.display.set_mode((width, height), 0, 32)
pg.display.set_caption("Keep talking and nobody explodes")
minigames = list()

# music
pg.mixer.music.load("dial.mp3")

# loading the images as python object
#https://commons.wikimedia.org/w/index.php?title=Category:Hieroglyphs_of_Egypt&subcatuntil=Grapevine+%28hieroglyph%29#mw-subcategories
#https://online.sodapdf.com/document/08a3eb45-2f04-451c-bc18-0304de49adb5?r=view
#https://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf
hiero = [pg.image.load("1.png"), pg.image.load("2.png"), pg.image.load("3.png"), pg.image.load("4.png"), pg.image.load("5.png"), pg.image.load("6.png"), pg.image.load("7.png"), pg.image.load("8.png"), pg.image.load("9.png"), pg.image.load("10.png"), pg.image.load("11.png"), pg.image.load("12.png"), pg.image.load("13.png"), pg.image.load("14.png"), pg.image.load("15.png")]

# resizing images
for x in range(0, 15):
    hiero[x] = pg.transform.scale(hiero[x], (60, 90))


# classes
class minigame:

    def __init__(self, x, y, name):
        global year, insertnum
        self.x = x
        self.y = y
        self.name = name
        minigames = ["simon says", "wires", "memory game", "buttons"]
        self.done = False
        self.mistake = 0
        self.mistakeTimer = None
        self.order = list()

        if self.name == minigames[0]:
            self.order = list()
            for num in range(1, 5):
                self.order.append(random.randint(0, 3))
            self.selector = 0
            self.inselect = 0
            self.first = pg.Rect(self.x + 65, self.y + 50, width / 7, height / 7)
            self.second = pg.Rect(self.x + 65 + width / 7, self.y + 50, width / 7, height / 7)
            self.third = pg.Rect(self.x + 65, self.y + 50 + height / 7, width / 7, height / 7)
            self.fourth = pg.Rect(self.x + 65 + width / 7, self.y + 50 + height / 7, width / 7, height / 7)
            self.boxs = [self.first, self.second, self.third, self.fourth]
            self.start_time = time.time()
            self.highlight = False
            if year % 2 == 0:
                self.table = [[0,1,3,0],[2,2,1,1],[1,3,2,2],[3,0,0,3]]
            else:
                self.table = [[3,0,1,0],[0,1,3,2],[1,3,2,1],[2,2,0,3]]
        elif self.name == minigames[1]:
            self.wires = list()
            colors = [black, yellow, red, blue]
            self.numOfWires = random.randint(3, 4)
            for num in range(1, self.numOfWires + 1):
                self.wires.append([pg.Rect(self.x + 65, int(self.y + 50 + height / 10 * (num - 1)), width / 10 * 3, 10), random.choice(colors)])
            if self.numOfWires == 3:
                b = True
                for wire in self.wires:
                    if wire[1] == red:
                        b = False

                yellows = 0
                for wire in self.wires:
                    if wire[1] == yellow:
                        yellows = yellows + 1

                if b:   
                    self.correct = 1
                elif self.wires[len(self.wires) - 1][1] == black:
                    self.correct = len(self.wires) - 1
                elif yellows == 0:
                    self.correct = 0
                else:
                    self.correct = len(self.wires) - 1
            else:
                reds = 0
                index = 0
                for num in range(len(self.wires)):
                    if self.wires[num][1] == red:
                        reds = reds + 1
                        index = num
                blacks = 0
                for wire in self.wires:
                    if wire[1] == black:
                        blacks = blacks + 1

                blues = 0
                for wire in self.wires:
                    if wire[1] == blue:
                        blues = blues + 1

                if reds > 1 and "A" in serial_number[11:] or reds > 1 and "E" in serial_number[11:] or reds > 1 and "I" in serial_number[11:] or reds > 1 and "O" in serial_number[11:] or reds > 1 and "U" in serial_number[11:]:
                    self.correct = index
                elif self.wires[len(self.wires) - 1][1] == yellow and reds == 0:
                    self.correct = 0
                elif blues > 1:
                    self.correct = len(self.wires) - 1
                elif blacks == 1:
                    self.correct = 1
                else:
                    self.correct = 2
        elif self.name == minigames[2]:
            l1 = [0, 1, 3, 7, 2, 4]
            l2 = [13, 4, 11, 12, 14, 5]
            l3 = [10, 12, 6, 3, 0, 13]
            self.l = random.choice([l1, l2, l3])
            self.selector = 0
            self.order = random.sample([0, 1, 2, 3, 4, 5], 4)
            self.boxes = [[pg.Rect(self.x + 15 + 0 * 85, self.y + 95, 70, 100), self.l[self.order[0]], False], [pg.Rect(self.x + 15 + 1 * 85, self.y + 95, 70, 100), self.l[self.order[1]], False], [pg.Rect(self.x + 15 + 2 * 85, self.y + 95, 70, 100), self.l[self.order[2]], False], [pg.Rect(self.x + 15 + 3 * 85, self.y + 95, 70, 100), self.l[self.order[3]], False]]
        elif self.name == minigames[3]:
            self.hold = False
            colors = [black, yellow, red, blue, green]
            self.colorb = random.choice(colors)
            self.colort = random.choice(colors)
            self.timer = time.time()
            self.serial = insertnum >= 5
            self.button = random.choice(["Abort", "Detonate", "Hold"])

    def Draw(self):
        #add_text(self.name, 20, self.x + 10, self.y)
        
        if self.name == "simon says":
            pg.draw.rect(screen, dark_yellow, self.first)
            pg.draw.rect(screen, dark_red, self.second)
            pg.draw.rect(screen, dark_blue, self.third)
            pg.draw.rect(screen, dark_green, self.fourth)
        elif self.name == "wires":
            for x in range(self.numOfWires):
                # wire
                pg.draw.rect(screen, self.wires[x][1], self.wires[x][0])
                # gray boxs
                pg.draw.rect(screen, gray, (int(self.x + 60), int(self.y + 43 + height / 10 * x), 10, 20))
                pg.draw.rect(screen, gray, (int(self.x + 60 + width / 10 * 3), int(self.y + 43 + height / 10 * x), 10, 20))
            
    def Update(self):
        global minutes, seconds, mistakes

        self.Status()

        if self.done:
            return

        if self.name == "simon says":
            if time.time() - self.start_time > 2 and self.highlight == False:
                self.start_time = time.time()
                self.highlight = not self.highlight
            if time.time() - self.start_time > 1.5 * self.selector + 1 and self.highlight == True:
                self.start_time = time.time()
                self.highlight = not self.highlight

            c = [dark_yellow, dark_red, dark_blue, dark_green]
            h = [bright_yellow, bright_red, bright_blue, bright_green]
            if self.highlight:
                if time.time() - self.start_time < 0.9:
                    pg.draw.rect(screen, h[self.order[0]], self.boxs[self.order[0]])
                elif time.time() - self.start_time > 1.1 and time.time() - self.start_time < 2.4:
                    pg.draw.rect(screen, c[self.order[0]], self.boxs[self.order[0]])
                    pg.draw.rect(screen, h[self.order[1]], self.boxs[self.order[1]])
                elif time.time() - self.start_time > 2.6 and time.time() - self.start_time < 3.9:
                    pg.draw.rect(screen, c[self.order[1]], self.boxs[self.order[1]])
                    pg.draw.rect(screen, h[self.order[2]], self.boxs[self.order[2]])
                elif time.time() - self.start_time > 4.1 and time.time() - self.start_time < 5.4:
                    pg.draw.rect(screen, c[self.order[2]], self.boxs[self.order[2]])
                    pg.draw.rect(screen, h[self.order[3]], self.boxs[self.order[3]])
                else:
                    pg.draw.rect(screen, c[self.order[0]], self.boxs[self.order[0]])
                    pg.draw.rect(screen, c[self.order[1]], self.boxs[self.order[1]])
                    pg.draw.rect(screen, c[self.order[2]], self.boxs[self.order[2]])
                    pg.draw.rect(screen, c[self.order[3]], self.boxs[self.order[3]])
            else:
                if self.selector < len(self.order):
                    pg.draw.rect(screen, c[self.order[self.selector]], self.boxs[self.order[self.selector]])
        elif self.name == "memory game":
            for box in self.boxes:
                if box[2] == True:
                    pg.draw.rect(screen, dark_gray, box[0])
                else:
                    pg.draw.rect(screen, gray, box[0])
            for num in range(4):
                screen.blit(hiero[self.l[self.order[num]]], (self.x + 20 + num * 85, self.y + 100))
        elif self.name == "buttons":
            if not pg.mouse.get_pressed()[0] and self.hold:
                self.time = time.time() - self.timer
                pg.draw.rect(screen, light_gray, (self.x + width / 5 - 20, self.y + width / 4 + 27, 100, 30))
                if self.serial and self.button == "Detonate" or self.colorb == red and self.button == "Hold" or self.colorb == black and self.button == "Hold":
                    if self.time < 0.1:
                        self.done = True
                    else:
                        mistakes = mistakes + 1
                        self.mistake = 1
                        self.selector = 0
                        self.mistakeTimer = time.time()
                else:
                    if self.colort == blue:
                        if minutes == 4 or seconds == 4 or int(seconds / 10) == 4 or int(seconds % 10) == 4:
                            self.donr
            if pg.mouse.get_pressed()[0] and self.hold:
                pg.draw.circle(screen, gray, (int(self.x + width / 5 + 20), int(self.y + width / 6)), 100)
                self.time = time.time() - self.timer
                self.time = int(self.time)
                pg.draw.rect(screen, light_gray, (self.x + width / 5 - 20, self.y + width / 4 + 27, 100, 30))
                add_text(self.button, 20, self.x + width / 5 - len(self.button) * 2, self.y + width / 6 - 15, self.colort)
            else:
                self.hold = False
                pg.draw.circle(screen, light_gray, (int(self.x + width / 5 + 20), int(self.y + width / 6)), 100)
                add_text(self.button, 20, self.x + width / 5 - len(self.button) * 2, self.y + width / 6 - 15, black)
            pg.draw.circle(screen, self.colorb, (int(self.x + width / 5 + 20), int(self.y + width / 6)), 100, 5)
                
    def click(self):
        global mistakes
        # get coordinates of mouse click
        x, y = pg.mouse.get_pos()

        if self.done:
            return

        if self.name == "simon says":
            # getting box clicked index
            selected = -1
            if self.first.collidepoint((x, y)):
                selected = 0
            if self.second.collidepoint((x, y)):
                selected = 1
            if self.third.collidepoint((x, y)):
                selected = 2
            if self.fourth.collidepoint((x, y)):
                selected = 3

            # checking if the user didnt click on any button at all
            if selected == -1:
                return

            # redrawing the normal color after click
            c = [dark_yellow, dark_red, dark_blue, dark_green]
            self.highlight = False
            self.start_time = time.time()
            pg.draw.rect(screen, c[self.order[0]], self.boxs[self.order[0]])
            pg.draw.rect(screen, c[self.order[1]], self.boxs[self.order[1]])
            pg.draw.rect(screen, c[self.order[2]], self.boxs[self.order[2]])
            pg.draw.rect(screen, c[self.order[3]], self.boxs[self.order[3]])

            # got all the way thrugh the mini list
            if self.inselect == self.selector:
                self.inselect = 0
                self.selector = self.selector + 1

            # clicked on the right button
            # inselect is the index of the mini list
            if self.table[self.order[self.inselect]][self.inselect] == selected:
                self.inselect = self.inselect + 1
            else:
                mistakes = mistakes + 1
                self.mistakeTimer = time.time()
                self.mistake = 1
                self.selector = 0
                self.inselect = 0


            # fully finished the minigame
            if self.selector == len(self.order) and self.selector == self.inselect:
                self.done = True
        if self.name == "wires":
            selected = -1

            for index in range(len(self.wires)):
                if self.wires[index][0].collidepoint((x, y)):
                    selected = index

            if selected == -1:
                return

            if selected == self.correct:
                self.done = True
            else:
                mistakes = mistakes + 1
                self.mistake = 1
                self.selector = 0
                self.mistakeTimer = time.time()
        if self.name == "memory game":
            selected = -1

            for index in range(len(self.boxes)):
                if self.boxes[index][0].collidepoint((x, y)):
                    selected = index
                    self.boxes[index][2] = True

            if selected == -1:
                return

            l = sorted(self.order)

            if self.boxes[selected][1] == self.l[l[self.selector]]:
                self.selector = self.selector + 1
            else:
                print("reset")
                mistakes = mistakes + 1
                self.mistake = 1
                self.selector = 0
                self.mistakeTimer = time.time()
                for box in self.boxes:
                    box[2] = False

            if self.selector == 4:
                self.done = True
                for box in self.boxes:
                    pg.draw.rect(screen, dark_gray, box[0])
                for num in range(4):
                    screen.blit(hiero[self.l[self.order[num]]], (self.x + 20 + num * 85, self.y + 100))
        if self.name == "buttons":
            # calculting if cursor was inside circle
            if math.sqrt((x - (self.x + 175))**2 + (y - (self.y + 135))**2) < 100:
                self.hold = True
                self.timer = time.time()

    def Status(self):
        if self.done:
            pg.draw.circle(screen, green, (int(self.x + width / 5 * 2 + 10), int(self.y + 20)), 10)
        elif self.mistake == 0 or time.time() - self.mistakeTimer > 2:
            pg.draw.circle(screen, gray, (int(self.x + width / 5 * 2 + 10), int(self.y + 20)), 10)
            self.mistake = 0
        else:
            pg.draw.circle(screen, red, (int(self.x + width / 5 * 2 + 10), int(self.y + 20)), 10)

def add_text(text1, size=15, width=width / 2, height=height / 2, color1=(255, 255, 255)):
    if type(text1) != 'str':
        text1 = str(text1)
    font = pg.font.SysFont("microsoftjhengheimicrosoftjhengheiui", size)
    text = font.render(text1, True, color1)
    loc = (int(width), int(height))
    screen.blit(text, loc)
    return loc

# game loops
def online_multiplayer():
    global mistakes, bomber

    game_initiating_window()

    done = False
    while(not done):

        for event in pg.event.get():
            if event.type == QUIT:
                pg.quit()
                sys.exit()
            elif event.type is MOUSEBUTTONDOWN:
                if bomber:
                    user_click()

        if bomber:    
            for x in minigames:
                x.Update()

        if mistakes == 3:
            pg.mixer.music.set_volume(0.1)
            pg.mixer.music.play(1)
            mistakes = 0
            done = True


        pg.draw.rect(screen, white, (0, 0, width, 27))
        add_text(date, 20, 45, 5, black)
        pg.draw.rect(screen, light_gray, (45, 35, 50, 35))
        if seconds < 10:
            add_text(str(minutes) + ":0" + str(seconds), 20, 45, 35, black)
        else:
            add_text(str(minutes) + ":" + str(seconds), 20, 45, 35, black)
        add_text(serial_number, 20, width / 2 + 5, 5, black)

        timer()

        pg.display.update()
        CLOCK.tick(fps)
def timer():
    global secondCounter, seconds, minutes, mistakes
    if mistakes == 3:
        return
    s = time.time() - secondCounter
    if int(s) == 1:
        secondCounter = time.time()
        seconds = seconds - 1
        if seconds == -1:
            minutes = minutes - 1
            if minutes >= 0:
                seconds = 59
            else:
                minutes = 0
                seconds = 0
                mistakes = 3

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
    global bomber, server, manual, secondCounter

    bomber = server
    
    if bomber:

        # updating the display 
        pg.display.update()
        screen.fill(white)
    
        pg.draw.rect(screen, light_gray, (width / 20, height / 20, width / 20 * 18, height / 20 * 18))
        pg.draw.rect(screen, black, (width / 20, height / 20, width / 20 * 18, height / 20 * 18), 5)
    
        # drawing vertical lines 
        pg.draw.line(screen, black, (width / 2, height / 20), (width / 2, height / 20 * 19), 5)
    
        # drawing horizontal lines 
        pg.draw.line(screen, black, (width / 20, height / 2), (width / 20 * 19, height / 2), 5)
    
        m = ["simon says", "wires", "memory game", "buttons"]
        order = random.sample(range(4), 4)
    
        minigames.append(minigame(width / 20 , height / 20, m[order[0]]))
        minigames.append(minigame(width / 2 , height / 20, m[order[1]]))
        minigames.append(minigame(width / 20 , height / 2, m[order[2]]))
        minigames.append(minigame(width / 2 , height / 2, m[order[3]]))
    
        for x in minigames:
            x.Draw()

        secondCounter = time.time()
    else:
        os.startfile(manual)

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
def user_click():
    # get coordinates of mouse click 
    x, y = pg.mouse.get_pos()

    if x < width / 2 and y < height / 2:
        minigames[0].click()
    if x > width / 2 and y < height / 2:
        minigames[1].click()
    if x < width / 2 and y > height / 2:
        minigames[2].click()
    if x > width / 2 and y > height / 2:
        minigames[3].click()
def reset_game():
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
    global server, ip, port

    input_box_name = pg.Rect(width / 10 * 2.2, height / 7 * 2 + 10, 250, 30)
    input_box_ip = pg.Rect(width / 10 * 1.6, height / 7 * 3 + 10, 300, 30)
    input_box_port = pg.Rect(width / 10 * 2.2, height / 7 * 4 + 10, 250, 30)
    font = pg.font.Font(None, 32)
    color_ip = color_inactive
    color_port = color_inactive
    color_name = color_inactive
    active_ip = False
    active_port = False
    active_name = False
    text_ip = ip
    text_name = ""
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

        for event in pg.event.get(): 
            if event.type == pg.QUIT: 
                pg.quit() 
                sys.exit() 
            elif event.type is pg.MOUSEBUTTONDOWN: 
                x, y = pg.mouse.get_pos()

                # if pressed in the center of the screen
                if abs(x - width / 10 * 2.1) < 55 and y > height / 7 * 1 and y < height / 7 * 2:
                    server = True
                    text_port = str(random.randint(10000,60000))
                elif abs(x - width / 10 * 3.4) < 55 and y > height / 7 * 1 and y < height / 7 * 2:
                    server = False
                    text_ip = ""
                    text_port = ""
                elif abs(x - width / 10 * 1.5) < 40 and y > height / 7 * 6 and y < height / 7 * 7:
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

        add_text(str1, 30, width / 10, height / 7 * 0.4, foreground)
        add_text(str2, 30, width / 10, height / 7 * 1, foreground)
        add_text(str3, 30, width / 10 * 3, height / 7 * 1, foreground)
        if server:
            pg.draw.rect(screen, black, ((width / 10 - 5, height / 7 * 1 + 5), (110, 40)), 4)
        else:
            pg.draw.rect(screen, black, ((width / 10 * 3 - 10, height / 7 * 1 + 5), (100, 40)), 4)
        add_text(str4, 30, width / 10, height / 7 * 2, foreground)
        add_text(str5, 30, width / 10, height / 7 * 3, foreground)
        add_text(str6, 30, width / 10, height / 7 * 4, foreground)
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
def main():
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
                    if y > height / 10 * 4 and y < height / 10 * 5:
                        if server == True:
                            #wait()
                            online_multiplayer()
                        elif ip != "" or port != "":
                            #connect()
                            online_multiplayer()
                    if y > height / 10 * 5 and y < height / 10 * 6:
                        options()
                    if  y > height / 10 * 6 and y < height / 10 * 7:
                        tutorial()
                    if  y > height / 10 * 7 and y < height / 10 * 8:
                        pg.quit() 
                        sys.exit()


        screen.fill(background)

        #draw the text
        str1 = "Keep talking and nobody explodes"
        str2 = "Play Online"
        str3 = "Options"
        str4 = "Tutorial"
        str5 = "Exit"

        add_text(str1, 30, width / 2 - len(str1) * 7, height / 10 * 1, foreground)
        add_text(str2, 30, width / 2 - len(str2) * 7, height / 10 * 4, foreground)
        add_text(str3, 30, width / 2 - len(str3) * 7, height / 10 * 5, foreground)
        add_text(str4, 30, width / 2 - len(str4) * 7, height / 10 * 6, foreground)
        add_text(str5, 30, width / 2 - len(str5) * 7, height / 10 * 7, foreground)
        
        pg.display.update()
        CLOCK.tick(fps)

if __name__ == '__main__':
    main()
