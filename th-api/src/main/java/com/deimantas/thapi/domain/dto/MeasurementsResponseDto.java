package com.deimantas.thapi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MeasurementsResponseDto {
	private Long sensorId;
	private String temperature;
	private String humidity;
	private LocalDateTime time;
}
