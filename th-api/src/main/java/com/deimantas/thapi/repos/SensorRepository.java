package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorRepository extends JpaRepository<SensorEntity, Long> {
	Optional<SensorEntity> findById(Long Id);
}
