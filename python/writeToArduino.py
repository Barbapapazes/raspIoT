import sys     # pour la gestion des parametres
import serial  # bibliothèque permettant la communication série
import time    # pour gérer le temps
#On écrit dans l'interface /dev/ttyUSB0 à 9600 bauds
ser = serial.Serial('/dev/ttyUSB0', 9600)
#On écrit dans la console série de l'Arduino la lettre passée en paramètre lors de l'éxecution de la commande :
ser.write(sys.argv[1].encode('ascii'))
time.sleep(0.010)