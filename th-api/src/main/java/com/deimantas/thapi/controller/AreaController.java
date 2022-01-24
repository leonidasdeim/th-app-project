package com.deimantas.thapi.controller;

import com.deimantas.thapi.domain.dto.AreaDto;
import com.deimantas.thapi.service.AreaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/area")
public class AreaController {
	private final AreaService areaService;

	@PostMapping
	public ResponseEntity<AreaDto> registerArea(@RequestBody AreaDto data) {
		try {
			return new ResponseEntity<>(areaService.registerArea(data), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping
	public ResponseEntity<AreaDto> deleteArea(@RequestBody AreaDto data) {
		try {
			var response = areaService.deleteArea(data);
			if (response != null) {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping
	public ResponseEntity<List<AreaDto>> getAllAreas() {
		try {
			return new ResponseEntity<>(areaService.getAllAreas(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
