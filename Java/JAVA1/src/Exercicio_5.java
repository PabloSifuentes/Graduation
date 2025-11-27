import java.util.Scanner;
//Par ou Ímpar
//Faça um programa em Java que leia um número inteiro (int) e determine se ele é par ou ímpar,
//utilizando o operador de módulo (%). O programa deve exibir uma mensagem com o resultado,
//considerando o número zero como par.

public class Exercicio_5 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        System.out.println("Informe um Número:");
        int num = entradaDados.nextInt();

        String resulltado = (num % 2 == 0 ) ? "PAR" : "IMPAR";

        System.out.println("O Número informado é " +resulltado);

    }
}
