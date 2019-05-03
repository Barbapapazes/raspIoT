import sys     # for parameter management
import serial  # library for serial communication
import time    # to manage time
import json    # to use json file
import string  # to use string function


# We wait data from the USB interface, to adapt according to the OS, at 9600 bauds

# For Linux
#ser = serial.Serial('/dev/ttyUSB0', 9600)
# For Windows
ser = serial.Serial('COM4', 9600)

val = 0

try:
    while True:
        if ser.in_waiting :
            with open('../socketio/data.json') as json_data:
                content = json.load(json_data)

            val = ser.readline()
            if val != 0:
                # val est en byte donc on la décode en str puis on enlève les char indésirables et on le convertit en int
                val = int(val.decode("utf-8").replace('\r\n', ''))
                if  val == 1:
                    val = True
                elif val == 0:
                    val = False

                content["python"] = True
                content["bulbs"][0]['state'] = val

                #print(content["bulbs"][0]['state'])
                
                with open('../socketio/data.json', 'w') as json_data:
                    json.dump(content, json_data, sort_keys=True, indent=2)
except KeyboardInterrupt:
    pass



