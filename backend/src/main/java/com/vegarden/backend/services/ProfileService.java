package com.vegarden.backend.services;

import com.vegarden.backend.models.Profile;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile findProfileById(Long id) {
        return profileRepository.findById(id).get();
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public void deleteProfileById(Long id) {
        profileRepository.deleteById(id);
    }

    public List<Profile> findProfilesByLocation(String location) {
        return profileRepository.findByLocation(location);
    }

    public Profile findProfileByOwner(Zenyte owner) {
        return profileRepository.findByOwner(owner).get();
    }
}
