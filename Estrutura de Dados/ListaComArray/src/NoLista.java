public class NoLista<E> {

    private E info ;
    private NoLista<E> next;

    public NoLista() {
        info = null;
        next = null;
    }

    public E getInfo() {
        return info;
    }

    public NoLista<E> getNext() {
        return next;
    }

    public void setInfo(E info) {
        this.info = info;
    }

    public void setNext(NoLista<E> next) {
        this.next = next;
    }
}
