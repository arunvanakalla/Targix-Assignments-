package com.Targix.Targix.Spring.project.service;

import com.Targix.Targix.Spring.project.DTO.LoginRequest;
import com.Targix.Targix.Spring.project.DTO.LoginResponse;
import com.Targix.Targix.Spring.project.DTO.RegisterRequest;
import com.Targix.Targix.Spring.project.DTO.RegisterResponse;
import com.Targix.Targix.Spring.project.config.JwtUtils;
import com.Targix.Targix.Spring.project.exception.DuplicateResourceException;
import com.Targix.Targix.Spring.project.exception.ResourceNotFoundException;
import com.Targix.Targix.Spring.project.model.Role;
import com.Targix.Targix.Spring.project.model.User;
import com.Targix.Targix.Spring.project.repo.RoleRepo;
import com.Targix.Targix.Spring.project.repo.UserRepo;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepo userRepo, RoleRepo roleRepo,PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public RegisterResponse register(RegisterRequest request) {

        if (userRepo.findByUserName(request.getUsername()).isPresent()) {
            throw new DuplicateResourceException("Username already exists");
        }

        Role userRole = roleRepo.findByRoleName("ROLE_USER")
                .orElseThrow(() -> new ResourceNotFoundException("ROLE_USER not found"));

        User user = new User();
        user.setUserName(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Set.of(userRole));

        userRepo.save(user);

        return new RegisterResponse("User registered successfully", user.getUserName());
    }

    public LoginResponse login(@Valid LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        String token = jwtUtils.generateToken(username,roles);
        return new LoginResponse("login successful",token);
    }
}