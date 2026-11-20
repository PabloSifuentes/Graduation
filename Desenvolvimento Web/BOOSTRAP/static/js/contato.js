const form = document.getElementById("contatoForm");
const feedback = document.getElementById("feedback");
const valor = document.getElementById("valorAvaliacao");
const cpf = document.getElementById("cpf");
const senha = document.getElementById("password");
const confirmar = document.getElementById("confirmarSenha");
const aviso = document.getElementById("aviso");

feedback.addEventListener("input", () => (valor.textContent = feedback.value));

// Máscara 000.000.000-00
cpf.addEventListener("input", () => {
    cpf.value = cpf.value.replace(/\D/g, "").slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});

const conferirSenhas = () =>
    confirmar.setCustomValidity(confirmar.value === senha.value ? "" : "As senhas não coincidem");
senha.addEventListener("input", conferirSenhas);
confirmar.addEventListener("input", conferirSenhas);

form.addEventListener("submit", e => {
    e.preventDefault();
    conferirSenhas();

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    // Simulação: troque por envio real ao back-end
    aviso.classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
    valor.textContent = feedback.value;
});
