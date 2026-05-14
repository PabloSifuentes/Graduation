//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Aluno aluno = new Aluno("Carlos");
    Professor professor = new Professor("José");
    professor.ensinar(aluno);

    Paciente pacienteTeste = new Paciente("Irineu");
    Medico medicoTeste = new Medico("Pablito Teves\n");
    medicoTeste.agendamento(pacienteTeste);

    Banco banco = new Banco("Bradesco", 36115);
    banco.criarConta("5454578", "Tevesss");
    banco.criarConta("778999", "Escobar");
    System.out.println(banco.getContas());
    }
}