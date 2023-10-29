package com.example.clinica.repository;

import com.example.clinica.entity.Consultas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConsultasRepository extends JpaRepository<Consultas, Long> {
    List<Consultas> findByEmail(String email);
    List<Consultas> findByMedicoEmail(String MedicoEmail);
    Optional<Consultas> findById(Long id);
}
