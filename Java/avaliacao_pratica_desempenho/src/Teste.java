import java.util.Scanner;

public class Teste {
    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);

        int[] numeros = new int[100];
        int quantidade = 0;
        int totalInformados = 0;

        // Variáveis para primos
        int[] totalPrimos = new int[100];
        int countPrimos = 0;
        int maiorPrimo = 0, menorPrimo = 0;

        // Entrada de dados
        while (quantidade < 100) {
            System.out.print("Digite um número positivo: ");
            int num = leitor.nextInt();
            totalInformados++;

            if (num < 0) {
                // C.1: Tratamento para lista vazia (primeiro número negativo)
                if (quantidade == 0) {
                    System.out.println("Nenhum dado foi processado. Programa encerrado.");
                    leitor.close();
                    return;
                } else {
                    System.out.println("Foi informado um número negativo! Entrada encerrada.");
                }
                break;
            } else if (num > 0) {
                numeros[quantidade] = num;
                quantidade++;

                // Análise Individual Detalhada
                System.out.println("\n╔═══════════════════════════════════════╗");
                System.out.println("║         ANÁLISE DO NÚMERO " + num + "         ║");
                System.out.println("╠═══════════════════════════════════════╣");

                // Par ou ímpar com operador ternário
                System.out.println(num % 2 == 0 ? "║   ➤ É Par                            ║" :
                        "║   ➤ É Ímpar                          ║");

                // Múltiplo de 3 com operador ternário
                System.out.println(num % 3 == 0 ? "║   ➤ É múltiplo de 3                  ║" :
                        "║   ➤ Não é múltiplo de 3              ║");

                // Intervalo 100–200 com operador ternário
                System.out.println((num >= 100 && num <= 200) ? "║   ➤ Está dentro do intervalo 100–200 ║" :
                        "║   ➤ Fora do intervalo 100–200        ║");

                // Verificar se é PRIMO
                int divisoresCount = 0;
                if (num <= 1) {
                    System.out.println("║   ➤ Não é primo                      ║");
                } else {
                    for (int j = 2; j < num; j++) {
                        if (num % j == 0) {
                            divisoresCount++;
                        }
                    }

                    if (divisoresCount == 0) {
                        System.out.println("║   ➤ É primo                          ║");

                        // armazena primo
                        totalPrimos[countPrimos] = num;
                        if (countPrimos == 0) {
                            maiorPrimo = num;
                            menorPrimo = num;
                        } else {
                            if (num > maiorPrimo) maiorPrimo = num;
                            if (num < menorPrimo) menorPrimo = num;
                        }
                        countPrimos++;

                    } else {
                        System.out.println("║   ➤ Não é primo                      ║");
                    }
                }

                System.out.println("╚═══════════════════════════════════════╝");

                // Mostrar divisores
                System.out.print("\n • Divisores: ");
                int contadorDivisores = 0;
                for (int i = 1; i <= num; i++) {
                    if (num % i == 0) {
                        System.out.print(i);
                        contadorDivisores++;
                        if (i < num) System.out.print(", ");
                    }
                }
                System.out.println();

            } else {
                System.out.println("Zero informado (não será processado).\n");
            }
        }

        // Relatório Final
        if (quantidade > 0) {
            System.out.println("\n===== RELATÓRIO FINAL DE ANÁLISE =====");

            // Lista completa
            System.out.print(" • Lista Completa: ");
            for (int i = 0; i < quantidade; i++) {
                System.out.print(numeros[i]);
                if (i < quantidade - 1) System.out.print(" , ");
            }

            // Estatísticas Gerais
            System.out.println("\n\n • Estatísticas Gerais:");
            System.out.println("  1. Quantidade total de números: " + totalInformados);

            // Média
            int somaTotal = 0;
            for (int i = 0; i < quantidade; i++) {
                somaTotal = somaTotal + numeros[i];
            }
            double mediaCalculada = (double) somaTotal / quantidade;
            System.out.println("  2. Média: " + mediaCalculada);

            // Maior e Menor
            int numeroMaior = numeros[0];
            int numeroMenor = numeros[0];
            for (int i = 0; i < quantidade; i++) {
                if (numeros[i] > numeroMaior) numeroMaior = numeros[i];
                if (numeros[i] < numeroMenor) numeroMenor = numeros[i];
            }
            System.out.println("  3. Maior número: " + numeroMaior);
            System.out.println("  4. Menor número: " + numeroMenor);

            // Análise de Primos
            System.out.println("\n • Análise de Primos:");
            if (countPrimos == 0) {
                System.out.println("  5. Nenhum número primo encontrado.");
                System.out.println("  6. Maior número primo: Não aplicável");
                System.out.println("  7. Menor número primo: Não aplicável");
            } else {
                System.out.println("  5. Quantidade de números primos: " + countPrimos);
                System.out.println("  6. Maior primo: " + maiorPrimo);
                System.out.println("  7. Menor primo: " + menorPrimo);
            }

            // Análise de Frequência (Moda)
            System.out.println("\n • Análise de Frequência (Moda):");

            // Método eficiente com array de contagem
            // 2. Encontrar o maior valor no vetor
            int maiorValor = numeros[0];
            for (int i = 1; i < quantidade; i++) {
                if (numeros[i] > maiorValor) {
                    maiorValor = numeros[i];
                }
            }

            // 3. Criar vetor de contagem
            int[] contagem = new int[maiorValor + 1];

            // 4. Contar frequências
            for (int i = 0; i < quantidade; i++) {
                contagem[numeros[i]]++;
            }

            // 5. Encontrar a maior frequência
            int maiorFrequencia = 0;
            for (int i = 0; i < contagem.length; i++) {
                if (contagem[i] > maiorFrequencia) {
                    maiorFrequencia = contagem[i];
                }
            }

            // 6. Mostrar resultados
            System.out.println("  8. Maior frequência: " + maiorFrequencia + " vez" + (maiorFrequencia > 1 ? "es" : ""));

            System.out.print("  9. Número(s) que mais se repete(m): ");
            boolean primeiro = true;
            for (int i = 0; i < contagem.length; i++) {
                if (contagem[i] == maiorFrequencia) {
                    if (!primeiro) {
                        System.out.print(" , ");
                    }
                    System.out.print(i);
                    primeiro = false;
                }
            }
            System.out.println();

            // Análise de Posição (Mediana)
            System.out.println("\n • Análise de Posição (Mediana):");

            if (quantidade == 1) {
                System.out.println("  10. Mediana: " + numeros[0] + " (único número)");
            } else {
                // Criar cópia do array para ordenar
                int[] ordenados = new int[quantidade];
                for (int i = 0; i < quantidade; i++) {
                    ordenados[i] = numeros[i];
                }

                // Ordenar os números
                for (int i = 0; i < quantidade - 1; i++) {
                    for (int j = 0; j < quantidade - 1 - i; j++) {
                        if (ordenados[j] > ordenados[j + 1]) {
                            int temp = ordenados[j];
                            ordenados[j] = ordenados[j + 1];
                            ordenados[j + 1] = temp;
                        }
                    }
                }

                if (quantidade % 2 == 1) {
                    int posicaoCentral = quantidade / 2;
                    System.out.println("  10. Mediana: " + ordenados[posicaoCentral]);
                    System.out.println("      (Posição " + (posicaoCentral + 1) + " da lista ordenada)");
                } else {
                    int pos1 = quantidade / 2 - 1;
                    int pos2 = quantidade / 2;
                    double mediana = (ordenados[pos1] + ordenados[pos2]) / 2.0;
                    System.out.println("  10. Mediana: " + mediana);
                    System.out.println("      (Média das posições " + (pos1 + 1) + " e " + (pos2 + 1) + ")");
                }
            }

            // Cálculo Avançado (Fatorial)
            System.out.println("\n • Cálculo Avançado (Fatorial):");

            // Usa o numeroMenor que já foi calculado antes
            if (numeroMenor <= 20) {
                long fatorial = 1;
                for (int i = 1; i <= numeroMenor; i++) {
                    fatorial = fatorial * i;
                }
                System.out.println("  11. Fatorial do menor número (" + numeroMenor + "!): " + fatorial);
            } else {
                System.out.println("  11. O menor número (" + numeroMenor + ") é maior que 20.");
                System.out.println("      Cálculo do fatorial não realizado para evitar estouro.");
            }

            System.out.println("\n======================================");
        } else {
            System.out.println("Nenhum número positivo foi informado para análise.");
        }

        leitor.close();
    }
}