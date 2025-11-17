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
  const todoElement = todo.getView();

  return todoElement;
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (itemData) => {
    const todoElement = generateTodo(itemData);
    todoSection.addItem(todoElement);
  },
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

    const newTodoElement = generateTodo(newTodoData);
    todoSection.addItem(newTodoElement);

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
