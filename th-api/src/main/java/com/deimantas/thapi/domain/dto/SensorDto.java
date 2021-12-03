package com.deimantas.thapi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SensorDto {
	private String name;
	private String serial;
}
