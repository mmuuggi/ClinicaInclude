package com.example.clinica.controller;


import com.example.clinica.repository.ConsultasRepository;
import com.example.clinica.repository.DiasRepository;
import com.example.clinica.services.DesmarcarService;
import com.example.clinica.services.desmarcarResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/desmarcar")
public class desmarcarConsultaController {
    @Autowired
    DiasRepository diasRepository;

    @Autowired
    ConsultasRepository consultasRepository;

    @Autowired
    DesmarcarService desmarcarService;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @DeleteMapping
    public void desmarcarConsulta(@RequestBody desmarcarResponse data){
        desmarcarService.desmarcarConsulta(data);
    }
}
