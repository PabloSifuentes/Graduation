public class ListaComArray {

    private Integer[] array;
    private boolean resizable;
    private int initialCapacity;
    private int counter;
    private final static int x = 10;




    public ListaComArray() {
    this(10);
    }

    public ListaComArray(int initialCapacity) {
        this(initialCapacity, true);
    }

    public ListaComArray(int initialCapacity, boolean resizable) {
        this.resizable = resizable;
        this.initialCapacity = initialCapacity;
        this.counter = 0;
        this.array = new Integer[initialCapacity];
    }

    public boolean add(Integer obj) {

        if (){


        }

        return ;
    }

    public boolean add(int index, Integer element) {
        return false;
    }

    private void resizeArrayList() {


        return;
    }

    public Integer remove(int index) {
        return 0;
    }

    public boolean removeFirst(Integer element) {
    return false;
    }

    public Integer get(int index) {
        return 0;
    }

    public void clear() {
        return;
    }

    public Integer set(int index, Integer element) {
    }

    public int size() {
    }

    public boolean isEmpty() {
    }

    public boolean isFull() {
    }

    public int contains(Integer element) {
    }

    public int indexOf(Integer element) {
    }

    public int lastIndexOf(Integer element) {
    }

    public Integer[] toArray() {
    }

    public String toString() {

    }
}
