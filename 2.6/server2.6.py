import socket
from datetime import datetime
import random

def Time(B, data):
	print("Sending time")
	#gathering only the time and not the date
	data = str(datetime.now())[11:19]
	B = True
	return B, data

def Name(B, data):
	print("sending name")
	data = "Raz"
	B = True
	return B, data

def  Rand(B, data):
	print("sending random")
	data = str(random.randint(0, 10))
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
		if data == "Time":
			B, data = Time(B, data)
		elif data == "Name":
			B, data = Name(B, data)
		elif data == "Rand":
			B, data = Rand(B, data)
		elif data == "Exit":
			B, data, stay = Exit(B, data, stay)

		if B:
			#filling the lenght message up with zeros to get to the leght of 10
			l = len(data)
			l = 10 - l
			zero = "0" * l
			l = str(zero) + str(len(data))
			#sending lenght of message
			client.send(l.encode())

			#sending the message
			client.send(data.encode())

	print("closing server...")

	client.close()
	server.close()

if __name__ == '__main__':
	main()
