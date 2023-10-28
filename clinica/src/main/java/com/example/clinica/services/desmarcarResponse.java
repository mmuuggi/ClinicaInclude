package com.example.clinica.services;

import lombok.Getter;

@Getter
public class desmarcarResponse {
    private Long id;
    private String email;
    private String nome;
    private String data_consulta;
    private String hora_consulta;
    private String especialidade;

    public desmarcarResponse(Long id, String email, String nome, String data_consulta, String hora_consulta, String especialidade) {
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.data_consulta = data_consulta;
        this.hora_consulta = hora_consulta;
        this.especialidade = especialidade;
    }
}
