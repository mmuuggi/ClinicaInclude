package com.example.clinica.services;

import com.example.clinica.entity.Users;
import com.example.clinica.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EspecialidadeService {

    @Autowired
    private UsersRepository usersRepository;

    @Transactional
    public Users atualizarEspecialidade(String email, String especialidade) {
        Users user = usersRepository.findByEmail(email);
        user.setEspecialidade(especialidade);
        return usersRepository.save(user);
    }
}


