import java.util.LinkedList;

public class ListaComEncadeamento<E> implements Lista<E> {

    private NoLista<E> first;
    private  NoLista<E> last;
    private int counter;

    public ListaComEncadeamento() {
        this.first = null;
        this.last = null;
        this.counter = 0;
    }

    @Override
    public void add(E element) {
        NoLista<E> node = new NoLista<>();
        node.setInfo(element);

        if (counter == 0){
        first = node;
        } else {
            last.setNext(node);
        }
        last = node;
        counter++;
    }

    @Override
    public void add(int index, E element) {

    }

    @Override
    public E remove(int index) {
        return null;
    }

    @Override
    public boolean removeFirst(E element) {
        return false;
    }

    @Override
    public E get(int index) {
        return null;
    }

    @Override
    public E set(int index, E element) {
        return null;
    }

    @Override
    public void clear() {

        first = null;
        last = null;
        counter = 0;
    }

    @Override
    public int size() {
        return counter;
    }

    @Override
    public boolean isEmpty() {
        return (counter == 0);
    }

    @Override
    public boolean contains(E element) {
        return element != null;
    }

    @Override
    public int indexOf(E element) {
        return 0;
    }

    @Override
    public int lastIndexOf(E element) {
        return 0;
    }

    @Override
    public E[] toArray() {
        return null;
    }
}
