package org.example;
import java.util.Scanner;

//Solicitar três notas (valores reais) e um valor inteiro para a frequência ao utilizador e calcular a média aritmética entre elas.
//De acordo com a média e frequência informada, deve-se apresentar as mensagens “APROVADO” (caso a média seja
//superior ou igual a seis e a frequência superior ou igual a 75), “EM EXAME” (caso a média seja superior ou igual a três e
//inferior a seis, e a frequência superior ou igual a 75), ou então “REPROVADO” (caso a média seja inferior a três ou ainda a
//frequência seja inferior a 75).

public class Exerc_6 {
    public static void main(String[] args) {

        Scanner entradaValor = new Scanner(System.in);

        System.out.println("Insira o primeira nota:");
        double nota1 = entradaValor.nextDouble();
        System.out.println("Insira o segunda nota:");
        double nota2 = entradaValor.nextDouble();
        System.out.println("Insira o terceira nota:");
        double nota3 = entradaValor.nextDouble();

        System.out.println("Insira a frequencia(valor):");
        int frequencia = entradaValor.nextInt();

        double media = (nota1+nota2+nota3) / 3;

        if (media >= 6 && frequencia >= 75){
            System.out.println("APROVADO!");
        }else if (media >= 3 && media < 6 && frequencia >= 75){
            System.out.println("EM EXAME!");
        } else {
            System.out.println("REPROVADO!");
        }
    }
}
