package com.vegarden.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vegarden.backend.models.Profile;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.services.ProfileService;
import com.vegarden.backend.services.ZenyteService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RequestMapping("/api/profiles")
public class ProfileController {

    @Value("${spring.servlet.uploads.location}")
    private String uploadLocation;

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
        Profile profile = profileService.findProfileByOwner(owner);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/{username:.+}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Profile> updateProfile(
            @PathVariable String username,
            @RequestPart("firstname") String firstname,
            @RequestPart("lastname") String lastname,
            @RequestPart("pronouns") String pronouns,
            @RequestPart("bio") String bio,
            @RequestPart("location") String location,
            @RequestParam(value = "avatarImage", required = false) MultipartFile avatarImage,
            @AuthenticationPrincipal UserDetails userDetails) throws IOException {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (userDetails.getAuthorities().stream().anyMatch(
                role -> role.getAuthority().equals("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(userDetails.getUsername())) {

            Timestamp now = new Timestamp(System.currentTimeMillis());
            Zenyte owner = zenyteService.findZenyteByUsername(username);
            Profile profile = profileService.findProfileByOwner(owner);
            String oldAvatarImageURL = profile.getAvatarImageURL();

            try {
                if (avatarImage != null) {
                    String avatarImageFileName = UUID.randomUUID().toString() + "-" + avatarImage.getOriginalFilename();
                    String avatarImageFilePath = uploadLocation + "avatar_images" + File.separator
                            + avatarImageFileName;
                    Files.copy(avatarImage.getInputStream(), Path.of(avatarImageFilePath),
                            StandardCopyOption.REPLACE_EXISTING);
                    profile.setAvatarImageURL(avatarImageFilePath);
                }

                profile.setFirstname(firstname);
                profile.setLastname(lastname);
                profile.setPronouns(pronouns);
                profile.setBio(bio);
                profile.setLocation(location);
                profile.setUpdatedAt(now);
                profileService.updateProfile(profile);

            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
            if (oldAvatarImageURL != null) {
                Files.delete(Path.of(oldAvatarImageURL));
            }
            return ResponseEntity.ok(profile);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
