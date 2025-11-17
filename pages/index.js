import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  validationConfig,
  selectors,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(selectors.addTodoButton);
const addTodoForm = document.querySelector(selectors.addTodoForm);

const todoCounter = new TodoCounter({
  todos: initialTodos,
  selector: ".counter__text",
});

const generateTodo = (data) => {
  const todo = new Todo(data, selectors.todoTemplate, {
    handleToggleCompleted: (isNowCompleted) => {
      todoCounter.updateCompleted(isNowCompleted);
    },
    handleDelete: (wasCompleted) => {
      todoCounter.updateTotal(false);
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  });
  return todo.getView();
};

let todoSection;

const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  todoSection.addItem(todoElement);
};

todoSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: selectors.todosList,
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: selectors.addTodoPopup,
  handleFormSubmit: (formValues) => {
    const name = formValues.name;
    const dateInput = formValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const newTodoData = { name, date, id, completed: false };

    renderTodo(newTodoData);

    todoCounter.updateTotal(true);

    todoValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();
