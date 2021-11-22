package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.MeasurementsRequestDto;
import com.deimantas.thapi.domain.dto.MeasurementsResponseDto;
import com.deimantas.thapi.service.MeasurementsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/data")
public class MeasurementsController {
	private final MeasurementsService measurementsService;

	@ApiIgnore
	@PostMapping
	public ResponseEntity<String> addSensorData(@RequestBody MeasurementsRequestDto data) {
		try {
			measurementsService.addSensorData(data);
		} catch (ResponseStatusException e) {
			return new ResponseEntity<>(e.getMessage(),	HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>("OK",	HttpStatus.OK);
	}

	@Operation(summary = "Get sensor measurements by ID")
	@GetMapping
	public ResponseEntity<ArrayList<MeasurementsResponseDto>> getSensorData(@RequestParam Long sensorId) {
		try {
			var response = measurementsService.getSensorData(sensorId);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}