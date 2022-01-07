package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.SensorEntity;
import com.deimantas.thapi.domain.UserEntity;
import com.deimantas.thapi.domain.dto.SensorDto;
import com.deimantas.thapi.domain.dto.SensorRegisterDto;
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

import javax.management.AttributeNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SensorService {
	private final SensorRepository sensorRepository;
	private final DevicesRepository devicesRepository;
	private final UserRepository userRepository;
	private final SecurityService securityService;

	private static final String ERROR_MSG = "Unable to verify device";

	public void registerSensor(SensorRegisterDto requestDto) {
		var sensorId = verifySensor(requestDto.getSerial());
		var deviceId = verifyDevice(requestDto.getSerial());
		if (sensorId != null || deviceId == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ERROR_MSG);
		}
		var entity = sensorRepository.save(new SensorEntity(
				"TH sensor",
				requestDto.getSerial(),
				getUserByEmail(requestDto.getEmail()).getId(),
				null,
				deviceId));

		log.info("Sensor registered: {}", entity);
	}

	public String deregisterSensor(String serialId) {
		var sensorId = verifySensor(serialId);
		if (sensorId == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ERROR_MSG);
		}
		sensorRepository.deleteById(sensorId);

		log.info("Sensor deregistered: {}", serialId);
		return serialId;
	}

	public SensorDto updateSensor(SensorDto requestDto) {
		var sensorEntity = sensorRepository.findBySerial(requestDto.getSerial())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ERROR_MSG));

		if (getUser().getId().equals(sensorEntity.getUserId())) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ERROR_MSG);
		}

		sensorEntity.setAreaId(requestDto.getAreaId());
		sensorEntity.setName(requestDto.getName());
		sensorRepository.save(sensorEntity);

		log.info("Sensor updated: {}", sensorEntity);
		return new SensorDto(sensorEntity.getSerial(), sensorEntity.getName(), sensorEntity.getAreaId());
	}

	public List<SensorDto> getAllSensors() {
		var listEntities = sensorRepository.findByUserId(getUser().getId());
		List<SensorDto> listResponse = new ArrayList<>();
		listEntities.forEach(entity -> listResponse.add(new SensorDto(entity.getSerial(), entity.getName(), entity.getAreaId())));

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

	private UserEntity getUserByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(String.format("User Not Found with this email %s", email)));
	}
}
