package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.SensorMetaRequestDto;
import com.deimantas.thapi.domain.dto.SensorMetaResponseDto;
import com.deimantas.thapi.service.SensorMetaService;
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
	private final SensorMetaService sensorMetaService;

	@PostMapping
	public ResponseEntity<SensorMetaResponseDto> registerSensor(@RequestBody SensorMetaRequestDto data) {
		return new ResponseEntity<>(sensorMetaService.registerSensor(data), HttpStatus.OK);
	}
}
