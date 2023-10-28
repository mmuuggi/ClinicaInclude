package com.example.clinica.validators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class nomeValidator {
    public static boolean nomeValido (String nome){
        String regex = "[a-zA-Z\\s]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(nome);

        int i = 0;
        for (char c: nome.toCharArray()){
            if (Character.isLetter(c)){
                i ++;
            }
        }
        
        return matcher.matches() && i >=10;
    }
}
