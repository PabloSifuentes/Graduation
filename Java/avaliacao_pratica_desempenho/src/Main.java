import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner inputData = new Scanner(System.in);

        int[] value = new int[100];
        int[] totalPrimos = new int[100];
        int maiorPrimo = totalPrimos[0], menorPrimo = totalPrimos[0], count = 0;

        for (int i = 0; i < 100; i++) {
            System.out.print("\nInforme um número: ");
            value[i] = inputData.nextInt();

            int numero = value[i];
            int divisores = 0;

            System.out.println("╔◥━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◤╗");
            System.out.printf("║              Número: %-10d         ║\n", numero);
            System.out.println("╟◣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◢╢");

            // 1 — Par ou ímpar
            if (numero % 2 == 0) {
                System.out.println("║   ➤ É Par                              ║");
            } else {
                System.out.println("║   ➤ É Ímpar                            ║");
            }

            // 2 — Múltiplo de 3
            if (numero % 3 == 0) {
                System.out.println("║   ➤ É múltiplo de 3                    ║");
            } else {
                System.out.println("║   ➤ Não é múltiplo de 3                ║");
            }

            // 3 — Intervalo 100–200
            if (numero >= 100 && numero <= 200) {
                System.out.println("║   ➤ Está dentro do intervalo 100–200   ║");
            } else {
                System.out.println("║   ➤ Fora do intervalo 100–200          ║");
            }

            // 4 — Número primo
            if (numero <= 1) {
                System.out.println("║   ➤ Não é primo                       ║");
            } else {
                for (int j = 2; j < numero; j++) {
                    if (numero % j == 0) {
                        divisores++;
                    }
                }
                if (divisores == 0) {
                    System.out.println("║   ➤ É primo                            ║");
                    totalPrimos[count] = numero;
                    if (count == 0) {
                        maiorPrimo = numero;
                        menorPrimo = numero;
                    } else {
                        if (numero > maiorPrimo) {
                            maiorPrimo = numero;
                        }
                        if (numero < menorPrimo) {
                            menorPrimo = numero;
                        }
                    }
                    count++;
                } else {
                    System.out.println("║   ➤ Não é primo                        ║");
                }
            }

            System.out.println("╚◢━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◣╝");
        }

        System.out.println("O Primo maior é " + maiorPrimo);
        System.out.println("O Primo menor é " + menorPrimo);


    }
}
