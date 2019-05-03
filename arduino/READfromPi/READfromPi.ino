/**
 * Exemple de code pour la bibliothèque VirtualWire – Client d'envoi de structure
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
  
  Serial.println("Go !"); 
}
 
void loop() {
  MaStructure message;
  
  // Lit un nombre depuis le port série
  while(!Serial.available()); // Attend un caractère
     message.commande = Serial.parseInt();
  // Lit un nombre depuis le port série
  while(!Serial.available()); // Attend un caractère
     message.valeur = Serial.parseInt();
  while(Serial.read() != -1);

  //Pour s'assurer que le message est bien reçu, on l'envoie plusieurs fois
  for (int i = 0; i < 2 ; i++) {
      vw_send((byte*) &message, sizeof(message)); // On envoie le message
  vw_wait_tx(); // On attend la fin de l'envoi sur le pin 12
  }
} 
