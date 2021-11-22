package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.SensorEntity;
import com.deimantas.thapi.domain.dto.SensorRequestDto;
import com.deimantas.thapi.domain.dto.SensorResponseDto;
import com.deimantas.thapi.repos.SensorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class SensorService {
	private final SensorRepository sensorRepository;

	public SensorResponseDto registerSensor(SensorRequestDto requestDto) {
		String hashedKey = DigestUtils.sha256Hex(requestDto.getPassword());
		var entity = sensorRepository.save(new SensorEntity(requestDto.getName(), hashedKey));

		log.info("Sensor registered: {}", entity);
		return new SensorResponseDto(entity.getId(), entity.getName(), entity.getPassword());
	}

	public ArrayList<SensorResponseDto> getAllSensors() {
		var listEntities = sensorRepository.findAll();
		var listResponse = new ArrayList<SensorResponseDto>();
		listEntities.forEach(entity -> listResponse.add(new SensorResponseDto(entity.getId(), entity.getName())));

		log.info("Fetched sensors: {}", listEntities.size());
		return listResponse;
	}

	public Boolean verifySensor(Long id, String key) {
		var sensorData = sensorRepository.findById(id);
		if (sensorData.isPresent() && sensorData.get().getPassword().equals(key)) {
			return true;
		}
		return false;
	}
}
