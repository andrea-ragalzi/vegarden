package com.vegarden.backend.controllers;

import com.vegarden.backend.models.Follower;
import com.vegarden.backend.models.Profile;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.services.FollowerService;
import com.vegarden.backend.services.ProfileService;
import com.vegarden.backend.services.ZenyteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RequestMapping("/api/followers")
public class FollowerController {

    @Autowired
    public ZenyteService zenyteService;

    @Autowired
    public FollowerService followerService;

    @Autowired
    public ProfileService profileService;

    @GetMapping("/{usernameZenyter}/{usernameZenyted}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> getFollowed(
            @PathVariable String usernameZenyter,
            @PathVariable String usernameZenyted,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Zenyte zenyter = zenyteService.findZenyteByUsername(usernameZenyter);
        Zenyte zenyted = zenyteService.findZenyteByUsername(usernameZenyted);
        try {
            boolean exists = followerService.existsByFollowerAndFollowed(
                    zenyter, zenyted);
            return ResponseEntity.status(HttpStatus.OK).body(exists);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Follower> postFollower(
            @RequestBody Follower follower,
            @AuthenticationPrincipal UserDetails userDetails) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            follower.setCreatedAt(now);
            followerService.saveFollower(follower);
            Zenyte zenyter = zenyteService.findZenyteById(follower.getFollower().getId());
            Zenyte zenyted = zenyteService.findZenyteById(follower.getFollowed().getId());
            Profile zenyterProfile = profileService.findProfileByOwner(zenyted);
            Profile zenytedProfile = profileService.findProfileByOwner(zenyter);
            zenyterProfile.setFollowers(zenyterProfile.getFollowers() + 1);
            zenytedProfile.setFolloweds(zenytedProfile.getFolloweds() + 1);
            profileService.updateProfile(zenyterProfile);
            profileService.updateProfile(zenytedProfile);
            return ResponseEntity.status(HttpStatus.CREATED).body(follower);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Follower> deleteFollower(
            @RequestBody Follower follower,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            followerService.deleteByFollowerAndFollowed(follower.getFollower(), follower.getFollowed());
            Zenyte zenyter = zenyteService.findZenyteById(follower.getFollower().getId());
            Zenyte zenyted = zenyteService.findZenyteById(follower.getFollowed().getId());
            Profile zenyterProfile = profileService.findProfileByOwner(zenyted);
            Profile zenytedProfile = profileService.findProfileByOwner(zenyter);
            zenyterProfile.setFollowers(zenyterProfile.getFollowers() - 1);
            zenytedProfile.setFolloweds(zenytedProfile.getFolloweds() - 1);
            profileService.updateProfile(zenyterProfile);
            profileService.updateProfile(zenytedProfile);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(follower);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
