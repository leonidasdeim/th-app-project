package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.SensorRequestDto;
import com.deimantas.thapi.domain.dto.SensorResponseDto;
import com.deimantas.thapi.service.SensorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/sensor")
public class SensorController {
	private final SensorService sensorService;

	@PostMapping
	public ResponseEntity<SensorResponseDto> registerSensor(@RequestBody SensorRequestDto data) {
		try {
			return new ResponseEntity<>(sensorService.registerSensor(data), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
