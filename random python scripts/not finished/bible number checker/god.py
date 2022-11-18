import random

f = open("bible.txt", "r", encoding = 'utf-8')
letterToNumDic = {"א":1, "ב":2, "ג":3, "ד":4, "ה":5, "ו":6, "ז":7, "ח":8, "ט":9, "י":10, "כ":20, "ך":20, "ל":30, "מ":40, "ם":40, "נ":50, "ן":50, "ס":60, "ע":70, "פ":80,"ף":80, "צ":90, "ץ":90,"ק":100, "ר":200, "ש":300, "ת":400}

def gen_random_number(l):

	num = random.randint(l, l*9)
	num = num / l
	return num

def sumOfLetters(startLetter, numOfLetters):
	st = f.read()[numOfLetters:startLetter:-1]
	answer = 0
	letters = ""

	for c in range(numOfLetters):

		if st[c] in letterToNumDic and st[c-1] != "}":
			answer = answer + letterToNumDic[st[c]]
			letters = letters + st[c]
		else:
			numOfLetters = numOfLetters + 1

		if st[c] == " ":
			letters = letters + " "

	return answer, letters

def sumOfWords(numOfWords):
	st = f.read()[::-1].split(' ')[::-1]
	answer = 0
	words = ""
	wordCounter = 0

	for word in st:


		if "}" in word or "{" in word:
			continue
		else:
			for counter in range(len(word)):
				if word[counter] in letterToNumDic:
					answer = answer + letterToNumDic[word[counter]]
			words = words + word + " "

		wordCounter = wordCounter + 1
		if wordCounter == numOfWords:
			break

	return answer, " ".join(words.split(' ')[::-1])

def main():

	print(gen_random_number(10000000000000000))
	print(sumOfLetters(37))
	print(sumOfWords(7))


if __name__ == '__main__':
	main()