import pygame
import random
import math

# colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
PURPLE = (255, 0, 255)
GRAY = (78, 76, 79)
YELLOW = (255, 255, 0)
BACKGROUND = (189,189,189)
LINES = (123,123,123)
sprite = pygame.transform.scale(pygame.image.load('sprite.png'), (87, 87))

#values
S_X = 700           # size of screen x value
S_Y = 800           # size of screen y value
diff = 2            # difficulty, 0=5,3 1=6,8 2=8,20
n = 0               # grid size
k = 0               # number of bombs
score = 0           # score
cells = None        # generated map [num of bombs, pressed(true false), flag(true false)]
playerCells = None  # map cells shown to player
first = True        # first press

#initializing
pygame.init()
screen = pygame.display.set_mode([S_X, S_Y])
pygame.display.set_caption('Minesweeper')
clock = pygame.time.Clock()
done = False
gameover = False
win = False

def main():
	global diff, n, k, cells

	if diff == 0:
		n = 5
		k = 3
	if diff == 1:
		n = 6
		k = 8
	if diff == 2:
		n = 8
		k = 20
	cells = [[[0, False, False] for row in range(n)] for column in range(n)]

	while not done:

		event()

		draw()

		pygame.display.flip()

		clock.tick(100)

def start(x1, y1):
	global cells, n, k

	while True:
		cells = [[[0, False, False] for row in range(n)] for column in range(n)]
	
		for x in range(k):
			x = -1
			y = -1
			while cells[x][y][0] == "X" or x == -1 and y == -1 or x1 == x and y1 == y:
				x = random.randint(0, n-1)
				y = random.randint(0, n-1)
			cells[x][y][0] = "X"
	
			if y >= 1 and cells[x][y-1][0] != 'X': 
				cells[x][y-1][0] += 1
			if y < n-1 and cells[x][y+1][0] != 'X':
				cells[x][y+1][0] += 1
		
			if (y >= 1 and y <= n-1) and (x >= 1 and x <= n-1) and cells[x-1][y-1][0] != 'X':
				cells[x-1][y-1][0] += 1
			
			if (y >= 0 and y <= n-2) and (x >= 1 and x <= n-1) and cells[x-1][y+1][0] != 'X':
				cells[x-1][y+1][0] += 1
			if (y >= 0 and y <= n-1) and (x >= 1 and x <= n-1) and cells[x-1][y][0] != 'X':
				cells[x-1][y][0] += 1
			
			if (y >=0 and y <= n-2) and (x >= 0 and x <= n-2) and cells[x+1][y+1][0] != 'X':
				cells[x+1][y+1][0] += 1
			
			if (y >= 1 and y <= n-1) and (x >= 0 and x <= n-2) and cells[x+1][y-1][0] != 'X':
				cells[x+1][y-1][0] += 1
			if (y >= 0 and y <= n-1) and (x >= 0 and x <= n-2) and cells[x+1][y][0] != 'X':
				cells[x+1][y][0] += 1

		if cells[x1][y1][0] == 0:
			break


def event():
	global done, gameover, cells, score, win, first
	# --- Event Processing ---
	for event in pygame.event.get():

		#exit game
		if event.type == pygame.QUIT:
			done = True

		if event.type == pygame.KEYDOWN:
			if event.key == pygame.K_r:
				first = True
				gameover = False
				win = False
				score = 0
				cells = [[[0, False, False] for row in range(n)] for column in range(n)]
			elif event.key == pygame.K_ESCAPE:
				done = True

		#mouse press
		if pygame.mouse.get_pressed()[2]:
			x, y = pygame.mouse.get_pos()
			if not gameover and not win:

				# x, y -> cell position
				x1 = int(x / (S_X / n))
				y1 = int((y - 100) / ((S_Y - 100) / n))
	
				if cells[x1][y1][1] == False:
					cells[x1][y1][2] = not cells[x1][y1][2]

		if pygame.mouse.get_pressed()[0]:
			x, y = pygame.mouse.get_pos()

			# x, y -> cell position
			x1 = int(x / (S_X / n))
			y1 = int((y - 100) / ((S_Y - 100) / n))

			if first == True and y > 100:
				start(x1, y1)
				first = False
			if gameover or win:
				if x < 300 and y < 50:
					first = True
					start(x1, y1)
					gameover = False
					win = False
					score = 0
			else:
				if y < 100:
					return

				if cells[x1][y1][0] == "X":
					gameover = True
					cells[x1][y1][1] = True
				elif cells[x1][y1][1] == False:
					score = score + 1

					cells[x1][y1][1] = True
					cells[x1][y1][2] = False

					for run in range(6):
						for y2 in range(n):
							for x2 in range(n):
								if cells[x2][y2][0] == 0 and cells[x2][y2][1] == True:
									for y in range(-1, 2):
										for x in range(-1, 2):
											try:
												if x2+x < 0 or x2+x > n-1 or y2+y < 0 or y2+y > n-1:
													continue
												if cells[x2+x][y2+y][2] == False and cells[x2+x][y2+y][1] == False:
													score = score + 1
													cells[x2+x][y2+y][1] = True
											except:
												continue

				


def add_text(text1, size=15, width=S_X / 2, height=S_Y / 2, color1=BLACK):
    if type(text1) != 'str':
        text1 = str(text1)
    font = pygame.font.SysFont("microsoftjhengheimicrosoftjhengheiui", size)
    text = font.render(text1, True, color1)
    loc = (int(width), int(height))
    screen.blit(text, loc)
    return loc

def draw():
	global cells, playerCells ,n ,score ,gameover, win, first, sprite

	screen.fill(BACKGROUND)

	# drawing top white rect
	pygame.draw.rect(screen, WHITE, (0 ,0 ,S_X ,100))

	# drawing all lines for the grid
	#for x in range(n-1):
	#	pygame.draw.line(screen, LINES, ((S_X / (n)) * (x + 1), 100), ((S_X / (n)) * (x + 1), S_Y), 3)
	#	pygame.draw.line(screen, LINES, (0 , (S_Y / (n + 1)) * (x + 1) + 100), (S_X , (S_Y / (n + 1)) * (x + 1) + 100), 3)

	for y in range(n):
		for x in range(n):
			if cells[x][y][1] == False:
				screen.blit(sprite, ((S_X / (n)) * (x), (S_Y / (n + 1)) * (y) + 100))

	# drawing numbers and flags
	if first == False:
		for y in range(n):
			for x in range(n):
				if cells[x][y][1]:
					add_text(str(cells[x][y][0]), size=30, width=(S_X / (n)) * (x) + 40 + 1, height=(S_Y / (n + 1)) * (y) + 130)
				if cells[x][y][2]:
					add_text("?", size=30, width=(S_X / (n)) * (x) + 40 + 1, height=(S_Y / (n + 1)) * (y) + 130)

	# drawing score
	if gameover:
		add_text("Game over!", size=30, width=S_X / 2 - 75, height=10)
		add_text("Score: " + str(score), size=30, width=S_X / 2 - 65, height=50)
		add_text("Play again?", size=24, width=10, height=10)
	elif score + k == n*n and first == False:
		win = True
		add_text("You win!", size=30, width=S_X / 2 - 65, height=10)
		add_text("Play again?", size=24, width=10, height=10)
	else:
		add_text("Score: " + str(score), size=30, width=10, height=10)



if __name__ == '__main__':
	main()