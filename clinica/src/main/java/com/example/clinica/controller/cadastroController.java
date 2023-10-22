package com.example.clinica.controller;

import com.example.clinica.users.Users;
import com.example.clinica.users.UsersRepository;
import com.example.clinica.users.UsersRequestDTO;
import com.example.clinica.users.UsersResponseDTO;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import static com.example.clinica.validators.EmailValidator.isValidEmail;


@RestController
@RequestMapping("/cadastro")
public class cadastroController {

    @Autowired
    private UsersRepository repository;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> cadastro( @RequestBody UsersRequestDTO data) {
        if (isValidEmail(data.email())) {
            try {
                    Users usersData = new Users(data);
                    repository.save(usersData);
                    return new ResponseEntity<>("Usuário cadastrado com sucesso", HttpStatus.CREATED);

            } catch (DataIntegrityViolationException e) {
                return new ResponseEntity<>("E-mail inválido", HttpStatus.CONFLICT);
            }
        } else{
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @GetMapping
    public List<UsersResponseDTO> getAll(){
        List<UsersResponseDTO> usersList = repository.findAll().stream().map(UsersResponseDTO::new).toList();
        return usersList;
    }
}
