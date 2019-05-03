/*
 * Read data from Arduino and send it to the Pi, through Arduino
*/
#include <VirtualWire.h>

typedef struct {
  int commande;
  int valeur;
} MaStructure;

void setup() {
  Serial.begin(9600);

  // Initialisation de la bibliothèque VirtualWire
  // Vous pouvez changez les broches RX/TX/PTT avant vw_setup() si nécessaire
  vw_setup(2000);
  vw_rx_start(); // On peut maintenant recevoir des messages sur le Pin 11
}

void loop() {
  
  MaStructure message;
  byte taille_message = sizeof(MaStructure);

  /* 
   La variable "taille_message" doit impérativement être remise à 
   la taille de la structure avant de pouvoir recevoir un message. 
   Le plus simple est d'utiliser une variable locale pour ne pas
   avoir à réassigner la valeur à chaque début de loop().
   */

  // On attend de recevoir un message donc prgm est bloquant, si on le retire, alors n'est plus bloquant
  vw_wait_rx();
  
  if (vw_get_message((byte *) &message, &taille_message)) {
    

    //Serial.print("commande="); // Affiche le message
    //Serial.println("*** Commande ***");
    Serial.println(message.commande);
    //Serial.print(" valeur=");
    //Serial.println("*** Valeur ***");
    Serial.println(message.valeur);
    
  }
}
