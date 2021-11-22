package com.deimantas.thapi.domain.dto;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class SensorDataResponseDto {
	private Long sensorId;
	private String temperature;
	private String humidity;
	private LocalDateTime time;
}
