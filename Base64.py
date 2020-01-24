def main():

	start = ""
	while start != "encode" and start != "decode":
		start = input("encode or decode: ")
		if start == "encode":
			encode()
		elif start == "decode":
			decode()

	input("...")


#decimal to Base 64 string
def dts(d):
	s = "" #string
	for i in d:
		if i == 0:
			s += "A"
		if i == 1:
			s += "B"
		if i == 2:
			s += "C"
		if i == 3:
			s += "D"
		if i == 4:
			s += "E"
		if i == 5:
			s += "F"
		if i == 6:
			s += "G"
		if i == 7:
			s += "H"
		if i == 8:
			s += "I"
		if i == 9:
			s += "J"
		if i == 10:
			s += "K"
		if i == 11:
			s += "L"
		if i == 12:
			s += "M"
		if i == 13:
			s += "N"
		if i == 14:
			s += "O"
		if i == 15:
			s += "P"
		if i == 16:
			s += "Q"
		if i == 17:
			s += "R"
		if i == 18:
			s += "S"
		if i == 19:
			s += "T"
		if i == 20:
			s += "U"
		if i == 21:
			s += "V"
		if i == 22:
			s += "W"
		if i == 23:
			s += "X"
		if i == 24:
			s += "Y"
		if i == 25:
			s += "Z"
		if i == 26:
			s += "a"
		if i == 27:
			s += "b"
		if i == 28:
			s += "c"
		if i == 29:
			s += "d"
		if i == 30:
			s += "e"
		if i == 31:
			s += "f"
		if i == 32:
			s += "g"
		if i == 33:
			s += "h"
		if i == 34:
			s += "i"
		if i == 35:
			s += "j"
		if i == 36:
			s += "k"
		if i == 37:
			s += "l"
		if i == 38:
			s += "m"
		if i == 39:
			s += "n"
		if i == 40:
			s += "o"
		if i == 41:
			s += "p"
		if i == 42:
			s += "q"
		if i == 43:
			s += "r"
		if i == 44:
			s += "s"
		if i == 45:
			s += "t"
		if i == 46:
			s += "u"
		if i == 47:
			s += "v"
		if i == 48:
			s += "w"
		if i == 49:
			s += "x"
		if i == 50:
			s += "y"
		if i == 51:
			s += "z"
		if i == 52:
			s += "0"
		if i == 53:
			s += "1"
		if i == 54:
			s += "2"
		if i == 55:
			s += "3"
		if i == 56:
			s += "4"
		if i == 57:
			s += "5"
		if i == 58:
			s += "6"
		if i == 59:
			s += "7"
		if i == 60:
			s += "8"
		if i == 61:
			s += "9"
		if i == 62:
			s += "+"
		if i == 63:
			s += "/"
	return s

#Base 64 string to decimal
def std(d):
	s = []
	for i in d:
		if i == "A":
			s.append(0)
		if i == "B":
			s.append(1)
		if i == "C":
			s.append(2)
		if i == "D":
			s.append(3)
		if i == "E":
			s.append(4)
		if i == "F":
			s.append(5)
		if i == "G":
			s.append(6)
		if i == "H":
			s.append(7)
		if i == "I":
			s.append(8)
		if i == "J":
			s.append(9)
		if i == "K":
			s.append(10)
		if i == "L":
			s.append(11)
		if i == "M":
			s.append(12)
		if i == "N":
			s.append(13)
		if i == "O":
			s.append(14)
		if i == "P":
			s.append(15)
		if i == "Q":
			s.append(16)
		if i == "R":
			s.append(17)
		if i == "S":
			s.append(18)
		if i == "T":
			s.append(19)
		if i == "U":
			s.append(20)
		if i == "V":
			s.append(21)
		if i == "W":
			s.append(22)
		if i == "X":
			s.append(23)
		if i == "Y":
			s.append(24)
		if i == "Z":
			s.append(25)
		if i == "a":
			s.append(26)
		if i == "b":
			s.append(27)
		if i == "c":
			s.append(28)
		if i == "d":
			s.append(29)
		if i == "e":
			s.append(30)
		if i == "f":
			s.append(31)
		if i == "g":
			s.append(32)
		if i == "h":
			s.append(33)
		if i == "i":
			s.append(34)
		if i == "j":
			s.append(35)
		if i == "k":
			s.append(36)
		if i == "l":
			s.append(37)
		if i == "m":
			s.append(38)
		if i == "n":
			s.append(39)
		if i == "o":
			s.append(40)
		if i == "p":
			s.append(41)
		if i == "q":
			s.append(42)
		if i == "r":
			s.append(43)
		if i == "s":
			s.append(44)
		if i == "t":
			s.append(45)
		if i == "u":
			s.append(46)
		if i == "v":
			s.append(47)
		if i == "w":
			s.append(48)
		if i == "x":
			s.append(49)
		if i == "y":
			s.append(50)
		if i == "z":
			s.append(51)
		if i == "0":
			s.append(52)
		if i == "1":
			s.append(53)
		if i == "2":
			s.append(54)
		if i == "3":
			s.append(55)
		if i == "4":
			s.append(56)
		if i == "5":
			s.append(57)
		if i == "6":
			s.append(58)
		if i == "7":
			s.append(59)
		if i == "8":
			s.append(60)
		if i == "9":
			s.append(61)
		if i == "+":
			s.append(62)
		if i == "/":
			s.append(63)
	return s

def encode():

	x = input("Enter string to encode: ")

	#step 1: input string --> decimal
	d = [] #decimal
	for i in x:
		d.append(ord(i))


	#step 2: decimal --> 8-bit binary
	b = "" #binary
	for i in d:
		b += str(format(i,'08b'))


	#adding 0 in order to make b divisible by 6
	add = len(b) % 6
	b += "0" * add


	#step 3: 8-bit --> 6-bit
	nb = [] #new binary
	for i in range(int(len(b) / 6)):
		nb.append(b[i * 6:i * 6 + 6])


	#step 4: binary --> decimal
	nd = [] #new decimal
	for i in nb:
		nd.append(int(i, 2))


	#step 5: decimal --> chars using base64 chart
	end = "=" * int(add / 2)
	print(dts(nd) + end)

def decode():
	x = input("Enter string to decode: ")

	#step 1: split into a list
	l = []
	for i in range(len(x)):
		l.append(x[i])

	#step 2: ascii --> decimal
	d = std(l)

	#step 3: decimal --> 8-bit binary
	b = "" #binary
	for i in d:
		b += str(format(i,'08b'))


	#step 4: 8-bit --> 6-bit
	nb = [] #new binary
	for i in range(int(len(b) / 8)):
		nb.append(b[i * 8 + 2:i * 8 + 8])

	#step 5: concatenation
	b = ""
	for i in nb:
		b += i

	#step 6: divide back into 8
	nb = []
	for i in range(int(len(b) / 8)):
		nb.append(b[i * 8:i * 8 + 8])

	#step 7: binary to ascii
	s = ""
	for i in nb:
		s += chr(int(i, 2))
		

	print(s)

if __name__ == '__main__':
	main()