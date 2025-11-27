import java.util.Scanner;
//Cálculo de Fatorial
//Crie um programa em Java que solicite ao usuário um número inteiro não negativo (int) e
//determine o seu fatorial.
//        • Lembre-se que o fatorial de um número N (N!) é definido como o produto 1 * 2 * 3 * ... *
//N, e o fatorial de 0 é igual a 1.
//        • Exemplo: 5! = 1 * 2 * 3 * 4 * 5 = 120.
//        • Dica: Use o tipo long para armazenar o resultado do fatorial, pois ele cresce muito
//rapidamente.

public class Calculo_fatorial {
    public static void main(String[] args) {

        Scanner inputData = new Scanner(System.in);

        boolean controle = true;

        while (controle) {

            System.out.println("Informe um número: ");
            int num = inputData.nextInt();

            if (num < 0) {
                System.out.printf("Esse Número não é válido!\nTente Novamente.\n");
                controle = true;

            } else if (num == 0) {
                System.out.println(num + "! = 1");
                break;

            } else {

                long numFatorial = 1;

                System.out.print(num + "! = ");

                for (int i = num; i >= 1; i--) {
                    numFatorial *= i;

                    if (i > 1) {
                        System.out.print(i + " X ");
                    } else {
                        System.out.print(i);
                    }
                }
                System.out.println(" = " + numFatorial);
                controle = false;
            }
        }
    }
}
