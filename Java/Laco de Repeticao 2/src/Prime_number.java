import java.util.Scanner;

public class Prime_number {
    public static void main(String[] args) {

        Scanner intputData = new Scanner(System.in);

        int dividers = 0;

        System.out.println("Enter a positive number: ");
        int num = intputData.nextInt();

        if(num <= 1) {
            System.out.println("The number " +num+ "is not prime.");
        }else{
            for(int i = 2; i < num; i++){
                if(num % i == 0){
                    dividers += 1;
                }
            }
            if(dividers == 0){
                System.out.println("The number " +num+ " is prime.");
            }else{
                System.out.println("The number " +num+ " is not prime.");
            }
        }
    }
}
