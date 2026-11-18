public class TesteDaFila {
    public static void main(String[] args) {

        Fila minhaFila = new FilaComEncadeamento();

        System.out.println(minhaFila);
        minhaFila.add(80);
        minhaFila.add(1);
        minhaFila.add(23);
        minhaFila.add(44);
        minhaFila.add(50);
        System.out.println(minhaFila);
        System.out.println("Quem saiu da fila: " +minhaFila.remove());
        System.out.println("Quem saiu da fila: " +minhaFila.remove());
        System.out.println(minhaFila);
    }
}
