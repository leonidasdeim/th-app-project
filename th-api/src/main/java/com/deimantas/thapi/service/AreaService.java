package com.deimantas.thapi.service;

import com.deimantas.thapi.domain.AreaEntity;
import com.deimantas.thapi.domain.SensorEntity;
import com.deimantas.thapi.domain.UserEntity;
import com.deimantas.thapi.domain.dto.AreaDto;
import com.deimantas.thapi.domain.dto.SensorDto;
import com.deimantas.thapi.repos.AreaRepository;
import com.deimantas.thapi.repos.SensorRepository;
import com.deimantas.thapi.repos.UserRepository;
import com.deimantas.thapi.security.services.SecurityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AreaService {
	private final AreaRepository areaRepository;
	private final UserRepository userRepository;
	private final SecurityService securityService;

	public AreaDto registerArea(AreaDto areaDto) {
		var entity = areaRepository.save(new AreaEntity(areaDto.getName(), getUser().getId()));

		log.info("Area registered: {}", entity);
		return new AreaDto(entity.getName(), entity.getId());
	}

	public Boolean deleteArea(AreaDto areaDto) {
		var entity = areaRepository.findById(areaDto.getId());
		if (entity.isPresent() && entity.get().getUserId().equals(getUser().getId())) {
			areaRepository.deleteById(entity.get().getId());

			log.info("Area deleted: {}", areaDto);
			return true;
		}
		return false;
	}

	public List<AreaDto> getAllAreas() {
		var listEntities = areaRepository.findByUserId(getUser().getId());
		List<AreaDto> listResponse = new ArrayList<>();
		listEntities.forEach(entity -> listResponse.add(new AreaDto(entity.getName(), entity.getId())));

		log.info("Fetched areas: {}", listEntities.size());
		return listResponse;
	}

	private UserEntity getUser() {
		return userRepository.findByUsername(securityService.findLoggedInUsername())
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with this username"));
	}
}
