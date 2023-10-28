package com.example.clinica.validators;

public class senhaValidator {

    public static boolean senhaValida(String senha){
        int min = 8;
        int max = 20;
        if (senha.length() >= min && senha.length() <= max) {
            return true; 
        } else {
            return false;
        }
    }
    
}
