import pygame
from win32api import GetSystemMetrics
from networking_manager import Networking_manager

# colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
DARK_RED = (139,0,0)
PURPLE = (255, 0, 255)
GRAY = (78, 76, 79)
YELLOW = (255, 255, 0)

FOREGROUND = BLACK
BACKGROUND = BLUE

S_X = int(GetSystemMetrics(0) / 1.3)      # size of screen x value
S_Y = int(GetSystemMetrics(1) / 1.3)       # size of screen y value
fps = 100
font_size = 30
header_size = 45
screen = pygame.display.set_mode([S_X, S_Y])
pygame.display.set_caption('USS Rawr')
clock = pygame.time.Clock()
name = ""
holding = False # player holding key down, this is for weapon task etc

path = []
max_path_len = 5

left_key = pygame.K_a
right_key = pygame.K_d
up_key = pygame.K_w
activate_key = pygame.K_SPACE

networking_manager = Networking_manager()

boxes = None

def add_text(text1, size=15, width=S_X / 2, height=S_Y / 2, color1=(255, 255, 255), font='microsoftjhengheimicrosoftjhengheiui'):
    if type(text1) != 'str':
        text1 = str(text1)
    font = pygame.font.SysFont(font, size)
    text = font.render(text1, True, color1)
    loc = (int(width), int(height))
    screen.blit(text, loc)
    return loc
