
import java.util.Arrays;
import java.util.EmptyStackException;

public class PilhaComArray implements Pilha {

    private Integer[] array;
    private boolean resizable;
    private int initialCapacity;
    private int counter;
    private int topIndex;

    public PilhaComArray() {
        this.array = new Integer[10];
        this.resizable = true;
        this.initialCapacity = 10;
        this.counter = 0;
        this.topIndex = -1;
    }

    public PilhaComArray(Integer[] array) {
        this(array, false);
    }

    public PilhaComArray(Integer[] array, boolean resizable) {
        if (array == null) {
            throw new IllegalArgumentException("Array não pode ser nulo!");
        }
        this.array = Arrays.copyOf(array, array.length);
        this.resizable = resizable;
        this.initialCapacity = array.length;
        this.counter = 0;
        this.topIndex = -1;
    }

    @Override
    public void push(Integer element) {

        if (counter == array.length) {

            if (!resizable) {
                throw new IllegalStateException("Pilha cheia!");
            }
            array = Arrays.copyOf(array,
                    Math.max(1, array.length * 2));
        }
        topIndex++;
        array[topIndex] = element;
        counter++;
    }

    @Override
    public Integer pop() {

        if (isEmpty()) {
            throw new EmptyStackException();
        }
        Integer valor = array[topIndex];
        array[topIndex] = null;
        topIndex--;
        counter--;
        return valor;
    }

    @Override
    public Integer top() {

        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return array[topIndex];
    }

    @Override
    public void clear() {
        Arrays.fill(array, null);
        counter = 0;
        topIndex = -1;
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
        return "PilhaComArray{" +
                "array=" + Arrays.toString(array) +
                ", resizable=" + resizable +
                ", initialCapacity=" + initialCapacity +
                ", counter=" + counter +
                ", topIndex=" + topIndex +
                '}';
    }
}
