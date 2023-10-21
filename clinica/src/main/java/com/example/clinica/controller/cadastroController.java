package com.example.clinica.controller;

import com.example.clinica.users.Users;
import com.example.clinica.users.UsersRepository;
import com.example.clinica.users.UsersRequestDTO;
import com.example.clinica.users.UsersResponseDTO;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import java.util.regex.Pattern;
import java.util.regex.Matcher;


@RestController
@RequestMapping("/cadastro")
public class cadastroController {
    public static boolean isValidEmail(String email) {
        // Use uma expressão regular para validar o formato do e-mail
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);

        // Verifique se a expressão regular corresponde ao e-mail
        return matcher.matches();
    }
    @Autowired
    private UsersRepository repository;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> cadastro( @RequestBody UsersRequestDTO data) {
        if (isValidEmail(data.email())) {
            Users usersData = new Users(data);
            repository.save(usersData);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso");
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail inválido");
        }
    }
    @GetMapping
    public List<UsersResponseDTO> getAll(){
        List<UsersResponseDTO> usersList = repository.findAll().stream().map(UsersResponseDTO::new).toList();
        return usersList;
    }
}
