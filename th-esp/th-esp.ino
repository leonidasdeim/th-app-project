#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <WiFiManager.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <cstring>

#define DHT_DATA_PIN 14
#define DHT_VCC_PIN 12

#define MINUTE 60e6
#define SLEEP_MIN 10
#define BAUD 115200

const char* API = "https://deimantas.tech/th-api/data";

// globals
enum APP_STATE {
  CONNECT,
  MEASUREMENT,
  SENDING,
  SLEEP,
  ERR,
  NONE
};
APP_STATE state = NONE;

DHT dht; 
float temp = 0;
float humid = 0;
char macArray[15];
long sleepTime = SLEEP_MIN * MINUTE;

bool connectToNet();
bool sendDataApi();
bool getMeasurements();
void wakeUp();
void goSleep();

void setup(void) { 
  delay(1000);
  wakeUp();
}

void loop() {
  switch (state) {
    case CONNECT:
      Serial.println("---CONNECT STATE");
      if (connectToNet()) {
        state = MEASUREMENT;
      } else {
        state = ERR;
      }
      break;  
      
    case MEASUREMENT:
      Serial.println("---MEASUREMENT STATE");
      if (getMeasurements()) {
        state = SENDING;
      } else {
        state = ERR;
      }
      break;  
      
    case SENDING:
      Serial.println("---SENDING STATE");
      if (sendDataApi()) {
        state = SLEEP;
      } else {
        state = ERR;
      }
      break;  
      
    case ERR:
      Serial.println("---ERR STATE");
      Serial.println("Go to sleep for 1 min");
      sleepTime = MINUTE;
      
    case SLEEP:
      Serial.println("---SLEEP STATE");
      goSleep(sleepTime);
      break;    

    default:
      state = ERR;
      break;
  }
}

void wakeUp() {
  Serial.begin(BAUD);
  dht.setup(DHT_DATA_PIN);
  pinMode(DHT_VCC_PIN, OUTPUT);
  digitalWrite(DHT_VCC_PIN, HIGH);

  String macString = WiFi.macAddress();
  macString.replace(":", "");
  macString.toCharArray(macArray, 15);
    
  Serial.println("");
  Serial.println("-----------------------------------------------");
  Serial.println("Wakeup");
  Serial.println("-----------------------------------------------");

  state = CONNECT;
}

void goSleep(long sleep) {
  digitalWrite(DHT_VCC_PIN, LOW);

  Serial.println("-----------------------------------------------");
  Serial.println("Going to sleep");
  Serial.println("-----------------------------------------------");
  ESP.deepSleep(sleep); 
}

bool getMeasurements() {
  humid = dht.getHumidity();
  temp = dht.getTemperature();
  
  Serial.print("Data from sensor received: ");
  Serial.print(temp);
  Serial.print(" ");
  Serial.println(humid);

  if(isnan(temp) || isnan(humid)) {
    return false;
  }

  return true;
}

bool connectToNet() {
  WiFiManager wifiManager;
  //wifiManager.resetSettings();

  char buffer[100];
  sprintf(buffer, "<p>Serial number of the module is: %s</p>", macArray);
  WiFiManagerParameter custom_text(buffer);
  wifiManager.addParameter(&custom_text);
  
  wifiManager.autoConnect("HomeSensor AP");
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("");
    Serial.println("Connection failed");
    return false;
  }  
  return true;
}

bool sendDataApi() {
  HTTPClient http;
  WiFiClient client;
  WiFiClientSecure clientSecure;
  StaticJsonBuffer<200> JSONbuffer;   //Declaring static JSON buffer
  char JSONmessageBuffer[200];
  JsonObject& JSONencoder = JSONbuffer.createObject();
  
  JSONencoder["serial"] = macArray;
  JSONencoder["temperature"] = temp;
  JSONencoder["humidity"] = humid;
  JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));

  if (std::strncmp(API, "https", 5) == 0) {
    clientSecure.setInsecure();
    http.begin(clientSecure, API); 
  } else {
    http.begin(client, API);
  }
  
  http.addHeader("Content-Type", "application/json"); 
  
  int httpCode = http.POST(JSONmessageBuffer);   //Send the request
  
  http.end();

  Serial.println("Request:");
  Serial.println(JSONmessageBuffer);
  Serial.print("Response: ");
  Serial.println(httpCode);

  
  if (httpCode == 200) {
    Serial.println("Data sent successfully");
  } else {
    Serial.println("Failed to send");
    return false;
  }
  
  return true;
}
