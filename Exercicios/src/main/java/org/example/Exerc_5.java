package org.example;
import java.util.Scanner;

//Efetuar a leitura de um valor numérico real positivo ou negativo representado/armazenado na variável ‘numero’ e
//apresentar o valor lido como sendo positivo. Dica: se o valor lido for menor do que zero, ele deve ser multiplicado por -1

public class Exerc_5 {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("Insira um numero:");
        double numero = entrada.nextDouble();

        if (numero < 0.0){
            double numeroMultiplicado = numero * -1;
            System.out.println(numero * (-1));
        } else {
            System.out.println("Numero superiro que zero: " + numero);
        }
    }
}
