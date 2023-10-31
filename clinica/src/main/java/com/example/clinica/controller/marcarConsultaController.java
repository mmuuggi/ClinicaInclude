package com.example.clinica.controller;


import com.example.clinica.entity.Consultas;
import com.example.clinica.entity.DiasMedicos;
import com.example.clinica.repository.ConsultasRepository;
import com.example.clinica.repository.ConsultasRequestDTO;
import com.example.clinica.repository.DiasRepository;
import com.example.clinica.services.ApiResponse;
import com.example.clinica.services.NotaMedico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/marcarconsulta")
public class marcarConsultaController {

    @Autowired
    ConsultasRepository consultasRepository;
    @Autowired
    DiasRepository diasRepository;

    @Autowired
    NotaMedico notaMedico;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<ApiResponse> marcarConsulta(@RequestBody ConsultasRequestDTO data){
        ConsultasRequestDTO consultasRequestDTO = new ConsultasRequestDTO(data.email(), data.nome_paciente(), data.data_consulta(), data.hora_consulta(), data.nome_medico(), data.especialidade(), data.descricao_paciente(), null, data.medicoEmail());
        Consultas consultas = new Consultas(consultasRequestDTO);
        consultasRepository.save(consultas);
        List<DiasMedicos> medicos = diasRepository.findByEmail(data.medicoEmail());
        for (DiasMedicos medico : medicos) {
            if (Objects.equals(medico.getDataConsulta(), data.data_consulta())) {
                if (Objects.equals(medico.getHora_consulta(), data.hora_consulta())) {
                    diasRepository.deleteById(medico.getId());
                }
            }
        }
        ApiResponse apiResponse = new ApiResponse("OK");
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
