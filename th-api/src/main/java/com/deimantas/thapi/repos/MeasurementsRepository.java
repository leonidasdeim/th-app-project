package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.MeasurementsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface MeasurementsRepository extends JpaRepository<MeasurementsEntity, Long> {
	ArrayList<MeasurementsEntity> findBySensorId(Long sensorId);
	@Query(value = "SELECT * FROM measurements_entity WHERE sensor_id = :sId AND time BETWEEN current_date - :sDay AND current_date - (:sDay - 1)", nativeQuery = true)
	ArrayList<MeasurementsEntity> findSensorMeasurements(@Param("sId") Long sensorId, @Param("sDay") Integer startDay);
}
