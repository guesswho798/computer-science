import socket
import os, sys
import threading

#lists
users = list()
blackList = list()
threads = list()

#commands
newUserCommand = "/NewUser"          #getting a new user
talkCommand = ["/talk", "/Talk"]     #sending a message to everyone
exitCommand = ["/exit", "/Exit"]     #closing the server
usersCommand = ["/users", "/Users"]  #viewing all online clients
helpcommand = ["/help", "/Help"]     #viewing all commands
kickcommand = ["/kick", "/Kick"]     #kicking a client from server
closecommand = ["/Close", "/close"]  #the message server sends when closes

stay = True

#sends data to all clients except "name"
def sendClients(data, name):
	for x in users:
		#not sending to the user that sent the message
		if data[:len(name)] != x[0]:
			x[1].send(data.encode())

#handles new clients as a new thread
def NewuserHandler(userName, client):
	users.append([userName, client])
	print("Welcome " + userName)
	while True:
		try:
			#reciving msg and sending all
			data = client.recv(1024).decode()
			if data[:len(userName)] == userName and data[len(userName) + 2:len(userName) + 3] != "/":
				sendClients(data, userName)
		except:
			#if client is no longer active
			print(userName + " quit")
			users.remove([userName, client])
			break

		#cheking if player was kicked
		if [userName, client] in blackList:
			client.send("/exit".encode())
			break

#prints the list of all online clients
def printClients():
	for x in range(len(users)):
		print(users[x][0] + "",end='')
		if x != len(users) - 1:
			print(", ",end='')
	if len(users) != 0:
		print()
	else:
		print("server is empty!")

#another thread thar handles input from server
def commands():
	global stay
	while True:
		cmd = input()
		if cmd[:5] in talkCommand:
			sendClients("server: " + cmd[6:], "server")
		elif cmd in usersCommand:
			printClients()
		elif cmd in exitCommand:
			print("closing server...")
			sendClients(closecommand[0], "")
			stay = False
			for x in threads:
				x.join()
			sys.exit()
		elif cmd[:5] in kickcommand:
			for x in users:
				if x[0] == cmd[6:]:
					x[1].send(exitCommand[0].encode())
					blackList.append(x)
					users.remove(x)
					print("removing " + x[0] + "...")
					break
		elif cmd in helpcommand:
			print("This is a server built by Raz Shneider")
			print("As an admin your commands are:")
			print(helpcommand)
			print(talkCommand)
			print(usersCommand)
			print(kickcommand)
			print(exitCommand)
		else:
			print("Invalid command")


def main():
	global stay
	server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	server.bind(('', 1717))
	server.listen(10)

	print("Server is online!")

	l = threading.Thread(target=commands)
	l.start()

	while stay:
		#this is used to check if the message is
		client, address = server.accept()

		#reciving new user
		data = client.recv(1024).decode()

		#handeling new user
		if newUserCommand in data:
			x = threading.Thread(target=NewuserHandler, args=(data[8:],client))
			threads.append(x)
			x.start()


if __name__ == '__main__':
	main()
