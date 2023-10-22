package com.example.clinica.repository;

import com.example.clinica.entity.Users;

public record UsersResponseDTO(Long id, String name, String email, String password, String cpf, String role, String especialidade) {
    public UsersResponseDTO(Users user){
        this(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getCpf(), user.getRole(), user.getEspecialidade());
    }
}
