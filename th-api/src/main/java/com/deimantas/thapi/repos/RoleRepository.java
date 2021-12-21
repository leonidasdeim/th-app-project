package com.deimantas.thapi.repos;

import com.deimantas.thapi.domain.ERole;
import com.deimantas.thapi.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
