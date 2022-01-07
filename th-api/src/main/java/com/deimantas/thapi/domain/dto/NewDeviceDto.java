package com.deimantas.thapi.domain.dto;

import com.deimantas.thapi.domain.DeviceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewDeviceDto {
	private DeviceType deviceType;
	private String serial;
}
