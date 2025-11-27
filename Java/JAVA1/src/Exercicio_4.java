import java.util.Scanner;
//Maior de Dois Números
//Desenvolva um programa em Java que leia dois números (ex: int ou double) e imprima uma mensagem
//indicando qual deles é o maior.

public class Exercicio_4 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        System.out.println("Informe dois valores:\nValor 1º:");
        int valor1 = entradaDados.nextInt();
        System.out.println("Valor 2º:");
        int valor2 = entradaDados.nextInt();

        if(valor1 > valor2){
            System.out.println("O valor " +valor1+ " é maior que " +valor2);
        } else{
            System.out.println("Valor " +valor2+ " é maior que " +valor1);
        }
    }
}
