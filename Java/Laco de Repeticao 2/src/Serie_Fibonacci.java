import java.util.Scanner;

public class Serie_Fibonacci {
    public static void main(String[] args) {

        Scanner inputData = new Scanner(System.in);

        boolean control = true;
        int a = 0, b = 1, temp, i;

        while(control){
            System.out.println("Enter how many terms of the Fibonacci sequence you want to display.");
            int n = inputData.nextInt();
        if(n <= 0){
            System.out.println("Invalid number! Please enter a value greater than zero.");
        }else{
            System.out.println("Fibonacci Sequence: ");

            if(n >= 1){
                System.out.println(a+ " ");
            } if(n >= 2){
                System.out.println(b+ " ");
            }
            for(i = 3; i <= n; i++){
                temp = a + b;
                System.out.println(temp+ " ");
                a = b;
                b = temp;
            }
            control = false;
        }
        }
    }
}
