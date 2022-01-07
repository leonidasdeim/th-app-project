package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.DevicesEntity;
import com.deimantas.thapi.domain.dto.NewDeviceDto;
import com.deimantas.thapi.repos.DevicesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
@RequiredArgsConstructor
public class DevicesService {
	private final DevicesRepository devicesRepository;

	public DevicesEntity addDevice(NewDeviceDto request) {
		var deviceId = verifyDevice(request.getSerial());
		if (deviceId != null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to register new device");
		}
		var entity = devicesRepository.save(new DevicesEntity(request.getDeviceType(), request.getSerial()));

		log.info("Device manufactured: {}", entity);
		return entity;
	}

	public String deleteDevice(String serialId) {
		var deviceId = verifyDevice(serialId);
		if (deviceId == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to register new device");
		}
		devicesRepository.deleteById(deviceId);

		log.info("Device deleted: {}", serialId);
		return serialId;
	}

	public Long verifyDevice(String serial) {
		var sensorData = devicesRepository.findBySerial(serial);
		if (sensorData.isPresent()) {
			return sensorData.get().getId();
		}
		return null;
	}
}
