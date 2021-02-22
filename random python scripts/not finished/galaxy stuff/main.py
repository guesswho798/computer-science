import pygame as pg
from pygame import *
import random
import sys

# sizes
WIDTH = 1100
HEIGHT = 600
TILE_SIZE = 48

# colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (39, 80, 42)
RED = (255, 0, 0)
PURPLE = (255, 0, 255)
YELLOW = (255,255,0)
GRAY = (78, 76, 79)
DARK_GRAY = (34, 40, 49)
BACKGROUND = DARK_GRAY
FOREGROUND = WHITE

# pictures
SCREEN_SIZE = pg.Rect((0, 0, WIDTH, HEIGHT))
screen = pg.display.set_mode(SCREEN_SIZE.size)
hearts = [pg.transform.scale(pg.image.load('pics\\hf.png'), (TILE_SIZE*2, TILE_SIZE*2)), pg.transform.scale(pg.image.load('pics\\hh.png'), (TILE_SIZE*2, TILE_SIZE*2)), pg.transform.scale(pg.image.load('pics\\he.png'), (TILE_SIZE*2, TILE_SIZE*2))]
background = pg.transform.scale(pg.image.load('pics\\bg.png'), (WIDTH, HEIGHT))
rarrow = pg.transform.scale(pg.image.load('pics\\arrow.png'), (50, 50))
larrow = pg.transform.scale(pg.transform.flip(pg.image.load('pics\\arrow.png'), True, False), (50, 50))
animation_path = 'animation/'

# global init vars
level = None         # the map
platforms = None     # a group of enteties that make you stop moving
player = None        # the player
level_width = None   # the width of the map
level_height = None  # the height of the map
entities = None      # a group of general enteties
npcs = None          # a group of general npcs
timer = None         # the pygame clock that counts fps
music = True         # a bool that determins if music will be played

class CameraAwareLayeredUpdates(pg.sprite.LayeredUpdates):
    def __init__(self, target, world_size):
        super().__init__()
        self.target = target
        self.cam = pg.Vector2(0, 0)
        self.world_size = world_size
        if self.target:
            self.add(target)

    def update(self, *args):
        super().update(*args)
        cameraspeed = 0.05
        if self.target:
            x = -self.target.rect.center[0] + SCREEN_SIZE.width/2
            y = -self.target.rect.center[1] + SCREEN_SIZE.height/2
            self.cam += (pg.Vector2((x, y)) - self.cam) * cameraspeed
            self.cam.x = max(-(self.world_size.width-SCREEN_SIZE.width), min(0, self.cam.x))
            self.cam.y = max(-(self.world_size.height-SCREEN_SIZE.height), min(0, self.cam.y))

    def draw(self, surface):
        spritedict = self.spritedict
        surface_blit = surface.blit
        dirty = self.lostsprites
        self.lostsprites = []
        dirty_append = dirty.append
        init_rect = self._init_rect
        for spr in self.sprites():
            if spr == player:
                continue
            rec = spritedict[spr]
            newrect = surface_blit(spr.image, spr.rect.move(self.cam))
            if rec is init_rect:
                dirty_append(newrect)
            else:
                if newrect.colliderect(rec):
                    dirty_append(newrect.union(rec))
                else:
                    dirty_append(newrect)
                    dirty_append(rec)
            spritedict[spr] = newrect

        rec = spritedict[player]
        newrect = surface_blit(player.image, player.rect.move(self.cam))
        if rec is init_rect:
            dirty_append(newrect)
        else:
            if newrect.colliderect(rec):
                dirty_append(newrect.union(rec))
            else:
                dirty_append(newrect)
                dirty_append(rec)
        spritedict[player] = newrect

        return dirty            

def init_game():
    global level, platforms, player, level_width, level_height, entities, timer, npcs

    pg.init()
    pg.display.set_caption("Galaxy test")
    timer = pg.time.Clock()

    level = [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwsssssssssssssssssssssssssssssssssssssssssss",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwffffffffwwwssssssssssssssssssssssssssssssssssssssssss",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwffffffffffwwwwwwwwwwwwwwwwwsssssssssssssssssssssssssss",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwffffffffffffwwwwwwffffffffwwwssssssssssssssssssssssssss",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwffffffffffffwwwwwwfffffffffwwwsssssssssssssssssssssssss",
        "wwwwwwwwwwwffffffffffffffffffffffffffffffffffffffffffffffffffffffwsssssssssssssssssssssssss",
        "wwwwwwwwwffffffffffffffffffffffffffffffffffffffffffffffffffffffffwsssssssssssssssssssssssss",
        "wwwwwwwwfffffffffffffffffffffffffffffffffffffffffffffffffffffffffwsssssssssssssssssssssssss",
        "wwwwwwwwffffffffwwwwwwwwwwwffwwwwwwwffffffffffffwwwwwwfffffffffffwsssssssssssssssssssssssss",
        "wwwwwwwwffffffffwwwwwwwwwwwffwwwwwwwffffffffffffwwwwwwwwffwwwwwwwwsssssssssssssssssssssssss",
        "wwwwwwwwwwwffwwwwwwwwwwwwwwffwwwwwwwffffffffffffwwwwwwwwffwwwwwwwwsssssssssssssssssssssssss",
        "wwwwwwwwwwwffwwwwwwwwwwfffffffffwwwwwffffffffffwwwwwwwwwffwwwwwwwwsssssssssssssssssssssssss",
        "wwwwwwwwwwwffwwwwwwwwwwfffffffffwwwwwwffffffffwwwffffffwfffffffffssssssssssssssssssssssssss",
        "wwwwwwwwwwwffwwwwwwwwwwfffffffffwwwwwwwffffffwwwfffffffffffffffffssssssssssssssssssssssssss",
        "wwwwfffwwwwffwwwwwwwwwwffffffffffwwwwwwwwffwwwwffffffffffffffffffssssssssssssssssssssssssss",
        "wwwffffwwwwffwwwfffffffffffffffffffffffffffwwwwffffffffwwwwwwwfffssssssssssssssssssssssssss",
        "wwfffffffffffffffffffffffffffffffffffffffffwwwwffffffffwwwwwwwfffssssssssssssssssssssssssss",
        "wwfffffffffffffffffwwwwwwwwwwwwwwwwwwwwwwwwwwwwbffffffcwwwwwwwfffssssssssssssssssssssssssss",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwsssssssssssssssssssssssss",
        "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"]

    platforms = pg.sprite.Group()
    player = Player(0, platforms, (TILE_SIZE * 43, TILE_SIZE * 11))
    level_width  = len(level[0])*TILE_SIZE
    level_height = len(level)*TILE_SIZE
    entities = CameraAwareLayeredUpdates(player, pg.Rect(0, 0, level_width, level_height))
    npcs = []
    
    # build the level
    x = y = 0
    counter = 0
    for row in level:
        for col in row:
            if col == "w":
                Platform((x, y), platforms, entities)
            if col == "f":
                Floor((x, y), entities)
            if col == "s":
                Space((x, y), platforms, entities)
            if col == "e":
                Enemy((x, y), platforms, entities)
            if col == "c":
                Crate((x, y), platforms, entities)
            if col == "b":
                Bed((x, y), platforms, entities)
            x += TILE_SIZE
        y += TILE_SIZE
        x = 0

    npcs.append(Npc((TILE_SIZE*36, TILE_SIZE*10), 0, platforms, "test man 1", "Hello there player, My dick is hard can you help", "me get it flacid please?", False, entities))
    npcs.append(Npc((TILE_SIZE*47, TILE_SIZE*9 ), 0, platforms, "test man 2", "Hello there player, My dick is hard can you help", "me get it flacid please?", True, entities))

def main():
    global level, platforms, player, level_width, level_height, entities, timer
    
    init_game()

    pg.mixer.music.load("sound\\sound track.mp3")
    pg.mixer.music.set_volume(0.1)
    #pg.mixer.music.play(-1)

    done = False

    while not done:

        menu()

        done, skin = choosecharacter()

        player.set_skin(skin)

    done = False
    while not done:

        for e in pg.event.get():
            if e.type == QUIT or e.type == KEYDOWN and e.key == K_ESCAPE: 
                done = True
            elif e.type is MOUSEBUTTONDOWN:
                user_click()

        entities.update(player)
        screen.fill(BACKGROUND)
        screen.blit(background, (0, 0))
        entities.draw(screen)
        drawUI(screen)

        pg.display.update()
        timer.tick(60)

def menu():

    done = False

    while(not done):
        for event in pg.event.get():
            if event.type == QUIT: 
                pg.quit() 
                sys.exit()
            if event.type == pg.MOUSEBUTTONDOWN:
                x, y = pg.mouse.get_pos()
                #if pressed in the center of the screen
                if abs(x - WIDTH / 2) < 75:
                    if y > HEIGHT / 10 * 3 and y < HEIGHT / 10 * 4:
                        done = True
                    if y > HEIGHT / 10 * 4 and y < HEIGHT / 10 * 5:
                        options()
                    if y > HEIGHT / 10 * 5 and y < HEIGHT / 10 * 6:
                        pg.quit() 
                        sys.exit()

        screen.fill(BACKGROUND)

        #draw the text
        str1 = "Galaxy stuff"
        str2 = "Play"
        str3 = "Options"
        str4 = "Exit"

        add_text(str1, 30, WIDTH / 2 - len(str1) * 7, HEIGHT / 10 * 1, WHITE)
        add_text(str2, 30, WIDTH / 2 - len(str2) * 7, HEIGHT / 10 * 3, WHITE)
        add_text(str3, 30, WIDTH / 2 - len(str3) * 7, HEIGHT / 10 * 4, WHITE)
        add_text(str4, 30, WIDTH / 2 - len(str4) * 7, HEIGHT / 10 * 5, WHITE)
        
        pg.display.update()
        timer.tick(60)

def options():
    global music

    music_on = pg.Rect(WIDTH / 10 + 95, HEIGHT / 7 * 2 + 3, 50, 38)
    music_off = pg.Rect(WIDTH / 10 + 155, HEIGHT / 7 * 2 + 3, 65, 40)
    font = pg.font.Font(None, 32)
    color_inactive = BLACK
    color_active = WHITE
    
    done = False

    while(not done):

        
        for event in pg.event.get(): 
            if event.type == QUIT: 
                pg.quit() 
                sys.exit() 
            elif event.type == MOUSEBUTTONDOWN: 
                x, y = pg.mouse.get_pos()

                #if pressed in the center of the screen
                if abs(x - WIDTH / 10 * 1.4) < 55 and y > HEIGHT / 7 * 2 and y < HEIGHT / 7 * 3:
                    server = True
                    text_port = str(random.randint(10000,60000))
                elif abs(x - WIDTH / 10 * 2.4) < 55 and y > HEIGHT / 7 * 2 and y < HEIGHT / 7 * 3:
                    server = False
                    text_ip = ""
                    text_port = ""
                elif abs(x - WIDTH / 10 * 1.4) < 55 and y > HEIGHT / 7 * 4 and y < HEIGHT / 7 * 5:
                    done = True

                # name box collider
                #if input_box_name.collidepoint(event.pos):
                #    # Toggle the active variable.
                #    active_name = not active_port
                #else:
                #    active_name = False
                #if active_name == False:
                #    name = text_name
                ## Change color
                #color_name = color_active if active_name else color_inactive

                if music_on.collidepoint(event.pos):
                    music = True
                    pg.mixer.music.play(-1)
                if music_off.collidepoint(event.pos):
                    music = False
                    pg.mixer.music.fadeout(1000)
            

        screen.fill(BACKGROUND)

        str1 = "Options"
        #str2 = "Server"
        #str3 = "Client"
        #str4 = "Name: "
        #str5 = "IP: "
        #str6 = "PORT: "
        str7 = "music"
        str8 = "Back"

        add_text(str1, 30, WIDTH / 10, HEIGHT / 7 * 1, FOREGROUND)
        #add_text(str2, 30, WIDTH / 10, HEIGHT / 7 * 2, FOREGROUND)
        #add_text(str3, 30, WIDTH / 10 * 2, HEIGHT / 7 * 2, FOREGROUND)
        #pg.draw.rect(screen, BLACK, ((WIDTH / 10 * 2 - 10, HEIGHT / 7 * 2 + 5), (100, 40)), 4)
        #add_text(str4, 30, WIDTH / 10, HEIGHT / 7 * 3, FOREGROUND)
        #add_text(str5, 30, WIDTH / 10, HEIGHT / 7 * 4, FOREGROUND)
        #add_text(str6, 30, WIDTH / 10, HEIGHT / 7 * 5, FOREGROUND)
        add_text(str7, 30, WIDTH / 10, HEIGHT / 7 * 2, FOREGROUND)
        add_text("On", 30, WIDTH / 10 + 100, HEIGHT / 7 * 2, FOREGROUND)
        add_text("Off", 30, WIDTH / 10 + 160, HEIGHT / 7 * 2, FOREGROUND)
        if music:
            pg.draw.rect(screen, BLACK, ((WIDTH / 10 + 95, HEIGHT / 7 * 2 + 3), (50, 38)), 4)
        else:
            pg.draw.rect(screen, BLACK, ((WIDTH / 10 + 155, HEIGHT / 7 * 2 + 3), (65, 40)), 4)
        add_text(str8, 30, WIDTH / 10, HEIGHT / 7 * 4, FOREGROUND)

        # Render the current text.
        #txt_surface_ip = font.render(text_ip, True, color_ip)
        #txt_surface_port = font.render(text_port, True, color_port)
        #txt_surface_name = font.render(text_name, True, color_name)
        # Blit the text.
        #screen.blit(txt_surface_ip, (input_box_ip.x+5, input_box_ip.y+5))
        #screen.blit(txt_surface_port, (input_box_port.x+5, input_box_port.y+5))
        #screen.blit(txt_surface_name, (input_box_name.x+5, input_box_name.y+5))
        # Blit the input_box rect.
        #pg.draw.rect(screen, color_ip, input_box_ip, 2)
        #pg.draw.rect(screen, color_port, input_box_port, 2)
        #pg.draw.rect(screen, color_name, input_box_name, 2)

        
        pg.display.update()
        timer.tick(60)

def choosecharacter():

    right = pg.Rect(WIDTH / 3 * 2 - 25, HEIGHT / 10 * 7, 50, 50)
    left  = pg.Rect(WIDTH / 3 * 1 - 25, HEIGHT / 10 * 7, 50, 50)
    font = pg.font.Font(None, 32)

    color_inactive = BLACK
    color_active = WHITE

    selector = 0
    maxselector = 3

    character = Player(0, None, (WIDTH / 2, HEIGHT / 2))
    
    done = False

    while(not done):

        for event in pg.event.get(): 
            if event.type == QUIT: 
                pg.quit() 
                sys.exit() 
            elif event.type == MOUSEBUTTONDOWN: 
                x, y = pg.mouse.get_pos()

                #if pressed in the center of the screen
                if abs(x - WIDTH / 6 * 1 - 35) < 40 and y > HEIGHT / 10 * 8 and y < HEIGHT / 10 * 9:
                    return False, 0
                elif abs(x - WIDTH / 6 * 5 - 35) < 40 and y > HEIGHT / 10 * 8 and y < HEIGHT / 10 * 9:
                    return True, selector

                # name box collider
                #if input_box_name.collidepoint(event.pos):
                #    # Toggle the active variable.
                #    active_name = not active_port
                #else:
                #    active_name = False
                #if active_name == False:
                #    name = text_name
                ## Change color
                #color_name = color_active if active_name else color_inactive

                if right.collidepoint(event.pos):
                    selector = selector + 1
                if left.collidepoint(event.pos):
                    selector = selector - 1


        if selector > maxselector:
            selector = 0
        if selector == -1:
            selector = maxselector

        if character.skin != selector:
            character.set_skin(selector)

            
        screen.fill(BACKGROUND)

        str1 = "Choose character"
        str2 = "Back"
        str3 = "Play"

        add_text(str1, 30, WIDTH / 2 - 100, HEIGHT / 10 * 1, FOREGROUND)
        #add_text(str(selector), 30, WIDTH / 10 + 100, HEIGHT / 7 * 2, FOREGROUND)
        #add_text("Off", 30, WIDTH / 10 + 160, HEIGHT / 7 * 2, FOREGROUND)
        pg.draw.rect(screen, BLACK, ((right.x, right.y), (right.width, right.height)), 4)
        pg.draw.rect(screen, BLACK, ((left.x, left.y), (left.width, left.height)), 4)
        screen.blit(rarrow, (right.x, right.y))
        screen.blit(larrow, (left.x, left.y))
        add_text(str2, 30, WIDTH / 6 * 1, HEIGHT / 10 * 8, FOREGROUND)
        add_text(str3, 30, WIDTH / 6 * 5, HEIGHT / 10 * 8, FOREGROUND)

        character.update(True)
        screen.blit(pg.transform.scale(character.image, (TILE_SIZE*4, TILE_SIZE*4)), (WIDTH / 2 - TILE_SIZE*2, HEIGHT / 2 - TILE_SIZE*2))

        # Render the current text.
        #txt_surface_ip = font.render(text_ip, True, color_ip)
        #txt_surface_port = font.render(text_port, True, color_port)
        #txt_surface_name = font.render(text_name, True, color_name)
        # Blit the text.
        #screen.blit(txt_surface_ip, (input_box_ip.x+5, input_box_ip.y+5))
        #screen.blit(txt_surface_port, (input_box_port.x+5, input_box_port.y+5))
        #screen.blit(txt_surface_name, (input_box_name.x+5, input_box_name.y+5))
        # Blit the input_box rect.
        #pg.draw.rect(screen, color_ip, input_box_ip, 2)
        #pg.draw.rect(screen, color_port, input_box_port, 2)
        #pg.draw.rect(screen, color_name, input_box_name, 2)

        
        pg.display.update()
        timer.tick(60)

def add_text(text1, size=15, width=WIDTH / 2, height=HEIGHT / 2, color1=(255, 255, 255)):
    if type(text1) != 'str':
        text1 = str(text1)
    font = pg.font.SysFont("comicsansms", size)
    text = font.render(text1, True, color1)
    loc = (int(width), int(height))
    screen.blit(text, loc)
    return loc

def drawUI(screen):
    global player, hearts
    if player.health == 3:
        screen.blit(hearts[0], (0, 0))
        screen.blit(hearts[0], (TILE_SIZE*2, 0))
        screen.blit(hearts[0], (TILE_SIZE*4, 0))
    elif player.health == 2.5:
        screen.blit(hearts[0], (0, 0))
        screen.blit(hearts[0], (TILE_SIZE*2, 0))
        screen.blit(hearts[1], (TILE_SIZE*4, 0))
    elif player.health == 2:
        screen.blit(hearts[0], (0, 0))
        screen.blit(hearts[0], (TILE_SIZE*2, 0))
        screen.blit(hearts[2], (TILE_SIZE*4, 0))
    elif player.health == 1.5:
        screen.blit(hearts[0], (0, 0))
        screen.blit(hearts[1], (TILE_SIZE*2, 0))
        screen.blit(hearts[2], (TILE_SIZE*4, 0))
    elif player.health == 1:
        screen.blit(hearts[0], (0, 0))
        screen.blit(hearts[2], (TILE_SIZE*2, 0))
        screen.blit(hearts[2], (TILE_SIZE*4, 0))
    elif player.health == 0.5:
        screen.blit(hearts[1], (0, 0))
        screen.blit(hearts[2], (TILE_SIZE*2, 0))
        screen.blit(hearts[2], (TILE_SIZE*4, 0))
    elif player.health == 0:
        screen.blit(hearts[2], (0, 0))
        screen.blit(hearts[2], (TILE_SIZE*2, 0))
        screen.blit(hearts[2], (TILE_SIZE*4, 0))

def user_click():
    global c
    x, y = pg.mouse.get_pos()

    if x > WIDTH - 160 and y > HEIGHT - 160 and c != None:
        if c.get_Name() == "0":
            wires()

class Entity(pg.sprite.Sprite):
    def __init__(self, color, pos, *groups):
        super().__init__(*groups)
        
        self.image = Surface((TILE_SIZE, TILE_SIZE))
        self.image.fill(color)
        self.rect = self.image.get_rect(topleft=pos)

class Enemy(Entity):

    # loading pictures
    WalkLeft = [pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'g1.png'), True, False), (TILE_SIZE, TILE_SIZE)),
                 pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'g2.png'), True, False), (TILE_SIZE, TILE_SIZE)),
                 pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'g3.png'), True, False), (TILE_SIZE, TILE_SIZE)),
                 pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'g4.png'), True, False), (TILE_SIZE, TILE_SIZE))]
    WalkRight = [pg.transform.scale(pg.image.load(animation_path + 'g1.png'), (TILE_SIZE, TILE_SIZE)),
                  pg.transform.scale(pg.image.load(animation_path + 'g2.png'), (TILE_SIZE, TILE_SIZE)),
                  pg.transform.scale(pg.image.load(animation_path + 'g3.png'), (TILE_SIZE, TILE_SIZE)),
                  pg.transform.scale(pg.image.load(animation_path + 'g4.png'), (TILE_SIZE, TILE_SIZE))]

                  
    step = 0

    def __init__(self, pos, platforms, *groups):
        for x in range(len(self.WalkLeft)):
            self.WalkLeft[x] = pg.transform.scale(self.WalkLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.WalkRight)):
            self.WalkRight[x] = pg.transform.scale(self.WalkRight[x], (TILE_SIZE, TILE_SIZE))
        self.left = False
        super().__init__(RED, pos, *groups)
        self.image = self.WalkLeft[0]
        self.vel = pg.Vector2((0, 0))
        self.platforms = platforms
        self.speed = 1
        
    def update(self, player):
        pos = player.get_pos()

        # animation
        self.step = self.step + 1
        if self.step == 32:
            self.step = 0

        if self.left:
            self.image = self.WalkLeft[self.step // 8]
        else:
            self.image = self.WalkRight[self.step // 8]

        # movement
        right = False
        left = False
        down = False
        up = False
        if pos.center[0] > self.rect.right:
            right = True
        elif pos.center[0] < self.rect.left:
            left = True
        if pos.center[1] > self.rect.bottom:
            down = True
        elif pos.center[1] < self.rect.top:
            up = True
        
        if up:
            self.vel.y = -self.speed
        if down:
            self.vel.y = self.speed
        if left:
            self.vel.x = -self.speed
            self.left = True
        if right:
            self.left = False
            self.vel.x = self.speed
        if not(left or right):
            self.vel.x = 0
        if not(up or down):
            self.vel.y = 0

        # increment in x and y direction
        self.rect.left += self.vel.x
        self.collide(self.vel.x, 0, self.platforms)

        self.rect.top += self.vel.y
        self.collide(0, self.vel.y, self.platforms)

        if self.rect.colliderect(pos):
            player.hit(right, left, down, up)

    def collide(self, xvel, yvel, platforms):
        for p in platforms:
            if pg.sprite.collide_rect(self, p):
                if xvel > 0:
                    self.rect.right = p.rect.left
                if xvel < 0:
                    self.rect.left = p.rect.right
                if yvel > 0:
                    self.rect.bottom = p.rect.top
                if yvel < 0:
                    self.rect.top = p.rect.bottom

class Npc(Entity):

    # loading pictures
    mLeft = [pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'm1.png'), True, False), (TILE_SIZE, TILE_SIZE)),
                pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'm2.png'), True, False), (TILE_SIZE, TILE_SIZE)),
                pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'm3.png'), True, False), (TILE_SIZE, TILE_SIZE)),
                pg.transform.scale(pg.transform.flip(pg.image.load(animation_path + 'm4.png'), True, False), (TILE_SIZE, TILE_SIZE))]
    mRight = [pg.transform.scale(pg.image.load(animation_path + 'm1.png'), (TILE_SIZE, TILE_SIZE)),
                pg.transform.scale(pg.image.load(animation_path + 'm2.png'), (TILE_SIZE, TILE_SIZE)),
                pg.transform.scale(pg.image.load(animation_path + 'm3.png'), (TILE_SIZE, TILE_SIZE)),
                pg.transform.scale(pg.image.load(animation_path + 'm4.png'), (TILE_SIZE, TILE_SIZE))]
    bRight = [pg.image.load(animation_path + 'b1.png'),
                pg.image.load(animation_path + 'b2.png'),
                pg.image.load(animation_path + 'b3.png'),
                pg.image.load(animation_path + 'b4.png')]
    bLeft = [pg.transform.flip(pg.image.load(animation_path + 'b1.png'), True, False),
                pg.transform.flip(pg.image.load(animation_path + 'b2.png'), True, False),
                pg.transform.flip(pg.image.load(animation_path + 'b3.png'), True, False),
                pg.transform.flip(pg.image.load(animation_path + 'b4.png'), True, False)]

                  
    step = 0

    def __init__(self, pos, skin, platforms, name, text1, text2, left, *groups):
        for x in range(len(self.mLeft)):
            self.mLeft[x] = pg.transform.scale(self.mLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.mRight)):
            self.mRight[x] = pg.transform.scale(self.mRight[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.bLeft)):
            self.bLeft[x] = pg.transform.scale(self.bLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.bRight)):
            self.bRight[x] = pg.transform.scale(self.bRight[x], (TILE_SIZE, TILE_SIZE))
        self.text1 = text1
        self.text2 = text2
        self.skin = skin
        self.name = name
        self.left = left
        super().__init__(RED, pos, *groups)
        self.image = self.mLeft[0]
        self.vel = pg.Vector2((0, 0))
        self.platforms = platforms
        self.speed = 1


    def dialogue(self):

        pg.draw.rect(screen, BLACK, ((WIDTH / 6 * 1 - 20, HEIGHT / 10 * 6 - 20), (WIDTH / 6 * 4 + 40, HEIGHT / 10 * 3 + 40)))
        add_text(self.name, 30, WIDTH / 6 * 1, HEIGHT / 10 * 6, WHITE)
        add_text(self.text1, 30, WIDTH / 6 * 1, HEIGHT / 10 * 7, WHITE)
        add_text(self.text2, 30, WIDTH / 6 * 1, HEIGHT / 10 * 8, WHITE)
        pg.display.update()

        done = False
        while not done:
            for event in pg.event.get():
                if event.type == QUIT:
                    pg.quit()
                    sys.exit()
                if event.type == pg.KEYDOWN:
                    done = True
        
    def update(self, test):

        # animation
        self.step = self.step + 1
        if self.step == 32:
            self.step = 0

        if self.skin == 0:
            if self.left:
                self.image = self.mLeft[self.step // 8]
            else:
                self.image = self.mRight[self.step // 8]
        elif self.skin == 1:
            if self.left:
                self.image = self.bLeft[self.step // 8]
            else:
                self.image = self.bRight[self.step // 8]

        return

        '''
        # movement
        right = False
        left = False
        down = False
        up = False
        
        if pos.center[0] > self.rect.right:
            right = True
        elif pos.center[0] < self.rect.left:
            left = True
        if pos.center[1] > self.rect.bottom:
            down = True
        elif pos.center[1] < self.rect.top:
            up = True
        
        
        if up:
            self.vel.y = -self.speed
        if down:
            self.vel.y = self.speed
        if left:
            self.vel.x = -self.speed
            self.left = True
        if right:
            self.left = False
            self.vel.x = self.speed
        if not(left or right):
            self.vel.x = 0
        if not(up or down):
            self.vel.y = 0

        # increment in x and y direction
        self.rect.left += self.vel.x
        self.collide(self.vel.x, 0, self.platforms)

        self.rect.top += self.vel.y
        self.collide(0, self.vel.y, self.platforms)

        if self.rect.colliderect(pos):
            player.hit(right, left, down, up)
        '''
        

    def collide(self, xvel, yvel, platforms):
        for p in platforms:
            if pg.sprite.collide_rect(self, p):
                if xvel > 0:
                    self.rect.right = p.rect.left
                if xvel < 0:
                    self.rect.left = p.rect.right
                if yvel > 0:
                    self.rect.bottom = p.rect.top
                if yvel < 0:
                    self.rect.top = p.rect.bottom

class Player(Entity):

    # loading pictures
    mWalkLeft = [pg.transform.flip(pg.image.load(animation_path + 'mw1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'mw2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'mw3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'mw4.png'), True, False)]
    mWalkRight = [pg.image.load(animation_path + 'mw1.png'),
                  pg.image.load(animation_path + 'mw2.png'),
                  pg.image.load(animation_path + 'mw3.png'),
                  pg.image.load(animation_path + 'mw4.png')]
    midleRight = [pg.image.load(animation_path + 'm1.png'),
                  pg.image.load(animation_path + 'm2.png'),
                  pg.image.load(animation_path + 'm3.png'),
                  pg.image.load(animation_path + 'm4.png')]
    midleLeft = [pg.transform.flip(pg.image.load(animation_path + 'm1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'm2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'm3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'm4.png'), True, False)]

    bWalkLeft = [pg.transform.flip(pg.image.load(animation_path + 'bw1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'bw2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'bw3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'bw4.png'), True, False)]
    bWalkRight = [pg.image.load(animation_path + 'bw1.png'),
                  pg.image.load(animation_path + 'bw2.png'),
                  pg.image.load(animation_path + 'bw3.png'),
                  pg.image.load(animation_path + 'bw4.png')]
    bidleRight = [pg.image.load(animation_path + 'b1.png'),
                  pg.image.load(animation_path + 'b2.png'),
                  pg.image.load(animation_path + 'b3.png'),
                  pg.image.load(animation_path + 'b4.png')]
    bidleLeft = [pg.transform.flip(pg.image.load(animation_path + 'b1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'b2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'b3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'b4.png'), True, False)]

    kWalkLeft = [pg.transform.flip(pg.image.load(animation_path + 'kw1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'kw2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'kw3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'kw4.png'), True, False)]
    kWalkRight = [pg.image.load(animation_path + 'kw1.png'),
                  pg.image.load(animation_path + 'kw2.png'),
                  pg.image.load(animation_path + 'kw3.png'),
                  pg.image.load(animation_path + 'kw4.png')]
    kidleRight = [pg.image.load(animation_path + 'k1.png'),
                  pg.image.load(animation_path + 'k2.png'),
                  pg.image.load(animation_path + 'k3.png'),
                  pg.image.load(animation_path + 'k4.png')]
    kidleLeft = [pg.transform.flip(pg.image.load(animation_path + 'k1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'k2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'k3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'k4.png'), True, False)]

    pWalkLeft = [pg.transform.flip(pg.image.load(animation_path + 'p1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'p2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'p3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'p4.png'), True, False)]
    pWalkRight = [pg.image.load(animation_path + 'p1.png'),
                  pg.image.load(animation_path + 'p2.png'),
                  pg.image.load(animation_path + 'p3.png'),
                  pg.image.load(animation_path + 'p4.png')]

    def __init__(self, skin, platforms, pos, *groups):
        for x in range(len(self.mWalkLeft)):
            self.mWalkLeft[x] = pg.transform.scale(self.mWalkLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.mWalkRight)):
            self.mWalkRight[x] = pg.transform.scale(self.mWalkRight[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.midleRight)):
            self.midleRight[x] = pg.transform.scale(self.midleRight[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.midleLeft)):
            self.midleLeft[x] = pg.transform.scale(self.midleLeft[x], (TILE_SIZE, TILE_SIZE))

        for x in range(len(self.bWalkLeft)):
            self.bWalkLeft[x] = pg.transform.scale(self.bWalkLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.bWalkRight)):
            self.bWalkRight[x] = pg.transform.scale(self.bWalkRight[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.bidleRight)):
            self.bidleRight[x] = pg.transform.scale(self.bidleRight[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.bidleLeft)):
            self.bidleLeft[x] = pg.transform.scale(self.bidleLeft[x], (TILE_SIZE, TILE_SIZE))

        for x in range(len(self.kWalkLeft)):
            self.kWalkLeft[x] = pg.transform.scale(self.kWalkLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.kWalkRight)):
            self.kWalkRight[x] = pg.transform.scale(self.kWalkRight[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.kidleRight)):
            self.kidleRight[x] = pg.transform.scale(self.kidleRight[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.kidleLeft)):
            self.kidleLeft[x] = pg.transform.scale(self.kidleLeft[x], (TILE_SIZE, TILE_SIZE))

        for x in range(len(self.pWalkLeft)):
            self.pWalkLeft[x] = pg.transform.scale(self.pWalkLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.pWalkRight)):
            self.pWalkRight[x] = pg.transform.scale(self.pWalkRight[x], (TILE_SIZE, TILE_SIZE))

        self.left = False
        self.right = False
        self.idleleft = False
        self.skin = skin
        super().__init__(RED, pos)
        self.vel = pg.Vector2((0, 0))
        self.platforms = platforms
        self.health = 3
        self.speed = 3
        self.step = 0
    
    def get_pos(self):
        return self.rect
    def set_skin(self, skin):
        self.skin = skin
    def hit(self, r, l, d, u):
        pg.mixer.music.load("sound\\hit.wav")
        #pg.mixer.music.set_volume(0.01)
        pg.mixer.music.play(1)

        self.health = self.health - 0.5
        hit_distance = 20

        if r:
            self.vel.x = self.speed*hit_distance
        if l:
            self.vel.x = -self.speed*hit_distance
        if d:
            self.vel.y = self.speed*hit_distance
        if u:
            self.vel.y = -self.speed*hit_distance


        # increment in x and y direction
        self.rect.left += self.vel.x
        self.collide(self.vel.x, 0, self.platforms)

        self.rect.top += self.vel.y
        self.collide(0, self.vel.y, self.platforms)

    def update(self, test=False):

        if self.health == 0:
            pg.event.post(pg.event.Event(QUIT))

        # animation
        self.step = self.step + 1
        if self.step == 32:
            self.step = 0


        if self.left:
            if self.skin == 0:
                self.image = self.pWalkLeft[self.step // 8]
            elif self.skin == 1:
                self.image = self.mWalkLeft[self.step // 8]
            elif self.skin == 2:
                self.image = self.bWalkLeft[self.step // 8]
            elif self.skin == 3:
                self.image = self.kWalkLeft[self.step // 8]
        elif self.right:
            if self.skin == 0:
                self.image = self.pWalkRight[self.step // 8]
            elif self.skin == 1:
                self.image = self.mWalkRight[self.step // 8]
            elif self.skin == 2:
                self.image = self.bWalkRight[self.step // 8]
            elif self.skin == 3:
                self.image = self.kWalkRight[self.step // 8]
        elif self.idleleft == False:
            if self.skin == 0:
                self.image = self.pWalkRight[self.step // 8]
            elif self.skin == 1:
                self.image = self.midleRight[self.step // 8]
            elif self.skin == 2:
                self.image = self.bidleRight[self.step // 8]
            elif self.skin == 3:
                self.image = self.kidleRight[self.step // 8]
        elif self.idleleft == True:
            if self.skin == 0:
                self.image = self.pWalkLeft[self.step // 8]
            elif self.skin == 1:
                self.image = self.midleLeft[self.step // 8]
            elif self.skin == 2:
                self.image = self.bidleLeft[self.step // 8]
            elif self.skin == 3:
                self.image = self.kidleLeft[self.step // 8]
        if test == True:
            return


        # movement
        pressed = pg.key.get_pressed()
        if self.left == True and pressed[K_LEFT] == False:
            self.idleleft = True
        if pressed[K_LEFT] or pressed[K_RIGHT]:
            self.idleleft = False

        up = pressed[K_UP]
        down = pressed[K_DOWN]
        self.left = pressed[K_LEFT]
        self.right = pressed[K_RIGHT]
        running = pressed[K_SPACE]
        
        if up:
            self.vel.y = -self.speed
        if down:
            self.vel.y = self.speed
        if self.left:
            self.vel.x = -self.speed
        if self.right:
            self.vel.x = self.speed
        if running:
            self.vel.x *= 1.5
            self.vel.y *= 1.5
        if not(self.left or self.right):
            self.vel.x = 0
        if not(up or down):
            self.vel.y = 0

        # increment in x and y direction
        self.rect.left += self.vel.x
        self.collide(self.vel.x, 0, self.platforms)

        self.rect.top += self.vel.y
        self.collide(0, self.vel.y, self.platforms)

    def collide(self, xvel, yvel, platforms):
        global npcs

        # checking if player is touching walls
        for p in platforms:
            if pg.sprite.collide_rect(self, p):
                if isinstance(p, Bed):
                    pg.event.post(pg.event.Event(QUIT))
                if xvel > 0:
                    self.rect.right = p.rect.left
                if xvel < 0:
                    self.rect.left = p.rect.right
                if yvel > 0:
                    self.rect.bottom = p.rect.top
                if yvel < 0:
                    self.rect.top = p.rect.bottom

        # checking if player is touching npcs
        for p in npcs:
            if pg.sprite.collide_rect(self, p):
                if pg.key.get_pressed()[K_RETURN]:
                    p.dialogue()
                if xvel > 0:
                    self.rect.right = p.rect.left + 1
                if xvel < 0:
                    self.rect.left = p.rect.right - 1
                if yvel > 0:
                    self.rect.bottom = p.rect.top + 1
                if yvel < 0:
                    self.rect.top = p.rect.bottom - 1

class Platform(Entity):
    def __init__(self, pos, *groups):
        super().__init__(FOREGROUND, pos, *groups)
        self.image = pg.transform.scale(pg.image.load("pics\\wall.png"), (TILE_SIZE, TILE_SIZE))

class Floor(Entity):
    def __init__(self, pos, *groups):
        super().__init__(BACKGROUND, pos, *groups)
        self.image = pg.transform.scale(pg.image.load("pics\\floor_1.png"), (TILE_SIZE, TILE_SIZE))

class Space(Entity):
    def __init__(self, pos, *groups):
        super().__init__(Color(0,0,0,0), pos, *groups)
        empty = Color(0,0,0,0) #The last 0 indicates 0 alpha, a transparent color
        self.image = Surface((TILE_SIZE, TILE_SIZE), flags=SRCALPHA)

class Crate(Entity):
    def __init__(self, pos, *groups):
        super().__init__(BLACK, pos, *groups)
        self.crate = [pg.transform.scale(pg.image.load(animation_path + "cf1.png"), (TILE_SIZE, TILE_SIZE)),pg.transform.scale(pg.image.load(animation_path + "cf2.png"), (TILE_SIZE, TILE_SIZE)),pg.transform.scale(pg.image.load(animation_path + "cf3.png"), (TILE_SIZE, TILE_SIZE))]
        self.image = pg.transform.scale(self.crate[0], (TILE_SIZE, TILE_SIZE))

class Bed(Entity):
    def __init__(self, pos, *groups):
        super().__init__(BLACK, pos, *groups)
        self.image = pg.transform.scale(pg.image.load("pics\\bed.png"), (TILE_SIZE, TILE_SIZE))

if __name__ == "__main__":
    main()
