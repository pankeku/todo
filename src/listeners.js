import { config, priorityBorderColors, priorityColors } from "./config";
import { updateLocalStorage } from "./localStorage";
import {
  getTaskById,
  newProject,
  removeTask,
  projects,
  addNewTask,
  getProjectById,
  getHomeProject,
  toggleTaskCompletion,
  getDoneList,
  moveTask,
  removeProject,
} from "./Manager";
import { display, update, createHtmlElement } from "./UI";
import {
  handler,
  taskGenerator,
  task,
  expandTask,
  setCheckBoxColor,
  setCheckBoxOutlineColor,
  projectSelector,
  generateSorterElement,
  expandSorterOptions,
  changeSortCriteria,
  changeSortOrder,
} from "./ui-modules/content";
import { updateNav } from "./ui-modules/nav";

export default function loadListeners() {
  let nav = document.querySelector(".nav");
  let content = document.querySelector(".content");

  nav.addEventListener("click", (event) => {
    if (event.target.className === "nav-home") {
      const project = getProjectById(event.target.id);
      display(project);
    }

    if (event.target.className === "nav-item") {
      const project = getProjectById(event.target.id);
      display(project);
    }

    if (event.target.className === "done-tasks") {
      const project = getDoneList();
      display(project);
    }
  });

  content.addEventListener("change", (event) => {
    if (event.target.className === "complete") {
      let task;

      task = getTaskById(Number(event.target.closest(".task").id));

      toggleTaskCompletion(task);
    }
  });

  content.addEventListener("click", (event) => {

    if(event.target.classList.contains('sort-arrow')) {

      changeSortOrder(event.target);
    }

    if (event.target.className === 'sort-option') {
      changeSortCriteria(event.target);
    }

    if (
      event.target.className === "newtask-priority" &&
      event.target.closest(".task") !== null
    ) {
      const taskElement = event.target.closest(".task");
      const task = getTaskById(taskElement.id);

      task.priority = event.target.value;

      let checkbox = taskElement.querySelector('input[type="checkbox"]');

      setCheckBoxColor(checkbox, task);
      setCheckBoxOutlineColor(checkbox, task);
    }

    if (
      event.target.className === "project-select" &&
      event.target.closest(".task") !== null
    ) {
      const taskElement = event.target.closest(".task");
      const task = getTaskById(taskElement.id);
      const newProjectId =
        event.target.options[event.target.options.selectedIndex].id;
      moveTask(task, newProjectId);
    }

    if (event.target.classList.contains("task--expanded")) {
      let task = getTaskById(Number(event.target.id));
      expandTask(task, event.target, false);

      return;
    }

    if (event.target.classList.contains("task")) {
      if (event.target.closest(".project").id === config.done.id) return;

      let task = getTaskById(event.target.id);

      expandTask(task, event.target, true);
    }

    if (event.target.className === "remove") {
      let id = event.target.closest(".task").id;

      removeTask(Number(id));
    }

    if (event.target.className === "edit") {
      toggleInput(event, "input");
    }

    if (event.target.className === "save") {
      toggleInput(event, "expanded");
    }
  });

  content.addEventListener("keyup", (event) => {
    if (event.target.classList.contains("project-title")) {
      const project = getProjectById(event.target.closest(".project").id);
      project.title = event.target.textContent;

    }

    if (event.target.className === "task-title") {
      let task = getTask(event);
      task.title = event.target.textContent;
    }
    if (event.target.className === "description") {
      let task = getTask(event);
      task.description = event.target.textContent;
    }
  });

  nav.addEventListener("click", (event) => {
    if (event.target.className === "project-add") {
      display(newProject());
      updateNav();
    }
  });

  content.addEventListener("change", (event) => {
    if (event.target.className === "newtask-date-picker") {
      const date = event.target.closest(".newtask-date");
      date.value = event.target.value;

      let taskElement = event.target.closest(".task");

      if (taskElement) {
        let task = getTaskById(taskElement.id);
        task.dueDate = date.value;

      }
    }

    updateLocalStorage();
  });

  content.addEventListener("mouseover", (e) => {

    if (e.target.className === "task") {
      const task = getTaskById(e.target.id);
      const checkbox = e.target.querySelector(".complete");
      setCheckBoxOutlineColor(checkbox, task);
    }
  });


  content.addEventListener("focusout", (event) => {
    if (event.target.className === "project-title editing") {
      const project = getProjectById(event.target.closest(".project").id);
      display(project);
      updateNav();
    }
  });

  content.addEventListener("click", (event) => {
    if (event.target.className === "project-title-edit") {
      const projectTitle = document.querySelector(".project-title");
      const project = getProjectById(event.target.closest(".project").id);

      projectTitle.setAttribute("contenteditable", "true");
      projectTitle.focus();
      projectTitle.classList.add("editing");
    }

    if (event.target.className === "project-remove") {
      const id = event.target.closest(".project").id;
      removeProject(id);
    }

    if (event.target.className === "newtask-date") {
      let todaysDate = new Date().toISOString().slice(0, 10);
      const newDate = createHtmlElement(
        "input",
        null,
        ["newtask-date-picker"],
        "Date",
        [
          ["type", "date"],
          ["min", todaysDate],
          ["value", todaysDate],
        ]
      );

      if (!event.target.contains(newDate)) event.target.appendChild(newDate);
      console.log(event.target.value);
      if (event.target.value == "Set date") {
        event.target.value = newDate.value;
      }
      newDate.showPicker();
    }

    if (event.target.className === "task-close") {
      const description = content.querySelector(".new-description");
      let newTaskBar = document.querySelector(".text-bar");
      const project = event.target.closest(".project");
      const dueDate = document.querySelector(".newtask-date");
      const priority = document.querySelector(".newtask-priority");
      const projectSelector = document.querySelector(".project-select");

      if (newTaskBar.value !== "" || description.value !== "") {
        addNewTask(
          projectSelector.options[projectSelector.selectedIndex].id,
          newTaskBar.value,
          description.value,
          dueDate.value,
          priority.value
        );
        return;
      }

      const taskContainer = document.querySelector(".task-container");

      taskContainer.replaceWith(task());
    }

    if (event.target.className === "text-bar") {
      event.target.classList.add("open");
      handler();
    }
  });
}

function toggleInput(event, setting) {
  let taskElement = event.target.closest(".task");
  console.log(taskElement);

  let task = getTaskById(taskElement.id);
  let element = taskGenerator(task, setting);
  taskElement.replaceChildren(...element.childNodes);
  taskElement.classList.add("task--expanded");

  if (setting === "input") {
    let save = document.createElement("div");
    save.classList.add("save");
    save.textContent = "Close";
    taskElement.appendChild(save);
  }

}

function getTaskId(event) {
  const task = event.target.closest(".task");
  return Number(task.id);
}

function getTask(event) {
  return getTaskById(getTaskId(event));
}

addEventListener("load", (event) => {
  loadListeners();
});
