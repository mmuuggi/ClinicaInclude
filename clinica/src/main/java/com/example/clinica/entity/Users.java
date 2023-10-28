package com.example.clinica.entity;

import com.example.clinica.repository.UsersRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Entity(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Users{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String cpf;
    private String role;
    private String especialidade;

    public Users(UsersRequestDTO data){
        this.name = data.name();
        this.email = data.email();
        this.password = data.password();
        this.cpf = data.cpf();
        this.role = data.role();
        this.especialidade = data.especialidade();
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}
