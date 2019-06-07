import sys     # for parameter management
import serial  # library for serial communication
import time    # to manage time
import json    # to use json file
import string  # to use string function


# We wait data from the USB interface, to adapt according to the OS, at 9600 bauds

# For Linux
ser = serial.Serial('/dev/ttyUSB0', 9600)
# For Windows
#ser = serial.Serial('COM4', 9600)

val = 0

try:
    while True:
        if ser.in_waiting :
            with open('../socketio/data.json') as json_data:
                content = json.load(json_data)
            print(content)

            val = ser.readline()
            if val != 0:
                # val est en byte, on la convertie et on la coupe
                val = val.decode("utf-8").replace('\r\n', '').split()
                
                # vérification que le message provient bien d'un client
                if val[2] == '1':
                    x = 0
                    for item in content['bulbs']:
                        # converte bulb's id in byte
                        bytesID = (json.dumps(item['id']).replace('"', '')).encode()
                        #print(bytesID)
                        stringID = ""
                        # concat all bytes in one string
                        for b in bytesID:
                            stringID += str(b)
                        #print(id)
                        if (stringID == val[0]):
                            #print(val[1])
                            #print(item)
                            if  val[1] == '1':
                                item['state'] = True
                            elif val[1] == '0':
                                item['state'] = False
                            content['bulbs'][x] = item
                        x += 1
                    content['python'] = True       
                    print(content)
                    with open('../socketio/data.json', 'w') as json_data:
                        json.dump(content, json_data, sort_keys=True, indent=2)
                else:
                    print("not a client")
                
                
except KeyboardInterrupt:
    pass



