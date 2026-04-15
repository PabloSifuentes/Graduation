public class Matricula {

    private String nomeAluno;
    private String nomeDisciplina;
    private double primeiraNota;
    private double segundaNota;
    private double terceiraNota;

    public Matricula() {
    }

    public Matricula(String nomeAluno, String nomeDisciplina, double primeiraNota, double segundaNota, double terceiraNota) {
        setNomeAluno(nomeAluno);
        setNomeDisciplina(nomeDisciplina);
        setPrimeiraNota(primeiraNota);
        setSegundaNota(segundaNota);
        setTerceiraNota(terceiraNota);
    }

    public String getNomeAluno() {
        return nomeAluno;
    }

    public boolean setNomeAluno(String nomeAluno) {
        if(nomeAluno == null && nomeAluno.isEmpty()) {
        throw new IllegalArgumentException("Erro!!!\nCampo não pode estar vazio.");
        }

        if(!nomeAluno.matches("^[\\p{L}]+( [\\p{L}]+)*$")){
            throw new IllegalArgumentException("Erro!!!\nApenas caracteres (Letras).");
        }
            this.nomeAluno = nomeAluno;
            return true;
    }

    public String getNomeDisciplina() {
        return nomeDisciplina;
    }

    public boolean setNomeDisciplina(String nomeDisciplina) {
        if (nomeDisciplina == null || nomeDisciplina.isEmpty()){
            throw new IllegalArgumentException("ERRO!!!\nEsse campo não pode estar vazio");
        }

        if (!nomeDisciplina.matches("^[\\p{L}]+( [\\p{L}]+)*$")){
            throw new IllegalArgumentException("ERRO!!!\nApenas caracteres (Letras)");
        }
        this.nomeDisciplina = nomeDisciplina;
        return true;
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
    @Override
    public String toString() {
        // Calcula a média
        double mediaFinal = (primeiraNota + segundaNota + terceiraNota) / 3;
        double mediaPonderadaCalculada = (primeiraNota * 4) + (segundaNota * 3) + (terceiraNota * 3);

        // Retorna o layout customizado
        return "==================== DADOS DA MATRÍCULA ====================\n" +
                "Nome do Aluno       : " + nomeAluno + "\n" +
                "Nome da Disciplina  : " + nomeDisciplina + "\n" +
                "------------------------------------------------------------\n" +
                "Primeira Nota       : " + primeiraNota + "\n" +
                "Segunda Nota        : " + segundaNota + "\n" +
                "Terceira Nota       : " + terceiraNota + "\n" +
                "------------------------------------------------------------\n" +
                "Média Final         : " + String.format("%.2f", mediaFinal) + "\n" +
                "Média Ponderada     : " + String.format("%.2f", mediaPonderadaCalculada) + "\n" +
                "============================================================\n";
    }
}
