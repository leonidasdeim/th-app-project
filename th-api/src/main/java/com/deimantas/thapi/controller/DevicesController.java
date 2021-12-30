package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.DevicesEntity;
import com.deimantas.thapi.service.DevicesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/manufacture")
public class DevicesController {
	private final DevicesService devicesService;

	@PostMapping
	public ResponseEntity<DevicesEntity> addDevice(@RequestBody DevicesEntity data) {
		try {
			return new ResponseEntity<>(devicesService.addDevice(data), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping
	public ResponseEntity<String> deleteDevice(@RequestParam String serial) {
		try {
			return new ResponseEntity<>(devicesService.deleteDevice(serial), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
