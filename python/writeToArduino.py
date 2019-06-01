import sys     # for parameter management
import serial  # library for serial communication
import time    # to manage time
# We write in the USB interface, to adapt according to the OS, at 9600 bauds

# For Linux
#ser = serial.Serial('/dev/ttyUSB0', 9600)
# For Windows
ser = serial.Serial('COM4', 9600)

# We write in the serial console of the Arduino the values passed in parameter during the execution of the command

val1 = (sys.argv[1]).encode('utf-8')
print(type(sys.argv[1]))
print(type(val1))
print(val1)
val2 = (sys.argv[2]).encode('utf-8')
print(type(sys.argv[2]))
print(type(val2))
print(val2)

# We combine the 2 values to match the expectations of the Arduino
val = val1 + (' ').encode('utf-8') + val2 + (' ').encode('utf-8')
print(val)

# We send the value
ser.write(('azertY 1 0').encode())

# To prevent the Arduino from resetting during the sending of the data, a capacitor 104 must be placed between the GND and the RST

#time.sleep(0.010)