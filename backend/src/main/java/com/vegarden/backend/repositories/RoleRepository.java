package com.vegarden.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.enumerates.RoleType;
import com.vegarden.backend.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRole(RoleType role);

    Boolean existsByRole(RoleType role);
}
