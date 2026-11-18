
import java.util.Arrays;

public class FilaComArray implements Fila {

    private Integer[] array;
    private boolean resizable;
    private int counter;

    public FilaComArray() {
        this(new Integer[10], true);
    }
    public FilaComArray(Integer[] array) {
        this(array, false);
    }

    public FilaComArray(Integer[] array, boolean resizable) {

        if (array == null) {
            throw new IllegalArgumentException("O array não pode ser nulo.");
        }
        this.array = Arrays.copyOf(array, array.length);
        this.resizable = resizable;
        this.counter = 0;
    }

    @Override
    public void add(Integer element) {

        if (counter == array.length) {

            if (!resizable) {
                throw new IllegalStateException("Fila cheia!");
            }
            array = Arrays.copyOf(array,
                    Math.max(1, array.length * 2));
        }
        array[counter] = element;
        counter++;
    }

    @Override
    public Integer remove() {

        if (isEmpty()) {
            throw new IllegalStateException("Fila vazia!");
        }
        Integer valor = array[0];
        for (int i = 0; i < counter - 1; i++) {
            array[i] = array[i + 1];
        }
        counter--;
        array[counter] = null;
        return valor;
    }

    @Override
    public void clear() {
        Arrays.fill(array, null);
        counter = 0;
    }

    @Override
    public boolean isEmpty() {
        return counter == 0;
    }

    @Override
    public int size() {
        return counter;
    }

    @Override
    public String toString() {
        return "INI " +
                Arrays.toString(Arrays.copyOf(array, counter)) +
                " FIM";
    }
}
