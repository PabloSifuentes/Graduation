import java.util.ArrayList;

public class Medico {

    private String nome;
    private ArrayList<Paciente> paciente;

    public Medico(String nome) {
        this.nome = nome;
        this.paciente = new ArrayList<>();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public ArrayList<Paciente> getPaciente() {
        return paciente;
    }

    public void setPaciente(ArrayList<Paciente> paciente) {
        this.paciente = paciente;
    }

    public void agendamento(Paciente paciente){
        System.out.println("\nO paciente agendado é " + paciente.getNome() + " com o doutor " + this.nome);
    }
}
