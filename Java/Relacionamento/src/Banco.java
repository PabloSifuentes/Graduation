import java.util.ArrayList;

public class Banco {

    private String nome;
    private int numero;
    private ArrayList<Conta> contas;

    public Banco(String nome, int numero) {
        this.nome = nome;
        this.numero = numero;
        this.contas = new ArrayList<Conta>();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public ArrayList<Conta> getContas() {
        return contas;
    }

    public void setContas(ArrayList<Conta> contas) {
        this.contas = contas;
    }

    public void criarConta(String numero, String titular){
        Conta conta = new Conta(numero, titular);
        contas.add(conta);
    }
}
