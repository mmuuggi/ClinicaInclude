package com.example.clinica.entity;

import com.example.clinica.repository.ConsultasRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name="consultas")
@Table(name="consultas")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Consultas {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String nome_paciente;
    private String data_consulta;
    private String hora_consulta;
    private String nome_medico;
    private String especialidade;
    private String descricao_paciente;
    private String descricao_medico;
    private String medicoEmail;

    public Consultas(ConsultasRequestDTO consulta){
        this.email = consulta.email();
        this.nome_paciente = consulta.nome_paciente();
        this.data_consulta = consulta.data_consulta();
        this.hora_consulta = consulta.hora_consulta();
        this.nome_medico = consulta.nome_medico();
        this.especialidade = consulta.especialidade();
        this.descricao_paciente = consulta.descricao_paciente();
        this.descricao_medico = consulta.descricao_medico();
        this.medicoEmail = consulta.medicoEmail();
    }

    public void setDescricao_medico(String descricao_medico) {
        this.descricao_medico = descricao_medico;
    }
}
