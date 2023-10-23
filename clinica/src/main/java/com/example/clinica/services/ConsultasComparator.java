package com.example.clinica.services;

import com.example.clinica.entity.Consultas;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;

public class ConsultasComparator implements Comparator<Consultas> {
    public int compare(Consultas c1, Consultas c2) {
        String dataHora1 = c1.getData_consulta() + " " + c1.getHora_consulta();
        String dataHora2 = c2.getData_consulta() + " " + c2.getHora_consulta();

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
            Date date1 = sdf.parse(dataHora1);
            Date date2 = sdf.parse(dataHora2);

            return date1.compareTo(date2);
        } catch (ParseException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
