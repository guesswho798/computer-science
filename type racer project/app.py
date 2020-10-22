from flask import Flask, redirect, render_template, url_for, session
from flask_socketio import SocketIO, send, emit, join_room, leave_room, close_room, rooms, disconnect
from threading import Thread
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret!"
socketio = SocketIO(app)

r = 0
rooms = {"2z": None, "3z": None, "4z": None}

@app.route("/")
def home():
	return render_template("home.html")

@app.route('/about')
def about():
	return redirect(url_for('home'))

@socketio.on('connect')
def connect():
	emit("listener", 'connected')

@socketio.on("send message")
def message(data):
    room = data['channel']
    emit('broadcast message', data['message'], room=room)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room_name = data['room name']
    join_room(room_name)

def room_thread(ID):
	while True:
		socketio.emit("listener", random.randint(1, 100), room=ID)
		sleep(5)
   
@app.route("/waiting/<ID>")
def waiting(ID):
	global r

	if ID == "add later":
		return "Not finished yet for upload!"

	r = r + 1
	if r == 2:
		r = 0
		rooms["2z"] = Thread(target=room_thread, args=("2z"))
		rooms["2z"].start()
		#return redirect(url_for("game"))


	return render_template("waiting room.html", ID=ID)

@app.route("/game")
def game():
	return render_template("blitz.html")

if __name__ == "__main__":
	socketio.run(app, debug=True)