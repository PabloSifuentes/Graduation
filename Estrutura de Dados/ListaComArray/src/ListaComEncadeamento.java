public class ListaComEncadeamento<E> implements Lista<E> {

    private NoLista<E> first;
    private NoLista<E> last;
    private int counter;


    public ListaComEncadeamento() {
        this.first = null;
        this.last = null;
        this.counter = 0;
    }


    @Override
    public boolean add(E elemento) {
        NoLista<E> novo = new NoLista<>(elemento);
        if (isEmpty()) {
            first = novo;
        } else {
            last.setNext(novo);
        }
        last = novo;
        counter++;
        return true;
    }

    @Override
    public boolean add(int index, E elemento) {
        if (index < 0 || index > counter) {
            throw new IndexOutOfBoundsException("Índice inválido: " + index);
        }
        if (index == counter) {
            return add(elemento);
        }
        NoLista<E> novo = new NoLista<>(elemento);
        if (index == 0) {
            novo.setNext(first);
            first = novo;
        } else {
            NoLista<E> anterior = noNaPosicao(index - 1);
            novo.setNext(anterior.getNext());
            anterior.setNext(novo);
        }
        counter++;
        return true;
    }

    private NoLista<E> noNaPosicao(int index) {
        NoLista<E> atual = first;
        for (int i = 0; i < index; i++) {
            atual = atual.getNext();
        }
        return atual;
    }

    @Override
    public E remove(int index) {
        if (index < 0 || index >= counter) {
            throw new IndexOutOfBoundsException("Índice inválido: " + index);
        }
        E removido;
        if (index == 0) {
            removido = first.getInfo();
            first = first.getNext();
            if (first == null) {
                last = null;
            }
        } else {
            NoLista<E> anterior = noNaPosicao(index - 1);
            NoLista<E> alvo = anterior.getNext();
            removido = alvo.getInfo();
            anterior.setNext(alvo.getNext());
            if (alvo == last) {
                last = anterior;
            }
        }
        counter--;
        return removido;
    }

    @Override
    public boolean removeFirst(E elemento) {
        int index = indexOf(elemento);
        if (index == -1) {
            return false;
        }
        remove(index);
        return true;
    }

    @Override
    public E get(int index) {
        if (index < 0 || index >= counter) {
            throw new IndexOutOfBoundsException("Índice inválido: " + index);
        }
        return noNaPosicao(index).getInfo();
    }

    @Override
    public void clear() {
        first = null;
        last = null;
        counter = 0;
    }

    @Override
    public E set(int index, E elemento) {
        if (index < 0 || index >= counter) {
            throw new IndexOutOfBoundsException("Índice inválido: " + index);
        }
        NoLista<E> alvo = noNaPosicao(index);
        E antigo = alvo.getInfo();
        alvo.setInfo(elemento);
        return antigo;
    }

    @Override
    public int size() {
        return counter;
    }

    @Override
    public boolean isEmpty() {
        return counter == 0;
    }

    @Override
    public boolean contains(E elemento) {
        return indexOf(elemento) != -1;
    }

    @Override
    public int indexOf(E elemento) {
        NoLista<E> atual = first;
        int i = 0;
        while (atual != null) {
            if (elemento == null ? atual.getInfo() == null : elemento.equals(atual.getInfo())) {
                return i;
            }
            atual = atual.getNext();
            i++;
        }
        return -1;
    }

    @Override
    public int lastIndexOf(E elemento) {
        NoLista<E> atual = first;
        int i = 0;
        int ultimo = -1;
        while (atual != null) {
            if (elemento == null ? atual.getInfo() == null : elemento.equals(atual.getInfo())) {
                ultimo = i;
            }
            atual = atual.getNext();
            i++;
        }
        return ultimo;
    }

    @Override
    public Object[] toArray() {
        Object[] resultado = new Object[counter];
        NoLista<E> atual = first;
        int i = 0;
        while (atual != null) {
            resultado[i] = atual.getInfo();
            atual = atual.getNext();
            i++;
        }
        return resultado;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder("[ ");
        NoLista<E> atual = first;
        while (atual != null) {
            builder.append(atual.getInfo());
            if (atual.getNext() != null) {
                builder.append(", ");
            }
            atual = atual.getNext();
        }
        builder.append(" ]");
        return builder.toString();
    }
}
