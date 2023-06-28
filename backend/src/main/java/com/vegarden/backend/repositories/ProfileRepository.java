package com.vegarden.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.Profile;
import java.util.List;
import java.util.Optional;

import com.vegarden.backend.models.Zenyte;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    public List<Profile> findByLocation(String location);

    public Optional<Profile> findByOwner(Zenyte owner);

}
