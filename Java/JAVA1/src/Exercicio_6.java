import java.util.Arrays;
import java.util.Collections;
import java.util.Scanner;
//Ordem Decrescente
//Elabore um programa em Java que leia três números e os exiba em ordem decrescente.
//
public class Exercicio_6 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        Integer[] digitos = new Integer[3];

        for(int i = 0; i < digitos.length; i++){
        System.out.println("Informe o numero para posição: " +i+ "º");
        digitos[i] = entradaDados.nextInt();
        }
        Arrays.sort(digitos, Collections.reverseOrder());

        System.out.println(Arrays.toString(digitos));
    }
}
