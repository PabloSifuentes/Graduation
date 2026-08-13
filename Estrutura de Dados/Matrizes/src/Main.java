import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println(fat(5));
        System.out.println(potencia(5, 3));

        System.out.println("Informe o valor a ser calculado: ");
        int valor = entrada.nextInt();

        System.out.println(somarAte(valor));


        }
        public static int fat(int valor){

        if (valor == 1){
            return 1;
        }
        return valor * fat(valor - 1);
    }

    public static int potencia(int x, int n){

       if (n == 0) {
            return 1;
       }
           return x * potencia(x,(n - 1));
       }

    public static int somarAte(int numero){

        if (numero == 1 ){
            return 1;
        }
        return numero + somarAte(numero * numero);
    }





}