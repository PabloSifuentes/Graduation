public class Professor {

    private String nome;
    private Aluno nomeAluno;

    public Professor(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Aluno getNomeAluno() {
        return nomeAluno;
    }

    public void setNomeAluno(Aluno nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public void ensinar(Aluno nomeAluno){
        System.out.println("Professor " + this.nome + " ensina o aluno " + nomeAluno.getNome());
    }
}
