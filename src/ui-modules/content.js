import { getProjectIndex } from "../Manager";
import { createHtmlElement, makeEditable } from "../UI";
import isToday from "date-fns/isToday";
import { parseISO, formatDistanceToNow, isBefore } from "date-fns";

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
  if (!date) date = "Set date";

  const newDate = createHtmlElement("input", null, ["newtask-date"], "Date", [
    ["type", "text"],
    ["value", date],
  ]);
  return newDate;
}

function dueDateChecker(date) {
  date = parseISO(date);

  if (date == 'Invalid Date') return;
  ;

  let result = formatDistanceToNow(date);

  let status = isBefore(date, new Date())
    ? `${result} overdue`
    : `due in ${result}`;

  return status;
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
  leftWrapper.append(titleBar, description);

  const rightWrapper = createHtmlElement("div", null, [
    "newtask-right-wrapper",
  ]);

  const newPriority = createHtmlElement(
    "div",
    null,
    ["newtask-priority"],
    "Priority"
  );

  const dateWrapper = createHtmlElement("div", null, ["newtask-date-wrapper"]);

  dateWrapper.append(createDateInput());
  rightWrapper.append(dateWrapper, newPriority);

  taskContainer.classList.add("task-container--expand");

  if (container.lastChild === document.querySelector(".text-bar")) {
    container.append(leftWrapper);
    container.append(rightWrapper);
    taskContainer.appendChild(taskFooter);
    taskFooter.appendChild(taskContent());
  }
}

function taskContent() {
  const close = createHtmlElement("div", null, ["task-close"], "Close");
  return close;
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
  const projectTitle = createHtmlElement(
    "div",
    null,
    ["project-title"],
    project.title
  );

  projectElement.appendChild(projectTitle);

  return projectElement;
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
  taskElement.append(checkbox);
  checkbox.checked = task.completed;
}

function taskGenerator(task, setting) {
  const taskElement = createHtmlElement("div", task.id, ["task"], null);

  let type = "div";
  let attributes = [[], []];

  if (setting === "input") {
    type = "input";
    attributes = [[["value", task.title]],[["value", task.description]]];
  }

  addCheckBox(task, taskElement);

  const title = createHtmlElement(
    type,
    null,
    ["task-title"],
    task.title,
    attributes[0],
  );

  const description = createHtmlElement(
    type,
    null,
    ["description"],
    task.description,
    attributes[1],
  );

  const priority = createHtmlElement("div", null, ["priority"], task.priority);

  const dueDate = createDateInput(task.dueDate);

  const assignedProject = createHtmlElement(
    "div",
    null,
    ["assigned-project"],
    task.project.title
  );



  const dueStatus = createHtmlElement(
    "div",
    null,
    ["due-status"],
    dueDateChecker(task.dueDate)
  );

  const leftWrapper = createHtmlElement('div', null, ['task-left-wrapper']);
  leftWrapper.append(title, dueStatus);

  if (setting === "input") {
    const wrapper = createHtmlElement('div', null, ['date-priority-wrapper']);
    const leftWrapper = createHtmlElement('div', null, ['task-left-wrapper']);
    const textWrapper = createHtmlElement('div', null, ['input-text-wrapper']);
    textWrapper.append(title, description);

    wrapper.append(dueDate, priority)
    leftWrapper.append(textWrapper);
    taskElement.append(leftWrapper, wrapper, assignedProject);
    closedTaskActions(taskElement);

    return taskElement;
  }

  if (setting === "expanded") {

    const wrapper = createHtmlElement('div', null, ['date-priority-wrapper']);
    const leftWrapper = createHtmlElement('div', null, ['task-left-wrapper']);
    const textWrapper = createHtmlElement('div', null, ['input-text-wrapper']);
    textWrapper.append(title, description);

    wrapper.append(dueDate, priority)
    leftWrapper.append(textWrapper);
    taskElement.append(leftWrapper, wrapper, assignedProject);
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

export { render, displayProject, taskGenerator, handler, task, expandTask };
