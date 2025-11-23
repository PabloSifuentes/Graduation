import java.util.Scanner;
//Cor de uma Casa no Tabuleiro de Xadrez
//Desenvolva um programa em Java que receba do usuário a coluna e a linha (valores inteiros int de 1
//        a 8) de uma casa em um tabuleiro de xadrez. O programa deve então determinar e exibir se a casa
//correspondente é branca ou preta.
//• Por exemplo, a coluna 5 e linha 3 corresponde a uma casa preta.
//

        
public class Exercicio_10 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);
        String cor;

        System.out.println("Informe a coluna de (1 a 8):");
        int coluna = entradaDados.nextInt();
        System.out.println("Informe a linha de (1 a 8):");
        int linha = entradaDados.nextInt();

        if(coluna < 1 || coluna > 8 || linha < 1 || linha > 8){
            System.out.println("Erro, Valores devem estar entre 1 e 8!");
        } else{
            if((coluna + linha) % 2 == 0){
                cor = "Branca";
            }  else{
                cor = "Preta";
            }
            System.out.println("A casa na coluna " +coluna+ " e linha " +linha+ " é " +cor);
        }
    }
}
