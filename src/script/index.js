const body = document.body;
const todos = [];
let allCount = 0;
let doneCount = 0;

const updateStatistics = (all, done) => {
  let allElement = body.querySelector(".statistics__all");
  let allDoneElement = body.querySelector(".statistics__done");
  allElement.textContent = `All: ${allCount}`;
  allDoneElement.textContent = `Done: ${doneCount}`;
};

updateStatistics(allCount, doneCount);

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
    state: "new",
  };
  todos.push(newTodo);
  allCount = allCount + 1;
  updateStatistics(allCount, doneCount);
  let wrapper = body.querySelector(".list-wrapper");
  wrapper.prepend(createTodoElement(newTodo));
};

const createTodoElement = ({ id, content, date, state }) => {
  const todoElement = document.createElement("div");
  todoElement.classList.add("todo-element");
  todoElement.id = id;

  const statusButton = document.createElement("button");
  statusButton.classList.add("element__status", "btn");
  statusButton.textContent = state;
  statusButton.addEventListener("click", () => {
    statusButton.textContent = "Done";
    updateStatistics(allCount, ++doneCount);
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
      updateStatistics(--allCount, --doneCount);
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

const statusBtn = body.querySelector(".element__status");
