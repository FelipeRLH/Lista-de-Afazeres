// ----------- SELEÇÃO DE ELEMENTOS ----------------

const toDoForm = document.querySelector("#toDo-form");
const toDoInput = document.querySelector("#toDo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const toDoList = document.querySelector("#toDo-list");

let oldInputValue;
// -----------------FUNÇÕES ---------------


// 1 - FUNÇÃO CRIAR ITENS NA LISTA
let saveToDo = (text) => {
    let createTask = document.createElement("div")  //-- div html
    createTask.classList.add("toDo")

    let taskTitle = document.createElement("h3")   //-- h3 html
    taskTitle.innerHTML = text;
    createTask.appendChild(taskTitle)

    let doneBtn = document.createElement("button") //-- done button
    doneBtn.classList.add("finish-toDo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    createTask.appendChild(doneBtn)

    let editBtn = document.createElement("button") //-- edit button
    editBtn.classList.add("edit-toDo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    createTask.appendChild(editBtn)

    let removeBtn = document.createElement("button") //-- remove button
    removeBtn.classList.add("remove-toDo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    createTask.appendChild(removeBtn)

    toDoList.appendChild(createTask)

    toDoInput.value = ""
    toDoInput.focus()
    console.log(toDoList)
}


// 2 - FUNÇÃO DO BOTÃO EDIT

let toggleForms = () => {
    editForm.classList.toggle("hide")
    toDoForm.classList.toggle("hide")
    // toDoList.classList.toggle("hide")
}

// 4 - EDITAR TASK
let updateToDo = (text) => {
    let todos = document.querySelectorAll(".toDo")

    todos.forEach((todo) => {
        
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerHTML === oldInputValue){
            todoTitle.innerHTML = text
        }
    });


}


// ---------------- EVENTOS ---------------


// 1 - EVENTO CRIAR ITENS NA LISTA
toDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputValue = toDoInput.value;

    if (inputValue) {
        saveToDo(inputValue)
    }
});

// 2 - EVENTO DE CLICK NOS BOTÕES
document.addEventListener("click", (e) => {
    let targetEl = e.target
    let parentEl = targetEl.closest("div")
    let taskTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        taskTitle = parentEl.querySelector("h3").innerHTML;
    }

    if (targetEl.classList.contains("finish-toDo")) {  // BOTÃO FINISH
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("edit-toDo")) {  // BOTÃO EDIT
        toggleForms();

        editInput.value = taskTitle
        oldInputValue = taskTitle
    }

    if (targetEl.classList.contains("remove-toDo")) {  // BOTÃO REMOVE
        parentEl.remove();
    }
})

// 3 - EVENTO DE CANCELAR EDIÇÃO
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})


// 4- BOTÃO DE EDITAR TASK
editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let editInputValue = editInput.value

    if(editInputValue){
        updateToDo(editInputValue)
    }

    toggleForms()
})