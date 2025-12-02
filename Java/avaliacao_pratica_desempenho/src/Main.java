//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        int value = 147, value2 = 6, divisores = 0;

        if(value % 2 == 0){
            System.out.println("É Par");
        } else {
            System.out.println("É Impar");
        }

        if(value % 3 == 0){
            System.out.println("É multiplo por 3");
        } else {
            System.out.println("Não é multiplo por 3");
        }

        if(value2 >= 100 && value2 <= 200){
            System.out.println("Dentro do Intervalo");
        } else{
            System.out.println("Fora do Intervalo");
        }

        if(value <= 1){
            System.out.println("O número " +value+ " não é primo");
        } else {
            for(int i = 2; i < value; i++){
                if(value % i == 0){
                    divisores += 1;
                }
            }
            if(divisores == 0){
                System.out.println("O número " +value+ " é primo");
            } else{
                System.out.println("O número " +value+ " não é primo");
            }
        }
    }
}