#include <VWComm.h>
#include <VirtualWire.h>

#define PIN 12
const int receive_pin=11; // Rx data to D11
byte b; // byte to hold received values
int i;
String dt; // string to use with VWComm
VWComm vwc; // create an object to use with VWComm

void setup()
{
  vw_set_rx_pin(receive_pin);
  vw_setup(2000); // data Rx rate (bits per sec)
  vw_rx_start(); // start the receiver running
  pinMode(PIN, OUTPUT);
  digitalWrite(PIN, LOW);
  Serial.begin(9600); // initialise serial output
  Serial.println("Starting...");
}
void loop()
{
  dt = vwc.dataType(); // wait for and identify data
  if (dt == "B") { // code ‘B’ indicates ‘byte’
    b = vwc.readByte();
    Serial.print("Byte received: ");
    Serial.println(b);
  } else if (dt == "I") {
    i = vwc.readInt();
    Serial.print("Int received: ");
    Serial.println(i);
    if (i == 0 || i == 1)
      digitalWrite(PIN, i); 
  } else {
    Serial.println("Data type not recognised!");
  }
  Serial.print("");
}
