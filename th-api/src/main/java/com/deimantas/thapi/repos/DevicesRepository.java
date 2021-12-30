package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.DevicesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DevicesRepository extends JpaRepository<DevicesEntity, Long> {
	Optional<DevicesEntity> findBySerial(String serial);
}
