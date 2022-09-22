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
} from "./Manager";
import { display, update } from "./UI";
import { handler, taskGenerator, task, expandTask } from "./ui-modules/content";
import { updateNav } from "./ui-modules/nav";

export default function loadListeners() {
  let tasksEl = document.querySelector(".tasks");
  let nav = document.querySelector(".nav");
  let project = document.querySelector(".project");
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

      if (!event.target.checked)
        task = getTaskById(
          Number(event.target.closest(".task").id),
          getDoneList()
        );

      toggleTaskCompletion(task);
    }
  });

  content.addEventListener("click", (event) => {
    if (event.target.classList.contains("task--expanded")) {
      let task = getTaskById(Number(event.target.id));
      expandTask(task, event.target, false);

      return;
    }

    if (event.target.classList.contains("task")) {
      let task = getTaskById(event.target.id);

      expandTask(task, event.target, true);
    }

    if (event.target.className === "remove") {
      let id = event.target.closest(".task").id;

      removeTask(Number(id));
    }

    if (event.target.className === "edit") {
      toggleInput(event, taskGenerator, "input");
    }

    if (event.target.className === "save") {
      toggleInput(event, taskGenerator, "expanded");
    }
  });

  content.addEventListener("keyup", (event) => {
    if (event.target.className === "task-title") {
      let task = getTask(event);
      task.title = event.target.value;
    }
    if (event.target.className === "description") {
      let task = getTask(event);
      task.description = event.target.value;
    }
  });

  nav.addEventListener("click", (event) => {
    if (event.target.className === "project-add") {
      display(newProject());
      updateNav();
    }
  });

  content.addEventListener("click", (event) => {
    if (event.target.className === "task-close") {
      const description = content.querySelector(".new-description");
      let newTaskBar = document.querySelector(".text-bar");
      const project = event.target.closest(".project");

      if (newTaskBar.value !== "" || description.value !== "") {
        addNewTask(
          project.id,
          newTaskBar.value,
          description.value,
          "Date",
          "Priority"
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

function toggleInput(event, taskGenerator, setting) {
  let parent = getParent(event);
  let element = taskGenerator(getTask(event), setting);
  parent.replaceChildren(...element.childNodes);

  if (setting === "input") {
    let save = document.createElement("div");
    save.classList.add("save");
    save.textContent = "Save";
    parent.appendChild(save);
  }
}

function getParent(event) {
  return event.target.parentElement;
}

function getParentId(event) {
  const parent = event.target.parentElement;
  console.log(parent);
  return Number(parent.id);
}

function getTask(event) {
  return getTaskById(getParentId(event));
}

addEventListener("load", (event) => {
  loadListeners();
});
