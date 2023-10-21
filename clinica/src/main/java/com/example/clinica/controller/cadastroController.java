package com.example.clinica.controller;

import com.example.clinica.users.Users;
import com.example.clinica.users.UsersRepository;
import com.example.clinica.users.UsersRequestDTO;
import com.example.clinica.users.UsersResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cadastro")
public class cadastroController {
    @Autowired
    private UsersRepository repository;
    @CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "Content-Type")
    @PostMapping
    public void cadastro(@RequestBody UsersRequestDTO data){
        Users usersData = new Users(data);
        repository.save(usersData);
        return;
    }
    @GetMapping
    public List<UsersResponseDTO> getAll(){
        List<UsersResponseDTO> usersList = repository.findAll().stream().map(UsersResponseDTO::new).toList();
        return usersList;
    }
}
