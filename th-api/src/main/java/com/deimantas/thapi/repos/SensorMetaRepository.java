package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.SensorMetaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorMetaRepository extends JpaRepository<SensorMetaEntity, Long> {
	Optional<SensorMetaEntity> findById(Long Id);
}
