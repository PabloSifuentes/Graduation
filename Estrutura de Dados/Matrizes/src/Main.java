import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Digite o número de linhas da imagem (M): ");
        int M = sc.nextInt();

        System.out.print("Digite o número de colunas da imagem (N): ");
        int N = sc.nextInt();

        int[][] imagem = new int[M][N];

        System.out.println("\nDigite os valores da imagem (somente 0 ou 1):");

        for (int i = 0; i < M; i++) {
            for (int j = 0; j < N; j++) {
                do {
                    System.out.print("Imagem[" + i + "][" + j + "]: ");
                    imagem[i][j] = sc.nextInt();

                    if (imagem[i][j] != 0 && imagem[i][j] != 1) {
                        System.out.println("Valor inválido! Digite somente 0 ou 1.");
                    }

                } while (imagem[i][j] != 0 && imagem[i][j] != 1);
            }
        }

        int[][] padrao = new int[3][3];

        System.out.println("\nDigite o padrão 3x3 (somente 0 ou 1):");

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                do {
                    System.out.print("Padrao[" + i + "][" + j + "]: ");
                    padrao[i][j] = sc.nextInt();

                    if (padrao[i][j] != 0 && padrao[i][j] != 1) {
                        System.out.println("Valor inválido! Digite somente 0 ou 1.");
                    }

                } while (padrao[i][j] != 0 && padrao[i][j] != 1);
            }
        }

        System.out.println("\nImagem:");

        for (int i = 0; i < M; i++) {
            for (int j = 0; j < N; j++) {
                System.out.print(imagem[i][j] + " ");
            }
            System.out.println();
        }

        System.out.println("\nPadrão:");

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(padrao[i][j] + " ");
            }
            System.out.println();
        }

        int quantidade = 0;

        if (M >= 3 && N >= 3) {

            for (int i = 0; i <= M - 3; i++) {
                for (int j = 0; j <= N - 3; j++) {

                    boolean encontrou = true;

                    // Compara o padrão 3x3 com a região atual da imagem
                    for (int x = 0; x < 3; x++) {
                        for (int y = 0; y < 3; y++) {

                            if (imagem[i + x][j + y] != padrao[x][y]) {
                                encontrou = false;
                            }
                        }
                    }

                    if (encontrou) {
                        quantidade++;
                    }
                }
            }
        }

        System.out.println("\n=================================");
        if (quantidade > 0) {
            System.out.println("O padrão foi encontrado!");
            System.out.println("Quantidade de ocorrências: " + quantidade);
        } else {
            System.out.println("O padrão não foi encontrado.");
        }
        System.out.println("=================================");

        sc.close();
    }
}
