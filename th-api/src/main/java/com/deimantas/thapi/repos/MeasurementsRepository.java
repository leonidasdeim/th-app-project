package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.MeasurementsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface MeasurementsRepository extends JpaRepository<MeasurementsEntity, Long> {
	ArrayList<MeasurementsEntity> findBySensorId(Long sensorId);
	ArrayList<MeasurementsEntity> findAll();
}
