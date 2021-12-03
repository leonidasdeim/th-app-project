package com.deimantas.thapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class MeasurementsEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Long sensorId;

	@Column
	private Float temperature;

	@Column
	private Float humidity;

	@Column(nullable = false)
	private LocalDateTime time;

	public MeasurementsEntity(Long sensorId, Float temperature, Float humidity, LocalDateTime time) {
		this.sensorId = sensorId;
		this.temperature = temperature;
		this.humidity = humidity;
		this.time = time;
	}
}
