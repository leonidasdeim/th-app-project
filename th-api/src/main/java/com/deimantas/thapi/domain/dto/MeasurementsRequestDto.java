package com.deimantas.thapi.domain.dto;

import lombok.Data;

@Data
public class MeasurementsRequestDto {
	private String serial;
	private Float temperature;
	private Float humidity;
}
