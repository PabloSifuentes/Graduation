public class Tabela_de_Potencia {
    public static void main(String[] args) {

        System.out.println("Selecione a turma: \n" +
                "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┑");
        System.out.println("┃   Número         Quadrado         Cubo    ┃");
        System.out.println("┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┃");

        for(int i = 0; i <= 10; i++){
            int quadrado = i * i;
            int cubo = i * i * i;

            // Ajuste do layout aqui ↓↓↓
            System.out.printf("┃    %-6d          %-8d       %-8d┃\n", i, quadrado, cubo); // %-6d; %-8d; %-8d - Define como os números serão alinhados e quantos espaços vão ocupar dentro da tabela.
            System.out.println("┃                                           ┃");
        }

        System.out.println("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┙");
    }
}
