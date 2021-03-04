import requests
import shutil
import sys, os
from PIL import Image
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.firefox.options import Options

def linkToDownload(url, x):
	print(x)
	response = requests.get(url, stream=True)
	with open(str(x) + ".jpg", 'wb') as f:
		f.write(response.content)
		del response 
		return f

def main():

	if len(sys.argv) == 3:
		options = Options()
		options.add_argument('--headless')
		options.add_argument('--hide-scrollbars')
		options.add_argument('--disable-gpu')
		driver = webdriver.Firefox(firefox_options = options)

		#with webdriver.Firefox(executable_path=r'geckodriver.exe') as driver:
		#getting input
		if str(sys.argv[2]) != "-a":
			p = int(sys.argv[2]) + 1
		url = str(sys.argv[1])
			
		#enter site
		wait = WebDriverWait(driver, 10)
		driver.get(url)

		#if input was -a then get all pages
		if str(sys.argv[2]) == "-a":
			p = int(driver.execute_script("return oPagesInfo.pages.length"))
			print("getting all pages = " + str(p))

		print("making list")
		linkList = list()
		for n in range(0, p):
			linkList.append("https://kotarimagesSTG.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=" + driver.execute_script("return BookPageState_GetPageGuid(" + str(n) + ")") + "&nStep=6&nVersion=11")
		
		print("link to download")
		for x in range(1, p):
			linkToDownload(linkList[x], x)

		print("opening images")
		openim = list()
		for x in range(1, p):
			openim.append(Image.open(str(x) + ".jpg"))

		print("converting to rgb")
		convertim = list()
		first = openim[0].convert('RGB')
		for x in range(1, p-1):
			convertim.append(openim[x].convert('RGB'))


		print("saving pdf")


		first.save("book.pdf",save_all=True, append_images=convertim)

		print("removing")
		for x in range(1, p):
			os.remove(str(x) + ".jpg")
	else:
		print("you need to have 2 args...")
		print("app.py [url of first page] [numOfPages or -a for all pages]")

if __name__ == '__main__':
	main()