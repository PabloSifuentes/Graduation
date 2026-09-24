import java.util.LinkedList;

public class TesteDaListaComArray {
    public static void main(String[] args) {
        Lista<Integer> numeros = new ListaComEncadeamento<>();
        System.out.println(numeros);

        numeros.add(903);
        numeros.add(105);
        numeros.add(45);
        numeros.add(1);
        numeros.add(890);
        numeros.add(1902);
        System.out.println(numeros);

        System.out.println("Existe o 66? " + numeros.contains(66));
        System.out.println("Existe o 45? " + numeros.contains(45) + "\n");

        numeros.add(0, 77777);
        System.out.println(numeros);

        numeros.add(7, 11111);
        System.out.println(numeros);

        numeros.add(4, 66666);
        System.out.println(numeros);

        System.out.println("Qual o tamanho? " + numeros.size() + "\n");
        System.out.println("Removeu elemento no índice 0: " + numeros.remove(0));
        System.out.println(numeros);

        if (!numeros.isEmpty()) {
            for (int i = 0; i < numeros.size(); i++) {
                System.out.print(numeros.get(i) + " ");
            }
            System.out.println("| FIM\n");
        }

        System.out.println("Valor que saiu da lista: " + numeros.set(1, 890));
        System.out.println(numeros);

        try {
            numeros.set(5, 890);
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Exceção esperada: " + e.getMessage() + "\n");
        }

        numeros.clear();
        System.out.println(numeros.size());
        System.out.println(numeros);
    }
}

