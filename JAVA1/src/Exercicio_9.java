import java.util.Scanner;
//Classificação de Triângulos
//Dados três valores (double) X, Y e Z, elabore um programa em Java para verificar se eles podem formar
//os lados de um triângulo.
//• Condição de existência: O comprimento de cada lado de um triângulo deve ser menor que a
//soma dos comprimentos dos outros dois lados.
//        Se for possível formar um triângulo, o programa deverá classificá-lo como:
//        • Equilátero: Os três lados possuem comprimentos iguais.
//        • Isósceles: Dois dos lados possuem comprimentos iguais.
//        • Escaleno: Os três lados possuem comprimentos diferentes.
//Caso os valores não possam formar um triângulo, o programa deve exibir uma mensagem informando
//o motivo.

public class Exercicio_9 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        System.out.println("Informe valor de X:");
        double x = entradaDados.nextDouble();
        System.out.println("Informe valor de Y:");
        double y = entradaDados.nextDouble();
        System.out.println("Informe valor de Z:");
        double z = entradaDados.nextDouble();

        if(x < y+z && y < x+z && z < x+y){
            System.out.println("Triângulo Válido!");

            if(x == y && y == z){
                System.out.println("\nClassificação Equilátero");
            } else if(x == y || x == z || y == z){
                System.out.println("\nClassificação Isóceles");
            } else{
                System.out.println("\nClassificação Escaleno");
            }
        }else{
            System.out.println("Triângulo inválido");
            if(x >= y + z){
                System.out.println("O lado x é maior ou igual a soma dos outros dois lados.\n");
            } if(y >= x + z){
                System.out.println("O lado y é maior ou igual a soma dos outros dois lados.\n");
            } if(z >= y + x){
                System.out.println("O lado z é maior ou igual a soma dos outros dois lados.\n");
            }
        }
    }
}
