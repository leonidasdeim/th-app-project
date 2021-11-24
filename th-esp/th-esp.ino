#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiClient.h>
#include <cstring>

// config
const char* WIFI_SSID = "#Telia-2168E8";
const char* WIFI_PW = "P92W7GYEcEmEMpGu";
const long BAUD = 115200;
const long SLEEP_MIN = 5;
const char* API = "https://deimantas.tech/th-api/data";
//const char* API = "http://192.168.1.79:8080/data";
const long SENSOR_ID = 1;
const char* KEY = "37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578";

long temp = 0;
long humid = 0;

void connectToNet();
void sendDataApi();
void wakeUp();
void goSleep();
void getMeasurements();

void setup(void) { 
  Serial.begin(BAUD);
  randomSeed(analogRead(0));
  wakeUp();
}



void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    getMeasurements();
    sendDataApi();
    goSleep();
  } else {
    connectToNet();
  }
}

void getMeasurements() {
  temp = random(17, 26);
  humid = random(30, 50);
}

void connectToNet() {
  Serial.println("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PW);

  while (WiFi.status() != WL_CONNECTED) {
     delay(1000);
     Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println(WiFi.localIP());
}

void sendDataApi() {
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
  Serial.println("Response:");
  Serial.println(httpCode);
}

void wakeUp() {
  Serial.println("");
  Serial.println("-----------------------------------------------");
  Serial.println("Wakeup");
}

void goSleep() {
  Serial.println("Request done. Going to sleep");
  Serial.println("-----------------------------------------------");
  ESP.deepSleep(SLEEP_MIN * 60e6); 
}
