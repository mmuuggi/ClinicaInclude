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
import static com.example.clinica.validators.nomeValidator.nomeValido;
import static com.example.clinica.validators.senhaValidator.senhaValida;

@RestController
@RequestMapping("/cadastro")
public class cadastroController {
    @Autowired
    private UsersRepository repository;
    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<ApiResponse> cadastro(@RequestBody UsersRequestDTO data){
        if (isValidEmail(data.email()) && validarCPF(data.cpf()) && senhaValida(data.password()) && nomeValido(data.name())) {
            try{
                UsersRequestDTO users;
                if(Objects.equals(data.role(), "Médico")){
                    users = new UsersRequestDTO(data.name(), data.email(), data.password(), data.cpf(), "Médico", data.especialidade());
                }else if(Objects.equals(data.role(), "Recepcionista")){
                    users = new UsersRequestDTO(data.name(), data.email(), data.password(), data.cpf(), "Recepcionista", null);
                }else{
                    users = new UsersRequestDTO(data.name(), data.email(), data.password(), data.cpf(), "Paciente", null);
                }
                Users usersData = new Users(users);
                repository.save(usersData);
                ApiResponse apiResponse = new ApiResponse("Cadastrado com sucesso");
                return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);

            }catch (DataIntegrityViolationException e){
                String errorMessage = e.getMessage();
                if(errorMessage.contains("users_email_key") && errorMessage.contains("users_cpf_key")){
                    ApiResponse apiResponse = new ApiResponse("E-mail e CPF já cadastrados");
                    return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
                }
                else if(errorMessage.contains("users_email_key")){
                    ApiResponse apiResponse = new ApiResponse("E-mail já cadastrado");
                    return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
                }else{
                    ApiResponse apiResponse = new ApiResponse("CPF já cadastrado");
                    return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
                }

            }
        }else if(!isValidEmail(data.email()) && !validarCPF(data.cpf())){
            ApiResponse apiResponse = new ApiResponse("E-mail e CPF em formato inválido");
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }else if(!isValidEmail(data.email())){
            ApiResponse apiResponse = new ApiResponse("E-mail em formato inválido");
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }else if(!validarCPF(data.cpf())){
            ApiResponse apiResponse = new ApiResponse("CPF em formato inválido");
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }else if(!nomeValido(data.name())){
            ApiResponse apiResponse = new ApiResponse("Nome em formato inválido");
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }else{
            ApiResponse apiResponse = new ApiResponse("Senha em formato inválido");
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }
}


