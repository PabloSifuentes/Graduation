import java.util.Scanner;

public class Exercicio04 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        Livro livros = new Livro();

        String[] vetorTitulo = new String[2];
        String[] vetorAutor = new String[2];
        String[] vetorAno = new String[2];

        for (int i = 0; i < vetorTitulo.length;i++) {
            System.out.println("Informe o Titulo: ");
            vetorTitulo[i] = entradaDados.next();
            System.out.println("Informe o Autor: ");
            vetorAutor[i] = entradaDados.next();
            System.out.println("Informe o Ano: ");
            vetorAno[i] = entradaDados.next();

        }
        for (int i = 0;i<2;i++){
        System.out.println(livros.exibirDados());

        }

    }
}
