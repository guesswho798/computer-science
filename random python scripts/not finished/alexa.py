import pyttsx3
import requests, json 
import pytemperature
import speech_recognition as sr
import pyaudio


def main():
	# init
	engine = pyttsx3.init()
	# 0 = male, 1 = female
	engine.setProperty('voice', engine.getProperty('voices')[0].id)
	# seting speed
	engine.setProperty('rate', 100)
	# seting volume
	engine.setProperty('volume', 1)

	# read input
	print("speak")
	while True:
		command = recognize_speech_from_mic()
		if command["transcription"] is not None:
			command = command["transcription"].lower()
			break

	# logic
	if command == "weather":
		# getting location and reading weather
		engine.say(weatherReport())
		engine.runAndWait()
	if command == "good night":
		engine.say("Good night")
		engine.runAndWait()

	# why do I have to do this
	engine.stop()
	

# speech to text
def recognize_speech_from_mic():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    if not isinstance(recognizer, sr.Recognizer):
        raise TypeError("`recognizer` must be `Recognizer` instance")

    if not isinstance(microphone, sr.Microphone):
        raise TypeError("`microphone` must be `Microphone` instance")

    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    response = {
        "success": True,
        "error": None,
        "transcription": None
    }

    try:
        response["transcription"] = recognizer.recognize_google(audio)
    except sr.RequestError:
        response["success"] = False
        response["error"] = "API unavailable"
    except sr.UnknownValueError:
        response["error"] = "Unable to recognize speech"

    return response

# city name to text weather report
def weatherReport():
	city_name = json.loads(requests.get('https://ipinfo.io/json').text)['city']
	api_key = "350544401ee122ee2ed20e1aacf68f3e"
	base_url = "http://api.openweathermap.org/data/2.5/weather?"
	
	# Give city name
	complete_url = base_url + "appid=" + api_key + "&q=" + city_name 
	response = requests.get(complete_url) 
	x = response.json()
	
	if x["cod"] != "404": 
	
		y = x["main"]
	
		return "Temperature in celcius is " + str(int(pytemperature.k2c(y["temp"]))) + ". humidity is " + str(y["humidity"]) + "% with " + str(x["weather"][0]["description"])
	
	else: 
		return "Location unknown"

if __name__ == '__main__':
	main()