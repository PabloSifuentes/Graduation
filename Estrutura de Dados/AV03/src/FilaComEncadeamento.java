public class FilaComEncadeamento implements Fila {

    private NoLista first;
    private NoLista last;
    private int counter;

    public FilaComEncadeamento() {
    }

    @Override
    public void add(Integer valor) {
        NoLista novo = new NoLista(valor);
        if (isEmpty()) {
            first = novo;
        } else {
            last.setNext(novo);
        }
        last = novo;
        counter++;
    }

    @Override
    public Integer remove() {
        if (isEmpty()) {
            throw new IllegalStateException("A fila está vazia.");
        }

        Integer valorRemovido = first.getInfo();
        first = first.getNext();
        counter--;

        if (first == null) {
            last = null;
        }
        return valorRemovido;
    }

    @Override
    public void clear() {
        this.first = null;
        this.last = null;
        this.counter = 0;
    }

    @Override
    public boolean isEmpty() {
        return first == null;
    }

    @Override
    public int size() {
        return counter;
    }

    @Override
    public String toString() {
        String myarray1 = "INI [";
        NoLista aux = first;
        while (aux != null) {
            myarray1 += aux.getInfo();
            if (aux.getNext() != null) {
                myarray1 += ", ";
            }
            aux = aux.getNext();
        }
        myarray1 += "] FIM";
        return myarray1;
    }
}
