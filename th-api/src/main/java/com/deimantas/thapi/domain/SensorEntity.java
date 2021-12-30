package com.deimantas.thapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class SensorEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String serial;

	@Column(nullable = false)
	private Long userId;

	@Column(nullable = false)
	private Long areaId;

	@Column(nullable = false)
	private Long deviceId;

	public SensorEntity(String name, String serial, Long userId, Long areaId, Long deviceId) {
		this.name = name;
		this.serial = serial;
		this.userId = userId;
		this.areaId = areaId;
		this.deviceId = deviceId;
	}
}
