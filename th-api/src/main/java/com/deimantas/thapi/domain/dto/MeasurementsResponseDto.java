package com.deimantas.thapi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class MeasurementsResponseDto {
	private String temperature;
	private String humidity;
	private Long time;
}
