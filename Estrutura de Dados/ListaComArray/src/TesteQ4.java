public class TesteQ4 {
    public static void main(String[] args) {

        ListaComArray<String> nomes = new ListaComArray<>();

        nomes.add("Ana");
        nomes.add("Pedro");
        nomes.add("Ana");
        nomes.add("Lucas");

        System.out.printf("Ocorrencias de 'Ana': " + nomes.contadorOcorrencias("Ana")); // esperado 2

        System.out.printf("Ocorrencias de 'João': " + nomes.contadorOcorrencias("João")); // esperado: 0
    }
}
