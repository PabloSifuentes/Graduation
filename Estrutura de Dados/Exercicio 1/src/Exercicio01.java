public class Exercicio01 {

    public int somaVetorInterativo(int[] vetor){
        int somar = 0;

        for (int i = 0; i < vetor.length;i++){
            somar+=vetor.length;
        }
        return somar;
    }

    public int somaVetorRecursivo(int vetor[], int posicao){
        int somar = 0;

        if (posicao == vetor.length){
            return 0;
        }
        return vetor[posicao] + somaVetorRecursivo(vetor, posicao + 1);
    }

}
