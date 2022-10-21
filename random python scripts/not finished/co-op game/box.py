import pygame
from sprite import Sprite
from common import *

class Box(Sprite):
    def __init__(self, startx, starty):
        super().__init__(pygame.image.load("assets\\ground.png"), startx, starty)