const body = document.body;
let todos = [];

const updateStatistics = () => {
  let allCount = todos.length;
  let doneCount = todos.filter((item) => item.state === "Done").length;

  let allElement = body.querySelector(".statistics__all");
  let allDoneElement = body.querySelector(".statistics__done");
  allElement.textContent = `All: ${allCount}`;
  allDoneElement.textContent = `Done: ${doneCount}`;
};

updateStatistics();

const form = body.querySelector(".form-add");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let input = body.querySelector(".form-add__input");
  let text = input.value;
  if (text && text.trim() !== "") addTodo(text);
  input.value = "";
});

const addTodo = (text) => {
  let newTodo = {
    id: Math.trunc(Math.random() * 1000),
    content: text,
    date: new Date(),
    state: "New",
  };
  todos.unshift(newTodo);
  updateStatistics();
  let wrapper = body.querySelector(".list-wrapper");
  wrapper.prepend(createTodoElement(newTodo));
};

const createTodoElement = ({ id, content, date, state }) => {
  const todoElement = document.createElement("div");
  todoElement.classList.add("todo-element");
  todoElement.id = `_${id}`;

  const statusButton = document.createElement("button");
  statusButton.classList.add("element__status", "btn");
  statusButton.textContent = state;
  statusButton.addEventListener("click", () => {
    statusButton.textContent = "Done";
    let index = todos.findIndex((e) => e.id === id);
    if (index >= 0) {
      todos[index]["state"] = "Done";
      updateStatistics();
    }
  });

  const contentP = document.createElement("p");
  contentP.classList.add("element__content");
  contentP.textContent = content;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("element__delete", "btn");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    let index = todos.findIndex((e) => e.id === id);
    if (index >= 0) {
      todos.splice(index, 1);
      todoElement.remove();
      updateStatistics();
    }
  });

  const dateP = document.createElement("p");
  dateP.classList.add("element__date");
  dateP.textContent = date;

  todoElement.appendChild(statusButton);
  todoElement.appendChild(contentP);
  todoElement.appendChild(deleteButton);
  todoElement.appendChild(dateP);

  return todoElement;
};

const deleteAll = () => {
  elems = body.querySelectorAll(".todo-element");
  elems.forEach((elem) => elem.remove());

  todos = [];
  updateStatistics();
};

let deleteAllBtn = body.querySelector(".deleteAll-btn");
deleteAllBtn.addEventListener("click", deleteAll);

const deleteLast = () => {
  if (todos.length) {
    let sortedArray = structuredClone(todos).sort((a, b) => b.date - a.date);
    todos = todos.filter((item) => item.id !== sortedArray[0].id);
    body.querySelector(`#_${sortedArray[0].id}`).remove();
    updateStatistics();
    console.log(sortedArray[0].id);
  }
};

let deleteLastBtn = body.querySelector(".deleteLast-btn");
deleteLastBtn.addEventListener("click", deleteLast);

const showAll = () => {
  let wrapper = body.querySelector(".list-wrapper");
  wrapper.innerHTML = "";
  todos.forEach((todo) => wrapper.append(createTodoElement(todo)));
};
let showAllBtn = body.querySelector(".showAll-btn");
showAllBtn.addEventListener("click", showAll);

const showDone = () => {
  let wrapper = body.querySelector(".list-wrapper");
  wrapper.innerHTML = "";
  todos
    .filter((item) => item.state === "Done")
    .forEach((todo) => wrapper.append(createTodoElement(todo)));
};
let showAllDoneBtn = body.querySelector(".showDone-btn");
showAllDoneBtn.addEventListener("click", showDone);

const searchTodos = () => {
  console.log("here");
  let wrapper = body.querySelector(".list-wrapper");
  wrapper.innerHTML = "";
  let searchInput = body.querySelector(".search__input");
  todos
    .filter((todo) => todo.content.includes(searchInput.value))
    .forEach((todo) => wrapper.append(createTodoElement(todo)));
};

let searchInput = body.querySelector(".search__input");
searchInput.addEventListener("input", searchTodos);
