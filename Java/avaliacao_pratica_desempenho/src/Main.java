import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);

        final int LIMITE = 5;
        int[] value = new int[LIMITE];

        int quantidade = 0;

        // Dados para os primos
        int[] totalPrimos = new int[LIMITE];
        int countPrimos = 0;
        int maiorPrimo = 0;
        int menorPrimo = 0;

        int menorValor = 0;
        boolean menorInicializado = false;

        // Leitura de dados: para até LIMITE ou até número negativo
        while (quantidade < LIMITE) {
            System.out.print("\nInforme um número inteiro (positivo). Digite negativo para encerrar: ");
            int num = leitor.nextInt();

            if (num < 0) {
                // encerra a entrada — se for o primeiro, informa lista vazia
                if (quantidade == 0) {
                    System.out.println("Nenhum dado foi processado. Programa encerrado.");
                    return;
                } else {
                    System.out.println("Entrada encerrada por número negativo informado.");
                    break;
                }
            }

            if (num == 0) {
                System.out.println("Zero não é considerado um valor válido (apenas positivos). Informe outro número ou negativo para encerrar.");
                continue;
            }

            value[quantidade] = num;
            quantidade++;

            // atualiza menorValor
            if (!menorInicializado) {
                menorValor = num;
                menorInicializado = true;
            } else if (num < menorValor) {
                menorValor = num;
            }

            // --- Agora a análise individual (lógica de exibição em caixa) ---
            int numero = num;
            int divisoresCount = 0;

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

            // Número primo (lógica: conta divisores)
            if (numero <= 1) {
                System.out.println("║   ➤ Não é primo                        ║");
            } else {
                for (int j = 2; j < numero; j++) {
                    if (numero % j == 0) {
                        divisoresCount++;
                    }
                }

                if (divisoresCount == 0) {
                    System.out.println("║   ➤ É primo                            ║");

                    // armazena primo
                    totalPrimos[countPrimos] = numero;
                    if (countPrimos == 0) {
                        maiorPrimo = numero;
                        menorPrimo = numero;
                    } else {
                        if (numero > maiorPrimo) maiorPrimo = numero;
                        if (numero < menorPrimo) menorPrimo = numero;
                    }
                    countPrimos++;

                } else {
                    System.out.println("║   ➤ Não é primo                        ║");
                }
            }

            // Exibir divisores (monta string e alinha dentro da caixa)
            String divisoresStr = "║   ➤ Divisores: ";
            StringBuilder listaDiv = new StringBuilder();

            for (int d = 1; d <= numero; d++) {
                if (numero % d == 0) {
                    if (listaDiv.length() > 0) listaDiv.append(", ");
                    listaDiv.append(d);
                }
            }

            String linha = divisoresStr + listaDiv.toString();

            int larguraInterna = 40;
            int conteudoLength = linha.length() - 1; // -1 porque linha começa com '║'
            int faltam = larguraInterna - conteudoLength;
            if (faltam < 0) faltam = 0;

            StringBuilder linhaFinal = new StringBuilder(linha);
            for (int s = 0; s < faltam; s++) linhaFinal.append(' ');
            linhaFinal.append('║');

            System.out.println(linhaFinal.toString());
            System.out.println("╚◢━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◣╝");

            // Se atingiu o limite, informa e encerra leitura
            if (quantidade >= LIMITE) {
                System.out.println("Limite de " + LIMITE + " números atingido. Encerrando entrada.");
                break;
            }
        } // fim loop de leitura

        System.out.println("\n===== RELATÓRIO FINAL DE ANÁLISE =====");

        // Lista completa (ordem de inserção)
        System.out.print("Lista completa: ");
        for (int i = 0; i < quantidade; i++) {
            System.out.print(value[i] + (i < quantidade - 1 ? ", " : ""));
        }
        System.out.println();

        // Estatísticas gerais: soma, média, maior e menor
        long soma = 0;
        int maior = value[0];
        int menor = value[0];
        for (int i = 0; i < quantidade; i++) {
            soma += value[i];
            if (value[i] > maior) maior = value[i];
            if (value[i] < menor) menor = value[i];
        }
        double media = (double) soma / quantidade;

        System.out.println("\nEstatísticas Gerais:");
        System.out.println("1. Quantidade total: " + quantidade);
        System.out.println("2. Média aritmética: " + media);
        System.out.println("3. Maior número: " + maior);
        System.out.println("4. Menor número: " + menor);

        // Análise de primos (usando os dados coletados pela sua parte)
        System.out.println("\nAnálise de Primos:");
        if (countPrimos == 0) {
            System.out.println("Nenhum número primo encontrado.");
        } else {
            System.out.println("Quantidade de números primos: " + countPrimos);
            System.out.println("Maior primo: " + maiorPrimo);
            System.out.println("Menor primo: " + menorPrimo);
        }

        // Análise de Frequência (Moda) — seguindo a lógica da outra parte (sem usar Map)
        int maxFreq = 0;
        StringBuilder modaBuilder = new StringBuilder();
        for (int i = 0; i < quantidade; i++) {
            int freq = 0;
            for (int j = 0; j < quantidade; j++) {
                if (value[i] == value[j]) freq++;
            }
            if (freq > maxFreq) {
                maxFreq = freq;
                modaBuilder.setLength(0);
                modaBuilder.append(value[i]);
            } else if (freq == maxFreq) {
                // adiciona sem duplicar (verifica se já contém)
                String token = String.valueOf(value[i]);
                String[] existing = modaBuilder.toString().split(",\\s*");
                boolean contains = false;
                for (String e : existing) {
                    if (e.equals(token)) {
                        contains = true;
                        break;
                    }
                }
                if (!contains) {
                    if (modaBuilder.length() > 0) modaBuilder.append(", ");
                    modaBuilder.append(value[i]);
                }
            }
        }

        System.out.println("\nAnálise de Frequência (Moda):");
        System.out.println("Número(s) mais repetido(s): " + modaBuilder.toString());
        System.out.println("Quantidade de vezes: " + maxFreq);

        // Mediana (valor central considerando a ordem de inserção)
        System.out.println("\nAnálise de Posição (Mediana):");
        if (quantidade % 2 == 1) {
            int pos = quantidade / 2; // posição central (0-indexed)
            System.out.println("Lista ímpar, valor central (posição " + (pos + 1) + "): " + value[pos]);
        } else {
            int pos1 = (quantidade / 2) - 1;
            int pos2 = quantidade / 2;
            double mediana = (value[pos1] + value[pos2]) / 2.0;
            System.out.println("Lista par, média dos centrais (posições " + (pos1 + 1) + " e " + (pos2 + 1) + "): " + mediana);
        }

        // Cálculo avançado: fatorial do menor (apenas se menor <= 20 e >= 0)
        System.out.println();
        if (menorValor <= 20 && menorValor >= 0) {
            long fatorial = 1;
            for (int f = 1; f <= menorValor; f++) fatorial *= f;
            System.out.println("Fatorial de " + menorValor + " = " + fatorial);
        } else {
            System.out.println("Fatorial não calculado (menor número > 20 ou negativo).");
        }

        System.out.println("\nRelatório final concluído.");
        leitor.close();
    }
}
