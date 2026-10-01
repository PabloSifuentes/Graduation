public class TesteQ2 {
    public static void main(String[] args) {

        ListaComEncadeamento<Integer> 11 = new ListaComEncadeamento<>();
        11. add(10);
        11. add(20);

        ListaComEncadeamento<Integer> 12 = new ListaComEncadeamento<>();
        12. add(10);
        12. add(20);

        ListaComEncadeamento<Integer> 13 = new ListaComEncadeamento<>();
        13. add(10);
        13. add(99);

        System.out.printf("L1 é igual a L2? " + 11.comparar(12)); // esperado: true
        System.out.printf("L1 é igual a L3? " + 11.comparar(13)); // esperado: false

    }
}
