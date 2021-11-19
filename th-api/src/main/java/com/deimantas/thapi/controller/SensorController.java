package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.SensorDataDto;
import com.deimantas.thapi.service.SensorDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	public ResponseEntity addSensorData(@RequestBody SensorDataDto data) {
		data.setTime(LocalDateTime.now());
		sensorDataService.addSensorData(data);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ArrayList<SensorDataDto> getAllAssignees(@RequestParam Long sensorId) {
		return sensorDataService.getSensorData(sensorId);
	}

}