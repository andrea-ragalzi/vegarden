package com.vegarden.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.Role;
import com.vegarden.backend.models.Zenyte;

import java.util.Optional;
import java.util.Set;

public interface ZenyteRepository extends JpaRepository<Zenyte, Long> {
    Optional<Zenyte> findByEmail(String email);

    Optional<Zenyte> findByUsername(String username);

    Optional<Zenyte> findByUsernameOrEmail(String username, String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByUsernameOrEmail(String username, String email);

    Set<Zenyte> findByRolesIn(Set<Role> roles);

}
