package com.example.clinica.controller;

import com.example.clinica.entity.Users;
import com.example.clinica.repository.UsersRepository;
import com.example.clinica.repository.UsersRequestDTO;
import com.example.clinica.services.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Objects;

import static com.example.clinica.validators.emailValidator.isValidEmail;

@RestController
@RequestMapping("/login")
public class loginController{
    @Autowired
    private UsersRepository repository;
    @CrossOrigin(origins = {"http://127.0.0.1:5500", "http://127.0.0.1:5501"}, allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<ApiResponse> login(@RequestBody UsersRequestDTO data) {
        if(isValidEmail(data.email())){
            Users user = repository.findByEmail(data.email());
            if(user == null){
                ApiResponse loginDTO = new ApiResponse("E-mail não cadastrado");
                return new ResponseEntity<>(loginDTO, HttpStatus.NOT_FOUND);
            }else{
                if (Objects.equals(user.getPassword(), data.password())){
                    ApiResponse loginDTO = new ApiResponse(data.email(), user.getRole());
                    return new ResponseEntity<>(loginDTO, HttpStatus.OK);
                }else{
                    ApiResponse loginDTO = new ApiResponse("Senha inválida");
                    return new ResponseEntity<>(loginDTO, HttpStatus.UNAUTHORIZED);
                }
            }
        }else{
            ApiResponse loginDTO = new ApiResponse("E-mail em formato inválido");
            return new ResponseEntity<>(loginDTO, HttpStatus.BAD_REQUEST);
        }

    }

}
