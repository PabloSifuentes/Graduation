public class CalcularMedia {

    public double media(Matricula notas) {

        double mediaCalculada = (notas.getPrimeiraNota()+
                notas.getSegundaNota()+
                notas.getTerceiraNota())/3;
        return mediaCalculada;
    }

    public void exibirMatricula(Matricula matricula){
        System.out.println(matricula);
    }

    public double mediaPonderada(Matricula notas){

        double mediaPonderadaCalculada = (notas.getPrimeiraNota() * 4) + (notas.getSegundaNota() * 3) + (notas.getTerceiraNota() * 3);
        return mediaPonderadaCalculada;
    }
}
