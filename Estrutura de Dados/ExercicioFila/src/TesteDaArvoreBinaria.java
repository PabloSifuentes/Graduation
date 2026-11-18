
public class TesteDaArvoreBinaria {

    public static void main(String[] args) {

        ArvoreBinariaComArray arvore = new ArvoreBinariaComArray(2);

        System.out.println("=== ARVORE BINARIA ===");

        System.out.println("Capacidade: " + arvore.getQtMaxNodes());

        System.out.println("Arvore vazia? " + arvore.isEmpty());


        System.out.println("\n=== INSERINDO ELEMENTOS ===");

        System.out.println("add(50): " + arvore.add(50));

        System.out.println("add(2, 70): " + arvore.add(2, 70));

        System.out.println("add(30): " + arvore.add(30));
        System.out.println("add(20): " + arvore.add(20));
        System.out.println("add(40): " + arvore.add(40));
        System.out.println("add(60): " + arvore.add(60));
        System.out.println("add(80): " + arvore.add(80));


        System.out.println("\n=== ARVORE COMPLETA ===");

        System.out.println(arvore);

        System.out.println("Tamanho: " + arvore.size());

        System.out.println("Altura: " + arvore.getHeight());

        System.out.println("Arvore cheia? " + arvore.isFull());


        System.out.println("\n=== PERCURSOS ===");

        System.out.println("Por nivel: " + arvore);

        System.out.println("Pre-ordem: " + arvore.toStringPreOrdem());

        System.out.println("In-ordem: " + arvore.toStringInOrdem());

        System.out.println("Pos-ordem: " + arvore.toStringPosOrdem());


        System.out.println("\n=== CONSULTAS ===");

        System.out.println("Contem 40? " + arvore.contains(40));

        System.out.println("Nivel do elemento 60: "
                + arvore.getNodeLevel(60));


        System.out.println("\n=== TESTANDO INDICES ===");

        System.out.println("Adicionar no indice 4: "
                + arvore.add(4, 99));

        System.out.println("Adicionar no indice 7: "
                + arvore.add(7, 99));


        System.out.println("\n=== REMOVENDO SUBARVORE ===");

        System.out.println("Remove indice 1: " + arvore.remove(1));

        System.out.println(arvore);

        System.out.println("Tamanho: " + arvore.size());

        System.out.println("Contem 40? " + arvore.contains(40));


        System.out.println("\n=== NOVA INSERCAO ===");

        System.out.println("add(25): " + arvore.add(25));

        System.out.println(arvore);


        System.out.println("\n=== LIMPANDO ARVORE ===");

        arvore.clear();

        System.out.println(arvore);

        System.out.println("Arvore vazia? " + arvore.isEmpty());

        System.out.println("Tamanho: " + arvore.size());

        System.out.println("Altura: " + arvore.getHeight());

    }
}
