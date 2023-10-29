package com.example.clinica.repository;

import com.example.clinica.entity.DiasMedicos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiasRepository extends JpaRepository<DiasMedicos, Long> {
        List<DiasMedicos> findByEmail(String email);
        List<DiasMedicos> findByData_consulta(String dataConsulta);
        List<DiasMedicos> findByNome(String nome);
        List<DiasMedicos> findByEspecialidade(String especialidade);
}
