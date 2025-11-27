package org.example;

import java.util.Scanner;

public class Exerc_10 {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("Insirá seu Salario Mensal:");
        double salario = entrada.nextDouble();
        System.out.println("Informe o percentual(reajuste): ");
        double percentual = entrada.nextDouble();

        double reajuste = salario * (percentual / 100);
        double novoSalario = salario + reajuste;

        System.out.println("O Novo salario será de: " + novoSalario);

        entrada.close();
    }
}
