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
    let tasksElements = "";

    // Lendo o array de tarefas e criando o modelo delas
    tasks.map((item) => {
        let task = `
        <li class="task" id="${item.id}">
            <p class="">${item.text}</p>
            <div class="manage-task">
                <button onclick="doneTask(this)" class="done">
                    <img src="./assets/docs/images/check.svg" alt="Ícone de visto">
                </button>
                <button onclick="deleteTasks(this)" class="trash">
                    <img src="./assets/docs/images/trash.svg" alt="Ícone de lixeira">
                </button>
            </div>
        </li>
        `;

        tasksElements += task;
    });

    tasksContainer.innerHTML = tasksElements;

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

// Função de excluir uma tarefa
function deleteTasks(element) {
    const tasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE) || "[]");

    tasks.map((item) => {
        const taskId = element.parentElement.parentElement.id;

        if (taskId == item.id) {
            const index = tasks.findIndex((data) => data.id === item.id);

            tasks.splice(index, 1);

            localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(tasks));
        }
    });

    readTasks();
}

// Função de conclusão de tarefa - EM DESENVOLVIMENTO
function doneTask(element) {
    const tasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE) || "[]");

    tasks.map((item) => {
        const taskId = element.parentElement.parentElement.id;

        if (taskId == item.id) {
            !item.done;

            // localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(tasks));
        }
    });
}

// Passando a função addTasks para o evento de click do botão
addTaskButton.addEventListener("click", addTasks);
