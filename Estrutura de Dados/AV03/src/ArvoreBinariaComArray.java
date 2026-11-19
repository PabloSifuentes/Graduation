
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

    public boolean add(int index, Integer element) {

        if (element == null || index < 0 || index >= array.length) {
            return false;
        }
        if (array[index] != null) {
            return false;
        }
        if (index > 0 && array[(index - 1) / 2] == null) {
            return false;
        }
        array[index] = element;
        counter++;
        return true;
    }

    public boolean remove(int index) {

        if (index < 0 || index >= array.length || array[index] == null) {
            return false;
        }
        removeSubtree(index);
        return true;
    }

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

    public boolean isEmpty() {
        return counter == 0;
    }

    public boolean isFull() {
        return counter == array.length;
    }

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

    private int getLevelByIndex(int index) {

        int nivel = 0;
        while (index > 0) {
            index = (index - 1) / 2;
            nivel++;
        }
        return nivel;
    }

    public int getQtMaxNodes() {
        return (int) (Math.pow(2, h + 1) - 1);
    }

    public int size() {
        return counter;
    }

    public void clear() {
        Arrays.fill(array, null);
        counter = 0;
    }

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

    private void appendValue(StringBuilder resultado, Integer valor) {

        if (resultado.length() > 1) {
            resultado.append(", ");
        }
        resultado.append(valor);
    }
}
