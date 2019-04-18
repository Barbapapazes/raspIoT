int incomingByte;
void setup()
{
  Serial.begin(9600);
  pinMode(12, OUTPUT);
  digitalWrite(12, HIGH);
  
}
void loop()
{
  while (Serial.available())  {
    incomingByte = (Serial.read() - '0');
    Serial.println(incomingByte);
    if(incomingByte == 1) {
            digitalWrite(12, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(1000);                       // wait for a second
      digitalWrite(12, LOW);    // turn the LED off by making the voltage LOW
      delay(1000);                       // wait for a second
    }
  }
  delay(10);
}