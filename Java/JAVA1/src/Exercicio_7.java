import java.util.Scanner;
//Verificação de Múltiplos
//Crie um programa em Java que leia dois valores inteiros (int), a e b, e verifique se são múltiplos um do
//outro (utilize o operador %). Antes da verificação, é necessário identificar qual dos números é o maior
//e qual é o menor. O programa deve exibir os dois números com a mensagem "São múltiplos" ou "Não
//são múltiplos".

public class Exercicio_7 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        int maior = 0, menor = 0;

        System.out.println("Informe o valor (A): ");
        int a = entradaDados.nextInt();
        System.out.println("Informe o valor (B): ");
        int b = entradaDados.nextInt();

        if(a > b){
            maior = a;
            menor = b;
        } else {
            maior = b;
            menor = a;
        }

        if (maior % menor == 0){
            System.out.println(maior+ " e " +menor+ " são multiplos!");
        }else{
            System.out.println(maior+ " e " +menor+ " não são multiplos!");
        }
    }
}
