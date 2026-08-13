import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("======Métodos Interativos======");
        System.out.println("Selecione a opção desejada:");
        System.out.println("[1] - Somar Ate\n" +
                           "[2] - Fatorial\n" +
                           "[3] - Somar Valores Vetor\n" +
                           "[4] - Contar Caracteres");
        System.out.println("\nOpção:");
        int valor = entrada.nextInt();

        switch(valor){
            case 1:
                System.out.println("Informe valor para somar:");
                int valorSoma = entrada.nextInt();
                System.out.println("Soma ao utilizador "+ somarAte(valorSoma));
            break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            default:

            }
        }

    public static int somarAte(int numero){
        int calculoSoma = 0;

    for(int i = 0; i < numero; i++){
        calculoSoma+=numero;
    }
        return calculoSoma;
    }

    public static int fatorial(int numero){
        
    }
}