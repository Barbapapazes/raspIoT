import sys     # pour la gestion des parametres
import serial  # bibliothèque permettant la communication série
#On écrit dans l'interface /dev/ttyUSB0 à 9600 bauds
ser = serial.Serial('/dev/ttyUSB0', 9600)
#On écrit dans la console série de l'Arduino la lettre passée en paraètre lors de l'éxecution de la commande :
ser.write(sys.argv[1].encode('ascii'))