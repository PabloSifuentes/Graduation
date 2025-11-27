import java.util.Scanner;
//Área de uma Sala
//Escreva um programa em Java que solicite ao usuário a largura e o comprimento de uma sala em
//metros (utilize double para os valores). O programa deve calcular e exibir a área total da sala em metros
//quadrados, incluindo as unidades de medida nas mensagens de entrada e saída.
public class Exercicio_1 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        System.out.printf("Informe a Largura e o Comprimento em Metros (m)!\n");
        System.out.printf("largura: ");
        double largura = entradaDados.nextDouble();
        System.out.printf("Comprimento: ");
        double comprimento = entradaDados.nextDouble();

        double area = comprimento * largura;

        System.out.printf("A área total da sala " +area+ "(m²)");
    }
}
