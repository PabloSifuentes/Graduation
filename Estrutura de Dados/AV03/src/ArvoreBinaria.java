
public interface ArvoreBinaria {

    public boolean add(Integer element);

    public boolean add(int index, Integer element);

    public boolean remove(int index);

    public boolean contains(Integer valor);

    public boolean isEmpty();

    public boolean isFull();

    public int getHeight();

    public int getNodeLevel(Integer valor);

    public int getQtMaxNodes();

    public void clear();

    public int size();

    public String toString();

    public String toStringPreOrdem();

    public String toStringInOrdem();

    public String toStringPosOrdem();
}
