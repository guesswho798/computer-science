import socket
import sys
import threading


helpcommand = ["/Help", "/help"]
exitcommand = ["/Exit", "/exit"]
closecommand = ["/Close", "/close"]
stay = True



def read(s, my_socket):
	global stay
	while stay:
		rcv = ""
		try:
			rcv = my_socket.recv(1024).decode()
		except:
			break
		
		if rcv in closecommand:
			print("server closed...")
			stay = False
		elif rcv in exitcommand:
			stay = False
			print("kicked by server admin")
			input("press Enter to exit...")
			sys.exit()
		else:
			print(rcv)


def main():
	global stay

	ans = 0
	while ans != "1" and ans != "2":
		#start
		print("Welcome user!")
		print("If your server is on the same network as you press 1")
		print("If not then press 2 to enter the ip adress")
		ans = input("answer: ")

	url = ''
	if ans == "1":
		url = '127.0.0.1'
	elif ans == "2":
		url = input("ip: ")

	try:
		client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		client.connect((url, 1717))
	except:
		input("server unavailable...")
		sys.exit()

	print("Connected to the server successfuly!")
	print("commands available:")
	print("/Help (to display all commands)")
	print("/Exit (to exit the app and close the server)")


	userName = input("user name: ")
	client.send("/NewUser".encode() + userName.encode())
	reading = threading.Thread(target=read, args=("", client))
	reading.start()

	data = ""
	while data not in exitcommand and stay:

		#getting input from client
		data = input()

		#not sending last message before kicked
		if stay == False:
			break

		#displaying all commands
		if data in helpcommand:
			print(helpcommand)
			print(exitcommand)
		else:
			#sending the message
			msg = userName + ": " + data
			try:
				client.send(msg.encode())
			except:
				#dont need to do anything here because it
				#all ready happends in the raeding function
				pass


	client.close()
	sys.exit()


if __name__ == '__main__':
	main()
