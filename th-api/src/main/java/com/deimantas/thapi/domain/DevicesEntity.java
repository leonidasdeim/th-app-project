package com.deimantas.thapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class DevicesEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private DeviceType deviceType;

	@Column(nullable = false)
	private String serial;

	public DevicesEntity(DeviceType deviceType, String serial) {
		this.deviceType = deviceType;
		this.serial = serial;
	}
}
