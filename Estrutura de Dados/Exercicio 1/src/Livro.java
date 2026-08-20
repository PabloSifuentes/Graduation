public class Livro {

    private String titulo;
    private String autor;
    private int ano;
    

    public Livro() {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }

    public Livro(String guerra, String teves, int i) {
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String exibirDados() {
        return "Livro{" +
                "titulo='" + getTitulo() + '\'' +
                ", autor='" + getAutor() + '\'' +
                ", ano=" + getAno() +
                '}';
    }

//    public String ehAntigo(){
//
//        Livro livro = new Livro();
//
//        if (livro.getAno() > 20){
//            return "Esse livro possui mais de 20 anos";
//        }
//        return
//    }

}
