package com.deimantas.thapi;

import com.deimantas.thapi.domain.ERole;
import com.deimantas.thapi.domain.Role;
import com.deimantas.thapi.repos.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@RequiredArgsConstructor
@SpringBootApplication
public class ThApiApplication implements CommandLineRunner {
	private final RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(ThApiApplication.class, args);
	}

	@Override
	public void run(String...args) throws Exception {
		if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
			roleRepository.save(new Role(ERole.ROLE_USER));
		}
	}
}
