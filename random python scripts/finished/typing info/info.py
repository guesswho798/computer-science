from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from progressbar import ProgressBar
import matplotlib.pyplot as plt

#global var
user = "rolexdegree"
wpm = list()
x_values = 100
pbar = ProgressBar(maxval=5)
counter = 0
pbar.start()

def get_list():
	global wpm, user, x_values, counter, pbar

	#init
	url = "https://data.typeracer.com/pit/race_history?user=" + user + "&n=2500&startDate=&universe="

	#opening the browser without visulizing it
	pbar.update(counter)
	counter = counter + 1
	options = Options()
	options.add_argument('--headless')
	options.add_argument('--disable-gpu')
	driver = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=options)

	#opening the site
	print('\n'*10)
	pbar.update(counter)
	counter = counter + 1
	driver.get(url)

	#sifting through the content
	content = driver.page_source
	soup = BeautifulSoup(content)

	#getting length so the max x value will be x_values
	m = 0
	for num in soup.findAll('td'):
		if "WPM" in str(num):
			m = m + 1
	print('\n'*10)
	pbar.update(counter)
	counter = counter + 1
	

	m = int(m / x_values)
	x = 0
	l = list()
	for num in soup.findAll('td'):
		if "WPM" in str(num):
			try:
				l.append(int(str(num)[4:7]))
			except:
				l.append(int(str(num)[4:6]))
			
			x = x + 1
			if x == m:
				s = 0
				for a in l:
					s = s + a
				s = s / m - 1
				wpm.append(s)
				l = list()
				x = 0

	#getting the list backwards so reversing
	wpm.reverse()
	print('\n'*10)
	pbar.update(counter)
	counter = counter + 1

def show_graph():
	global wpm, counter, pbar

	print('\n'*10)
	pbar.update(counter)
	plt.plot(wpm)
	plt.ylabel('Words Per Minute')
	plt.xlabel('Races')
	print('\n'*10)
	pbar.finish()
	plt.show()

def main():
	get_list()

	show_graph()

if __name__ == '__main__':
	main()