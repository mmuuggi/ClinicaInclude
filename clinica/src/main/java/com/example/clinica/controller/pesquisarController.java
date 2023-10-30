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
@RequestMapping("/pesquisar")
public class pesquisarController {
    @Autowired
    private UsersRepository usersRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PostMapping
    public ResponseEntity<ApiResponse> pesquisarController(@RequestBody UsersRequestDTO data){
        ApiResponse pesquisaDTO;
        if(isValidEmail(data.email())){
            Users user = usersRepository.findByEmail(data.email());
            if(user != null){
                if(Objects.equals(user.getRole(), data.role())){
                    pesquisaDTO = new ApiResponse(user.getEmail(), user.getName(), user.getRole(), user.getEspecialidade());
                    return new ResponseEntity<>(pesquisaDTO, HttpStatus.OK);
                }else if(Objects.equals(user.getRole(), data.role())){
                    pesquisaDTO = new ApiResponse(user.getEmail(), user.getName(), user.getRole());
                    return new ResponseEntity<>(pesquisaDTO, HttpStatus.OK);
                }else{
                    pesquisaDTO = new ApiResponse("Médico não cadastrado");
                    return new ResponseEntity<>(pesquisaDTO, HttpStatus.NOT_FOUND);
                }
            }else{
                pesquisaDTO = new ApiResponse("Médico não cadastrado");
                return new ResponseEntity<>(pesquisaDTO, HttpStatus.NOT_FOUND);
            }

        }else{
            pesquisaDTO = new ApiResponse("E-mail em formato inválido");
            return new ResponseEntity<>(pesquisaDTO, HttpStatus.BAD_REQUEST);
        }
    }
}
