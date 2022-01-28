package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.AreaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AreaRepository extends JpaRepository<AreaEntity, Long> {
	List<AreaEntity> findByUserId(Long userId);
}
