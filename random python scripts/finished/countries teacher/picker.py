import random

def main():

	#opening txt fie
	filepath = 'names.txt'
	with open(filepath, "r") as fp:
		line = fp.readline()

		#making list
		names = list()
		while line:
			names.append(line.strip())
			line = fp.readline()
		
		fp.close()

	#picking one name
	n = random.randint(0, len(names))
	print(names[n])

	#removing it from list
	names.remove(names[n])

	#writing the new list back to the file
	with open(filepath, "w") as fp:

		for line in names:
			fp.write(line)
			fp.write("\n")

		fp.close()
	input()



if __name__ == '__main__':
	main()