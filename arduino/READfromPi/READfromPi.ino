#define PIN = 12
int incomingByte;
int state = LOW;
void setup()
{
  Serial.begin(9600);
  pinMode(PIN, OUTPUT);
  digitalWrite(PIN, LOW);
  
}
void loop()
{
  if(Serial.available())  {
    incomingByte = (Serial.read() - '0');
    Serial.print("Read is ");
    Serial.println(incomingByte);
    if(incomingByte == 1) {
      if (!state) {
        state = HIGH;
        digitalWrite(PIN, HIGH);
      }else{
        state = LOW
        digitalWrite(PIN, LOW);
      }
    }
    incomingByte = -1;
  }
  delay(10);
}