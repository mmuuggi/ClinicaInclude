package com.example.clinica.controller;

import com.example.clinica.entity.Consultas;
import com.example.clinica.repository.ConsultasRepository;
import com.example.clinica.repository.UsersRequestDTO;
import com.example.clinica.services.ConsultasComparator;
import com.example.clinica.services.PerfilResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/perfil")
public class perfilController {

    @Autowired
    private ConsultasRepository consultasRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<PerfilResponse> perfil (@RequestBody UsersRequestDTO data){
        PerfilResponse perfilResponse;
        List<Consultas> consultas = null;
        if(Objects.equals(data.role(), "Paciente")){
            consultas = consultasRepository.findByEmail(data.email());
            perfilResponse = new PerfilResponse(consultas);
            Collections.sort(consultas, new ConsultasComparator());
        }else if(Objects.equals(data.role(), "Médico")){
            consultas = consultasRepository.findByMedicoEmail(data.email());
            perfilResponse = new PerfilResponse(consultas);
            Collections.sort(consultas, new ConsultasComparator());
        }else{
            perfilResponse = new PerfilResponse();
        }
        return ResponseEntity.ok().body(perfilResponse);
    }
}