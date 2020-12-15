import socket
import os
import pyautogui
from shutil import copyfile

def View(B, data, client):
	print("Reciving path")
	data2 = client.recv(1024).decode()
	print(data2)
	data = os.listdir(data2)
	print("sending file info")
	data = str(data)
	B = True
	return B, data


def Open(B, data, client):
	print("opening file")
	data2 = client.recv(1024)
	print(data2)
	data = os.startfile(data2.decode()) 
	print("opening requested file")
	data = "File opend"
	B = True
	return B, data

def Screen(B, data, client):
	print("Taking screen shot")
	myScreenshot = pyautogui.screenshot()
	data2 = client.recv(1024).decode()
	myScreenshot.save(data2 + '\\screen shot.png')
	data = "sent"
	B = True
	return B, data


def Delete(B, data, client):
	print("deleted " + str(data))
	data2 = client.recv(1024).decode()
	os.remove(data2)
	data = "deleted " + str(data2)
	B = True
	return B, data

def Copy(B, data, client):
	print("handeling a copy request")
	src = client.recv(1024).decode()
	dst = client.recv(1024).decode()
	copyfile(src, dst)
	data = "copied"
	B = True
	return B, data

def Exit(B, data, stay):
	data = "Goodbye"
	stay = False
	B = True
	return B, data, stay

def main():
	server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	server.bind(('', 1717))
	server.listen(1)

	print("Server is online!")

	stay = True
	while stay:
		#this is used to check if the message is
		B = False
		client, address = server.accept()

		#reciving lenght
		l = client.recv(1)
		#sending the signle to accept message
		client.send(l)
		#reciving command
		data = client.recv(int(l.decode()))
		#decoding the command
		data = data.decode()
		#choosing what to do with the command recived
		if data == "View file":
			B, data = View(B, data, client)
		elif data == "Open file":
			B, data = Open(B, data, client)
		elif data == "Screen":
			B, data = Screen(B, data, client)
		elif data == "Delete":
			B, data = Delete(B, data, client)
		elif data == "Copy":
			B, data = Copy(B, data, client)
		elif data == "Exit":
			B, data, stay = Exit(B, data, stay)

		if B:
			#filling the lenght message up with zeros to get to the leght of 10
			l = len(str(data))
			l = 100 - l
			zero = "0" * l
			l = str(zero) + str(len(data))
			#sending lenght of message
			client.send(l.encode())

			#sending the message
			data = str(data)
			data = data.encode()
			client.send(data)

	print("closing server...")

	client.close()
	server.close()

if __name__ == '__main__':
	main()
