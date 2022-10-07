import { updateLocalStorage } from "../../localStorage.js";
import {
  addNewTask,
  getProjectById,
  getTaskById,
  moveTask,
  projects,
  removeProject,
  removeTask,
  runAndUpdate,
  toggleTaskCompletion,
} from "../../Manager";
import { createHtmlElement, update } from "../../UI";
import {
  setCheckBoxColor,
  setCheckBoxOutlineColor,
  generateNewTaskBar,
  generateTaskElement,
  generateProjectSelectElement,
  generateTaskPriorityElements,
  generateTaskDateElements,
  generateExpandedTaskElement,
  generateTaskWithInput,
} from "../content";
import { updateNav } from "../nav";

function markTaskDoneHandler(event) {
  const task = getTaskById(Number(event.target.closest(".task").id));

  runAndUpdate(toggleTaskCompletion, task);
}

function changeTaskDueDateHandler(event) {
  const date = event.target.closest(".new-task-date");
  date.value = event.target.value;

  let taskElement = event.target.closest(".task");

  if (taskElement) {
    let task = getTaskById(taskElement.id);
    task.dueDate = date.value;
  }
}

function projectTitleEditHandler(event) {
  const projectTitle = document.querySelector(".project-title");
  projectTitle.setAttribute("contenteditable", "true");
  projectTitle.focus();
  projectTitle.classList.add("editing");
}

function projectRemoveHandler(event) {
  const id = event.target.closest(".project").id;
  runAndUpdate(removeProject, id);
}

function popUpDatePickerHandler(event) {
  let todaysDate = new Date().toISOString().slice(0, 10);
  const newDate = createHtmlElement(
    "input",
    null,
    ["new-task-date-picker"],
    "Date",
    [
      ["type", "date"],
      ["min", todaysDate],
      ["value", todaysDate],
    ]
  );

  if (!event.target.contains(newDate)) event.target.appendChild(newDate);

  if (event.target.value == "Set date") {
    event.target.value = newDate.value;
  }
  newDate.showPicker();
}

function closingNewTaskBarHandler(event) {
  const description = document.querySelector(".new-description");
  let newTaskBar = document.querySelector(".text-bar");
  const dueDate = document.querySelector(".new-task-date");
  const priority = document.querySelector(".new-task-priority");
  const projectSelector = document.querySelector(".project-select");

  if (newTaskBar.value !== "" || description.value !== "") {
    runAndUpdate(
      addNewTask,
      projectSelector.options[projectSelector.selectedIndex].id,
      newTaskBar.value,
      description.value,
      dueDate.value,
      priority.value
    );

    return;
  }

  const taskContainer = document.querySelector(".task-container");

  taskContainer.replaceWith(generateNewTaskBar());
}

function expandingNewTaskBarHandler(event) {
  event.target.classList.add("open");
  let taskContainer = document.querySelector(".task-container");
  let container = document.querySelector(".task-inside-container");
  const description = createHtmlElement(
    "input",
    null,
    ["new-description"],
    null,
    [["placeholder", "Description"]]
  );
  const taskFooter = createHtmlElement("div", null, ["new-task-footer"], null);

  const leftWrapper = createHtmlElement(
    "div",
    null,
    ["new-task-content-wrapper"],
    null
  );
  const titleBar = document.querySelector(".text-bar");
  titleBar.setAttribute("placeholder", "Title");
  titleBar.setAttribute("autofocus", "");

  leftWrapper.append(titleBar, description);

  const dateAndPriorityContainer = createHtmlElement("div", null, [
    "task-properties-wrapper",
  ]);
  dateAndPriorityContainer.append(
    generateTaskDateElements(),
    generateTaskPriorityElements()
  );

  const projectSelection = generateProjectSelectElement();
  dateAndPriorityContainer.append(projectSelection);

  taskContainer.classList.add("task-container--expand");

  if (container.lastChild === document.querySelector(".text-bar")) {
    container.append(leftWrapper);
    taskContainer.appendChild(taskFooter);
    taskFooter.appendChild(dateAndPriorityContainer);

    const wrapper = createHtmlElement("div", null, ["close-wrapper"]);
    const close = createHtmlElement("div", null, ["task-close"], "Close");
    wrapper.appendChild(close);

    taskFooter.append(wrapper);
  }
}

function taskPriorityChangeHandler(event) {
  const taskElement = event.target.closest(".task");
  const task = getTaskById(taskElement.id);

  task.priority = event.target.value;
  console.log(task.priority);
  console.log(projects);

  let checkbox = taskElement.querySelector('input[type="checkbox"]');

  setCheckBoxColor(checkbox, task);
  setCheckBoxOutlineColor(checkbox, task);
}

function taskAssignedProjectChangeHandler(event) {
  const taskElement = event.target.closest(".task");
  const task = getTaskById(taskElement.id);
  const newProjectId =
    event.target.options[event.target.options.selectedIndex].id;
  runAndUpdate(moveTask, task, newProjectId);
}

function taskExpandHandler(event) {
  let taskElement = event.target;

  if (!event.target.classList.contains("task")) {
    taskElement = event.target.closest(".task");
  }

  let task = getTaskById(Number(taskElement.id));

  let isTaskExpanded = taskElement.classList.contains("task--expanded");

  if (isTaskExpanded) {
    const newElement = generateTaskElement(task);
    taskElement.replaceWith(newElement);
    return;
  }

  const newElement = generateExpandedTaskElement(task);

  taskElement.replaceWith(newElement);
}

function taskRemoveHandler(event) {
  let id = event.target.closest(".task").id;

  runAndUpdate(removeTask, Number(id));
}

function taskMakeEditableHandler(event) {
  let taskElement = event.target.closest(".task");
  console.log(taskElement);

  let task = getTaskById(taskElement.id);
  let element = generateTaskWithInput(task);
  taskElement.replaceChildren(...element.childNodes);
  taskElement.classList.add("task--expanded");

  let save = document.createElement("div");
  save.classList.add("save");
  save.textContent = "Close";
  taskElement.appendChild(save);
}

function projectTitleChangeHandler(event) {
  const project = getProjectById(event.target.closest(".project").id);
  project.title = event.target.textContent;
}

function taskTitleChangeHandler(event) {
  let taskElement = event.target.closest(".task");
  let task = getTaskById(taskElement.id);
  task.title = event.target.textContent;
}

function taskDescriptionChangeHandler(event) {
  let taskElement = event.target.closest(".task");
  let task = getTaskById(taskElement.id);
  task.description = event.target.textContent;
}

function taskHoveredCheckboxHandler(event) {
  const task = getTaskById(event.target.id);
  const checkbox = event.target.querySelector(".complete");
  setCheckBoxOutlineColor(checkbox, task);
}

function projectTitleDoneEditingHandler() {
  updateLocalStorage();
  update();
  updateNav();
}

export {
  markTaskDoneHandler,
  changeTaskDueDateHandler,
  projectTitleEditHandler,
  projectRemoveHandler,
  popUpDatePickerHandler,
  closingNewTaskBarHandler,
  expandingNewTaskBarHandler,
  taskPriorityChangeHandler,
  taskAssignedProjectChangeHandler,
  taskExpandHandler,
  taskRemoveHandler,
  taskMakeEditableHandler,
  projectTitleChangeHandler,
  taskTitleChangeHandler,
  taskDescriptionChangeHandler,
  taskHoveredCheckboxHandler,
  projectTitleDoneEditingHandler,
};
