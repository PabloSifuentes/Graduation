import java.util.Scanner;
//Tabuada Personalizada
//Elabore um programa em Java que solicite ao usuário um número (int) e exiba a sua tabela de
//multiplicação de 1 até 15.
//        • Exemplo: Se o usuário digitar 7, a saída deve ser: 7x1=7, 7x2=14, ..., 7x15=105.
public class Tabuada_Personalizada {
    public static void main(String[] args) {

        Scanner inputData = new Scanner(System.in);

        System.out.println("Informe o Valor a ser multiplicado: ");
        int num = inputData.nextInt();

        for(int i = 1; i <= 15; i++){
            int repost = num * i;
            System.out.printf(num+ "X" +i+ " = " +repost+ "\n");
        }
    }
}
