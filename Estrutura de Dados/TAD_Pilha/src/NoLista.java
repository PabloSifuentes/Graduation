public class NoLista {

    private Integer info;
    private NoLista next;

    public NoLista() {
    }

    public NoLista(Integer info, NoLista next) {
        this.info = info;
        this.next = next;
    }

    public Integer getInfo() {
        return info;
    }

    public void setInfo(Integer info) {
        this.info = info;
    }

    public NoLista getNext() {
        return next;
    }

    public void setNext(NoLista noLista) {
        this.next = next;
    }
}
