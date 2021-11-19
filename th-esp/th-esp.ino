#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiClient.h>

// config
const char* WIFI_SSID = "#Telia-2168E8";
const char* WIFI_PW = "P92W7GYEcEmEMpGu";
const long BAUD = 115200;
const long SLEEP_MIN = 5;
const char* API = "http://192.168.1.79:8080/data";
const long SENSOR_ID = 1;

void connectToNet();
void sendDataApi();
void wakeUp();
void goSleep();

void setup(void) { 
  Serial.begin(BAUD);
  wakeUp();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    sendDataApi();
    goSleep();
  } else {
    connectToNet();
  }
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
  StaticJsonBuffer<100> JSONbuffer;   //Declaring static JSON buffer
  char JSONmessageBuffer[100];
  JsonObject& JSONencoder = JSONbuffer.createObject();
  
  JSONencoder["sensorId"] = SENSOR_ID;
  JSONencoder["temperature"] = "21,2";
  JSONencoder["humidity"] = "45%";
  JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));

  http.begin(client, API);  
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
