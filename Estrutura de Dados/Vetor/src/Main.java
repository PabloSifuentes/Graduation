void main() {

    Scanner entrada = new Scanner(System.in);
    int[] valoresOriginais = new int[8];
    int contabilizar = 0;

    for (int i = 0; i < 8; i++) {

        System.out.println("Informe um valor para a posição " + i + ": ");
        valoresOriginais[i] = entrada.nextInt();
    }


    System.out.println("Informe um valor a ser buscado: ");
    int valorBuscado = entrada.nextInt();

    for (int i = 0; i < valoresOriginais.length; i++) {

        if (valoresOriginais[i] == valorBuscado) {
            contabilizar++;
        }
    }
    System.out.println("Foi contabilizado " + contabilizar + " vez(es) o valor " + valorBuscado);
}
