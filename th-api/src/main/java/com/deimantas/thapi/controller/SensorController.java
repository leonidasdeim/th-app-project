package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.SensorDataRequestDto;
import com.deimantas.thapi.domain.dto.SensorDataResponseDto;
import com.deimantas.thapi.service.SensorDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/data")
public class SensorController {
	private final SensorDataService sensorDataService;

	@PostMapping
	public ResponseEntity addSensorData(@RequestBody SensorDataRequestDto data) {
		try {
			sensorDataService.addSensorData(data);
		} catch (ResponseStatusException e) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ArrayList<SensorDataResponseDto> getSensorData(@RequestParam Long sensorId) throws NoSuchAlgorithmException {
		return sensorDataService.getSensorData(sensorId);
	}

}