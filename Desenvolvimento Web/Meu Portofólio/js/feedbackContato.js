const feedback = document.querySelector("#feedback");
    const valor = document.querySelector("#valorAvaliacao");

    feedback.addEventListener("input", () => {
        valor.textContent = feedback.value;
    });