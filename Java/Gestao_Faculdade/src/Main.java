import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);
        Matricula matricula = new Matricula();
        CalcularMedia calcularMedia = new CalcularMedia();
        boolean controleNotas = true;

        while (controleNotas) {
            try {

                System.out.println("Nome do Aluno:");
                String nome = entrada.next();
                matricula.setNomeAluno(nome);

                System.out.println("Disciplina:");
                String disciplina = entrada.next();
                matricula.setNomeDisciplina(disciplina);

                System.out.println("Insirá a primeria nota!");
                double nota1 = entrada.nextDouble();
                matricula.setPrimeiraNota(nota1);

                System.out.println("Insirá a segunda nota!");
                double nota2 = entrada.nextDouble();
                matricula.setSegundaNota(nota2);

                System.out.println("Insirá a terceira nota!");
                double nota3 = entrada.nextDouble();
                matricula.setTerceiraNota(nota3);

                double mediaMain = calcularMedia.media(matricula);
                System.out.println("A média do aluno é: " + String.format("%.2f", mediaMain));
                controleNotas = false;

            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
                controleNotas = true;
            }
        }
        entrada.close();
    }
}