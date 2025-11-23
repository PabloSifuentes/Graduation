import java.util.Scanner;

//Créditos por Reciclagem
//Um estabelecimento oferece créditos pela reciclagem de recipientes. Vasilhames de um litro ou menos
//valem R$ 0,10, enquanto vasilhames com mais de um litro valem R$ 0,25. Crie um programa em Java
//que leia a quantidade (como int) de cada um desses dois tipos de vasilhames e, em seguida, calcule e
//exiba o valor total dos créditos obtidos (como double).

public class Exercicio_2 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        double creditos = 0;
        boolean controle = true;

        while(controle){

        System.out.println("Informe os litros de cada Vasilhames!\nVasilhames:");
        double litro = entradaDados.nextDouble();
        System.out.println("Quandidade de Vasilhames:");
        int quantidade = entradaDados.nextInt();

        if(litro <= 1.0){
         double valorTotal = 0.10 * quantidade;
         creditos += valorTotal;
        } else if(litro > 1.0){
            double valorTotal = 0.25 * quantidade;
            creditos += valorTotal;
        }

            System.out.println("Deseja continuar com a Reciclagem?\n[1] - SIM\n[2] - NÃO");
            int opcao = entradaDados.nextInt();

            if(opcao == 1){
                controle = true;
            } else{
                controle = false;
            }
        }
        System.out.println("Total de Créditos obtidos: " +creditos);
    }
}
