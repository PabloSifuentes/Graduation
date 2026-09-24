public interface Lista<E> {

    boolean add(E element);
    boolean add(int index, E element);
    E remove(int index);
    boolean removeFirst(E element);
    E get(int index);
    void clear();
    E set(int index, E element);
    int size();
    boolean isEmpty();
    boolean contains(E element);
    int indexOf(E element);
    int lastIndexOf(E element);
    Object[] toArray();
}
