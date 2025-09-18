package org.example;
//Faça um algoritmo que leia a idade de uma pessoa expressa em anos, meses e dias e escreva a idade dessa
//pessoa expressa apenas em dias.

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

import static java.time.LocalDate.*;

public class Exerc_9 {
    public static void main(String[] args) {


    Scanner entrada = new Scanner(System.in);
    LocalDate data = null;

        while (data == null) {
        System.out.println("Informe sua data de Nascimento DD/MM/YYYY: ");
        String dataImput = entrada.nextLine();

            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

                data = parse(dataImput, formatter);
                LocalDate hoje = LocalDate.now();
                Period periodo = Period.between(data, hoje);
                System.out.println("Data formatada: " + data.format(formatter));

                System.out.println("===IDADE===");
                System.out.println("Anos: " +periodo.getYears());
                System.out.println("Mes: " +periodo.getMonths());
                System.out.println("Dias: " +periodo.getDays());

            } catch (DateTimeException e) {
                System.out.println("Data invalida! Use o formato dd/mm/yyyy");
            }
        }
        entrada.close();
    }
}
