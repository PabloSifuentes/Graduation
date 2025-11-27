import java.util.Scanner;

//Estatísticas de 10 Números
//Desenvolva um programa em Java que solicite ao usuário que insira 10 números inteiros (int).
//Após a inserção de todos os números, o programa deve calcular e exibir: o maior, o menor e a
//média (use double para a média) dos números fornecidos.
public class Estatísticas_10_Números {
    public static void main(String[] args) {

        Scanner inputData = new Scanner(System.in);

        int [] numbers = new int[10];
        int bigger, minor, sumTotal = 0;
        double average = 0;

        System.out.println("Enter 10 numbers: ");
        for(int i = 0; i < 10; i++){
            System.out.printf((i+1)+ "º Number = ");
            numbers[i] = inputData.nextInt();
            if(numbers[i] <= 0){
                System.out.println("Report positive Number!");
                return;                                          // Encerra o programa imediatamente!
            }
            sumTotal += numbers[i];
        }

        bigger = numbers[0];                // Cálculos
        minor = numbers[0];

        for(int i = 0; i < 10; i++){
            if(numbers[i] > bigger){
                bigger = numbers[i];
            } else{
                minor = numbers[i];
            }
        }
        System.out.println("Numbers typed: ");
        for(int i = 0; i < 10; i++) {
            if (i == 9) {
            System.out.print(numbers[i]);
            } else {
                System.out.printf(numbers[i] + " + ");      // Uma validação para não aparecer o ultimo numero com o "+" na frente
            }
        }
        System.out.println("\nBiggest Number: " +bigger);
        System.out.println("\nSmallest Number: " +minor);
        System.out.println("\n SumTotal: " +sumTotal);
    }
}
