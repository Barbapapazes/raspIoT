#include <VirtualWire.h>
#include <VWComm.h>
int incomingInt;
const int transmit_pin = 12; // Tx data to D12
VWComm vwc; // create an object to use with VWComm
void setup()
{
  vw_set_tx_pin(transmit_pin);
  vw_setup(2000); // Data Tx rate (bits per sec)
}

void loop()
{
  if(Serial.available()) {
    incomingInt = (Serial.read() - '0');
    vwc.sendInt(incomingInt);
  }
}