package com.example.clinica.repository;

import com.example.clinica.entity.Consultas;

public record ConsultasResponseDTO(Long id, String email, String nome_paciente, String data_consulta, String hora_consulta, String nome_medico, String especialidade, String descricao_paciente, String descricao_medico, String medicoEmail) {
    public ConsultasResponseDTO(Consultas consulta){
        this(consulta.getId(), consulta.getEmail(), consulta.getNome_paciente(), consulta.getData_consulta(), consulta.getHora_consulta(), consulta.getNome_medico(), consulta.getEspecialidade(), consulta.getDescricao_paciente(), consulta.getDescricao_medico(), consulta.getMedicoEmail());
    }
}
