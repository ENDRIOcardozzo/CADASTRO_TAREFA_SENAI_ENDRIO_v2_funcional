const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const adicionar = document.getElementById("adicionar");
const tema = document.getElementById("tema");

let tarefas = [];

function mostrar() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        li.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        li.innerHTML = `
            <span class="texto">${tarefa.texto}</span>

            <div class="acoes">
                <button
                    class="concluir"
                    data-i="${index}"
                    title="Concluir tarefa"
                >
                    <i class="fa-solid fa-check"></i>
                </button>

                <button
                    class="excluir"
                    data-i="${index}"
                    title="Excluir tarefa"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        lista.appendChild(li);
    });

    const quantidade = tarefas.length;

    contador.textContent =
        `${quantidade} ${quantidade === 1 ? "tarefa" : "tarefas"} na lista`;
}

function adicionarTarefa() {
    const texto = input.value.trim();

    if (texto === "") {
        return;
    }

    tarefas.push({
        texto: texto,
        concluida: false
    });

    input.value = "";

    mostrar();

    input.focus();
}

adicionar.addEventListener("click", adicionarTarefa);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

lista.addEventListener("click", function(event) {
    const botaoConcluir = event.target.closest(".concluir");
    const botaoExcluir = event.target.closest(".excluir");

    if (botaoConcluir) {
        const index = Number(botaoConcluir.dataset.i);

        tarefas[index].concluida =
            !tarefas[index].concluida;

        mostrar();
    }

    if (botaoExcluir) {
        const index = Number(botaoExcluir.dataset.i);

        tarefas.splice(index, 1);

        mostrar();
    }
});

tema.addEventListener("click", function() {
    document.body.classList.toggle("escuro");
});

mostrar();