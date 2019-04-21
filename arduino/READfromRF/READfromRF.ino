#include <VWComm.h>
#include <VirtualWire.h>

const int receive_pin=11; // Rx data to D11
byte b; // byte to hold received values
int i;
int total;
String dt; // string to use with VWComm
VWComm vwc; // create an object to use with VWComm

void setup()
{
  vw_set_rx_pin(receive_pin);
  vw_setup(2000); // data Rx rate (bits per sec)
  vw_rx_start(); // start the receiver running
  Serial.begin(9600); // initialise serial output
  Serial.println("Starting...");
}
void loop()
{
  total = 0;
  dt = vwc.dataType(); // wait for and identify data
  if (dt == "B") { // code ‘B’ indicates ‘byte’
    b = vwc.readByte();
    Serial.print("Byte received: ");
    Serial.println(b);
  } else if (dt == "I") {
    i = vwc.readInt();
    Serial.print("Int received: ");
    Serial.println(i);
  } else {
    Serial.println("Data type not recognised!");
  }
  Serial.print("");
}
