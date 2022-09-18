import { getProjectIndex } from '../Manager';
import { createHtmlElement, makeEditable } from '../UI';

const content = createHtmlElement('div', null, ['content'], null);

function render() {
  return content;
}

task();

function task() {
  const newTaskContainer = createHtmlElement(
    'div',
    null,
    ['task-container'],
    null
  );

  const textBar = createHtmlElement('div', null, ['text-bar'], null);
  const taskFooter = createHtmlElement(
    'div',
    null,
    ['task-footer'],
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
  const close = createHtmlElement('div', null, ['task-close'], 'Close');
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

  element.appendChild(createTasks(project));

  content.appendChild(element);

  return element;
}

function projectGenerator(project) {
  const projectElement = createHtmlElement(
    'div',
    null,
    ['project'],
    null
  );
  const projectTitle = createHtmlElement(
    'div',
    null,
    ['project-title'],
    project.title
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

function addEditButton(element) {
  const edit = document.createElement('div');
  edit.classList.add('edit');
  edit.textContent = 'Edit';

  element.appendChild(edit);
}

function taskGenerator(task, setting) {
  const taskElement = createHtmlElement('div', null, ['task'], null);
  taskElement.id = task.id;

  let type = 'div';
  let attributes = [[], []];

  if (setting) {
    type = 'input';
    attributes = [
      ['value', task.title],
      ['value', task.description],
    ];
  }

  const title = createHtmlElement(
    type,
    null,
    ['task-title'],
    task.title,
    attributes[0]
  );

  const description = createHtmlElement(
    type,
    null,
    ['description'],
    task.description,
    attributes[1]
  );

  const priority = createHtmlElement(
    'div',
    null,
    ['priority'],
    task.priority,
  );

  const dueDate = createHtmlElement(
    'div',
    null,
    ['due-date'],
    task.dueDate
  );

  taskElement.append(title, description, priority, dueDate);

  if (!setting) {
    addEditButton(taskElement);
    addRemoveButton(taskElement);
  }

  return taskElement;
}

export { render, displayProject, taskGenerator };
