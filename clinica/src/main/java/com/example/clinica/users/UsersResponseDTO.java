package com.example.clinica.users;

public record UsersResponseDTO(Long id, String name, String email, String password, String cpf, String role, String especialidade) {
    public UsersResponseDTO(Users user){
        this(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getCpf(), user.getRole(), user.getEspecialidade());
    }
}
