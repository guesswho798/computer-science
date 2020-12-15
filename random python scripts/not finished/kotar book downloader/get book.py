import requests
import shutil
import sys, os
from PIL import Image
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located

def linkToDownload(url, x):
	response = requests.get(url, stream=True)
	with open("C:\\Users\\User\\Documents\\random python scripts\\kotar\\" + str(x) + ".jpg", 'wb') as f:
		f.write(response.content)
		del response
		return f

def main():
	if len(sys.argv) == 3:
		with webdriver.Firefox() as driver:
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

			linkList = list()
			for n in range(0, p):
				linkList.append("https://kotarimagesSTG.cet.ac.il/GetPageImg_v2.ashx?Type=page_img&gPageToken=" + driver.execute_script("return BookPageState_GetPageGuid(" + str(n) + ")") + "&nStep=6&nVersion=11")
			
			for x in range(1, p):
				linkToDownload(linkList[x], x)

			openim = list()
			for x in range(1, p):
				openim.append(Image.open(r"C:\\Users\\User\\Documents\\random python scripts\\kotar\\" + str(x) + ".jpg"))

			convertim1 = list()
			convertim2 = list()
			first = openim[0].convert('RGB')
			second = openim[201].convert('RGB')
			for x in range(1, 200):
				print(x)
				convertim1.append(openim[x].convert('RGB'))
			print("========")
			for x in range(202, p - 1):
				print(x)
				convertim2.append(openim[x].convert('RGB'))


			first.save(r"C:\\Users\\User\\Documents\\random python scripts\\kotar\\book1.pdf",save_all=True, append_images=convertim1)
			second.save(r"C:\\Users\\User\\Documents\\random python scripts\\kotar\\book2.pdf",save_all=True, append_images=convertim2)

			for x in range(1, p):
				os.remove("C:\\Users\\User\\Documents\\random python scripts\\kotar\\" + str(x) + ".jpg")
	else:
		print("you need to have 2 args...")
		print("app url numOfPages")

if __name__ == '__main__':
	main()