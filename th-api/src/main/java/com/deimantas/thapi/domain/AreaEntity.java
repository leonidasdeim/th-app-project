package com.deimantas.thapi.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class AreaEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private Long userId;

	public AreaEntity(String name, Long userId) {
		this.name = name;
		this.userId = userId;
	}
}
