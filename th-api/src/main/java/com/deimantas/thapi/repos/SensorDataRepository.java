package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.SensorDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface SensorDataRepository extends JpaRepository<SensorDataEntity, Long> {
	ArrayList<SensorDataEntity> findBySensorId(Long sensorId);
	ArrayList<SensorDataEntity> findAll();
}
