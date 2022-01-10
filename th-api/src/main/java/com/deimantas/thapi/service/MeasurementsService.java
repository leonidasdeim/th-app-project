package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.dto.MeasurementsRequestDto;
import com.deimantas.thapi.domain.MeasurementsEntity;
import com.deimantas.thapi.domain.dto.MeasurementsResponseDto;
import com.deimantas.thapi.repos.MeasurementsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MeasurementsService {
	private final MeasurementsRepository measurementsRepository;
	private final SensorService sensorService;

	public void addSensorData(MeasurementsRequestDto requestDto) throws ResponseStatusException {
		var sensorEntity = sensorService.verifySensor(requestDto.getSerial());
		if (sensorEntity == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to verify sensor");
		}

		var entity = new MeasurementsEntity(sensorEntity.getId(), requestDto.getTemperature(), requestDto.getHumidity(), LocalDateTime.now());
		measurementsRepository.save(entity);

		log.info("New row: {}", entity);
	}

	public List<MeasurementsResponseDto> getSensorData(String serial, Integer day) throws NoSuchAlgorithmException {
		var sensorEntity = sensorService.verifySensor(serial);
		if (sensorEntity.getId() == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to verify sensor");
		}

		var listEntities = measurementsRepository.findSensorMeasurements(sensorEntity.getId(), day);
		List<MeasurementsResponseDto> listResponse = new ArrayList<>();
		listEntities.forEach(entity ->
			listResponse.add(new MeasurementsResponseDto(entity.getTemperature(), entity.getHumidity(), Timestamp.valueOf(entity.getTime()).getTime()))
		);

		log.info("Fetched rows: {} {}", listEntities.size());
		return listResponse;
	}
}
