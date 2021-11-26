EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L RF_Module:ESP-12F U1
U 1 1 61A0DF15
P 6300 3800
F 0 "U1" H 6300 4781 50  0000 C CNN
F 1 "ESP-12F" H 6300 4690 50  0000 C CNN
F 2 "RF_Module:ESP-12E" H 6300 3800 50  0001 C CNN
F 3 "http://wiki.ai-thinker.com/_media/esp8266/esp8266_series_modules_user_manual_v1.1.pdf" H 5950 3900 50  0001 C CNN
	1    6300 3800
	1    0    0    -1  
$EndComp
Wire Wire Line
	5700 3200 5450 3200
Text GLabel 7250 3800 2    50   Input ~ 0
DHT11_VCC
Wire Wire Line
	7250 3800 6900 3800
Text GLabel 8650 3300 2    50   Input ~ 0
DHT11_VCC
Text GLabel 7250 4000 2    50   Input ~ 0
DHT11_IO
Wire Wire Line
	7250 4000 6900 4000
Text GLabel 8250 3700 3    50   Input ~ 0
DHT11_IO
Wire Wire Line
	8250 3700 8250 3600
Wire Wire Line
	8550 3300 8650 3300
NoConn ~ 6900 3900
$Comp
L Sensor:DHT11 U2
U 1 1 61A0ED73
P 8250 3300
F 0 "U2" V 7869 3300 50  0000 C CNN
F 1 "DHT11" V 7960 3300 50  0000 C CNN
F 2 "Sensor:Aosong_DHT11_5.5x12.0_P2.54mm" H 8250 2900 50  0001 C CNN
F 3 "http://akizukidenshi.com/download/ds/aosong/DHT11.pdf" H 8400 3550 50  0001 C CNN
	1    8250 3300
	0    1    1    0   
$EndComp
Wire Wire Line
	7950 3300 7850 3300
Wire Wire Line
	7850 3300 7850 4850
Wire Wire Line
	7850 4850 6300 4850
Wire Wire Line
	6300 4850 6300 4500
Wire Wire Line
	5450 3200 5450 2700
Wire Wire Line
	5450 2700 7050 2700
Wire Wire Line
	7050 2700 7050 4200
Wire Wire Line
	7050 4200 6900 4200
$EndSCHEMATC
