package com.Targix.Targix.Spring.project.service;

import com.Targix.Targix.Spring.project.model.User;
import com.Targix.Targix.Spring.project.repo.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        System.out.println("SECURITY loading user: " + username);
        User user = userRepo.findByUserName(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        System.out.println("SECURITY found user: " + user.getUserName());
        System.out.println("SECURITY user password (from DB): " + user.getPassword());

        if (user.getRoles() != null) {
            System.out.println("SECURITY user roles count: " + user.getRoles().size());
            user.getRoles().forEach(role -> System.out.println("  - Role: " + role.getRoleName()));
        } else {
            System.out.println("SECURITY WARNING: user roles is NULL!");
        }

        String[] authorities = user.getRoles() != null && !user.getRoles().isEmpty()
                ? user.getRoles().stream()
                        .map(role -> role.getRoleName())
                        .toArray(String[]::new)
                : new String[]{"ROLE_USER"}; // Default role if none found

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUserName())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
}