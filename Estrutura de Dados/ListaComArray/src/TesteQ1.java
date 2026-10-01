public class TesteQ1 {
    public static void main(String[] args) {

        ListaComEncadeamento<String> listaPrincipal = new ListaComEncadeamento<>();
        listaPrincipal.add("A");
        listaPrincipal.add("B");

        ListaComEncadeamento<String> outraEncadeada = new ListaComEncadeamento<>();
        outraEncadeada.add("C");
        outraEncadeada.add("D");

        System.out.printf("Antes: " + listaPrincipal.toString());
        listaPrincipal.concatenar(outraEncadeada);
        System.out.printf("Depois: " +listaPrincipal.toString());    }
}
