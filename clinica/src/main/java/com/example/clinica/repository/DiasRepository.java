package com.example.clinica.repository;

import com.example.clinica.entity.DiasMedicos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiasRepository extends JpaRepository<DiasMedicos, Long> {

}
