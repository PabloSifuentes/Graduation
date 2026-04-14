public class Matricula {

    private String nomeAluno;
    private String nomeDisciplina;
    private double primeiraNota;
    private double segundaNota;
    private double terceiraNota;

    public Matricula() {
    }

    public Matricula(String nomeAluno, String nomeDisciplina, double primeiraNota, double segundaNota, double terceiraNota) {
        this.nomeAluno = nomeAluno;
        this.nomeDisciplina = nomeDisciplina;
        setPrimeiraNota(primeiraNota);
        setSegundaNota(segundaNota);
        setTerceiraNota(terceiraNota);
    }

    public String getNomeAluno() {
        return nomeAluno;
    }

    public void setNomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public String getNomeDisciplina() {
        return nomeDisciplina;
    }

    public void setNomeDisciplina(String nomeDisciplina) {
        this.nomeDisciplina = nomeDisciplina;
    }

    public double getPrimeiraNota() {
        return primeiraNota;
    }

    public void setPrimeiraNota(double primeiraNota) {
        if (primeiraNota >= 0.0 && primeiraNota <= 10.0) {
            this.primeiraNota = primeiraNota;
        } else {
            throw new IllegalArgumentException("Erro!!!\nApenas notas entre 0.0 e 10.0");
        }
    }

    public double getSegundaNota() {
        return segundaNota;
    }

    public void setSegundaNota(double segundaNota) {
        if (segundaNota >= 0.0 && segundaNota <= 10.0) {
            this.segundaNota = segundaNota;
        } else {
            throw new IllegalArgumentException("Erro!!!\nApenas notas entre 0.0 e 10.0");
        }
    }

    public double getTerceiraNota() {
        return terceiraNota;
    }

    public void setTerceiraNota(double terceiraNota) {
        if (terceiraNota >= 0.0 && terceiraNota <= 10.0) {
            this.terceiraNota = terceiraNota;
        } else {
            throw new IllegalArgumentException("Erro!!!\nApenas notas entre 0.0 e 10.0");
        }
    }
}
