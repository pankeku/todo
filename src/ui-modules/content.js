import { getProjectIndex } from "../Manager";
import { createHtmlElement, makeEditable } from "../UI";
import isToday from "date-fns/isToday";
import { parseISO, formatDistanceToNow, isBefore } from "date-fns";
import { priorityBorderColors, priorityColors } from "../config";

const content = createHtmlElement("div", null, ["content"], null);

function render() {
  return content;
}

function task() {
  const newTaskContainer = createHtmlElement(
    "div",
    null,
    ["task-container"],
    null
  );

  const container = createHtmlElement(
    "div",
    null,
    ["task-inside-container"],
    null
  );

  const textBar = createHtmlElement("input", null, ["text-bar"], null, [
    ["placeholder", "New todo..."],
  ]);

  newTaskContainer.append(container);
  container.appendChild(textBar);

  return newTaskContainer;
}

function createDateInput(date) {
  if (!date) date = "Due date";

  const newDate = createHtmlElement("input", "date", ["newtask-date"], "Date", [
    ["type", "text"],
    ["value", date],
    ["name", "date"],
    ["title", "Set due date"],
  ]);
  return newDate;
}

function dueDateChecker(date) {
  date = parseISO(date);

  if (date == "Invalid Date") return;
  let result = formatDistanceToNow(date);

  let status = isBefore(date, new Date())
    ? `${result} overdue`
    : `due in ${result}`;

  return status;
}

function prioritySelector(taskPriority) {
  const priority = createHtmlElement(
    "select",
    "priority-select",
    ["task-priority-reselector"],
    null,
    [
      ["name", "priority"],
      ["title", "Set priority"],
    ]
  );
  const priorities = ["P1", "P2", "P3", "P4"];

  priorities.forEach((P) => {
    const option = createHtmlElement("option", null, null, P, [["value", P]]);

    if (P == "P1") {
      option.setAttribute("selected", "");
    }

    if (P == taskPriority) {
      option.setAttribute("selected", "");
    }

    priority.appendChild(option);
  });

  return priority;
}

function setCheckBoxColor(element, task) {
  element.style.backgroundColor = `var(${priorityColors[task.priority]})`;
}

function setCheckBoxOutlineColor(element, task) {
  element.style.outlineColor = `var(${priorityBorderColors[task.priority]})`;
}

function handler() {
  let taskContainer = document.querySelector(".task-container");
  let container = document.querySelector(".task-inside-container");
  const description = createHtmlElement(
    "input",
    null,
    ["new-description"],
    null,
    [["placeholder", "Description"]]
  );
  const taskFooter = createHtmlElement("div", null, ["newtask-footer"], null);

  const leftWrapper = createHtmlElement(
    "div",
    null,
    ["newtask-left-wrapper"],
    null
  );
  const titleBar = document.querySelector(".text-bar");
  titleBar.setAttribute("placeholder", "Title");
  titleBar.setAttribute("autofocus", "");
  leftWrapper.append(titleBar, description);

  const dateAndPriorityContainer = generateDateAndPriority();

  taskContainer.classList.add("task-container--expand");

  if (container.lastChild === document.querySelector(".text-bar")) {
    container.append(leftWrapper);
    taskContainer.appendChild(taskFooter);
    taskFooter.appendChild(dateAndPriorityContainer);
    taskFooter.appendChild(taskContent());
  }
}

function generateDateAndPriority(task) {
  let priority = "P1";
  let dateSetting = false;

  if (task) {
    priority = task.priority;
    dateSetting = task.dueDate;
  }

  const container = createHtmlElement("div", null, ["newtask-right-wrapper"]);

  const priorityWrapper = createHtmlElement("div", null, ["priority-wrapper"]);

  const newPriority = prioritySelector(priority);
  newPriority.className = "newtask-priority";

  const priorityLabel = createHtmlElement(
    "div",
    null,
    ["priority-label"],
    null,
    [["for", newPriority.id]]
  );

  priorityWrapper.append(priorityLabel, newPriority);

  const dateWrapper = createHtmlElement("div", null, ["newtask-date-wrapper"]);

  const date = createDateInput(dateSetting);

  const dateLabel = createHtmlElement("div", null, ["date-label"], "Due date", [
    ["for", date.id],
  ]);
  dateWrapper.append(dateLabel, date);

  container.append(dateWrapper, priorityWrapper);

  return container;
}

function taskContent() {
  const wrapper = createHtmlElement("div", null, ["close-wrapper"]);
  const close = createHtmlElement("div", null, ["task-close"], "Close");
  wrapper.appendChild(close);
  return wrapper;
}

function clear() {
  content.replaceChildren();
}

function displayProject(project) {
  clear();

  let element = projectGenerator(project);

  element.append(task());

  element.appendChild(createTasks(project));

  content.appendChild(element);

  return element;
}

function projectGenerator(project) {
  const projectElement = createHtmlElement(
    "div",
    project.id,
    ["project"],
    null
  );

  const titleWrapper = createHtmlElement('div', null, ['project-title-wrapper']);
  const projectTitle = createHtmlElement(
    "div",
    null,
    ["project-title"],
    project.title
  );

  titleWrapper.append(projectTitle);

  projectElement.appendChild(titleWrapper);

  projectTitleEditable(titleWrapper);

  return projectElement;
}

function projectTitleEditable(titleElement) {
  if (
    titleElement.closest(".project").id == -1 ||
    titleElement.closest(".project").id == -2
  ) {
    return;
  }

  const titleEdit = createHtmlElement(
    "div",
    null,
    ["project-title-edit"],
    null
  );

  titleElement.appendChild(titleEdit);
}

function createTasks(project) {
  const taskList = project.tasks;

  const tasksElement = document.createElement("div");
  tasksElement.classList.add("tasks");

  taskList.forEach((task) => {
    let element = taskGenerator(task);

    tasksElement.append(element);

    element.addEventListener("click", () => {});
  });

  return tasksElement;
}

function addRemoveButton(element) {
  const remove = document.createElement("div");
  remove.classList.add("remove");
  remove.textContent = "Remove";

  element.appendChild(remove);
}

function addEditButton(element) {
  const edit = document.createElement("div");
  edit.classList.add("edit");
  edit.textContent = "Edit";

  element.appendChild(edit);
}

function expandTask(task, taskElement, expand) {
  let newElement;
  if (!expand) {
    newElement = taskGenerator(task);
    taskElement.replaceWith(newElement);
    return;
  }
  newElement = taskGenerator(task, "expanded");
  newElement.classList.add("task--expanded");
  taskElement.replaceWith(newElement);
}

function addCheckBox(task, taskElement) {
  const checkbox = createHtmlElement("input", null, ["complete"], null, [
    ["type", "checkbox"],
  ]);

  setCheckBoxColor(checkbox, task);
  taskElement.append(checkbox);
  checkbox.checked = task.completed;
}

function taskGenerator(task, setting) {
  const taskElement = createHtmlElement("div", task.id, ["task"], null);

  let type = "div";
  let attributes = [[], []];

  if (setting === "input") {
    type = "div";
    attributes = [
      [
        ["contenteditable", "true"],
        ["autofocus", ""],
      ],
      [["contenteditable", "true"]],
    ];
  }

  addCheckBox(task, taskElement);

  const title = createHtmlElement(
    type,
    null,
    ["task-title"],
    task.title,
    attributes[0]
  );

  const description = createHtmlElement(
    type,
    null,
    ["description"],
    task.description,
    attributes[1]
  );

  const dueStatus = createHtmlElement(
    "div",
    null,
    ["due-status"],
    dueDateChecker(task.dueDate)
  );

  const assignedProject = createHtmlElement(
    "div",
    null,
    ["assigned-project"],
    task.project.title
  );


  const dateAndPriorityWrapper = generateDateAndPriority(task);

  const leftWrapper = createHtmlElement("div", null, ["task-left-wrapper"]);
  leftWrapper.append(title, dueStatus);

  if (setting === "input") {
    const leftWrapper = createHtmlElement("div", null, [
      "task-left-wrapper",
      "task-edit",
    ]);
    const textWrapper = createHtmlElement("div", null, ["input-text-wrapper"]);
    textWrapper.append(title, description);

    leftWrapper.append(textWrapper);
    taskElement.append(leftWrapper, dateAndPriorityWrapper, assignedProject);
    closedTaskActions(taskElement);

    return taskElement;
  }

  if (setting === "expanded") {
    const leftWrapper = createHtmlElement("div", null, ["task-left-wrapper"]);
    const textWrapper = createHtmlElement("div", null, ["input-text-wrapper"]);
    textWrapper.append(title, description);

    leftWrapper.append(textWrapper);
    taskElement.append(leftWrapper, dateAndPriorityWrapper, assignedProject);
    closedTaskActions(taskElement);

    return taskElement;
  }

  taskElement.append(leftWrapper, assignedProject);

  closedTaskActions(taskElement);

  function closedTaskActions(element) {
    const actionsWrapper = createHtmlElement("div", null, [
      "task-actions-wrapper",
    ]);

    addEditButton(actionsWrapper);
    addRemoveButton(actionsWrapper);

    element.append(actionsWrapper);
  }

  return taskElement;
}

export {
  render,
  displayProject,
  taskGenerator,
  handler,
  task,
  expandTask,
  setCheckBoxColor,
  setCheckBoxOutlineColor,
};
