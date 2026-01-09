package com.Targix.Targix.Spring.project.data;

import com.Targix.Targix.Spring.project.exception.ResourceNotFoundException;
import com.Targix.Targix.Spring.project.model.Category;
import com.Targix.Targix.Spring.project.model.Role;
import com.Targix.Targix.Spring.project.model.User;
import com.Targix.Targix.Spring.project.repo.CategoryRepo;
import com.Targix.Targix.Spring.project.repo.RoleRepo;
import com.Targix.Targix.Spring.project.repo.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Value("${app.admin.username}")
    private String username;

    @Value("${app.admin.password}")
    private String password;

    @Bean
    CommandLineRunner initData(
            RoleRepo roleRepo,
            CategoryRepo categoryRepo, UserRepo userRepo,
            PasswordEncoder passwordEncoder) {
        return args -> {

            if (roleRepo.count() == 0) {

                Role adminRole = new Role();
                adminRole.setRoleName("ROLE_ADMIN");
                roleRepo.save(adminRole);

                Role userRole = new Role();
                userRole.setRoleName("ROLE_USER");
                roleRepo.save(userRole);

                System.out.println("Roles initialized");
            }

            if (categoryRepo.count() == 0) {

                categoryRepo.save(new Category(null, "Electronics", null));
                categoryRepo.save(new Category(null, "Furniture", null));
                categoryRepo.save(new Category(null, "Clothing", null));

                System.out.println("Categories initialized");
            }

            if(userRepo.findByUserName(username).isEmpty()) {
                User admin = new User();
                admin.setUserName(username);
                admin.setPassword(passwordEncoder.encode(password));
                Role adminRole = roleRepo.findByRoleName("ROLE_ADMIN")
                        .orElseThrow(()-> new ResourceNotFoundException("Admin role is not found"));
                admin.setRoles(Set.of(adminRole));

                userRepo.save(admin);

                System.out.println("BOOTSTRAP ADMIN CREATED: " + username);
            }
        };
    }
}

