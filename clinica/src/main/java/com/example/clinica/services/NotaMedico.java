package com.example.clinica.services;

import com.example.clinica.entity.Consultas;
import com.example.clinica.repository.ConsultasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class NotaMedico{

    @Autowired
    private ConsultasRepository consultasRepository;

    @Transactional
    public Consultas atualizarNota(Long id, String nota) {
        Optional<Consultas> optionalConsultas = consultasRepository.findById(id);

        if (optionalConsultas.isPresent()) {
            Consultas consultas = optionalConsultas.get();
            consultas.setDescricao_medico(nota);
            consultasRepository.save(consultas);
        }
        return null;
    }
}
