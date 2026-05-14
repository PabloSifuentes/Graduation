public class Conta {

    private String numero;
    private double saldo;
    private String titular;

    public Conta(String numero, String titular) {
        this.numero = numero;
        this.titular = titular;
        this.saldo = 0;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public double getSaldo() {
        return saldo;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    @Override
    public String toString() {
        return String.format(
                "==============================\n" +
                        "   CONTA CRIADA COM SUCESSO   \n" +
                        "==============================\n" +
                        " Número da Conta : %s\n" +
                        " Titular         : %s\n" +
                        " Saldo Inicial   : R$ %,.2f\n" +
                        "==============================",
                this.getNumero(), // Substitua pelo seu método se tiver
                this.getTitular(), // Substitua pelo seu método se tiver
                this.getSaldo()
        );
    }
}
