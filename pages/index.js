import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  validationConfig,
  selectors,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(selectors.addTodoButton);
const addTodoPopup = document.querySelector(selectors.addTodoPopup);
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(selectors.addTodoCloseBtn);
const todosList = document.querySelector(selectors.todosList);
const todoTemplate = document.querySelector(selectors.todoTemplate);

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, selectors.todoTemplate);
  const todoElement = todo.getView();

  return todoElement;
};

const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  todosList.append(todoElement);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  renderTodo(values);

  todoValidator.resetValidation();

  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();
