package com.example.clinica.services;

import com.example.clinica.entity.DiasMedicos;
import com.example.clinica.repository.ConsultasRepository;
import com.example.clinica.repository.DiasMedicosRequestDTO;
import com.example.clinica.repository.DiasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DesmarcarService {

    @Autowired
    DiasRepository diasRepository;

    @Autowired
    ConsultasRepository consultasRepository;

    public void criarHorario(desmarcarResponse data){
        DiasMedicosRequestDTO medico;
        medico = new DiasMedicosRequestDTO(data.getEmail(), data.getNome(), data.getData_consulta(), data.getHora_consulta(), data.getEspecialidade());
        DiasMedicos medicoUpdate = new DiasMedicos(medico);
        diasRepository.save(medicoUpdate);
    }
    public void desmarcarConsulta(desmarcarResponse data){
        criarHorario(data);
        consultasRepository.deleteById(data.getId());
    }
}
