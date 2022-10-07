import { config } from "./config";
import { updateLocalStorage } from "./localStorage";
import {
  getDoneList, getHomeProject, getProjectById, newProject
} from "./Manager";
import { display, update } from "./UI";
import {
  changeSortCriteria,
  changeSortOrder
} from "./sorter";
import {
  changeTaskDueDateHandler,
  closingNewTaskBarHandler,
  expandingNewTaskBarHandler,
  markTaskDoneHandler,
  popUpDatePickerHandler,
  projectRemoveHandler,
  projectTitleChangeHandler,
  projectTitleDoneEditingHandler,
  projectTitleEditHandler,
  taskAssignedProjectChangeHandler,
  taskDescriptionChangeHandler,
  taskExpandHandler,
  taskHoveredCheckboxHandler,
  taskMakeEditableHandler,
  taskPriorityChangeHandler,
  taskRemoveHandler,
  taskTitleChangeHandler
} from "./ui-modules/handlers/contentHandlers";
import { updateNav } from "./ui-modules/nav";



export default function loadListeners() {
  let nav = document.querySelector(".nav");
  let content = document.querySelector(".content");

  nav.addEventListener("click", (event) => {
    if (event.target.className === "nav-home") {
      const project = getHomeProject();
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

    if (event.target.className === "project-add") {
      display(newProject());
      updateNav();
    }
  });

  content.addEventListener("change", (event) => {
    if (event.target.className === "complete") {
      markTaskDoneHandler(event);
    }

    if (event.target.className === "new-task-date-picker") {
      changeTaskDueDateHandler(event);
      updateLocalStorage();
    }
  });

  content.addEventListener("click", (event) => {
    if (event.target.className === "project-title-edit") {
      projectTitleEditHandler(event);
    }

    if (event.target.className === "project-remove") {
      projectRemoveHandler(event);
    }

    if (event.target.className === "new-task-date") {
      popUpDatePickerHandler(event);
    }

    if (event.target.className === "task-close") {
      closingNewTaskBarHandler(event);
    }

    if (event.target.className === "text-bar") {
      expandingNewTaskBarHandler(event);
    }

    if (event.target.classList.contains("sort-arrow")) {
      changeSortOrder();
      update();
    }

    if (event.target.className === "sort-option") {
      changeSortCriteria(event.target);
      update();
    }

    if (
      event.target.className === "new-task-priority" &&
      event.target.closest(".task") !== null
    ) {
      taskPriorityChangeHandler(event);
      updateLocalStorage();
    }

    if (
      event.target.className === "project-select" &&
      event.target.closest(".task") !== null
    ) {
      taskAssignedProjectChangeHandler(event);
    }

    if (event.target.classList.contains("task--expanded")) {
      taskExpandHandler(event);
      return;
    }

    if (event.target.classList.contains("task")) {
      if (event.target.closest(".project").id === config.done.id) return;
      taskExpandHandler(event);
    }

    if (event.target.className === "remove") {
      taskRemoveHandler(event);
    }

    if (event.target.className === "edit") {
      taskMakeEditableHandler(event);
    }

    if (event.target.className === "save") {
      taskExpandHandler(event);
      updateLocalStorage();
    }
  });

  content.addEventListener("keyup", (event) => {
    if (event.target.classList.contains("project-title")) {
      projectTitleChangeHandler(event);
    }

    if (event.target.className === "task-title") {
      taskTitleChangeHandler(event);
    }
    if (event.target.className === "description") {
      taskDescriptionChangeHandler(event);
    }
  });

  content.addEventListener("mouseover", (event) => {
    if (event.target.className === "task") {
      taskHoveredCheckboxHandler(event);
    }
  });

  content.addEventListener("focusout", (event) => {
    if (event.target.className === "project-title editing") {
     projectTitleDoneEditingHandler();
    }
  });
}

addEventListener("load", (event) => {
  loadListeners();
});
