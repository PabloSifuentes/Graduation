package org.example;
//Escreva um algoritmo para ler as dimensões de um retângulo (base e altura), calcular e escrever a área do
//retângulo.

import java.util.Scanner;

public class Exerc_8 {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("Informe a dimensão de um triângulo!");
        System.out.println("Altura:");
        double altura = entrada.nextDouble();
        System.out.println("Base:");
        double base = entrada.nextDouble();

        double areaRetangulo = (base * altura) / 2;

        System.out.println("Area do Retangulo: " +areaRetangulo);

        entrada.close();
    }
}
