package com.vegarden.backend.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.ZenyteRepository;

@Service
public class ZenyteDetailsService implements UserDetailsService {

        @Autowired
        private ZenyteRepository zenyteRepository;

        @Override
        public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
                Zenyte zenyte = zenyteRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found with username or email: " + usernameOrEmail));

                Set<GrantedAuthority> authorities = zenyte.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.getRole().toString()))
                                .collect(Collectors.toSet());

                return new org.springframework.security.core.userdetails.User(zenyte.getEmail(), zenyte.getPassword(),
                                authorities);
        }
}
