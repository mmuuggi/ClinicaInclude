package com.example.clinica.services;

import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter

public class LoginDTO {
    private String email;
    private String password;
    private String role;
    private String message;

    public LoginDTO(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
    public LoginDTO(String message) {
        this.message = message;
    }
}
