// Chamando a tag body do HTML
const body = document.querySelector("body");
// Variável da chave do localStorage
const KEY_LOCAL_STORAGE = "tasks";
// Chamando as tags utilizadas dentro da tag body
const addTaskInput = body.querySelector("#addTaskInput");
const addTaskButton = body.querySelector("#addTaskButton");
const tasksContainer = body.querySelector("#tasks");

window.addEventListener("DOMContentLoaded", readTasks);

// Modelo da tarefa
class TaskModel {
    constructor(text) {
        this.id = JSON.stringify(new Date().getTime());
        this.text = text;
        this.done = false;
    }
}

// Função para ler as tarefas
function readTasks() {
    const tasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE) || "[]");
    let taskElement = "";

    // Lendo o array de tarefas e criando o modelo delas
    tasks.map((item) => {
        let task = `
        <li class="task" id="${item.id}">
            <p>${item.text}</p>
            <div class="manage-task">
                <button class="done">
                    <img src="./assets/docs/images/check.svg" alt="Ícone de visto">
                </button>
                <button class="trash">
                    <img src="./assets/docs/images/trash.svg" alt="Ícone de lixeira">
                </button>
            </div>
        </li>
        `;

        taskElement += task;
    });

    tasksContainer.innerHTML = taskElement;

    if (tasksContainer.innerHTML == "") {
        tasksContainer.style = "display: none";
    } else {
        tasksContainer.style = "display: flex";
    }
}

// Função para criar uma tarefa
function addTasks() {
    const inputValue = addTaskInput.value;

    const task = new TaskModel(inputValue);

    const tasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE) || "[]");

    tasks.push(task);

    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(tasks));

    addTaskInput.value = "";

    readTasks();
}

// Passando a função addTasks para o evento de click do botão
addTaskButton.addEventListener("click", addTasks);
