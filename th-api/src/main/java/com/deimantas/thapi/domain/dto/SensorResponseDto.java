package com.deimantas.thapi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SensorResponseDto {
	private Long id;
	private String name;
	private String key;
}