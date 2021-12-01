#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiClient.h>
#include <cstring>
#include <DHT.h>

#define DHT_DATA_PIN 14
#define DHT_VCC_PIN 12

// config
const char* WIFI_SSID = "#Telia-2168E8";
const char* WIFI_PW = "P92W7GYEcEmEMpGu";
const long BAUD = 115200;
const long SLEEP_MIN = 5;
const char* API = "https://deimantas.tech/th-api/data";
const long SENSOR_ID = 1;
const char* KEY = "37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578";

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

const long MINUTE = 60e6;
DHT dht; 
float temp = 0;
float humid = 0;

bool connectToNet();
bool sendDataApi();
bool getMeasurements();
void wakeUp();
void goSleep();

void setup(void) { 
  wakeUp();
}

void loop() {
  long sleepTime = SLEEP_MIN * MINUTE;

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
  int delay_cnt = 0;
  WiFi.begin(WIFI_SSID, WIFI_PW);
  Serial.print("Waiting  for network");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
     
    if (delay_cnt > 30) {
      Serial.println("");
      Serial.println("Connection failed");
      return false;
    }
    delay_cnt++;
  }  
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println(WiFi.localIP());

  return true;
}

bool sendDataApi() {
  HTTPClient http;
  WiFiClient client;
  WiFiClientSecure clientSecure;
  StaticJsonBuffer<200> JSONbuffer;   //Declaring static JSON buffer
  char JSONmessageBuffer[200];
  JsonObject& JSONencoder = JSONbuffer.createObject();
  
  JSONencoder["sensorId"] = SENSOR_ID;
  JSONencoder["temperature"] = String(temp);
  JSONencoder["humidity"] = String(humid);
  JSONencoder["key"] = KEY;
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
