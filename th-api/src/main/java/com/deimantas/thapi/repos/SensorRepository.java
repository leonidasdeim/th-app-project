package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<SensorEntity, Long> { }
