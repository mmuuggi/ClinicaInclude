package com.example.clinica.services;

import lombok.Getter;

@Getter

public class ApiResponse {
    private String email;
    private String role;
    private String message;

    public ApiResponse(String email, String role) {
        this.email = email;
        this.role = role;
    }
    public ApiResponse(String message) {
        this.message = message;
    }
}
