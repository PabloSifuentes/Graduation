public class CalcularMedia {

    public double media(Matricula notas) {

        double mediaCalculada = (notas.getPrimeiraNota()+
                                 notas.getSegundaNota()+
                                 notas.getTerceiraNota())/3;
        return mediaCalculada;
    }
}
