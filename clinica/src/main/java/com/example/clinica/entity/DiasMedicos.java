package com.example.clinica.entity;

import com.example.clinica.repository.DiasMedicosRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="horariomedico")
@Table(name=" horariomedico")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class DiasMedicos{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String nome;
    private String dataConsulta;
    private String hora_consulta;
    private String especialidade;

    public DiasMedicos(DiasMedicosRequestDTO dias){
        this.email = dias.email();
        this.nome = dias.nome();
        this.dataConsulta = dias.dataConsulta();
        this.hora_consulta = dias.hora_consulta();
        this.especialidade = dias.especialidade();
    }
}
