import java.util.Arrays;

public class PilhaComArray implements Pilha{

    private Integer[] array;
    private boolean resizable;
    private int initialCapacity;
    private int counter;
    private int topIndex;
    private int x;

    public PilhaComArray() {
        this(10);
    }

    public PilhaComArray(int initialCapacity) {
        this(initialCapacity, true);
    }

    public PilhaComArray(int initialCapacity, boolean resizable) {
        this.initialCapacity = initialCapacity;
        this.resizable = resizable;
        this.counter = 0;
        this.array = new Integer[initialCapacity];
    }

    @Override
    public void push(Integer element) {
    if (this.counter == this.array.length){
        if (!this.resizable){
        throw  new RuntimeException("A pilha está cheia e não é redimensionável!");
        }
        redimensionar();
    }
    this.topIndex = this.counter;
    this.array[this.topIndex] = element;
    counter++;
    }

    @Override
    public Integer pop() {
        if (isEmpty()) {
            throw new RuntimeException("A pilha está vazia!");
        }

        Integer elementoRemovido = this.array[this.topIndex];
        this.array[this.topIndex] = null; // Libera a referência no array
        this.counter--;
        this.topIndex = this.counter - 1;

        return elementoRemovido;
    }

    @Override
    public Integer top() {
        if (isEmpty()){
            throw new RuntimeException("A pilha está vazia!");
        }
        return array[topIndex];
    }

    @Override
    public void clear() {
    if (resizable) {
        array = new Integer[initialCapacity];
    }
    counter = 0;
    }

    @Override
    public boolean isEmpty() {
        return (counter == 0);
    }

    @Override
    public int size() {
        return counter;
    }

    private void redimensionar() {
        int novaCapacidade = this.array.length * 2;
        Integer[] novoArray = new Integer[novaCapacidade];

        for (int i = 0; i < this.counter; i++) {
            novoArray[i] = this.array[i];
        }
        array = novoArray;
    }

    @Override
    public String toString() {
        return "PilhaComArray{" +
                "array=" + Arrays.toString(array) +
                ", resizable=" + resizable +
                ", initialCapacity=" + initialCapacity +
                ", counter=" + counter +
                ", topIndex=" + topIndex +
                ", x=" + x +
                '}';
    }
}
