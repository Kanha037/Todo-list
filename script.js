//Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded',getTodo);
//function
function addTodo(event) {
  //prevent the form for submitting
  event.preventDefault();
//if input value null
if(todoInput.value==""){
  alert('Please input something');
}
 else{
   //Create Div
   const todoDiv = document.createElement('div');
   todoDiv.classList.add("todo");

   //create LI
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);

   //Add todo to local storage
   saveLocalTodos(todoInput.value);

   //check button
   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<i class="fas fa-check"></i>';
   completedButton.classList.add('complete-btn');
   todoDiv.appendChild(completedButton);

   //trash button
   const trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add('trash-btn');
   todoDiv.appendChild(trashButton);

   //Append to todo-list
   todoList.appendChild(todoDiv);

   //todo input value empty
   todoInput.value = "";
 }
}
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall')
    //remove from local storage
    removeLocalTodos(todo);
    //remove after transition
    todo.addEventListener('transitionend', function () {
      todo.remove();
    })
  }
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        }
        else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        }
        else {
          todo.style.display = "flex";
        }
        break;
    }
  })
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');

    //add class todo
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to todo-list
    todoList.appendChild(todoDiv);

  })
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  // console.log(todos.indexOf(todoIndex));
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}