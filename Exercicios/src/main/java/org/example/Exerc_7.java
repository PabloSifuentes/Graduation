package org.example;
//Escreva um algoritmo para ler um valor inteiro (do teclado) e escrever (na tela) o seu antecessor e o seu
//sucessor.

import java.util.Scanner;

public class Exerc_7 {
    public static void main(String[] args) {


    Scanner entrada = new Scanner(System.in);

        System.out.println("Insira um valor:");
        int valor = entrada.nextInt();

        int antecessor = valor - 1;
        int sucessor = valor + 1;

        System.out.println("Seu antecessor é " + antecessor + " e sucessor é " +sucessor);

        entrada.close();
    }
}
