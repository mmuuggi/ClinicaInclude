package com.example.clinica.controller;

import com.example.clinica.entity.DiasMedicos;
import com.example.clinica.repository.DiasMedicosRequestDTO;
import com.example.clinica.repository.DiasRepository;
import com.example.clinica.services.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/filtro")
public class FiltroController {

    @Autowired
    DiasRepository diasRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<ApiResponse> filtrar(@RequestBody DiasMedicosRequestDTO data){
        List<DiasMedicos> medicos = null;
        if(data.especialidade() != null){
            medicos = diasRepository.findByEspecialidade(data.especialidade());
            if(medicos.isEmpty()){
                ApiResponse apiResponse = new ApiResponse("Nada encontrado");
                return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
            }else {
                ApiResponse apiResponse = new ApiResponse(medicos);
                return new ResponseEntity<>(apiResponse, HttpStatus.OK);
            }
        }else if(data.nome() != null){
            medicos = diasRepository.findByNomeContains(data.nome());
            if(medicos.isEmpty()){
                ApiResponse apiResponse = new ApiResponse("Nada encontrado");
                return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
            }else {
                ApiResponse apiResponse = new ApiResponse(medicos);
                return new ResponseEntity<>(apiResponse, HttpStatus.OK);
            }
        }else if(data.dataConsulta() != null){
            medicos = diasRepository.findByDataConsultaContains(data.dataConsulta());
            if(medicos.isEmpty()){
                ApiResponse apiResponse = new ApiResponse("Nada encontrado");
                return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
            }else {
                ApiResponse apiResponse = new ApiResponse(medicos);
                return new ResponseEntity<>(apiResponse, HttpStatus.OK);
            }
        }else{
            ApiResponse apiResponse = new ApiResponse(medicos);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PostMapping("/teste")
    public ResponseEntity<ApiResponse> puxarDatas(@RequestBody DiasMedicosRequestDTO data){
        List<DiasMedicos> datas = diasRepository.findByEmail(data.email());
        ApiResponse apiResponse;
        if(datas.isEmpty()){
            apiResponse = new ApiResponse("Nada encontrado");
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }else{
            apiResponse = new ApiResponse(datas);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
    }
}