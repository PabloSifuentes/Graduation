
import java.util.Arrays;

public class ArvoreBinariaComArray implements ArvoreBinaria {

    private int h;
    private int counter;
    private Integer[] array;

    public ArvoreBinariaComArray(int h) {

        if (h < 0 || h > 30) {
            throw new IllegalArgumentException("Altura inválida!");
        }

        this.h = h;
        this.counter = 0;
        this.array = new Integer[getQtMaxNodes()];
    }

    // Adiciona na primeira posição disponível por nível
    @Override
    public boolean add(Integer element) {

        if (element == null || isFull()) {
            return false;
        }

        for (int i = 0; i < array.length; i++) {

            if (array[i] == null) {

                if (i == 0 || array[(i - 1) / 2] != null) {
                    return add(i, element);
                }
            }
        }

        return false;
    }

    // Adiciona em um índice específico
    @Override
    public boolean add(int index, Integer element) {

        if (element == null || index < 0 || index >= array.length) {
            return false;
        }

        // Verifica se a posição já está ocupada
        if (array[index] != null) {
            return false;
        }

        // Verifica se o nó possui um pai
        if (index > 0 && array[(index - 1) / 2] == null) {
            return false;
        }

        array[index] = element;
        counter++;

        return true;
    }

    // Remove o nó e seus descendentes
    @Override
    public boolean remove(int index) {

        if (index < 0 || index >= array.length || array[index] == null) {
            return false;
        }

        removeSubtree(index);

        return true;
    }

    // Método auxiliar para remover uma subárvore
    private void removeSubtree(int index) {

        if (index >= array.length || array[index] == null) {
            return;
        }

        int left = 2 * index + 1;
        int right = 2 * index + 2;

        removeSubtree(left);
        removeSubtree(right);

        array[index] = null;
        counter--;
    }

    // Verifica se determinado elemento existe
    @Override
    public boolean contains(Integer valor) {

        if (valor == null) {
            return false;
        }

        for (int i = 0; i < array.length; i++) {

            if (array[i] != null && array[i].equals(valor)) {
                return true;
            }
        }

        return false;
    }

    // Verifica se a árvore está vazia
    @Override
    public boolean isEmpty() {
        return counter == 0;
    }

    // Verifica se a árvore está cheia
    @Override
    public boolean isFull() {
        return counter == array.length;
    }

    // Retorna a altura atual da árvore
    @Override
    public int getHeight() {

        int altura = -1;

        for (int i = 0; i < array.length; i++) {

            if (array[i] != null) {

                int nivel = getLevelByIndex(i);

                if (nivel > altura) {
                    altura = nivel;
                }
            }
        }

        return altura;
    }

    // Retorna o nível de determinado elemento
    @Override
    public int getNodeLevel(Integer valor) {

        if (valor == null) {
            return -1;
        }

        for (int i = 0; i < array.length; i++) {

            if (array[i] != null && array[i].equals(valor)) {
                return getLevelByIndex(i);
            }
        }

        return -1;
    }

    // Calcula o nível através do índice
    private int getLevelByIndex(int index) {

        int nivel = 0;

        while (index > 0) {
            index = (index - 1) / 2;
            nivel++;
        }

        return nivel;
    }

    // Retorna a quantidade máxima de nós
    @Override
    public int getQtMaxNodes() {

        return (int) (Math.pow(2, h + 1) - 1);
    }

    // Retorna a quantidade atual de nós
    @Override
    public int size() {
        return counter;
    }

    // Limpa a árvore
    @Override
    public void clear() {

        Arrays.fill(array, null);
        counter = 0;
    }

    // Impressão por nível
    @Override
    public String toString() {

        StringBuilder resultado = new StringBuilder("NIVEL [");

        for (int i = 0; i < array.length; i++) {

            if (array[i] != null) {

                if (resultado.length() > 7) {
                    resultado.append(", ");
                }

                resultado.append(array[i]);
            }
        }

        resultado.append("]");

        return resultado.toString();
    }

    // Impressão pré-ordem: Raiz, Esquerda, Direita
    @Override
    public String toStringPreOrdem() {

        StringBuilder resultado = new StringBuilder("[");

        preOrdem(0, resultado);

        return resultado.append("]").toString();
    }

    private void preOrdem(int index, StringBuilder resultado) {

        if (index >= array.length || array[index] == null) {
            return;
        }

        appendValue(resultado, array[index]);

        preOrdem(2 * index + 1, resultado);
        preOrdem(2 * index + 2, resultado);
    }

    // Impressão em ordem: Esquerda, Raiz, Direita
    @Override
    public String toStringInOrdem() {

        StringBuilder resultado = new StringBuilder("[");

        inOrdem(0, resultado);

        return resultado.append("]").toString();
    }

    private void inOrdem(int index, StringBuilder resultado) {

        if (index >= array.length || array[index] == null) {
            return;
        }

        inOrdem(2 * index + 1, resultado);

        appendValue(resultado, array[index]);

        inOrdem(2 * index + 2, resultado);
    }

    // Impressão pós-ordem: Esquerda, Direita, Raiz
    @Override
    public String toStringPosOrdem() {

        StringBuilder resultado = new StringBuilder("[");

        posOrdem(0, resultado);

        return resultado.append("]").toString();
    }

    private void posOrdem(int index, StringBuilder resultado) {

        if (index >= array.length || array[index] == null) {
            return;
        }

        posOrdem(2 * index + 1, resultado);

        posOrdem(2 * index + 2, resultado);

        appendValue(resultado, array[index]);
    }

    // Evita repetir código na montagem das strings
    private void appendValue(StringBuilder resultado, Integer valor) {

        if (resultado.length() > 1) {
            resultado.append(", ");
        }

        resultado.append(valor);
    }
}
