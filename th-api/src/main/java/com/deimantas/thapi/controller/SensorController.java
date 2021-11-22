package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.SensorRequestDto;
import com.deimantas.thapi.domain.dto.SensorResponseDto;
import com.deimantas.thapi.service.SensorService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/sensor")
public class SensorController {
	private final SensorService sensorService;

	@Operation(summary = "Register new sensor")
	@PostMapping
	public ResponseEntity<SensorResponseDto> registerSensor(@RequestBody SensorRequestDto data) {
		try {
			return new ResponseEntity<>(sensorService.registerSensor(data), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "Get all registered sensors")
	@GetMapping("/all")
	public ResponseEntity<ArrayList<SensorResponseDto>> getAllSensors() {
		try {
			return new ResponseEntity<>(sensorService.getAllSensors(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
