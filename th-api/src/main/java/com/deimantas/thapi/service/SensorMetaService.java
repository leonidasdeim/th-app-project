package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.SensorMetaEntity;
import com.deimantas.thapi.domain.dto.SensorMetaRequestDto;
import com.deimantas.thapi.domain.dto.SensorMetaResponseDto;
import com.deimantas.thapi.repos.SensorMetaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SensorMetaService {
	private final SensorMetaRepository sensorMetaRepository;

	public SensorMetaResponseDto registerSensor(SensorMetaRequestDto dataDto) {
		String hashedKey = DigestUtils.sha256Hex(dataDto.getPassword());
		var entity = sensorMetaRepository.save(new SensorMetaEntity(dataDto.getName(), hashedKey));

		log.info("Sensor registered: {}", entity);
		return new SensorMetaResponseDto(entity.getId(), entity.getName(), entity.getPassword());
	}
}
