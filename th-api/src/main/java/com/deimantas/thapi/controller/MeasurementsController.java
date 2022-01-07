package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.MeasurementsRequestDto;
import com.deimantas.thapi.domain.dto.MeasurementsResponseDto;
import com.deimantas.thapi.service.MeasurementsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/data")
public class MeasurementsController {
	private final MeasurementsService measurementsService;

	@PostMapping
	public ResponseEntity<String> addSensorData(@RequestBody MeasurementsRequestDto data) {
		try {
			measurementsService.addSensorData(data);
		} catch (ResponseStatusException e) {
			return new ResponseEntity<>(e.getMessage(),	HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>("OK",	HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<MeasurementsResponseDto>> getSensorData(@RequestParam String serial, @RequestParam Integer day) {
		try {
			var response = measurementsService.getSensorData(serial, day);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}