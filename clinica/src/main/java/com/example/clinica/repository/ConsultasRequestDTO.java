package com.example.clinica.repository;

public record ConsultasRequestDTO(String email, String nome_paciente, String data_consulta, String hora_consulta, String nome_medico, String especialidade, String descricao_paciente, String descricao_medico, String medicoEmail){
}
