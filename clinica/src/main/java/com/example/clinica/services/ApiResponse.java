package com.example.clinica.services;

import com.example.clinica.entity.DiasMedicos;

import lombok.Getter;

import java.util.List;

@Getter

public class ApiResponse {
    private String email;
    private String role;
    private String message;
    private String name;
    private String especialidade;
    private List<DiasMedicos> medicos;

    public ApiResponse(List<DiasMedicos> medicos){
        this.medicos = medicos;
    }


    public ApiResponse(String email, String name, String role) {
        this.email = email;
        this.name = name;
        this.role = role;
    }
    public ApiResponse(String email, String name, String role, String especialidade) {
        this.email = email;
        this.name = name;
        this.role = role;
        this.especialidade = especialidade;
    }
    public ApiResponse(String message) {
        this.message = message;
    }
}
