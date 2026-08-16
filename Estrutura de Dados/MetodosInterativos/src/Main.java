import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("======Métodos Interativos======");
        System.out.println("Selecione a opção desejada:");
        System.out.println("""
                [1] - Somar Ate
                [2] - Fatorial
                [3] - Somar Valores Vetor
                [4] - Contar Caracteres""");
        System.out.println("\nOpção:");
        int valor = entrada.nextInt();

        switch(valor){
            case 1:
                System.out.println("Informe valor para somar:");
                int valorSoma = entrada.nextInt();
                System.out.println("Soma ao utilizador "+ somarAte(valorSoma));
            break;
            case 2:
                System.out.println("Informe valor para fatorar:");
                int valorFatorial = entrada.nextInt();
                System.out.println("Fatorial ao utilizador: "+ fatorial(valorFatorial));

                break;
            case 3:
                System.out.println("Informe o tamanho do vetor: ");
                int tamanhoVetor = entrada.nextInt();

                int[] vetorChar = new int[tamanhoVetor];

                for (int i = 0; i < vetorChar.length; i++){
                System.out.println("Informe o valor da posição " +i+": ");
                vetorChar[i] = entrada.nextInt();
                }
                    System.out.println("Vetor somado: "+somarValoresVetor(vetorChar));
                break;
            case 4:
                System.out.println("Informe o tamanho do vetor: ");
                int tamanhoVetorChar = entrada.nextInt();

                System.out.println("Qual letra será buscada? ");
                char letra = entrada.next().charAt(0);

                char[] vetor = new char[tamanhoVetorChar];

                for(int i = 0; i < vetor.length; i++){
                    System.out.println("Informe a letra da posição " +i+": ");
                    vetor[i] = entrada.next().charAt(0);
                }
                System.out.println("A letra buscada: "+letra+ "\n Vezes que se repetiu:" +contarCaracteres(vetor, letra));
                break;
            default:
                System.out.println("ERRO!\n -Precisa selecionar um dos números conforme tabela!");
            }
                entrada.close();
        }

    public static int somarAte(int numero){
        int calculoSoma = 0;

    for(int i = 1; i < numero; i++){
        calculoSoma+=i;
    }
        return calculoSoma;
    }

    public static int fatorial(int numero){
        int calculoFatorial = 1;

        for(int i = numero; i >= 1; i--){
            calculoFatorial*=i;
        }
        return calculoFatorial;
    }

    public static  int somarValoresVetor(int vetores[]){
        int somaVetor = 0;

        for (int i = 0; i < vetores.length; i++){
            somaVetor += vetores[i];
        }
        return somaVetor;
    }

    public static int contarCaracteres(char[] letras, char letraBuscada){
        int contador = 0;

        for(int i = 0; i < letras.length; i++){
            if (letras[i] == letraBuscada){
                contador++;
            }
        }
        return contador;
    }
}
