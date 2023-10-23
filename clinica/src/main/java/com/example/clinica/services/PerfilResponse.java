package com.example.clinica.services;

import com.example.clinica.entity.Consultas;
import lombok.Getter;

import java.util.List;

@Getter
public class PerfilResponse {
    private String email;
    private String name;
    private String role;
    private List<Consultas> consultas;

    public PerfilResponse(String email, String name, String role, List<Consultas> consultas){
        this.email = email;
        this.name = name;
        this.role = role;
        this.consultas = consultas;
    }
}
