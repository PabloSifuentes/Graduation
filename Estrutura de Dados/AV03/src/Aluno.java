public class Aluno {

    private String nome;
    private int matricula;
    private double media;
    private Aluno proximo;

    public Aluno() {
    }

    public Aluno(String nome, int matricula, double media) {
        this(nome, matricula, media, null);
    }

    public Aluno(String nome, int matricula, double media, Aluno proximo) {
        this.nome = nome;
        this.matricula = matricula;
        this.media = media;
        this.proximo = proximo;
    }

    public String getNome() {
        return nome;
    }

    public int getMatricula() {
        return matricula;
    }

    public double getMedia() {
        return media;
    }

    public Aluno getProximo() {
        return proximo;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setMatricula(int matricula) {
        this.matricula = matricula;
    }

    public void setMedia(double media) {
        this.media = media;
    }

    public void setProximo(Aluno proximo) {
        this.proximo = proximo;
    }

    @Override
    public String toString() {
        return nome + " " + matricula;
    }
}
