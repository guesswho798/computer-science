import socket

def main():

	sending = ""
	once = True # this is used to show the opening message only once
	check = True # this is so if the client putted a wrong message he wont try to connect again
	print("welcome client")
	while sending != "Exit":
		if check == True:
			my_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
			my_socket.connect(('127.0.0.1', 1717))

		if once == True:
			print("Connected to the server successfuly!")

			print("Your options are:")
			print("Time (to recive the time on your computer)")
			print("Rand (to recive a random number between 1-10)")
			print("Name (to recive the name of the server owner)")
			print("Exit (to exit the app and close the server)")
			once = False

		sending = input("Client: ")

		if sending == "Time" or sending == "Name" or sending == "Rand" or sending == "Exit":
			check = True
			#sending the lenght of message
			my_socket.send(str(len(sending)).encode())
			#reciving signle to send the message
			signle = my_socket.recv(int(len(sending))).decode()
			if int(signle) == int(len(sending)):
				#sending the message
				my_socket.send(sending.encode())
			else:
				print("ERROR")

			#reciving lenght of message
			l = my_socket.recv(10)
			#reciving the message
			data = my_socket.recv(int(l.decode()))

			print("the server said: " + data.decode())
		else:
			check = False
			print("Error\nunrecognized command")
		
		
	my_socket.close()

if __name__ == '__main__':
	main()
