import Fontes.Quadrado;

import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);
        Quadrado quadrado = new Quadrado();

        System.out.printf("Insirá um valor para calcular Area e perimetro:");
        double valor = entrada.nextDouble();
        quadrado.setLado(valor);


        System.out.printf("Resultado da Area: " + quadrado.calcularArea());
        System.out.printf("\n");
        System.out.printf("Resultado do perimetro: " + quadrado.calculaPerimetro());


    }
}