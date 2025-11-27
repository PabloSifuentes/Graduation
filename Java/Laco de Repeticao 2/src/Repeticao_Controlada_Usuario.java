import java.util.Scanner;

//Repetição Controlada pelo Usuário
//Desenvolva um programa em Java que solicite ao usuário um número inteiro positivo (int). Em
//seguida, o programa deve exibir a mensagem "Bom dia" na tela a quantidade de vezes informada
//pelo usuário (utilize um laço for ou while).
public class Repeticao_Controlada_Usuario {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        System.out.println("Informe um valor positivo: ");
        int valor = entradaDados.nextInt();

        for(int i = 0; i < valor; i++){
            System.out.println("Bom Dia!");
        }
    }
}