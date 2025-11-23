import java.util.Scanner;
//Situação do Aluno
//Escreva um programa em Java que calcule a média aritmética das três notas (use double) de um aluno.
//Além do valor da média, o programa deve exibir uma das seguintes mensagens:
//        • "Aprovado", se a média for igual ou superior a 6.
//        • "Em prova final", se a média for inferior a 6, mas igual ou superior a 3.
//        • "Reprovado", para as demais situações.

public class Exercicio_8 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        double media = 0;

        System.out.println("Informe as notas do aluno!\n1º Nota:");
        double nota1 = entradaDados.nextDouble();
        System.out.println("2º Nota:");
        double nota2 = entradaDados.nextDouble();
        System.out.println("3º Nota:");
        double nota3 = entradaDados.nextDouble();

        media = (nota1+nota2+nota3) / 3;

        if(media >= 6.0){
            System.out.println("Aluno Aprovado!");
        } else if (media >= 3) {
            System.out.println("Aluno em prova final!");
        }else{
            System.out.println("Aluno Reprovado!");
        }
    }
}
