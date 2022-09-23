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
import { display, update, createHtmlElement } from "./UI";
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

      if (event.target.closest('.project').id === '-2') return;

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

content.addEventListener('change', (event)=> {

  if (event.target.className === 'newtask-date-picker') {

    const date = event.target.closest('.newtask-date');
    date.value = event.target.value;


    let taskElement = event.target.closest('.task');

    if (taskElement) {
      let task = getTaskById(taskElement.id);
      task.dueDate = date.value;

      console.log(task.dueDate)
    }



  }

})

  content.addEventListener("click", (event) => {


    if (event.target.className === 'newtask-date') {
      let todaysDate = new Date().toISOString().slice(0,10);
      const newDate = createHtmlElement("input", null, ["newtask-date-picker"], "Date", [['type', 'date'], ['min', todaysDate], ['value', todaysDate]]);
      if (!event.target.contains(newDate)) event.target.appendChild(newDate);
      event.target.value = newDate.value;
     newDate.showPicker();
    }

    if (event.target.className === "task-close") {
      const description = content.querySelector(".new-description");
      let newTaskBar = document.querySelector(".text-bar");
      const project = event.target.closest(".project");
      const dueDate = document.querySelector('.newtask-date');

      console.log(dueDate.value);
      if (newTaskBar.value !== "" || description.value !== "") {
        addNewTask(
          project.id,
          newTaskBar.value,
          description.value,
          dueDate.value,
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

function toggleInput(event, setting) {
  let taskElement = event.target.closest('.task');

  let task = getTaskById(taskElement.id);
  let element = taskGenerator(task, setting);
  taskElement.replaceChildren(...element.childNodes);
  taskElement.classList.add('task--expanded');

  if (setting === "input") {
    let save = document.createElement("div");
    save.classList.add("save");
    save.textContent = "Save";
    taskElement.appendChild(save);
  }
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
