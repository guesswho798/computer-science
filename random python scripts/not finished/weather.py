import pyttsx3
import requests, json 
import pytemperature


def main():

	print(weatherReport())

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