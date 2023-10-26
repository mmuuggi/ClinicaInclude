package com.example.clinica.controller;

import com.example.clinica.entity.Users;
import com.example.clinica.repository.UsersRepository;
import com.example.clinica.repository.UsersRequestDTO;
import com.example.clinica.services.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

import static com.example.clinica.validators.cpfValidator.validarCPF;
import static com.example.clinica.validators.emailValidator.isValidEmail;

@RestController
@RequestMapping("/cadastro")
public class cadastroController {
    @Autowired
    private UsersRepository repository;
    @CrossOrigin(origins = {"http://127.0.0.1:5500", "http://127.0.0.1:5501"}, allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<ApiResponse> cadastro(@RequestBody UsersRequestDTO data){
        if (isValidEmail(data.email()) && validarCPF(data.cpf())) {
            try{
                UsersRequestDTO users;
                if(Objects.equals(data.role(), "1")){
                    users = new UsersRequestDTO(data.name(), data.email(), data.password(), data.cpf(), "Médico", data.especialidade());
                }else if(Objects.equals(data.role(), "2")){
                    users = new UsersRequestDTO(data.name(), data.email(), data.password(), data.cpf(), "Recepção", null);
                }else{
                    users = new UsersRequestDTO(data.name(), data.email(), data.password(), data.cpf(), "Paciente", null);
                }
                Users usersData = new Users(users);
                repository.save(usersData);
                ApiResponse apiResponse = new ApiResponse("Cadastrado com sucesso");
                return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);

            }catch (DataIntegrityViolationException e){
                ApiResponse apiResponse = new ApiResponse("E-mail já cadastrado");
                return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
            }
        }else if(isValidEmail(data.email()) == false){
            ApiResponse apiResponse = new ApiResponse("E-mail em formato inválido");
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }else{
            ApiResponse apiResponse = new ApiResponse("CPF em formato inválido");
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }
}