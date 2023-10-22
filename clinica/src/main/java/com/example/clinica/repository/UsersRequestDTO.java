package com.example.clinica.repository;

public record UsersRequestDTO(String name, String email, String password, String cpf, String role, String especialidade) {
}
