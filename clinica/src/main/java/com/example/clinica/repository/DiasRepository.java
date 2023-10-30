package com.example.clinica.repository;

import com.example.clinica.entity.DiasMedicos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiasRepository extends JpaRepository<DiasMedicos, Long> {
        List<DiasMedicos> findByEmail(String email);
        List<DiasMedicos> findByDataConsultaContains(String dataConsulta);
        List<DiasMedicos> findByNomeContains(String nome);
        List<DiasMedicos> findByEspecialidade(String especialidade);
}
