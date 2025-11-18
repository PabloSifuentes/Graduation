import java.util.Scanner;

//Créditos por Reciclagem
//Um estabelecimento oferece créditos pela reciclagem de recipientes. Vasilhames de um litro ou menos
//valem R$ 0,10, enquanto vasilhames com mais de um litro valem R$ 0,25. Crie um programa em Java
//que leia a quantidade (como int) de cada um desses dois tipos de vasilhames e, em seguida, calcule e
//exiba o valor total dos créditos obtidos (como double).

public class Exercicio_2 {
    public static void main(String[] args) {

        Scanner entradaDados = new Scanner(System.in);

        boolean controleQuantidade = true;

        System.out.println("Informe as quantidades de Vasilhames em Litros (L)!\n");

        while(controleQuantidade == true) {

            System.out.println("Quantos Vasilhames são dê 1 à 10?! ");
            int quantidadeVasilhames = entradaDados.nextInt();

            switch (quantidadeVasilhames) {
                case 1:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    double vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valor = 0.10;
                        System.out.printf("Valor total do Crédito obtido: " + valor);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valor = 0.25;
                        System.out.printf("Valor total do Crédito obtido: " + valor);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 2:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 2;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 2;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 3:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 3;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 3;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 4:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 4;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 4;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 5:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 5;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 5;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 6:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 6;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 6;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 7:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 7;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 7;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 8:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 8;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 8;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 9:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 9;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 9;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                case 10:
                    System.out.println("Informe quantidade de litros do Vasilhame: ");
                    vasilhamesLitros = entradaDados.nextDouble();

                    if (vasilhamesLitros <= 1.0) {
                        double valorTotal = 0.10 * 10;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else if (vasilhamesLitros > 1.0) {
                        double valorTotal = 0.25 * 10;
                        System.out.printf("Valor total do Crédito obtido: " + valorTotal);
                        controleQuantidade = false;
                    } else {
                        System.out.printf("ERRO!\nPrecisa Informar um valor!");
                    }
                    break;
                default:
                    System.out.println("Erro, opção inválida.\nTente Novamente");
                    controleQuantidade = true;
            }
        }









    }
}
