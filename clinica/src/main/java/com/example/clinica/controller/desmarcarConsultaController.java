package com.example.clinica.controller;


import com.example.clinica.repository.ConsultasRepository;
import com.example.clinica.repository.DiasRepository;
import com.example.clinica.services.ApiResponse;
import com.example.clinica.services.DesmarcarService;
import com.example.clinica.services.desmarcarResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse> desmarcarConsulta(@RequestBody desmarcarResponse data){
        desmarcarService.desmarcarConsulta(data);
        ApiResponse response = new ApiResponse("Ok");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
