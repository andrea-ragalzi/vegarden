package com.vegarden.backend.services;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vegarden.backend.dtos.LoginDto;
import com.vegarden.backend.dtos.RegisterDto;
import com.vegarden.backend.enumerates.RoleType;
import com.vegarden.backend.exceptions.MyAPIException;
import com.vegarden.backend.interfaces.AuthServiceInterface;
import com.vegarden.backend.models.Blog;
import com.vegarden.backend.models.Profile;
import com.vegarden.backend.models.Role;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.security.JwtTokenProvider;

@Service
public class AuthService implements AuthServiceInterface {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private RoleService roleService;

    @Autowired
    private ZenyteService zenyteService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private BlogService blogService;

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(), loginDto.getPassword()));
        System.out.println(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);
        System.out.println(token);
        return token;
    }

    @Override
    public String register(RegisterDto registerDto) {

        // add check for username exists in database
        if (zenyteService.existsByUsername(registerDto.getUsername())) {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        // add check for email exists in database
        if (zenyteService.existsByEmail(registerDto.getEmail())) {
            throw new MyAPIException(
                    HttpStatus.BAD_REQUEST, "Email already exists!");
        }

        Zenyte zenyte = new Zenyte();
        Profile profile = new Profile();
        Blog blog = new Blog();
        Timestamp now = new Timestamp(System.currentTimeMillis());
        Set<Role> roles = new HashSet<>();
        Role userRole = roleService.findRoleByType(RoleType.ROLE_USER);
        roles.add(userRole);

        zenyte.setUsername(registerDto.getUsername());
        zenyte.setEmail(registerDto.getEmail());
        zenyte.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        zenyte.setRoles(roles);
        zenyte.setCreatedAt(now);

        profile.setFirstname(registerDto.getFirstname());
        profile.setLastname(registerDto.getMiddlename());
        profile.setLastname(registerDto.getLastname());
        profile.setCreatedAt(now);
        profile.setOwner(zenyte);

        blog.setTitle(String.format("%s's Blog", registerDto.getUsername()));
        blog.setCreatedAt(now);
        blog.setOwner(zenyte);

        zenyteService.saveZenyte(zenyte);
        profileService.saveProfile(profile);
        blogService.saveBlog(blog);

        return "Zenyte registered successfully!.";
    }

    public RoleType getRole(String role) {
        if (role.equals("ADMIN"))
            return RoleType.ROLE_ADMIN;
        else if (role.equals("MODERATOR"))
            return RoleType.ROLE_MODERATOR;
        else
            return RoleType.ROLE_USER;
    }

}
