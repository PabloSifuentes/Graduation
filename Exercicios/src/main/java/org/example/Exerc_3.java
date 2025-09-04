package org.example;
//Efetuar a leitura de três valores inteiros desconhecidos e armazená-los em variáveis respectivas. Somar os valores
//fornecidos e apresentar o resultado da soma somente se for maior ou igual a 100.
import java.util.Scanner;

public class Exerc_3 {
    public static void main(String[] args) {

    Scanner entrada = new Scanner(System.in);

        System.out.println("Insira três valores:\nvalor 1: \nvalor 2: \nvalor 3:");
        int valor1 = entrada.nextInt();
        int valor2 = entrada.nextInt();
        int valor3 = entrada.nextInt();
        int resultado = valor1 + valor2 + valor3;

        if (resultado >= 100){
            System.out.println("Resultado: " +resultado);
        } else {
            System.out.println("Valor não alcançado!");
        }
    }
}
