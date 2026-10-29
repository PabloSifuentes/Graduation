public class TesteDaPilha {
    public static void main(String[] args) {

        Pilha minhaPilha = new PilhaComEncadeamento();

        System.out.println(minhaPilha);
        minhaPilha.push(80);
        minhaPilha.push(1);
        minhaPilha.push(44);
        minhaPilha.push(50);
        System.out.println(minhaPilha);
        System.out.println("Quem saiu da pilha: " +minhaPilha.pop());
        System.out.println(minhaPilha);
        System.out.println("Quem está no topo: " +minhaPilha.top());
        System.out.println(minhaPilha);
    }
}
