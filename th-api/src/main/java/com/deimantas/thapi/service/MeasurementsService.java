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
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class MeasurementsService {
	private final MeasurementsRepository measurementsRepository;
	private final SensorService sensorService;

	public void addSensorData(MeasurementsRequestDto requestDto) throws ResponseStatusException {
		if (!sensorService.verifySensor(requestDto.getSensorId(), requestDto.getKey())) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to verify sensor");
		}

		var entity = new MeasurementsEntity(requestDto.getSensorId(), requestDto.getTemperature(), requestDto.getHumidity(), LocalDateTime.now());
		measurementsRepository.save(entity);

		log.info("New row: {}", entity);
	}

	public ArrayList<MeasurementsResponseDto> getSensorData(Long sensorId) throws NoSuchAlgorithmException {
		ArrayList<MeasurementsResponseDto> responseDtos = new ArrayList<>();
		ArrayList<MeasurementsEntity> sensorDataEntities = measurementsRepository.findBySensorId(sensorId);
		sensorDataEntities.forEach(entity -> responseDtos.add(new MeasurementsResponseDto(entity.getSensorId(), entity.getTemperature(), entity.getHumidity(), entity.getTime())));

		log.info("Fetched rows: {}", sensorDataEntities.size());
		return responseDtos;
	}
}
