#include <VirtualWire.h>

#define PINBUTTON 7

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

  for (int i = 2; i < 6; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }

  pinMode(PINBUTTON, INPUT_PULLUP);
  
  Serial.println("Go !"); 
}

bool previousStateButton = digitalRead(PINBUTTON);
bool newStateButton = digitalRead(PINBUTTON);
bool previousStateBulb = 0;
bool newStateBulb;
int numBulb;

int counter = 0;
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
  //vw_wait_rx();
  newStateButton = digitalRead(PINBUTTON);
  if (vw_get_message((byte *) &message, &taille_message)) {
    
    numBulb = message.commande;
    previousStateBulb = newStateBulb;
    newStateBulb = message.valeur;
    

    /*Serial.print("commande="); // Affiche le message
    Serial.print(message.commande);
    Serial.print(" valeur=");
    Serial.println(message.valeur);*/
    
  } else if (previousStateButton != newStateButton) {
    
      previousStateButton = newStateButton;
      
      numBulb = 0;
      previousStateBulb = newStateBulb;
      newStateBulb = (previousStateBulb == 1) ? 0: 1;
      
  }
  if (previousStateBulb != newStateBulb) {
    Serial.print("*****  ");
    Serial.print(counter);
    Serial.println("  *****");
    Serial.println("Before: ");
    Serial.print("Previous ");
    Serial.println(previousStateBulb);
    Serial.print("New ");
    Serial.println(newStateBulb);
    
    digitalWrite(numBulb + 2, newStateBulb);
    previousStateBulb = newStateBulb;

    message.commande = numBulb;
    message.valeur = newStateBulb;

      //Pour s'assurer que le message est bien reçu, on l'envoie plusieurs fois
  for (int i = 0; i < 2 ; i++) {
      vw_send((byte*) &message, sizeof(message)); // On envoie le message
  vw_wait_tx(); // On attend la fin de l'envoi sur le pin 12
  }
    
    Serial.println("After: ");
    Serial.print("Previous ");
    Serial.println(previousStateBulb);
    Serial.print("New ");
    Serial.println(newStateBulb);
    counter++;

  }
}
