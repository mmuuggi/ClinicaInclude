package com.example.clinica.services;

import com.example.clinica.entity.Consultas;
import lombok.Getter;

import java.util.List;

@Getter
public class PerfilResponse {
    private List<Consultas> consultas;

    public PerfilResponse(){

    }

    public PerfilResponse(List<Consultas> consultas){
        this.consultas = consultas;
    }
}
