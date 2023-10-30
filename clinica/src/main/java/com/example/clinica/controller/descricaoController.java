package com.example.clinica.controller;

import com.example.clinica.repository.ConsultasRepository;
import com.example.clinica.repository.ConsultasResponseDTO;
import com.example.clinica.services.ApiResponse;
import com.example.clinica.services.NotaMedico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/descricao")
public class descricaoController {

    @Autowired
    ConsultasRepository consultasRepository;

    @Autowired
    NotaMedico notaMedico;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PutMapping()
    public ResponseEntity<ApiResponse> atualizarDescricao(@RequestBody ConsultasResponseDTO data){
        notaMedico.atualizarNota(data.id(), data.descricao_medico());
        ApiResponse apiResponse = new ApiResponse("OK");
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
