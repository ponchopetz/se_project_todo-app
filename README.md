# 📝 Simple To-Do App

A lightweight, responsive to-do list application built with vanilla JavaScript.  
This project demonstrates clean component architecture, form validation, and DOM manipulation without relying on frameworks.

---

## ⚙️ Functionality

The Simple To-Do App allows users to:

- Add new tasks with an optional due date
- View a list of current tasks
- Mark tasks as completed via checkbox
- Delete tasks individually
- Automatically disable the “Create” button when the form is invalid
- Persist initial tasks using a static dataset

Additional UX features:

- Modal popup for adding tasks
- Live form validation with inline error messages
- Smooth UI reset after each successful submission

---

## 💻 Technology

**Built with:**

- **HTML5** for structure and templating using `<template>` elements
- **CSS3** for layout and responsive design (custom BEM-style classes)
- **JavaScript (ES6+)** for modular, class-based logic
  - `FormValidator` class for dynamic form validation
  - `Todo` class for rendering and managing each task
  - Centralized constants file for reusable configuration and selectors

**Key techniques:**

- Modular imports/exports using ES Modules
- UUID generation via [`uuid`](https://www.npmjs.com/package/uuid) (via JSPM CDN) for unique task IDs
- Clean separation of concerns between UI, logic, and configuration
- DOM manipulation using the `<template>` cloning pattern

---

## 🚀 Deployment

This project is deployed on **GitHub Pages**:  
👉 [**View Live Demo**](https://ponchopetz.github.io/se_project_todo-app/)

---

## 📚 Future Enhancements

- LocalStorage support to persist tasks
- Filter/sort tasks (completed vs. pending)
- Dark mode toggle
- Animated modal transitions

---

## 👨‍💻 Author

Developed by **Alfonso Martinez Petz**

- 💼 [LinkedIn](https://www.linkedin.com/in/alfonsomtzpetz/)
- 🧠 Part of the **TripleTen Software Engineering Program**
