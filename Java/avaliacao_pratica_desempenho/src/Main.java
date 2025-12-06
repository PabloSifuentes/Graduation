import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner inputData = new Scanner(System.in);

        int[] value = new int[10];
        int[] totalPrimos = new int[10];
        int[] repeticoes = new int[value.length];
        int maiorPrimo = totalPrimos[0], menorPrimo = totalPrimos[0], count = 0;

        for (int i = 0; i < 10; i++) {

            System.out.print("\nInforme um número: ");
            value[i] = inputData.nextInt();

            int numero = value[i];
            int divisores = 0;

            System.out.println("╔◥━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◤╗");
            System.out.printf("║              Número: %-10d         ║\n", numero);
            System.out.println("╟◣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◢╢");

            // Par ou ímpar
            if (numero % 2 == 0) {
                System.out.println("║   ➤ É Par                              ║");
            } else {
                System.out.println("║   ➤ É Ímpar                            ║");
            }

            // Múltiplo de 3
            if (numero % 3 == 0) {
                System.out.println("║   ➤ É múltiplo de 3                    ║");
            } else {
                System.out.println("║   ➤ Não é múltiplo de 3                ║");
            }

            // Intervalo 100–200
            if (numero >= 100 && numero <= 200) {
                System.out.println("║   ➤ Está dentro do intervalo 100–200   ║");
            } else {
                System.out.println("║   ➤ Fora do intervalo 100–200          ║");
            }

            // Número primo
            if (numero <= 1) {
                System.out.println("║   ➤ Não é primo                        ║");
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
                        if (numero > maiorPrimo) maiorPrimo = numero;
                        if (numero < menorPrimo) menorPrimo = numero;
                    }
                    count++;

                } else {
                    System.out.println("║   ➤ Não é primo                        ║");
                }
            }
            // Exibir divisores
            String divisoresStr = "║   ➤ Divisores: ";

            String listaDiv = "";
            for (int d = 1; d <= numero; d++) {
                if (numero % d == 0) {
                    listaDiv += d + " ";
                }
            }
            String linha = divisoresStr + listaDiv;

            int tamanhoCaixa = 40;

            int faltam = tamanhoCaixa - (linha.length() -1);

            if(faltam < 0) faltam = 0;

                for(int s = 0; s < faltam; s++){
                    linha += " ";
            }
                linha += "║";
            System.out.println(linha);
            System.out.println("╚◢━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◣╝");
        }

        // Conta quantas vezes cada número apareceu
        for (int y = 0; y < value.length; y++) {
            for (int x = 0; x < value.length; x++) {
                if (value[y] == value[x]) {
                    repeticoes[y]++;
                }
            }
        }
        // Maior repetição encontrada
        int maiorRepeticao = repeticoes[0];
        for (int i = 0; i < repeticoes.length; i++) {
            if (repeticoes[i] > maiorRepeticao) {
                maiorRepeticao = repeticoes[i];
            }
        }

        // Imprimir números mais repetidos (apenas uma vez)
        boolean jaImpresso;

        System.out.println("\nNúmeros que mais se repetiram:");

        for (int i = 0; i < value.length; i++) {
            if (repeticoes[i] == maiorRepeticao) {
                jaImpresso = false;

                for (int j = 0; j < i; j++) {
                    if (value[i] == value[j]) {
                        jaImpresso = true;
                        break;
                    }
                }
                if (!jaImpresso) {
                    System.out.println("→ Número: " + value[i] +
                            " | Apareceu: " + maiorRepeticao + " vez(es)");
                }
            }
        }
        System.out.println("\nO Primo maior é " + maiorPrimo);
        System.out.println("O Primo menor é " + menorPrimo);
    }
}
