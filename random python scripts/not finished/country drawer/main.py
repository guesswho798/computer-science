import pygame
import cv2
from skimage.metrics import structural_similarity
from PIL import Image
import struct
import math
import random
import numpy
import sys

# colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

S_X = 1100      # size of screen x value
S_Y = 600       # size of screen y value
S_P = 10        # size of pixel

sim = None      # similarity value
ready = False   # end of drawing and start of evaluating
map = list()    # the drawing
pygame.mixer.init()
pygame.mixer.music.set_volume(0.3)

countries_maps = {
	"russia": pygame.image.load('russia.jpg'),
	"turkey": pygame.image.load('turkey.jpg'),
	"germany": pygame.image.load('germany.jpg'),
	"uk": pygame.image.load('uk.jpg'),
	"france": pygame.image.load('france.jpg'),
	"italy": pygame.image.load('italy.jpg'),
	"spain": pygame.image.load('spain.jpg'),
	"ukraine": pygame.image.load('ukraine.jpg'),
	"poland": pygame.image.load('poland.jpg'),
	"albania": pygame.image.load('albania.jpg'),
	"andorra": pygame.image.load('andorra.jpg'),
	"belarus": pygame.image.load('belarus.jpg'),
	"belgium": pygame.image.load('belgium.jpg'),
	"bosnia and herzegovina": pygame.image.load('bosnia and herzegovina.jpg'),
	"bulgaria": pygame.image.load('bulgaria.jpg'),
	"croatia": pygame.image.load('croatia.jpg'),
	"czech republic": pygame.image.load('czech republic.jpg'),
	"denmark": pygame.image.load('denmark.jpg'),
	"estonia": pygame.image.load('estonia.jpg'),
	"finland": pygame.image.load('finland.jpg'),
	"greece": pygame.image.load('greece.jpg'),
	"hungary": pygame.image.load('hungary.jpg'),
	"iceland": pygame.image.load('iceland.jpg'),
	"ireland": pygame.image.load('ireland.jpg'),
	"latvia": pygame.image.load('latvia.jpg'),
	"liechtenstein": pygame.image.load('liechtenstein.jpg'),
	"lithuania": pygame.image.load('lithuania.jpg'),
	"luxembourg": pygame.image.load('luxembourg.jpg'),
	"malta": pygame.image.load('malta.jpg'),
	"moldova": pygame.image.load('moldova.jpg'),
	"monaco": pygame.image.load('monaco.jpg'),
	"montenegro": pygame.image.load('montenegro.jpg'),
	"netherlands": pygame.image.load('netherlands.jpg'),
	"north macedonia": pygame.image.load('north macedonia.jpg'),
	"norway": pygame.image.load('norway.jpg'),
	"portugal": pygame.image.load('portugal.jpg'),
	"romania": pygame.image.load('romania.jpg'),
	"serbia": pygame.image.load('serbia.jpg'),
	"slovakia": pygame.image.load('slovakia.jpg'),
	"slovenia": pygame.image.load('slovenia.jpg'),
	"sweden": pygame.image.load('sweden.jpg'),
	"switzerland": pygame.image.load('switzerland.jpg')
}

img_size = 300
chosen = ""     # the chosen country to draw
counter = 0

#initializing
pygame.init()
screen = pygame.display.set_mode([S_X, S_Y])
clock = pygame.time.Clock()
done = False

def main():

	while(True):
		s = menu()

		if s == "play":
			play()
		else:
			tutorial()

def play():

	start()

	while not done:

		event()

		draw()

		pygame.display.flip()

		clock.tick(1000)

def menu():

    done = False
    play = ""

    while(not done):

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()
            elif event.type == pygame.MOUSEBUTTONUP: 
                x, y = pygame.mouse.get_pos()
                #if pressed in the center of the screen
                if abs(x - S_X / 2) < 75:
                    if y > S_Y / 7 * 3 + 50 and y < S_Y / 7 * 4 + 50:
                        done = True
                        play = "play"
                    if y > S_Y / 7 * 4 and y < S_Y / 7 * 5:
                        done = True
                        play = "tutorial"
                    if y > S_Y / 7 * 5 - 50 and y < S_Y / 7 * 6 - 50:
                        pygame.quit()
                        sys.exit()
        

        screen.fill(WHITE)

        #draw the text
        str1 = "Country Drawer"
        str2 = "By guesswho"
        str3 = "Play"
        str4 = "Tutorial"
        str5 = "Exit"

        add_text(str1, 30, S_X / 2 - len(str1) * 7, S_Y / 7 * 0 + 50, BLACK)
        add_text(str2, 30, S_X / 2 - len(str2) * 7, S_Y / 7 * 1, BLACK)
        add_text(str3, 30, S_X / 2 - len(str3) * 7, S_Y / 7 * 3 + 50, BLACK)
        add_text(str4, 30, S_X / 2 - len(str4) * 7, S_Y / 7 * 4, BLACK)
        add_text(str5, 30, S_X / 2 - len(str5) * 7, S_Y / 7 * 5 - 50, BLACK)
        
        pygame.display.update()
        clock.tick(60)

    return play

def tutorial():
	done = False

	while(not done):

		for event in pygame.event.get():

			#exit game
			if event.type == pygame.QUIT:
				pygame.quit()
				sys.exit()
	
			#keyboard press
			if event.type == pygame.KEYDOWN:
				if event.key == pygame.K_RETURN:
					done = True
				if event.key == pygame.K_ESCAPE:
					pygame.quit()
					sys.exit()
		
		screen.fill(WHITE)

		#draw the text
		str1 = "Tutorial"
		str2 = "Every round you will be required to draw the outline of a country."
		str3 = "You can draw by holding left mouse button."
		str4 = "After you finish you can press ENTER button to finish drawing"
		str5 = "and see the real map."
		str6 = "after that press ENTER again to move to next round."
		str7 = "press ENTER to go back to main menu."
		str8 = "press ESCAPE at any time to close the game"

		add_text(str1, 30, 5, S_Y / 17 * 0, BLACK)
		add_text(str2, 30, 5, S_Y / 17 * 4, BLACK)
		add_text(str3, 30, 5, S_Y / 17 * 5, BLACK)
		add_text(str4, 30, 5, S_Y / 17 * 6, BLACK)
		add_text(str5, 30, 5, S_Y / 17 * 7, BLACK)
		add_text(str6, 30, 5, S_Y / 17 * 8, BLACK)
		add_text(str7, 30, 5, S_Y / 17 * 10, BLACK)
		add_text(str8, 30, 5, S_Y / 17 * 11, BLACK)
		
		pygame.display.update()
		clock.tick(60)

	return play

def start():
	global sim, map, countries, chosen, countries_maps

	pygame.display.set_caption('Contry Drawer')

	#filling the map with blanks
	for i in range (0, math.floor(S_Y / S_P)):
		new = []
		for j in range (0, math.floor(S_X / S_P)):
			new.append(255)
		map.append(new)

	for key, value in countries_maps.items():
		countries_maps[key] = pygame.transform.scale(value, (img_size, img_size))

	chosen = random.choice(list(countries_maps.keys()))

def event():
	global done, sim
	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			pygame.quit()
			sys.exit()

		#mouse press
		if pygame.mouse.get_pressed()[0] and ready == False:
			mouseToPixle(pygame.mouse.get_pos())

		#keyboard press
		if event.type == pygame.KEYDOWN:
			if event.key == pygame.K_ESCAPE:
				pygame.quit()
				sys.exit()
			if event.key == pygame.K_RETURN:
				if ready == False:
					compare()
					if sim > 0.5:
						pygame.mixer.music.load("succsess.wav")
					else:
						pygame.mixer.music.load("fail.wav")
					pygame.mixer.music.play(1)
				else:
					reset()
		#if event.type == pygame.KEYUP:
		#	if event.key == pygame.K_0:

def draw():
	global sim, map, ready, chosen, countries_maps, S_X, S_Y, img_size

	screen.fill(WHITE)
	for i in range(0, len(map[0])):
		for j in range(0, len(map)):
			drawPixle(i, j)

	if ready == False:
		s = "draw: " + chosen
		add_text(s, 40, S_X / 2 - len(s) * 10, 0)
	elif sim != None:
		s = chosen
		add_text(s, 40, S_X / 2 - len(s) * 10, 0)
		add_text("score: " + str(int(sim * 100)) + "%", 40, 0, S_Y - img_size - 50, BLACK)
		screen.blit(countries_maps[chosen], (0,S_Y - img_size))

def mouseToPixle(pos):
	global map

	x = math.floor(pos[1] / S_P)
	y = math.floor(pos[0] / S_P)

	#inserting into map
	map[int(x)][int(y)] = 0

def drawPixle(px, py):
	global map

	if map[py][px] == 0:
		pygame.draw.rect(screen, BLACK, (px * S_P, py * S_P, S_P, S_P))
	if map[py][px] == 255:
		pygame.draw.rect(screen, WHITE, (px * S_P, py * S_P, S_P, S_P))

#Works well with images of different dimensions
def orb_sim(img1, img2):
	# SIFT is no longer available in cv2 so using ORB
	orb = cv2.ORB_create()

	# detect keypoints and descriptors
	kp_a, desc_a = orb.detectAndCompute(img1, None)
	kp_b, desc_b = orb.detectAndCompute(img2, None)

	# define the bruteforce matcher object
	bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
	  
	#perform matches. 
	matches = bf.match(desc_a, desc_b)
	#Look for similar regions with distance < 50. Goes from 0 to 100 so pick a number between.
	similar_regions = [i for i in matches if i.distance < 85]
	if len(matches) == 0:
		return 0
	return len(similar_regions) / len(matches)

def compare():
	global ready, map, sim, chosen

	ready = True

	img1 = cv2.imread(chosen + '.jpg')

	arr = numpy.array(map)
	img = Image.fromarray(arr, 'L')
	img = img.resize((img1.shape[1], img1.shape[0]))
	img.save('image.png')
	img = cv2.imread('image.png')

	sim = orb_sim(img, img1)

def reset():
	global map, sim, chosen, ready, S_Y, S_X, S_P, countries_maps, counter, done

	map = list()
	#filling the map with blanks
	for i in range (0, math.floor(S_Y / S_P)):
		new = []
		for j in range (0, math.floor(S_X / S_P)):
			new.append(255)
		map.append(new)

	sim = None
	ready = False
	counter = counter + 1

	if counter != 41:
		last_chosen = chosen
		while chosen == last_chosen:
			chosen = random.choice(list(countries_maps.keys()))
		del countries_maps[last_chosen]
	else:
		chosen = ""


def add_text(text1, size=15, width=S_X / 2, height=S_Y / 2, color1=(0, 0, 0)):
    if type(text1) != 'str':
        text1 = str(text1)
    font = pygame.font.SysFont("cambriacambriamath", size)
    text = font.render(text1, True, color1)
    loc = (int(width), int(height))
    screen.blit(text, loc)
    return loc


if __name__ == '__main__':
	main()