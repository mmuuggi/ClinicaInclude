package com.example.clinica.controller;

import com.example.clinica.repository.UsersRepository;
import com.example.clinica.repository.UsersResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/teste")

public class testeController {
    @Autowired
    private UsersRepository repository;

    @GetMapping
    public List<UsersResponseDTO> login() {
        List<UsersResponseDTO> usersList = repository.findAll().stream().map(UsersResponseDTO::new).toList();
        return usersList;
    }
}
