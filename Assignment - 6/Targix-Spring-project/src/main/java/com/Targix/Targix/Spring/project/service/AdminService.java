package com.Targix.Targix.Spring.project.service;

import com.Targix.Targix.Spring.project.DTO.AdminRequest;
import com.Targix.Targix.Spring.project.DTO.RegisterResponse;
import com.Targix.Targix.Spring.project.exception.DuplicateResourceException;
import com.Targix.Targix.Spring.project.exception.ResourceNotFoundException;
import com.Targix.Targix.Spring.project.model.Role;
import com.Targix.Targix.Spring.project.model.User;
import com.Targix.Targix.Spring.project.repo.RoleRepo;
import com.Targix.Targix.Spring.project.repo.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AdminService {

    private UserRepo userRepo;
    private RoleRepo roleRepo;
    private PasswordEncoder passwordEncoder;

    public AdminService(UserRepo userRepo,RoleRepo roleRepo,PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponse createAdmin(AdminRequest adminRequest) {
        if(userRepo.findByUserName(adminRequest.getUsername()).isPresent()) {
            throw new DuplicateResourceException("Admin with this username "+
                    adminRequest.getUsername()+" already exists");
        }
        Role adminRole = roleRepo.findByRoleName("ROLE_ADMIN")
                .orElseThrow(()->new ResourceNotFoundException("Admin role is not present in the database"));
        User admin = new User();
        admin.setUserName(adminRequest.getUsername());
        admin.setPassword(passwordEncoder.encode(adminRequest.getPassword()));
        admin.setRoles(Set.of(adminRole));

        userRepo.save(admin);
        return new RegisterResponse("Admin created successfully",admin.getUserName());
    }

    public String promoteToAdmin(String username) {

        User user = userRepo.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role adminRole = roleRepo.findByRoleName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("ROLE_ADMIN not found"));

        if(user.getRoles().contains(adminRole)){
            throw new DuplicateResourceException("User ("+username+") is already an ADMIN");
        }

        user.getRoles().add(adminRole);
        userRepo.save(user);

        return "User ("+username+") promoted to ADMIN successfully";
    }
}