// Chamando a tag body do HTML
const body = document.querySelector("body");
// Variável da chave do localStorage
const KEY_LOCAL_STORAGE = "tasks";
// Chamando as tags utilizadas dentro da tag body
const addTaskInput = body.querySelector("#addTaskInput");
const addTaskButton = body.querySelector("#addTaskButton");
const tasksContainer = body.querySelector("#tasks");

// Modelo da tarefa
class TaskModel {
    constructor(text) {
        this.id = new Date().getTime();
        this.text = text;
        this.done = false;
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
}

// Passando a função addTasks para o evento de click do botão
addTaskButton.addEventListener("click", addTasks);
