#include <VirtualWire.h>
#include <VWComm.h>

#define PINLED 8 // pin to handle the Led
#define TX_PIN 12 // pin to use the TX

int incomingByte;
int state = LOW;

VWComm vwc; // create an object to use with VWComm

void setup() {
    Serial.begin(9600); // use for receive and transmit through the USB

    vw_set_tx_pin(TX_PIN);
    vw_setup(2000); // data tx rate (bits per sec)

    pinMode(PINLED, OUTPUT);
    digitalWrite(PINLED, state);
}

void loop () {
    if(Serial.available()) {
        incomingByte = (Serial.read() - '0');
        Serial.println(incomingByte);
        for(int i = 0; i < 3; i++)
        {
            vwc.sendInt(incomingByte);
        }
    }
}

