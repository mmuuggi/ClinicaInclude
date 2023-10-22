package com.example.clinica.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="diasDisponiveis")

public class DiasMedicos{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String cpf;
    private String especialidade;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataHora;


}
