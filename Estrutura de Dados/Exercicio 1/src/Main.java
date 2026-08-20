import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);
        Exercicio01 metodosSoma = new Exercicio01();

        System.out.println("Informo o tamanho o vetor:");
        int tamanho = entrada.nextInt();

        int[] vetorMain = new int[tamanho];

        for (int i = 0;i < vetorMain.length;i++){

        System.out.println("Informe o valor da posição " +i+ ": ");
            vetorMain[i] = entrada.nextInt();
        }
        System.out.println("A soma do Método Vetor Interativo é: " + metodosSoma.somaVetorInterativo(vetorMain));

        System.out.println("A soma do Método Vetor Recursivo é: " + metodosSoma.somaVetorRecursivo(vetorMain, 0));

    }
}