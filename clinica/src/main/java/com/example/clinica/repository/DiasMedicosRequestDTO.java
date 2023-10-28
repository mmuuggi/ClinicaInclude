package com.example.clinica.repository;

public record DiasMedicosRequestDTO(String email, String nome, String data_consulta, String hora_consulta, String especialidade) {
}
