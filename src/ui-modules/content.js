import { getProjectIndex } from '../Manager';
import { createHtmlElement, makeEditable } from '../UI';

const content = createHtmlElement('div', null, ['content'], null, null);

function render() {
  return content;
}

task();

function task() {
  const newTaskContainer = createHtmlElement(
    'div',
    null,
    ['task-container'],
    null,
    null
  );

  const textBar = createHtmlElement('div', null, ['text-bar'], null, true);
  const taskFooter = createHtmlElement(
    'div',
    null,
    ['task-footer'],
    null,
    null
  );

  newTaskContainer.appendChild(textBar);
  newTaskContainer.appendChild(taskFooter);
  taskFooter.appendChild(taskContent());

  newTaskContainer.addEventListener('click', () => {
    newTaskContainer.classList.toggle('task-container--expand');
  });

  content.append(newTaskContainer);
}

function taskContent() {
  const close = createHtmlElement('div', null, ['task-close'], 'Close', null);
  return close;
}

function clear() {
  let child = content.firstChild;
  while (child) {
    content.removeChild(child);
    child = content.firstChild;
  }

 // task();
}

function displayProject(project) {
  clear();

  let element = projectGenerator(project);
  console.log(project.tasks)

  element.appendChild(createTasks(project));

  content.appendChild(element);

  return element;
}

function projectGenerator(project) {
  const projectElement = createHtmlElement(
    'div',
    null,
    ['project'],
    null,
    null
  );
  const projectTitle = createHtmlElement(
    'div',
    null,
    ['project-title'],
    project.title,
    true
  );

  projectElement.appendChild(projectTitle);

  return projectElement;
}

function createTasks(project) {
  const taskList = project.tasks;

  const tasksElement = document.createElement('div');
  tasksElement.classList.add('tasks');

  taskList.forEach((task) => {
    let element = taskGenerator(task);

    element.id = getProjectIndex(task.project) + '-' + task.id;

    addRemoveButton(element);

    tasksElement.append(element);

    element.addEventListener('click', () => {});
  });

  return tasksElement;
}

function addRemoveButton(element) {
  const remove = document.createElement('div');
  remove.classList.add('remove');
  remove.textContent = 'Remove';

  element.appendChild(remove);
}

function taskGenerator(task) {
  const taskElement = createHtmlElement('div', null, ['task'], null, null);

  const title = createHtmlElement(
    'div',
    null,
    ['task-title'],
    task.title,
    true
  );

  const titleInput = createHtmlElement(
    'input',
    null,
    ['task-input', 'task-title--hidden'],
    task.title,
    null
  );

  const description = createHtmlElement(
    'div',
    null,
    ['description'],
    task.description,
    true
  );

  const descriptionInput = createHtmlElement(
    'input',
    null,
    ['description-input', 'task-title--hidden'],
    task.description,
    null
  );

  const priority = createHtmlElement(
    'div',
    null,
    ['priority'],
    task.priority,
    null
  );

  const dueDate = createHtmlElement(
    'div',
    null,
    ['due-date'],
    task.dueDate,
    null
  );

  taskElement.append(
    title,
    titleInput,
    description,
    descriptionInput,
    priority,
    dueDate
  );

  return taskElement;
}

export { render, displayProject };
