package com.vegarden.backend.controllers;

import com.vegarden.backend.models.Blog;
import com.vegarden.backend.models.Profile;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.services.BlogService;
import com.vegarden.backend.services.ProfileService;
import com.vegarden.backend.services.ZenyteService;

import java.sql.Timestamp;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/zenytes")
public class ZenyteController {

    @Autowired
    private ZenyteService zenyteService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private BlogService blogService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Zenyte>> getAllZenytes() {
        List<Zenyte> zenytes = zenyteService.getAllZenytes();
        return ResponseEntity.ok(zenytes);
    }

    @GetMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Zenyte> getZenyteById(
            @PathVariable String username, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        zenyteService.findZenyteByUsername(username).getUsername())) {
            Zenyte zenyte = zenyteService.findZenyteByUsername(username);
            return ResponseEntity.ok(zenyte);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Zenyte> updateZenyte(
            @PathVariable String username, @RequestBody Zenyte updatedZenyte,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        zenyteService.findZenyteByUsername(username).getUsername())) {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            Zenyte zenyte = zenyteService.findZenyteByUsername(username);
            if (updatedZenyte.getUsername() != null) {
                zenyte.setUsername(updatedZenyte.getUsername());
            }
            if (updatedZenyte.getEmail() != null) {
                zenyte.setEmail(updatedZenyte.getEmail());
            }
            // TODO: add password update
            zenyte.setUpdatedAt(now);
            zenyteService.updateZenyte(zenyte);
            return ResponseEntity.ok(zenyte);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteZenyte(
            @PathVariable String username, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        zenyteService.findZenyteByUsername(username).getUsername())) {
            Profile profile = profileService.findProfileByOwner(
                    zenyteService.findZenyteByUsername(username));
            Blog blog = blogService.findBlogByOwner(
                    zenyteService.findZenyteByUsername(username));
            Zenyte zenyte = zenyteService.findZenyteByUsername(username);
            profileService.deleteProfileById(profile.getId());
            blogService.deleteBlogById(blog.getId());
            zenyteService.deleteZenyteById(zenyte.getId());
            return ResponseEntity.noContent().build();
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
