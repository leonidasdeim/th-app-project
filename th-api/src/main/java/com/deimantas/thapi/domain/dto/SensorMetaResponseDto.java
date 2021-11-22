package com.deimantas.thapi.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SensorMetaResponseDto {
	private Long id;
	private String name;
	private String key;
}
