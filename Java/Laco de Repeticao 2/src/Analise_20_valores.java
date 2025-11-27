import java.util.Scanner;

//Análise de 20 Valores
//Desenvolva um programa em Java que leia 20 valores inteiros (int) fornecidos pelo usuário e, ao
//final, apresente: a) A soma de todos os números positivos inseridos. b) A quantidade total de
//números negativos inseridos.
public class Analise_20_valores {
    public static void main(String[] args) {

        Scanner inputData = new Scanner(System.in);

        int[] numeros = new int[20]; int[] positivo = new int[20]; int[] negativo = new int[20];
        int contNegativo = 0, totalNegativo = 0, contPositivo = 0, totalPositivo = 0;

        System.out.println("Informe 20 números!\n");
        for(int i = 0; i < 20; i++){
            System.out.println(i+ "º = ");
        }
        for(int i = 0; i < 20; i++){
            if(numeros[i] > 0){
                positivo[contPositivo] = numeros[i];
                contPositivo = contPositivo + 1;
                totalPositivo = totalPositivo + numeros[i];
            } else{
                negativo[contNegativo] = numeros[i];
                contNegativo = contNegativo + 1;
                totalNegativo = totalNegativo + numeros[i];
            }
        }
        System.out.println("\nNúmeros Positivos: \n");
        for(int i = 0; i < contPositivo; i++){
            System.out.println(positivo[i]+ " ");
        }
        System.out.println("\nSoma Total de positivos: " +totalPositivo+ "\n");
        System.out.println("\nNúmeros Negativos: \n");
        for(int i = 0; i < contNegativo; i++){
            System.out.println(negativo[i]+ " ");
        }
        System.out.println("\nSoma total de negativos: " +totalNegativo+ " \n");
        System.out.println("\nTotal de negativos inseridos: " +contNegativo);
    }
}
