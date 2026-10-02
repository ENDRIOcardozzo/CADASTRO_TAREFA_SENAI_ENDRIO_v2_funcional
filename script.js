const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const adicionar = document.getElementById("adicionar");
const tema = document.getElementById("tema");

const botaoPrincipais = document.getElementById("botaoPrincipais");
const principaisContainer = document.getElementById("principaisContainer");
const listaPrincipais = document.getElementById("listaPrincipais");
const semPrincipais = document.getElementById("semPrincipais");

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

                <button class="concluir" data-i="${index}">
                    <i class="fa-solid fa-check"></i>
                </button>

                <button class="excluir" data-i="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        lista.appendChild(li);
    });

    const quantidade = tarefas.length;

    contador.textContent =
        `${quantidade} ${quantidade === 1 ? "tarefa" : "tarefas"} na lista`;

    mostrarPrincipais();
}

function mostrarPrincipais() {

    listaPrincipais.innerHTML = "";

    const principais = tarefas.filter(
        tarefa => tarefa.principal
    );

    if (principais.length === 0) {

        semPrincipais.style.display = "block";

        return;
    }

    semPrincipais.style.display = "none";

    principais.forEach(tarefa => {

        const index = tarefas.indexOf(tarefa);

        const li = document.createElement("li");

        li.className = tarefa.concluida
            ? "principalTarefa concluidaPrincipal"
            : "principalTarefa";

        li.innerHTML = `
            <span class="textoPrincipal">
                <i class="fa-solid fa-star"></i>
                ${tarefa.texto}
            </span>

            <div class="acoesPrincipal">

                <button class="concluirPrincipal" data-i="${index}">
                    <i class="fa-solid fa-check"></i>
                </button>

                <button class="excluirPrincipal" data-i="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        listaPrincipais.appendChild(li);
    });
}

function adicionarTarefa() {

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa antes de adicionar.");
        return;
    }

    const principal = confirm(
        "Quer adicionar essa tarefa como principal? REQUISITO FUNCIONAL 2"
    );

    tarefas.push({
        texto: texto,
        concluida: false,
        principal: principal
    });

    input.value = "";

    mostrar();

    input.focus();
}

adicionar.addEventListener(
    "click",
    adicionarTarefa
);

input.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            adicionarTarefa();
        }

    }
);

lista.addEventListener(
    "click",
    function(event) {

        const botaoConcluir =
            event.target.closest(".concluir");

        const botaoExcluir =
            event.target.closest(".excluir");

        if (botaoConcluir) {

            const index =
                Number(botaoConcluir.dataset.i);

            tarefas[index].concluida =
                !tarefas[index].concluida;

            mostrar();
        }

        if (botaoExcluir) {

            const index =
                Number(botaoExcluir.dataset.i);

            tarefas.splice(index, 1);

            mostrar();
        }

    }
);

listaPrincipais.addEventListener(
    "click",
    function(event) {

        const botaoConcluir =
            event.target.closest(".concluirPrincipal");

        const botaoExcluir =
            event.target.closest(".excluirPrincipal");

        if (botaoConcluir) {

            const index =
                Number(botaoConcluir.dataset.i);

            tarefas[index].concluida =
                !tarefas[index].concluida;

            mostrar();
        }

        if (botaoExcluir) {

            const index =
                Number(botaoExcluir.dataset.i);

            tarefas.splice(index, 1);

            mostrar();
        }

    }
);

botaoPrincipais.addEventListener(
    "click",
    function() {

        if (
            principaisContainer.style.display === "block"
        ) {

            principaisContainer.style.display = "none";

        } else {

            principaisContainer.style.display = "block";

            mostrarPrincipais();
        }

    }
);

tema.addEventListener(
    "click",
    function() {

        document.body.classList.toggle("escuro");

    }
);


/* ÁUDIO */

const abrirAudio =
    document.getElementById("abrirAudio");

const alertaAudio =
    document.getElementById("alertaAudio");

const reproduzirAudio =
    document.getElementById("reproduzirAudio");

const fecharAudio =
    document.getElementById("fecharAudio");

const audioPapoi =
    document.getElementById("audioPapoi");


abrirAudio.addEventListener(
    "click",
    function() {

        alertaAudio.style.display = "flex";

    }
);


/* AVISO PAPOI */

function mostrarAviso() {

    const avisoAntigo =
        document.querySelector(".avisoPapoi");

    if (avisoAntigo) {
        avisoAntigo.remove();
    }

    const aviso =
        document.createElement("div");

    aviso.className = "avisoPapoi";

    aviso.textContent =
        "Requisito funcional 1: PAPOI";

    aviso.style.position = "fixed";
    aviso.style.top = "20px";
    aviso.style.left = "50%";
    aviso.style.transform =
        "translateX(-50%)";

    aviso.style.background =
        "#6757e8";

    aviso.style.color =
        "#ffffff";

    aviso.style.padding =
        "15px 25px";

    aviso.style.borderRadius =
        "10px";

    aviso.style.fontWeight =
        "bold";

    aviso.style.zIndex =
        "99999";

    aviso.style.boxShadow =
        "0 8px 25px #0004";

    document.body.appendChild(aviso);

    setTimeout(
        function() {
            aviso.remove();
        },
        3000
    );
}


reproduzirAudio.addEventListener(
    "click",
    function() {

        audioPapoi.currentTime = 0;

        audioPapoi.play().catch(
            function() {
            }
        );

        mostrarAviso();

    }
);


fecharAudio.addEventListener(
    "click",
    function() {

        alertaAudio.style.display = "none";

        audioPapoi.pause();

        audioPapoi.currentTime = 0;

    }
);


alertaAudio.addEventListener(
    "click",
    function(event) {

        if (event.target === alertaAudio) {

            alertaAudio.style.display = "none";

            audioPapoi.pause();

            audioPapoi.currentTime = 0;
        }

    }
);


mostrar();
