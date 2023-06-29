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
import com.vegarden.backend.services.ZenyteService;

@Service
public class ZenyteDetailsService implements UserDetailsService {

        @Autowired
        private ZenyteService zenyteService;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                Zenyte zenyte = zenyteService.findZenyteByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found with username: " + username));

                Set<GrantedAuthority> authorities = zenyte.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.getRole().toString()))
                                .collect(Collectors.toSet());

                return new org.springframework.security.core.userdetails.User(zenyte.getUsername(),
                                zenyte.getPassword(),
                                authorities);
        }

}
