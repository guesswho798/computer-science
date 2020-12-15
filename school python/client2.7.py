import socket, sys

def main():

	sending = ""
	once = True # this is used to show the opening message only once
	check = True # this is so if the client putted a wrong message he wont try to connect again
	while sending != "Exit":
		try:
			if check == True:
				my_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
				my_socket.connect(('127.0.0.1', 1717))
		except:
			print("closing...")
			sys.exit()


		if once == True:
			print("Connected to the server successfuly!")

			print("Your options are:")
			print("View file (to file info)")
			print("Open file (to open file)")
			print("Screen (take a screen shot)")
			print("Delete (delete a file)")
			print("Copy (copy and paste)")
			print("Exit (to exit the app and close the server)")
			once = False

		sending = input("Client: ")

		if sending == "View file" or sending == "Open file" or sending == "Screen" or sending == "Delete" or sending == "Copy" or sending == "Exit":
			check = True
			#sending the lenght of message
			my_socket.send(str(len(sending)).encode())
			#reciving signle to send the message
			signle = my_socket.recv(int(len(sending))).decode()
			if int(signle) == int(len(sending)):
				#sending the message
				my_socket.send(sending.encode())
				if sending == "View file" or sending == "Open file" or sending == "Screen" or sending == "Delete":
					p = input("file path: ")
					my_socket.send(p.encode())
				if sending == "Copy":
					p = input("copy: ")
					my_socket.send(p.encode())
					p = input("paste: ")
					my_socket.send(p.encode())
			else:
				print("ERROR")

			#reciving lenght of message
			l = my_socket.recv(100).decode()
			#reciving the message
			data = my_socket.recv(int(l))

			print("the server said: " + data.decode())
		else:
			check = False
			print("unrecognized command")
		
		
	my_socket.close()

if __name__ == '__main__':
	main()
	
