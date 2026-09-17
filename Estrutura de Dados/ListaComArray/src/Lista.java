public interface Lista<E> {

    public void add(E element);
    public void add(int index, E element);
    public E remove(int index);
    public boolean removeFirst(E element);
    public E get(int index);
    public E set(int index, E element);
    public void clear();
    public int size();
    public boolean isEmpty();
    public boolean contains(E element);
    public int indexOf(E element);
    public int lastIndexOf(E element);
    public E[] toArray();
}
