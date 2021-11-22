package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.dto.SensorDataRequestDto;
import com.deimantas.thapi.domain.SensorDataEntity;
import com.deimantas.thapi.domain.dto.SensorDataResponseDto;
import com.deimantas.thapi.repos.SensorDataRepository;
import com.deimantas.thapi.repos.SensorMetaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class SensorDataService {
	private final SensorDataRepository sensorDataRepository;
	private final SensorMetaRepository sensorMetaRepository;

	public void addSensorData(SensorDataRequestDto requestDto) throws ResponseStatusException {
		var sensorData = sensorMetaRepository.findById(requestDto.getSensorId());
		if (sensorData.isEmpty() || (sensorData.get().getPassword() != requestDto.getKey())) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to identify sensor");
		}

		var entity = new SensorDataEntity(requestDto.getSensorId(), requestDto.getTemperature(), requestDto.getHumidity(), LocalDateTime.now());
		sensorDataRepository.save(entity);

		log.info("New row: {}", entity);
	}

	public ArrayList<SensorDataResponseDto> getSensorData(Long sensorId) throws NoSuchAlgorithmException {
		ArrayList<SensorDataResponseDto> responseDtos = new ArrayList<>();
		ArrayList<SensorDataEntity> sensorDataEntities = sensorDataRepository.findBySensorId(sensorId);
		sensorDataEntities.forEach(entity -> responseDtos.add(new SensorDataResponseDto(entity.getSensorId(), entity.getTemperature(), entity.getHumidity(), entity.getTime())));

		log.info("Fetched rows: {}", sensorDataEntities.size());
		return responseDtos;
	}
}
