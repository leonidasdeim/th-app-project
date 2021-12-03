package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.SensorEntity;
import com.deimantas.thapi.domain.dto.SensorDto;
import com.deimantas.thapi.repos.SensorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class SensorService {
	private final SensorRepository sensorRepository;

	public SensorDto registerSensor(SensorDto requestDto) {
		var checkSensor = verifySensor(requestDto.getSerial());
		if (checkSensor != null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to register new sensor");
		}

		var entity = sensorRepository.save(new SensorEntity(requestDto.getName(), requestDto.getSerial()));

		log.info("Sensor registered: {}", entity);
		return new SensorDto(entity.getName(), entity.getSerial());
	}

	public ArrayList<SensorDto> getAllSensors() {
		var listEntities = sensorRepository.findAll();
		var listResponse = new ArrayList<SensorDto>();
		listEntities.forEach(entity -> listResponse.add(new SensorDto(entity.getName(), entity.getSerial())));

		log.info("Fetched sensors: {}", listEntities.size());
		return listResponse;
	}

	public Long verifySensor(String serial) {
		var sensorData = sensorRepository.findBySerial(serial);
		if (sensorData.isPresent()) {
			return sensorData.get().getId();
		}
		return null;
	}
}
