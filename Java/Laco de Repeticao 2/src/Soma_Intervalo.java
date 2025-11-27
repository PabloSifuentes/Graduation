import java.util.Scanner;
//Soma de Intervalo
//Crie um programa em Java que calcule (usando um laço de repetição) a soma de todos os
//números inteiros de 1 a 100 e exiba o resultado final.
public class Soma_Intervalo {
    public static void main(String[] args) {

        int soma = 0;

       for(int i = 1; i <= 100; i++){
           soma += i;
           System.out.println(soma);
       }
    }
}
