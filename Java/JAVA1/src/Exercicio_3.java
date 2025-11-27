import javax.print.DocFlavor;
import java.util.Scanner;
//Inversão de um Número de Três Dígitos
//Elabore um programa em Java que leia um número inteiro (int) de três algarismos (ex: CDU) e o
//reescreva com a ordem dos algarismos invertida (ex: UDC). Por exemplo, se o número lido for 123, o
//programa deverá exibir 321.
//Dica: Utilize operações de divisão inteira (/) e resto (%) para extrair os dígitos individuais antes de
//recombiná-los na nova ordem.

public class Exercicio_3 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        System.out.println("Informe uma sequência de três números!\n");
        int numeros = entradaDados.nextInt();

        int d1 = numeros / 100;
        int d2 = (numeros / 10) % 10;
        int d3 = numeros % 10;

        int temp = d1;
       d1 = d3;
       d3 = temp;

        System.out.println("Primeira forma de fazer:");
        System.out.println(d1 * 100 + d2 * 10 + d3);

//        ----------------------------------------------------------
//                                OU
        String texto = String.valueOf(numeros);
        char[] digitos = texto.toCharArray();

        char temp2 = digitos[0];
        digitos[0] = digitos[2];
        digitos[2] = temp2;

        String textoNovo = new String(digitos);

        int resultado = Integer.parseInt(textoNovo);
        System.out.println("Segunda forma de fazer:\n" +resultado);
    }
}
