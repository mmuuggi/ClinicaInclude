package com.example.clinica.controller;

import com.example.clinica.entity.Users;
import com.example.clinica.repository.UsersRequestDTO;
import com.example.clinica.services.EspecialidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/especialidade")
public class especialidadeController {

    @Autowired
    EspecialidadeService especialidadeService;

    @CrossOrigin(origins = "*", allowedHeaders = "Content-Type")
    @PutMapping()
    public ResponseEntity<Users> atualizarEspecialidade(@RequestBody UsersRequestDTO data){
        Users user = especialidadeService.atualizarEspecialidade(data.email(), data.especialidade());
        return ResponseEntity.ok(user);
    }
}
