from subprocess import Popen
import time
import sys, os
import random

def main():

	URL = input("URL of video: ")
	TIME = input("video length (in seconds + 5 for loading): ")

	while (True):
		#opening google with the address
		Popen(['start', 'chrome' , URL], shell=True)

		#making sure youtube doesnt think im a bot
		r = random.randint(0, 6) + int(TIME)

		#waiting for the video to end
		time.sleep(r)

		try:
			# killing task
			os.system('taskkill /im chrome.exe')
		except:
			pass

if __name__ == '__main__':
	main()