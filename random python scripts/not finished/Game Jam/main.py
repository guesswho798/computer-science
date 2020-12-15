import pygame as pg
from pygame import *
import random
import sys

# sizes
WIDTH = 1100
HEIGHT = 600
TILE_SIZE = 32

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
FOREGROUND = GRAY

# pictures
SCREEN_SIZE = pg.Rect((0, 0, WIDTH, HEIGHT))
screen = pg.display.set_mode(SCREEN_SIZE.size)
hearts = [pg.transform.scale(pg.image.load('pics\\hf.png'), (TILE_SIZE*2, TILE_SIZE*2)), pg.transform.scale(pg.image.load('pics\\hh.png'), (TILE_SIZE*2, TILE_SIZE*2)), pg.transform.scale(pg.image.load('pics\\he.png'), (TILE_SIZE*2, TILE_SIZE*2))]
animation_path = 'animation/'

# global init vars
level = None         # the map
platforms = None     # a group of enteties that make you stop moving
player = None        # the player
level_width = None   # the width of the map
level_height = None  # the height of the map
entities = None      # a group of general enteties
timer = None         # the pygame clock that counts fps

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
        if self.target:
            x = -self.target.rect.center[0] + SCREEN_SIZE.width/2
            y = -self.target.rect.center[1] + SCREEN_SIZE.height/2
            self.cam += (pg.Vector2((x, y)) - self.cam) * 0.05
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
        return dirty            


def init_game():
    global level, platforms, player, level_width, level_height, entities, timer

    pg.init()
    pg.display.set_caption("The Sleepy Wizard")
    timer = pg.time.Clock()

    level = [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww        wwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww          wwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwc           wwwwwwe       wwwwwwwwwwwwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww            wwwwww         wwwwwwwwwwwww",
        "wwwwwwwwwww                                                      wwwwwwwwwww",
        "wwwwwwwww                                                        wwwwwwwwwww",
        "wwwwwwww                                                         wwwwwwwwwww",
        "wwwwwwww        wwwwwwwwwww  wwwwwww            wwwwww          cwwwwwwwwwww",
        "wwwwwwww       ewwwwwwwwwww  wwwwwww            wwwwwwww  wwwwwwwwwwwwwwwwww",
        "wwwwwwwwwww  wwwwwwwwwwwwww  wwwwwww            wwwwwwww  wwwwwwwwwwwwwwwwww",
        "wwwwwwwwwww  wwwwwwwwww         wwwww          wwwwwwwww  wwwwwwwwwwwwwwwwww",
        "wwwwwwwwwww  wwwwwwwwww         wwwwww        www      w  wwwwwwwwwwwwwwwwww",
        "wwwwwwwwwww  wwwwwwwwww         wwwwwww      www                 wwww    www",
        "wwww   wwww  wwwwwwwwww        e wwwwwwww  wwww                  wwww     ww",
        "www   ewwww  www                  wwwwwww  wwww        wwwwwww   wwwwb     w",
        "ww                                         wwww    e   wwwwwww             w",
        "ww                 wwwwwwwwwwwwwwwwwwwwww  wwww        wwwwwwwc            w",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",]

    platforms = pg.sprite.Group()
    player = Player(platforms, (TILE_SIZE * 43, TILE_SIZE * 11))
    level_width  = len(level[0])*TILE_SIZE
    level_height = len(level)*TILE_SIZE
    entities = CameraAwareLayeredUpdates(player, pg.Rect(0, 0, level_width, level_height))
    
    # build the level
    x = y = 0
    counter = 0
    for row in level:
        for col in row:
            if col == "w":
                Platform((x, y), platforms, entities)
            if col == "e":
                Enemy((x, y), platforms, entities)
            if col == "c":
                Crate((x, y), platforms, entities)
            if col == "b":
                Bed((x, y), platforms, entities)
            x += TILE_SIZE
        y += TILE_SIZE
        x = 0

def main():
    global level, platforms, player, level_width, level_height, entities, timer
    
    init_game()

    done = False
    while not done:

        for e in pg.event.get():
            if e.type == QUIT or e.type == KEYDOWN and e.key == K_ESCAPE: 
                done = True
            elif e.type is MOUSEBUTTONDOWN:
                user_click()

        entities.update(player)
        screen.fill(BACKGROUND)
        entities.draw(screen)
        drawUI(screen)

        pg.display.update()
        timer.tick(60)

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

class Player(Entity):

    # loading pictures
    WalkLeft = [pg.transform.flip(pg.image.load(animation_path + 'p1.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'p2.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'p3.png'), True, False),
                 pg.transform.flip(pg.image.load(animation_path + 'p4.png'), True, False)]
    WalkRight = [pg.image.load(animation_path + 'p1.png'),
                  pg.image.load(animation_path + 'p2.png'),
                  pg.image.load(animation_path + 'p3.png'),
                  pg.image.load(animation_path + 'p4.png')]

    def __init__(self, platforms, pos, *groups):
        for x in range(len(self.WalkLeft)):
            self.WalkLeft[x] = pg.transform.scale(self.WalkLeft[x], (TILE_SIZE, TILE_SIZE))
        for x in range(len(self.WalkRight)):
            self.WalkRight[x] = pg.transform.scale(self.WalkRight[x], (TILE_SIZE, TILE_SIZE))
        self.left = False
        super().__init__(RED, pos)
        self.vel = pg.Vector2((0, 0))
        self.platforms = platforms
        self.health = 3
        self.speed = 3
        self.step = 0

    
    def get_pos(self):
        return self.rect
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

    def update(self, test):

        if self.health == 0:
            pg.event.post(pg.event.Event(QUIT))

        # animation
        self.step = self.step + 1
        if self.step == 64:
            self.step = 0

        if self.left:
            self.image = self.WalkLeft[self.step // 16]
        else:
            self.image = self.WalkRight[self.step // 16]

        # movement
        pressed = pg.key.get_pressed()
        up = pressed[K_UP]
        down = pressed[K_DOWN]
        left = pressed[K_LEFT]
        right = pressed[K_RIGHT]
        running = pressed[K_SPACE]
        
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
        if running:
            self.vel.x *= 1.5
            self.vel.y *= 1.5
        if not(left or right):
            self.vel.x = 0
        if not(up or down):
            self.vel.y = 0

        # increment in x and y direction
        self.rect.left += self.vel.x
        self.collide(self.vel.x, 0, self.platforms)

        self.rect.top += self.vel.y
        self.collide(0, self.vel.y, self.platforms)

    def collide(self, xvel, yvel, platforms):
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

class Platform(Entity):
    def __init__(self, pos, *groups):
        super().__init__(FOREGROUND, pos, *groups)
        self.image = pg.transform.scale(pg.image.load("pics\\wall.png"), (TILE_SIZE, TILE_SIZE))

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
