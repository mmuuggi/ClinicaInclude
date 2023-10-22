package com.example.clinica.validators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {
    public static boolean isValidEmail(String email) {
        // Use uma expressão regular para validar o formato do e-mail
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);

        // Verifique se a expressão regular corresponde ao e-mail
        return matcher.matches();
    }
}
