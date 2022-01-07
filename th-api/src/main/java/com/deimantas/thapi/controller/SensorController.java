package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.SensorDto;
import com.deimantas.thapi.domain.dto.SensorRegisterDto;
import com.deimantas.thapi.service.SensorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/sensor")
public class SensorController {
	private final SensorService sensorService;

	@PostMapping
	public ResponseEntity<SensorRegisterDto> registerSensor(@RequestBody SensorRegisterDto data) {
		try {
			sensorService.registerSensor(data);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PatchMapping
	public ResponseEntity<SensorDto> updateSensor(@RequestBody SensorDto data) {
		try {
			return new ResponseEntity<>(sensorService.updateSensor(data), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping
	public ResponseEntity<String> deregisterSensor(@RequestParam String serial) {
		try {
			return new ResponseEntity<>(sensorService.deregisterSensor(serial), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping
	public ResponseEntity<List<SensorDto>> getAllSensors() {
		try {
			return new ResponseEntity<>(sensorService.getAllSensors(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
