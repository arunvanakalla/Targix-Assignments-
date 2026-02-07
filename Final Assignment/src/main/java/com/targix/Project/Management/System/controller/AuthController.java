package com.targix.Project.Management.System.controller;

import com.targix.Project.Management.System.dto.auth.LoginRequest;
import com.targix.Project.Management.System.dto.auth.LoginResponse;
import com.targix.Project.Management.System.dto.auth.RegisterRequest;
import com.targix.Project.Management.System.service.AuthService;
import com.targix.Project.Management.System.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    AuthController(UserService userService,AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registration successful. Waiting for admin approval.");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse loginResponse = authService.login(request);
        return ResponseEntity.ok(loginResponse);
    }
}
