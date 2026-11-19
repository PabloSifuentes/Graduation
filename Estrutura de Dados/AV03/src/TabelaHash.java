public class TabelaHash {

    private Aluno[] array;

    public TabelaHash(int N) {
        this.array = new Aluno[N];
    }

    private int hash(int chave) {
        return chave % array.length;
    }

    public void insere(Aluno aluno) {

        int h = hash(aluno.getMatricula());
        Aluno p = array[h];

        while (p != null) {
            if (p.getMatricula() == aluno.getMatricula()) {
                break;
            }
            p = p.getProximo();
        }

        if (p == null) {
            p = new Aluno();
            p.setMatricula(aluno.getMatricula());
            p.setProximo(array[h]);
            array[h] = p;
        }
        p.setNome(aluno.getNome());
        p.setMedia(aluno.getMedia());

    }

    public Aluno busca(int chave) {

        int h = hash(chave);
        Aluno p = array[h];
        while (p != null) {
            if (p.getMatricula() == chave) {
                return p;
            }
            p = p.getProximo();
        }
        return null;
    }

    public boolean remove(int chave) {

        int h = hash(chave);
        Aluno p = array[h];
        Aluno anterior = null;
        while (p != null) {
            if (p.getMatricula() == chave) {
                if (anterior != null) {
                    anterior.setProximo(p.getProximo());
                } else {
                    array[h] = p.getProximo();
                }
                return true;
            }
            anterior = p;
            p = p.getProximo();
        }
        return false;
    }

    public void imprime() {

        for (int i = 0; i < array.length; i++) {
            System.out.print("Indice: " + i + " = ");
            Aluno p = array[i];
            if (p == null) {
                System.out.println("null");
            } else {
                while (p != null) {
                    System.out.print(
                            p.getMatricula() + "|" + p.getNome() + ", "
                    );
                    p = p.getProximo();
                }
                System.out.println();
            }
        }
    }

    @Override
    public String toString() {

        String resultado = "";
        for (int i = 0; i < array.length; i++) {
            resultado += "Indice: " + i + " = ";
            Aluno p = array[i];
            while (p != null) {
                resultado += p.getMatricula() + "|" + p.getNome() + ", ";
                p = p.getProximo();
            }
            if (array[i] == null) {
                resultado += "null";
            }
            resultado += "\n";
        }
        return resultado;
    }
}
