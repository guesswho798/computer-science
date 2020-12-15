import pygame
from pygame.locals import *

from OpenGL.GL import *
from OpenGL.GLU import *
import wikipedia
import math

pygame.init()
display = (960, 540)
scree = pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
while True:
    try:
        page = wikipedia.page(wikipedia.random(pages=1))
        break
    except Exception as e:
        print("error")


#things that makes things look smooth, not to stack on each other and such
glEnable(GL_DEPTH_TEST)
glEnable(GL_LIGHTING)
glShadeModel(GL_SMOOTH)
glEnable(GL_COLOR_MATERIAL)
glColorMaterial(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE)

#light
glEnable(GL_LIGHT0)
glLightfv(GL_LIGHT0, GL_AMBIENT, [0.5, 0.5, 0.5, 1.0])
glLightfv(GL_LIGHT0, GL_DIFFUSE, [0.5, 0.5, 0.5, 1.0])

#init the shape of the sphere
sphere = gluNewQuadric()

#init of player
glMatrixMode(GL_PROJECTION)
gluPerspective(45, (display[0]/display[1]), 0.1, 50.0)
glMatrixMode(GL_MODELVIEW)
gluLookAt(0, -8, 0, 0, 0, 0, 0, 0, 1)
viewMatrix = glGetFloatv(GL_MODELVIEW_MATRIX)
glLoadIdentity()

#init mouse movement and center mouse on screen
displayCenter = [scree.get_size()[i] // 2 for i in range(2)]
mouseMove = [0, 0]
pygame.mouse.set_pos(displayCenter)
pygame.mouse.set_visible(False)

def drawQuads():
    #buttom floor
    glColor4f(0.2, 0.5, 0.5, 1)
    glBegin(GL_QUADS)
    glVertex3f(-20, -10, -2)
    glVertex3f(10, -10, -2)
    glVertex3f(10, 20, -2)
    glVertex3f(-20, 20, -2)
    glEnd()
    #top floor
    glColor4f(0.3, 0.4, 0.5, 1)
    glBegin(GL_QUADS)
    glVertex3f(-20, -10, 3)
    glVertex3f(10, -10, 3)
    glVertex3f(10, 20, 3)
    glVertex3f(-20, 20, 3)
    glEnd()
    #left wall back
    glColor4f(0.2, 0.4, 0.4, 1)
    glBegin(GL_QUADS)
    glVertex3f(-10, -10, -2)
    glVertex3f(-10, 8, -2)
    glVertex3f(-10, 8, 3)
    glVertex3f(-10, -10, 3)
    glEnd()
    #center wall front
    glBegin(GL_QUADS)
    glVertex3f(-10, 20, -2)
    glVertex3f(-10, 13, -2)
    glVertex3f(-10, 13, 3)
    glVertex3f(-10, 20, 3)
    glEnd()
    #center wall back
    glBegin(GL_QUADS)
    glVertex3f(10, -10, -2)
    glVertex3f(10, 20, -2)
    glVertex3f(10, 20, 3)
    glVertex3f(10, -10, 3)
    glEnd()
    #front wall
    glBegin(GL_QUADS)
    glVertex3f(-20, 20, -2)
    glVertex3f(10, 20, -2)
    glVertex3f(10, 20, 3)
    glVertex3f(-20, 20, 3)
    glEnd()
    #back wall
    glBegin(GL_QUADS)
    glVertex3f(-20, -10, -2)
    glVertex3f(10, -10, -2)
    glVertex3f(10, -10, 3)
    glVertex3f(-20, -10, 3)
    glEnd()
    #left wall
    glBegin(GL_QUADS)
    glVertex3f(-20, -10, -2)
    glVertex3f(-20, 20, -2)
    glVertex3f(-20, 20, 3)
    glVertex3f(-20, -10, 3)
    glEnd()

def drawBoard():
    #front board
    glColor4f(1.0, 1.0, 1.0, 1)
    glBegin(GL_QUADS)
    glVertex3f(-5, 19, -1.6)
    glVertex3f(5, 19, -1.6)
    glVertex3f(5, 19, 2.8)
    glVertex3f(-5, 19, 2.8)
    glEnd()
    glColor4f(0.0, 0.0, 0.0, 1)
    glBegin(GL_QUADS)
    glVertex3f(-5.1, 19.01, -1.7)
    glVertex3f(5.1, 19.01, -1.7)
    glVertex3f(5.1, 19.01, 2.9)
    glVertex3f(-5.1, 19.01, 2.9)
    glEnd()
    #left board
    glColor4f(1.0, 1.0, 1.0, 1)
    glBegin(GL_QUADS)
    glVertex3f(-9, -6.5, -1.6)
    glVertex3f(-9, 5.5, -1.6)
    glVertex3f(-9, 5.5, 2.8)
    glVertex3f(-9, -6.5, 2.8)
    glEnd()
    glColor4f(0.0, 0.0, 0.0, 1)
    glBegin(GL_QUADS)
    glVertex3f(-9.01, -6.6, -1.7)
    glVertex3f(-9.01, 5.6, -1.7)
    glVertex3f(-9.01, 5.6, 2.9)
    glVertex3f(-9.01, -6.6, 2.9)
    glEnd()
    #right board
    glColor4f(1.0, 1.0, 1.0, 1)
    glBegin(GL_QUADS)
    glVertex3f(9, 0.1, -1.6)
    glVertex3f(9, 12.5, -1.6)
    glVertex3f(9, 12.5, 2.8)
    glVertex3f(9, 0.1, 2.8)
    glEnd()
    glColor4f(0.0, 0.0, 0.0, 1)
    glBegin(GL_QUADS)
    glVertex3f(9.01, 0, -1.7)
    glVertex3f(9.01, 12.6, -1.7)
    glVertex3f(9.01, 12.6, 2.9)
    glVertex3f(9.01, 0, 2.9)
    glEnd()

def drawText(position, textString, size):
    font = pygame.font.Font(pygame.font.get_default_font(), size)
    textSurface = font.render(textString, True, (0,0,0,255), (255,255,255,255))
    textData = pygame.image.tostring(textSurface, "RGBA", True)
    glRasterPos3d(*position)
    glDrawPixels(textSurface.get_width(), textSurface.get_height(), GL_RGBA, GL_UNSIGNED_BYTE, textData)

def drawSpheres():
    glTranslatef(-5, 17, 0)
    glColor4f(0.5, 0.2, 0.2, 1)
    gluSphere(sphere, 1.5, 32, 16) 

    glTranslatef(5, 0, 0)
    glColor4f(0.2, 0.2, 0.5, 1)
    gluSphere(sphere, 1.0, 32, 16)

    glTranslatef(5, 0, 0)
    gluSphere(sphere, 0.5, 32, 16)


up_down_angle = 0.0
paused = False
run = True
while run:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE or event.key == pygame.K_RETURN:
                run = False
            if event.key == pygame.K_PAUSE or event.key == pygame.K_p:
                paused = not paused
                pygame.mouse.set_pos(displayCenter)
                pygame.mouse.set_visible(paused)
            if event.key == pygame.K_r:
                while True:
                    try:
                        page = wikipedia.page(wikipedia.random(pages=1))
                        break
                    except Exception as e:
                        print("error")
        if not paused:
            if event.type == pygame.MOUSEMOTION:
                mouseMove = [event.pos[i] - displayCenter[i] for i in range(2)]
            pygame.mouse.set_pos(displayCenter)    
            pygame.mouse.set_visible(paused)
            gluLookAt(0, 10, 0, 0, 11, 0, 0, 0, 1)

    if not paused:
        #get keys
        keypress = pygame.key.get_pressed()
        #mouseMove = pygame.mouse.get_rel()

        #init model view matrix
        glLoadIdentity()

        #apply the look up and down
        up_down_angle += mouseMove[1]*0.1
        glRotatef(up_down_angle, 1.0, 0.0, 0.0)

        #init the view matrix
        glPushMatrix()
        glLoadIdentity()

        #apply the movment 
        if keypress[pygame.K_w]:
            glTranslatef(0,0,0.15)
        if keypress[pygame.K_s]:
            glTranslatef(0,0,-0.15)
        if keypress[pygame.K_d]:
            glTranslatef(-0.15,0,0)
        if keypress[pygame.K_a]:
            glTranslatef(0.15,0,0)

        #apply the left and right rotation
        glRotatef(mouseMove[0]*0.1, 0.0, 1.0, 0.0)

        #multiply the current matrix by the get the new view matrix and store the final vie matrix 
        glMultMatrixf(viewMatrix)
        viewMatrix = glGetFloatv(GL_MODELVIEW_MATRIX)

        #apply view matrix
        glPopMatrix()
        glMultMatrixf(viewMatrix)

        glLightfv(GL_LIGHT0, GL_POSITION, [1, -1, 1, 0])

        glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT)

        #drawing walls and spheres
        glPushMatrix()
        drawQuads()
        drawBoard()
        drawText((-4, 18.8, 2),page.title , 25)
        drawText((-4, 18.8, 1.5), page.content[0:60] + "-", 11)
        drawText((-4, 18.8, 1), page.content[61:121] + "-", 11)
        drawText((-4, 18.8, 0.5), page.content[122:182] + "-", 11)
        drawText((-4, 18.8, 0), page.content[183:243] + "-", 11)
        drawText((-4, 18.8, -0.5), page.content[243:304], 11)
        #drawSpheres()
        glPopMatrix()

        pygame.display.flip()
        pygame.time.wait(1)



pygame.quit()