package com.example.clinica.controller;

import com.example.clinica.entity.DiasMedicos;
import com.example.clinica.repository.DiasMedicosRequestDTO;
import com.example.clinica.repository.DiasRepository;
import com.example.clinica.services.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/cadastrarhorario")
public class cadastroHorarioMedicoController {

    @Autowired
    DiasRepository diasRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<ApiResponse> cadastroMedico(@RequestBody DiasMedicos data) {
        List<DiasMedicos> medicos = diasRepository.findByEmail(data.getEmail());
        ApiResponse cadastroDTO;
        if(medicos.isEmpty()){
            DiasMedicosRequestDTO medico;
            medico = new DiasMedicosRequestDTO(data.getEmail(), data.getNome(), data.getDataConsulta(), data.getHora_consulta(), data.getEspecialidade());
            DiasMedicos medicoData = new DiasMedicos(medico);
            diasRepository.save(medicoData);
            cadastroDTO = new ApiResponse("Cadastrado com sucesso!");
        }else {
            for (DiasMedicos medico : medicos) {
                if(Objects.equals(medico.getDataConsulta(), data.getDataConsulta()) && Objects.equals(medico.getHora_consulta(), data.getHora_consulta())){
                    cadastroDTO = new ApiResponse("Esse médico já tem esse horário cadastrado");
                    return new ResponseEntity<>(cadastroDTO, HttpStatus.CONFLICT);
                }
            }
            DiasMedicosRequestDTO medico;
            medico = new DiasMedicosRequestDTO(data.getEmail(), data.getNome(), data.getDataConsulta(), data.getHora_consulta(), data.getEspecialidade());
            DiasMedicos medicoData = new DiasMedicos(medico);
            diasRepository.save(medicoData);
            cadastroDTO = new ApiResponse("Cadastrado com sucesso");
        }
        return new ResponseEntity<>(cadastroDTO, HttpStatus.OK);
    }
}
