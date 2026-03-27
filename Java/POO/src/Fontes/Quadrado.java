package Fontes;

public class Quadrado {

    public double lado;

    public double calcularArea(){
    double area = lado*lado;
    return area;
    }

    public double calculaPerimetro(){
        double perimetro = lado * 4;
        return perimetro;
    }

    public double getLado() {
        return lado;
    }

    public void setLado(double lado) {
        this.lado = lado;
    }
}
