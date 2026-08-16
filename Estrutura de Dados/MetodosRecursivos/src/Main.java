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
                System.out.println("Informe um valor a ser somado: ");
                int valorSoma = entrada.nextInt();

                int soma = somarAte(valorSoma);

                System.out.println("A soma dos números até " +valorSoma+ " é: " +soma);
                break;
            case 2:
                System.out.println("Informe um valor para fatorar: ");
                int valorFatorial = entrada.nextInt();

                System.out.println("Valor fatorado: " +fatorial(valorFatorial));
                break;
            case 3:
                System.out.println("Informe o tamanho do vetor: ");
                int tamanhoCaracteres = entrada.nextInt();

                char letras[] = new char[tamanhoCaracteres];

                preencherVetor(letras, entrada, 0);

                System.out.println("Digite a letra que deseja buscar: ");
                char letraBuscada = entrada.next().charAt(0);

                int quantidade = contarCaracteres(letras, letraBuscada, 0);

                System.out.println("A letra '"+letraBuscada+ "' aparece " +quantidade+ " vez(es) no vetor.");
                break;
            case 4:

                break;
            default:
                System.out.println("ERRO!\n -Precisa selecionar um dos números conforme tabela!");
        }
        entrada.close();
    }

    public static int somarAte (int numero){
        if (numero == 0){
            return 0;
        }
        return numero + somarAte(numero - 1);
    }

    public static int fatorial(int numero){
        if (numero == 0 || numero == 1){
            return 1;
        }
        return numero * fatorial(numero - 1);
    }








    public static void preencherVetor(char letras[], Scanner entrada, int posicao){
        if (posicao == letras.length) {
            return;
        }
        System.out.println("Digite o caractere da posição " +posicao+ ": ");
        letras[posicao] = entrada.next().charAt(0);

        preencherVetor(letras, entrada, posicao + 1);
    }

    public static int contarCaracteres(char letras[], char letraBuscada, int posicao){
        if (posicao == letras.length){
            return 0;
        }

        if (letras[posicao] == letraBuscada){
            return 1 + contarCaracteres(letras, letraBuscada, posicao + 1);
        }
        return  contarCaracteres(letras, letraBuscada, posicao + 1);
    }



}