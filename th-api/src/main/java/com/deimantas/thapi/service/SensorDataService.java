package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.SensorDataDto;
import com.deimantas.thapi.domain.SensorDataEntity;
import com.deimantas.thapi.repos.SensorDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class SensorDataService {
	private final SensorDataRepository sensorDataRepository;

	public void addSensorData(SensorDataDto dataDto) {
		var entity = new SensorDataEntity(dataDto.getSensorId(), dataDto.getTemperature(), dataDto.getHumidity(), dataDto.getTime());
		sensorDataRepository.save(entity);

		log.info("New row: {}", entity);
	}

	public ArrayList<SensorDataDto> getSensorData(Long sensorId) {
		ArrayList<SensorDataDto> sensorDataDtos = new ArrayList<>();
		ArrayList<SensorDataEntity> sensorDataEntities = sensorDataRepository.findBySensorId(sensorId);
		sensorDataEntities.forEach(entity -> sensorDataDtos.add(new SensorDataDto(entity.getSensorId(), entity.getTemperature(), entity.getHumidity(), entity.getTime())));

		log.info("Fetched rows: {}", sensorDataEntities.size());
		return sensorDataDtos;
	}
}
