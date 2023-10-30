package com.example.clinica.repository;

public record DiasMedicosRequestDTO(String email, String nome, String dataConsulta, String hora_consulta, String especialidade) {
}
