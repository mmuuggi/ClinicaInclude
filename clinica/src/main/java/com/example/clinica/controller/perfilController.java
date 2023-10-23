package com.example.clinica.controller;

import com.example.clinica.entity.Consultas;
import com.example.clinica.entity.Users;
import com.example.clinica.repository.ConsultasRepository;
import com.example.clinica.repository.ConsultasRequestDTO;
import com.example.clinica.services.ConsultasComparator;
import com.example.clinica.services.PerfilResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/perfil_user")
public class perfilController {
    @Autowired
    private ConsultasRepository consultasRepository;
    @CrossOrigin(origins = {"http://127.0.0.1:5500", "http://127.0.0.1:5501"}, allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<PerfilResponse> perfil (@RequestBody Users data){
        if(data.getRole().equals("1")){
            System.out.println("Médico");
        }
        List<Consultas> consultas = consultasRepository.findByEmail(data.getEmail());
        Collections.sort(consultas, new ConsultasComparator());
        PerfilResponse perfilResponse = new PerfilResponse(data.getEmail(), data.getName(), data.getRole(), consultas);
        return ResponseEntity.ok().body(perfilResponse);
    }
}