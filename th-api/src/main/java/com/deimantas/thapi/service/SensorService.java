package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.SensorEntity;
import com.deimantas.thapi.domain.UserEntity;
import com.deimantas.thapi.domain.dto.SensorDto;
import com.deimantas.thapi.repos.DevicesRepository;
import com.deimantas.thapi.repos.SensorRepository;
import com.deimantas.thapi.repos.UserRepository;
import com.deimantas.thapi.security.services.SecurityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class SensorService {
	private final SensorRepository sensorRepository;
	private final DevicesRepository devicesRepository;
	private final UserRepository userRepository;
	private final SecurityService securityService;

	public SensorDto registerSensor(SensorDto requestDto) {
		var sensorId = verifySensor(requestDto.getSerial());
		var deviceId = verifyDevice(requestDto.getSerial());
		if (sensorId != null || deviceId == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to register new sensor");
		}
		var entity = sensorRepository.save(new SensorEntity("TH sensor", requestDto.getSerial(), getUser().getId(), requestDto.getAreaId(), deviceId));

		log.info("Sensor registered: {}", entity);
		return new SensorDto(entity.getSerial(), entity.getAreaId());
	}

	public String deregisterSensor(String serialId) {
		var sensorId = verifySensor(serialId);
		if (sensorId == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to register new sensor");
		}
		sensorRepository.deleteById(sensorId);

		log.info("Sensor deregistered: {}", serialId);
		return serialId;
	}

	public ArrayList<SensorDto> getAllSensors() {
		var listEntities = sensorRepository.findByUserId(getUser().getId());
		var listResponse = new ArrayList<SensorDto>();
		listEntities.forEach(entity -> listResponse.add(new SensorDto(entity.getSerial(), entity.getAreaId())));

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

	public Long verifyDevice(String serial) {
		var deviceData = devicesRepository.findBySerial(serial);
		if (deviceData.isPresent()) {
			return deviceData.get().getId();
		}
		return null;
	}

	private UserEntity getUser() {
		return userRepository.findByUsername(securityService.findLoggedInUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with this username"));
	}
}
