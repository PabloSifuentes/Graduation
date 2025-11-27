import java.util.Scanner;
//Sequência com Incremento
//Elabore um programa em Java que exiba a sequência de números: 1, 5, 9, 13, 17, ... até o último
//valor que não ultrapasse 50. A sequência é formada por um número inicial 1 e incrementos de
//4.
public class Sequencia_Incremento {
    public static void main(String[] args) {

        for(int i = 1; i < 50; i += 4){
            System.out.println(i);
        }
    }
}
