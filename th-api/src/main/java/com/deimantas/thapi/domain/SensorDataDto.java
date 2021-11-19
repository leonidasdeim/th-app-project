package com.deimantas.thapi.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SensorDataDto {
	private Long sensorId;
	private String temperature;
	private String humidity;
	private LocalDateTime time;

	public SensorDataDto(long sensorId, String temperature, String humidity, LocalDateTime time) {
		this.sensorId = sensorId;
		this.temperature = temperature;
		this.humidity = humidity;
		this.time = time;
	}
}
