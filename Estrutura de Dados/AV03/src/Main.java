
public class Main {

    public static void main(String[] args) {

        TabelaHash tabela = new TabelaHash(3);

        tabela.insere(new Aluno("Joao", 9, 5.5));
        tabela.insere(new Aluno("Carlos", 3, 9.5));
        tabela.insere(new Aluno("Joao2", 9, 5.5));
        tabela.insere(new Aluno("KAKAKA", 12, 5.5));
        tabela.insere(new Aluno("teste", 15, 5.5));
        tabela.insere(new Aluno("Caio", 4, 6.5));

        System.out.println("=== TABELA ===");
        tabela.imprime();
        System.out.println("\n=== BUSCA ===");
        System.out.println(tabela.busca(3));
        System.out.println("\n=== REMOCAO ===");
        tabela.remove(12);
        tabela.remove(15);
        tabela.imprime();
    }
}
