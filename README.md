# Home app project
Full solution for temperature &amp; humidity indoor monitoring. 

But main goal of the project is to add more and more home monitoring and automation functionality.

## Preview

Project is published, you can check it here:
https://deimantas.tech/th/

Screenshot/preview of one sensor measurements:

<img src="docs/preview.png" width="450">

## Project structure and stack
- `th-api` - server written in *Java/SpringBoot/PostreSQL*.
- `th-web` - client written in *Javascript/React*.
- `th-board` - PCB schematics and board, *KiCad* project.
- `th-esp` - sensor sources written with *Arduino* libraries.
- `docs` - other files

## Board

Temperature and humidity sensor board is based on *ESP8266* microcontroller in the *ESP-12F* (or *ESP-12E*) module.
For measurements *DHT11* sensor is used

### PCB Render
<img src="docs/pcb_1_2.png" width="450">

## Server

To start server docker container run this command in *th-app-project/th-api* folder:

`docker-compose up`

## Client

To start client application run these regular React commands in *th-app-project/th-web* folder:

`npm install`

`npm start`

## Workflow

*to be added*
