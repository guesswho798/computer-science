from flask import Flask, redirect, render_template, url_for, session
from flask_socketio import SocketIO, send, emit, join_room, leave_room, close_room, rooms, disconnect
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret!"
socketio = SocketIO(app)

r = {"2z":0 ,"3z":0 ,"4z":0 ,"2r":0 ,"3r":0, "4r":0 ,"2c":0 ,"3c":0, "4c":0}

@app.route("/")
def home():
	return render_template("home.html")

@app.route('/about')
def about():
	return redirect(url_for('home'))

@socketio.on('connect')
def connect():
	emit("listener", 'connected')

@socketio.on('join')
def on_join(data):
	global r

	username = data['username']
	room_name = data['room name']
	join_room(room_name)

	r[room_name] = r[room_name] + 1
	if r[room_name] == int(room_name[0]):
		r[room_name] = 0
		socketio.emit("listener", "join" + get_sentence(room_name[1]), room=room_name)

@app.route("/waiting/<ID>")
def waiting(ID):
	if ID == "add later":
		return "Not finished yet for upload!"

	return render_template("waiting room.html", ID=ID)

@socketio.on('selector')
def connect(data):
	room_name = data['room name']
	username = data['username']

	socketio.emit("selector sender", {'username':username}, room=room_name)

@app.route("/game")
def game():
	return render_template("blitz.html")

def get_sentence(mode):

	if mode == 'z':

		n = random.randint(0, 4)

		if n == 0:
			return "Sometimes you have to just give up and win by cheating"
		if n == 1:
			return "All you need to do is pick up the pen and begin"
		if n == 2:
			return "Today arrived with a crash of my car through the garage door"
		if n == 3:
			return "As he entered the church he could hear the soft voice of someone whispering into a cell phone"

		return "He appeared to be confusingly perplexed"

	elif mode == 'r':
		#n = random.randint(0, 4)
		n = 3

		if n == 0:
			return "As he crossed toward the pharmacy at the corner he involuntarily turned his head because of a burst of light that had ricocheted from his temple, and saw, with that quick smile with which we greet a rainbow or a rose, a blindingly white parallelogram of sky"
		if n == 1:
			return "On offering to help the blind man, the man who then stole his car, had not, at that precise moment, had any evil intention, quite the contrary, what he did was nothing more than obey those feelings of generosity and altruism"
		if n == 2:
			return "My very photogenic mother died in a freak accident (picnic, lightning) when I was three, and, save for a pocket of warmth in the darkest past, nothing of her subsists within the hollows and dells of memory, over which, if you can still stand my style"
		if n == 3:
			return "The French are certainly misunderstood: - but whether the fault is theirs, in not sufficiently explaining themselves, or speaking with that exact limitation and precision which one would expect on a point of such importance"

		return "All I know is that I stood spellbound in his high-ceilinged studio room, with its north-facing windows in front of the heavy mahogany bureau at which Michael said he no longer worked because the room was so cold, even in midsummer"

	elif mode == 'c':
		n = random.randint(0, 4)

		if n == 0:
			return "Sometimes you have to just give up and win by cheating"
		if n == 1:
			return "All you need to do is pick up the pen and begin"
		if n == 2:
			return "Today arrived with a crash of my car through the garage door"
		if n == 3:
			return "As he entered the church he could hear the soft voice of someone whispering into a cell phone"

		return "He appeared to be confusingly perplexed"	

if __name__ == "__main__":
	socketio.run(app, debug=True)