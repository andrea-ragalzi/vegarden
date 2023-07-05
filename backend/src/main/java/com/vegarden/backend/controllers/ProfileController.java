package com.vegarden.backend.controllers;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegarden.backend.models.Profile;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.services.ProfileService;
import com.vegarden.backend.services.ZenyteService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ZenyteService zenyteService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileService.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Profile> getProfileById(
            @PathVariable String username, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        Zenyte owner = zenyteService.findZenyteByUsername(username);
        if (userDetails.getAuthorities().stream().anyMatch(
                role -> role.getAuthority().equals("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(userDetails.getUsername())) {
            Profile profile = profileService.findProfileByOwner(owner);
            return ResponseEntity.ok(profile);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Profile> updateProfile(
            @PathVariable String username, @RequestBody Profile updatedProfile,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        Zenyte owner = zenyteService.findZenyteByUsername(username);
        if (userDetails.getAuthorities().stream().anyMatch(
                role -> role.getAuthority().equals("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(userDetails.getUsername())) {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            Profile profile = profileService.findProfileByOwner(owner);
            if (updatedProfile.getFirstname() != null) {
                profile.setFirstname(updatedProfile.getFirstname());
            }
            if (updatedProfile.getMiddlename() != null) {
                profile.setMiddlename(updatedProfile.getMiddlename());
            }
            if (updatedProfile.getLastname() != null) {
                profile.setLastname(updatedProfile.getLastname());
            }
            if (updatedProfile.getPronouns() != null) {
                profile.setPronouns(updatedProfile.getPronouns());
            }
            if (updatedProfile.getBio() != null) {
                profile.setBio(updatedProfile.getBio());
            }
            if (updatedProfile.getLocation() != null) {
                profile.setLocation(updatedProfile.getLocation());
            }
            if (updatedProfile.getAvatarImage() != null) {
                profile.setAvatarImage(updatedProfile.getAvatarImage());
            }
            profile.setUpdatedAt(now);
            profileService.updateProfile(profile);
            return ResponseEntity.ok(profile);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
