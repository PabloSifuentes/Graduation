package org.example;
//Solicitar a idade do usuário e verificar se ele tem 18 anos ou mais. Se tiver, deve-se apresentar uma mensagem “maior de
//idade”, senão “menor de idade”.
import java.util.Scanner;

public class Exerc_2 {
    public static void main(String[] args) {

        Scanner valorEntrada = new Scanner(System.in);

        System.out.println("Informe sua Idade:\n");
        int idade = valorEntrada.nextInt();

        if (idade >= 18){
            System.out.println(idade + " é Maior de Idade!");
        }
        else {
            System.out.println(idade + " é Menor de Idade!");
        }
    }
}
