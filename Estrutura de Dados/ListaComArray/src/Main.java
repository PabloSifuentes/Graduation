import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {

        ListaComArray lista = new ListaComArray();
        boolean b;
        for (int i = 0; i < 8; i++) {
            b = lista.add(i);
            System.out.println(b + "" + lista);
        }
        b = lista.add(0, 99);
        System.out.println(b + "" + lista);
        b = lista.add(9, 101);
        System.out.println(b + "" + lista);
        b = lista.add(9, 555);
        System.out.println(b + "" + lista);

        //Teste
        LinkedList<Integer> numeros;
        numeros = new LinkedList<Integer>();

        System.out.println(numeros);
        numeros.add(903);
        numeros.add(890);
        numeros.add(1902);
        System.out.println(numeros);
    }
}