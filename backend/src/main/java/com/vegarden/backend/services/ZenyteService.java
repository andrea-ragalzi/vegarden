package com.vegarden.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.Role;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.ZenyteRepository;

@Service
public class ZenyteService {

    @Autowired
    private ZenyteRepository zenyteRepository;

    public Zenyte findZenyteById(Long id) {
        Optional<Zenyte> zenyte = zenyteRepository.findById(id);
        if (zenyte.isPresent()) {
            return zenyte.get();
        } else {
            throw new NoSuchElementException(
                    "Zenyte not found with ID: " + id);
        }
    }

    public void saveZenyte(Zenyte zenyte) {
        zenyteRepository.save(zenyte);
    }

    public void updateZenyte(Zenyte zenyte) {
        if (zenyteRepository.existsById(zenyte.getId())) {
            zenyteRepository.save(zenyte);
        } else {
            throw new NoSuchElementException(
                    "Zenyte not found with ID: " + zenyte.getId());
        }
    }

    public void deleteZenyteById(Long id) {
        if (zenyteRepository.existsById(id)) {
            zenyteRepository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Zenyte not found with ID: " + id);
        }
    }

    public List<Zenyte> getAllZenytes() {
        return zenyteRepository.findAll();
    }

    public boolean existsById(Long id) {
        return zenyteRepository.existsById(id);
    }

    public Optional<Zenyte> findZenyteByEmail(String email) {
        return zenyteRepository.findByEmail(email);
    }

    public Optional<Zenyte> findZenyteByUsername(String username) {
        return zenyteRepository.findByUsername(username);
    }

    public Optional<Zenyte> findZenyteByUsernameOrEmail(
            String username, String email) {
        return zenyteRepository.findByUsernameOrEmail(username, email);
    }

    public boolean existsByUsername(String username) {
        return zenyteRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return zenyteRepository.existsByEmail(email);
    }

    public boolean existsByUsernameOrEmail(String username, String email) {
        return zenyteRepository.existsByUsernameOrEmail(username, email);
    }

    public Set<Zenyte> findZenytesByRolesIn(Set<Role> roles) {
        return zenyteRepository.findByRolesIn(roles);
    }

}
