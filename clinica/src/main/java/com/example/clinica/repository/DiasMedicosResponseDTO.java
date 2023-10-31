package com.example.clinica.repository;

import com.example.clinica.entity.DiasMedicos;

public record DiasMedicosResponseDTO(Long id, String email, String nome, String datConsulta, String hora_consulta, String especialidade) {
    public DiasMedicosResponseDTO(DiasMedicos diasMedicos){
        this(diasMedicos.getId(), diasMedicos.getEmail(), diasMedicos.getNome(), diasMedicos.getDataConsulta(), diasMedicos.getHora_consulta(), diasMedicos.getEspecialidade());
    }
}
