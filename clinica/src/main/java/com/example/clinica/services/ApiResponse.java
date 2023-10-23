package com.example.clinica.services;

import lombok.Getter;

@Getter

public class ApiResponse {
    private String email;
    private String role;
    private String message;
    private String name;

    public ApiResponse(String email, String name, String role) {
        this.email = email;
        this.name = name;
        this.role = role;
    }
    public ApiResponse(String message) {
        this.message = message;
    }
}
