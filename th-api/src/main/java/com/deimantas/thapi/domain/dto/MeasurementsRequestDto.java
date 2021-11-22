package com.deimantas.thapi.domain.dto;

import lombok.Data;

@Data
public class MeasurementsRequestDto {
	private Long sensorId;
	private String temperature;
	private String humidity;
	private String key;
}
