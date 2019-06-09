#include <VirtualWire.h>

// enum de filtrages
typedef enum {SERVER = 0, CLIENT} Emitter;
typedef enum {RELAY = 0, PWM, PWM_RGB} Type;

// Struct de data
typedef struct {
  byte id_TXRX[6];
  float state;
  Emitter emitter;
  Type type;
} MaStructure;

void setup() {
  Serial.begin(9600);

  // Initialisation de la bibliothèque VirtualWire
  vw_setup(2000);
  
}
 
void loop() {
  MaStructure message;
  
  // init variables
  message.state = -1;
  for (int  i = 0 ; i < 6 ; i++)
  {
    message.id_TXRX[i] = 0;
  }

  while(!Serial.available()); // tourne en boucle tand que il n'y a rien dans le buffer
  Serial.readBytes(message.id_TXRX, 6); // lit 6 bytes du buffer
  message.state = Serial.parseFloat(); // parseInt() returns the first valid (long) integer number from the serial buffer. Characters that are not integers (or the minus sign) are skipped.
  message.emitter = Serial.parseInt();
  message.type = Serial.parseInt();
  while(Serial.read() != -1); // vide le buffer

  //Pour s'assurer que le message est bien reçu, on l'envoie plusieurs fois
  //for (int i = 0; i < 2 ; i++) {
      vw_send((byte*) &message, sizeof(message)); // On envoie le message
  vw_wait_tx(); // On attend la fin de l'envoi sur le pin 12
  //}
} 
