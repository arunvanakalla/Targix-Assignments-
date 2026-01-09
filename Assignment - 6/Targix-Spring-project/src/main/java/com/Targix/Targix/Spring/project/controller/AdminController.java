package com.Targix.Targix.Spring.project.controller;

import com.Targix.Targix.Spring.project.DTO.AdminRequest;
import com.Targix.Targix.Spring.project.DTO.RegisterResponse;
import com.Targix.Targix.Spring.project.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin-login")
    public ResponseEntity<RegisterResponse> createAdmin(
            @Valid @RequestBody AdminRequest adminRequest) {

        return new ResponseEntity<>(adminService.createAdmin(adminRequest) , HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/promote/{username}")
    public ResponseEntity<String> promoteUser(@PathVariable String username) {

        return new ResponseEntity<>(adminService.promoteToAdmin(username),HttpStatus.OK);
    }
}