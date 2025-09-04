package org.example;
//Tabuada
import java.util.Scanner;

public class Exerc_1 {
    public static void main(String[] args) {

        Scanner entradaValor = new Scanner(System.in);

        System.out.println("" +
                "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┑\n" +
                "┃          Hellou World!             ┃\n" +
                "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┙");
        System.out.println("" +
                "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┑\n" +
                "┃          Insira um valor:          ┃\n" +
                "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┙");
        int valor = entradaValor.nextInt();
        System.out.printf("Escolha a opção:\n" +
                "[1] Soma + \n" +
                "[2] Subtração - \n" +
                "[3] Multiplicação * \n" +
                "[4] Divisão / \n");
        int opcao = entradaValor.nextInt();
            int resultado;

        switch (opcao) {

            case 1 ://soma
                for (int contador = 1; contador <= 10; contador++) {
                    resultado = valor + contador;
                    System.out.print("Resultado: " + valor + "+" + contador + " = " + resultado + "\n");
                }
                break;

            case 2://subtração
                for (int contador = 1; contador <= 10; contador++) {
                    resultado = valor - contador;
                    if (resultado <= 0){
                        System.out.print("Resultado: " + valor + "-" + contador + " = 0 \n");
                    }
                    else {
                    System.out.print("Resultado: " + valor + "-" + contador + " = " + resultado + "\n");
                    }
                }
                    break;

                    case 3://multiplicação
                        for (int contador = 1; contador <= 10; contador++) {
                            resultado = valor * contador;
                            System.out.print("Resultado: " + valor + "X" + contador + " = " + resultado + "\n");
                        }
                            break;

                            case 4://divisão
                                for (int contador = 1; contador <= 10; contador++) {
                                    resultado = valor / contador;
                                    System.out.print("Resultado: " + valor + "/" + contador + " = " + resultado + "\n");
                                }
                                    break;

                                    default:
                                        break;
        }
    }
}
