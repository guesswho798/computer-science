import socket

def main():
	server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	server.bind(('0.0.0.0', 80))
	server.listen(1)

	print("Server is online!\n")

	while True:
		#this is used to check if the message is
		client, address = server.accept()
		#reciving command
		data = client.recv(1024).decode()
		#print(data)

		test = True
		temp = 1

		try:
			if data[0:3] == "GET":
				result = data.find("HTTP")
				#sending html
				if result == 6: 
					print("requested an html file")
					html = open("C:\\webroot\\index.html", 'r') 
					html = html.read()
					send = "HTTP /1.1 200 OK\r\nContent-Lenght: " + str(len(html)) + "\r\nContent-Type: text/html; charset=ISO-8859-1\r\n\r\n" + html
				else:
					location = data[4: result]
					print("location: " + location)
					#sending css
					if data.find("css") != -1:
						css = open("C:\\webroot" + location, 'r') 
						css = css.read()
						send = "HTTP /1.1 200 OK\r\nContent-Lenght: " + str(len(css)) + "\r\nContent-Type: text/css\r\n\r\n" + css
					#sending javascript
					elif data.find("js") != -1:
						js = open("C:\\webroot" + location, 'r') 
						js = js.read()
						send = "HTTP /1.1 200 OK\r\nContent-Lenght: " + str(len(js)) + "\r\nContent-Type: text/javascript; charset=UTF-8\r\n\r\n" + js
					elif data.find("calculate-next") != -1:
						index = data.find("=")
						number = data[index + 1:]
						number = number[:number.find(" ")]
						print("asked to calc next " + str(number) + " ---> " + str(int(number) + 1))
						number = int(number) + 1
						send = str(number)
					elif data.find("calculate-area") != -1:
						print("calculating area...")
						height = data[data.find("height=") + 7: data.find("&")]
						width = data[data.find("width=") + 6:]
						width = width[: width.find(" ")]
						answer = str((int(width) * int(height)) / 2)
						print("height: " + str(height) + ", width: " + str(width) +", answer: " + answer)

						if float(answer) % 10 == 0:
							answer = int(answer)
							answer = str(answer)
						send = answer
					elif data.find("img") != -1:
						jpg = open("C:\\webroot" + location, 'rb')
						byte = jpg.read()
						send = "HTTP /1.1 200 OK\r\n\r\n"
						test = False
						temp = byte
					else:
						print("sending 404")
						send = "404 ERROR page not found"



				client.send(send.encode())

				#for the img
				if test == False:
					client.send(temp)

			print("=============================")
			#sending the message
		except Exception as e:
			print("ran into an error")

	print("closing server...")

	client.close()
	server.close()


if __name__ == '__main__':
	main()
