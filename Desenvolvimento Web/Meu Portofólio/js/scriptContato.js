
//Feedback
const feedback = document.querySelector("#feedback");
    const valor = document.querySelector("#valorAvaliacao");

    feedback.addEventListener("input", () => {
        valor.textContent = feedback.value;
    });

    //Data de nascimento
    const input = document.getElementById('data_nascimento');
    const hoje = new Date().toISOString().split('T')[0];

    inputData.setAttribute('max', hoje);

//Audio de fundo

document.addEventListener('click', () => {
    const audio = document.getElementById('audioFundo');

    audio.onplay().catch(error => {
        console.log("Erro ao tentar tocar o áudio:", error);
    });
}, {once: true});