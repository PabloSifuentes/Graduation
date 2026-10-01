public class TesteQ3 {
    public static void main(String[] args) {

        ListaComArray<Integer> numeros = new ListaComArray<>();

        numeros.add(1);
        numeros.add(2);
        numeros.add(3);
        numeros.add(4);
        numeros.add(5);

        System.out.printf("Original: " + numeros.toString());
        numeros.inverter();
        System.out.printf("Invertida: " + numeros.toString());
    }
}
