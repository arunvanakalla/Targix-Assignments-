package com.targix.Project.Management.System.data;

import com.targix.Project.Management.System.model.*;
import com.targix.Project.Management.System.repo.LabelRepo;
import com.targix.Project.Management.System.repo.RoleRepo;
import com.targix.Project.Management.System.repo.StatusRepo;
import com.targix.Project.Management.System.repo.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    CommandLineRunner init(RoleRepo roleRepo,
                           StatusRepo statusRepo,
                           LabelRepo labelRepo,
                           UserRepo userRepo,
                           PasswordEncoder passwordEncoder) {
        return args -> {

            if(roleRepo.count() == 0) {
                roleRepo.save(new Role(null,"ADMIN"));
                roleRepo.save(new Role(null,"EMPLOYEE"));
            }

            if(statusRepo.count() == 0) {
                statusRepo.save(new Status(null, "TODO"));
                statusRepo.save(new Status(null, "PAUSED"));
                statusRepo.save(new Status(null, "IN_PROGRESS"));
                statusRepo.save(new Status(null, "PR_REVIEW"));
                statusRepo.save(new Status(null, "READY_TO_DEPLOY"));
                statusRepo.save(new Status(null, "DEPLOYED_DONE"));
            }

            if(labelRepo.count() == 0) {
                labelRepo.save(new Label(null, "BUG"));
                labelRepo.save(new Label(null, "FEATURE"));
                labelRepo.save(new Label(null, "TASK"));
                labelRepo.save(new Label(null, "IMPROVEMENT"));
                labelRepo.save(new Label(null, "SUPPORT"));
            }

            if (!userRepo.existsByEmail(adminEmail)) {

                Role adminRole = roleRepo.findByName("ADMIN").orElseThrow();

                User admin = new User();
                admin.setUsername(adminUsername);
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode(adminPassword));
//                this can be skipped but later we can update
                admin.setDisplayPicture("admin.png");
                admin.setBio("System Administrator");
                admin.setStatus(UserStatus.ACTIVE);
                admin.setRole(adminRole);

                userRepo.save(admin);
            }
        };
    }
}