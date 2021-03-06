#include <VirtualWire.h>

typedef enum {SERVER = 0, CLIENT} Emitter;

typedef struct {
  int state;
  Emitter emitter;
  byte id_TXRX[6];
} MaStructure;

void setup() {
  Serial.begin(9600);

  // Initialisation de la bibliothèque VirtualWire
  // Vous pouvez changez les broches RX/TX/PTT avant vw_setup() si nécessaire
  vw_setup(2000);
  vw_rx_start(); // On peut maintenant recevoir des messages sur le Pin 11
  pinMode(8, OUTPUT);
  digitalWrite(8, LOW);
  //Serial.println("Go");
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
  //vw_wait_rx();
  
  if (vw_get_message((byte *) &message, &taille_message)) {
    
  if (message.emitter == CLIENT) {
    for (int  i = 0 ; i < 6 ; i++)
    {
      Serial.print(message.id_TXRX[i]);
    }
    
    Serial.print(" ");
    Serial.print(message.state);
    Serial.print(" ");
    Serial.print(message.emitter);
    Serial.println(" ");
    digitalWrite(8, HIGH);
    delay(20);
  }
     
    
    
  }
  digitalWrite(8, LOW);
}
