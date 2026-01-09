package com.Targix.Targix.Spring.project.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}