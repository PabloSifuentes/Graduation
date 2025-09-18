package org.example;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

//Solicitar o ano e mês atual, e também o nome do utilizador, seu ano e mês de nascimento pela entrada padrão (teclado).
//Feito isto, deve-se calcular quantos anos a pessoa possui e apresentar uma mensagem similar a que segue: “Hermano,
//você possui 33 anos!” [pois eu ainda não fiz aniversário]

public class Exerc_4 {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        System.out.println("Informe seu nome e data de nasciemnto:\nNome:");
        String nomeUtilizador = entrada.nextLine();
        System.out.println("Data de Nascimento:");
        String dataNascimento = entrada.nextLine();

       try{
           LocalDate nascimento = LocalDate.parse(dataNascimento, fmt);

           LocalDate data = LocalDate.now();

           Period idade = Period.between(nascimento, data);
           System.out.println(nomeUtilizador + " você possui " + idade.getYears()+ " anos! [Pois eu ainda não fiz aniversário]");
       }
       catch (DateTimeException e){
           System.out.println("⚠ Campo inválido! User formato (dd/MM/yyyy):");
       }
       entrada.close();
    }
}
