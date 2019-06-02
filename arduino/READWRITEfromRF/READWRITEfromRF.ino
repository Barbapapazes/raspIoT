#include <VirtualWire.h>

// ID de l'arduino
const byte id_Arduino[] = {97,122,101,114,116,89};

#define PINBUTTON 7

typedef enum {SERVER = 0, CLIENT} Emitter;

typedef struct {
  int state;
  Emitter emitter;
  byte id_TXRX[6];
} MaStructure;

// fonction pour vérifier la correspondance entre l'id du message et celle de l'arduino
int authenticated(const byte *id_Arduino, byte *id_ToVerif);

void setup() {
  Serial.begin(9600);

  // Initialisation de la bibliothèque VirtualWire
  // Vous pouvez changez les broches RX/TX/PTT avant vw_setup() si nécessaire
  vw_setup(2000);
  vw_rx_start(); // On peut maintenant recevoir des messages sur le Pin 11

  pinMode(8, OUTPUT);
  digitalWrite(8, LOW);


  pinMode(PINBUTTON, INPUT);

}

bool previousStateButton = digitalRead(PINBUTTON);
bool newStateButton = digitalRead(PINBUTTON);
bool previousStateBulb = 0;
bool newStateBulb = 0;

void loop() {
  MaStructure message;

  for (int i = 0 ; i < 6 ; i++) {
    message.id_TXRX[i] = id_Arduino[i];
  }
  byte taille_message = sizeof(MaStructure);

  /* 
  La variable "taille_message" doit impérativement être remise à 
  la taille de la structure avant de pouvoir recevoir un message. 
  Le plus simple est d'utiliser une variable locale pour ne pas
  avoir à réassigner la valeur à chaque début de loop().
  */

  newStateButton = digitalRead(PINBUTTON);

  if (vw_get_message((byte *) &message, &taille_message)) {

    for (int  i = 0 ; i < 6 ; i++)
    {
      Serial.print(message.id_TXRX[i]);
    }
    
    Serial.print(" ");
    Serial.print(message.state);
    Serial.print(" ");
    Serial.print(message.emitter);
    Serial.print(" ");

    if (authenticated(id_Arduino, message.id_TXRX) && message.emitter == SERVER) {

      previousStateBulb = newStateBulb;
      newStateBulb = message.state;

      digitalWrite(8, newStateBulb);
    }

  } else if (previousStateButton != newStateButton) {

    Serial.println("State Change");
    previousStateButton = newStateButton;

    previousStateBulb = newStateBulb;
    newStateBulb = (previousStateBulb == 1) ? 0: 1;
    
    Serial.print("State:");
    Serial.println(newStateBulb);

    digitalWrite(8, newStateBulb);

    message.state = newStateBulb;
    message.emitter = CLIENT;
    for (int  i = 0 ; i < 6 ; i++)
    {
      Serial.print(message.id_TXRX[i]);
    }
    
    Serial.println("");
    Serial.print("State: ");
    Serial.println(message.state);
    Serial.print("Sender: ");
    Serial.println(message.emitter);
    

    //Pour s'assurer que le message est bien reçu, on l'envoie plusieurs fois
    for (int i = 0; i < 2 ; i++) {
      vw_send((byte*) &message, sizeof(message) ); // On envoie le message
      vw_wait_tx(); // On attend la fin de l'envoi sur le pin 12
    }
    delay(10);
  }

}

int authenticated(const byte *id_Arduino, byte *id_ToVerif) {
  for (int i = 0 ; i < 6 ; i++) {
    if (id_Arduino[i] != id_ToVerif[i])
      return 0;
  }
  return 1;
}
