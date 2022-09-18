import { getTaskById, newProject, removeTask } from './Manager';
import { display } from './UI';
import { taskGenerator } from './ui-modules/content';

export default function loadListeners() {
  let tasksEl = document.querySelector('.tasks');
  let nav = document.querySelector('.nav');

  tasksEl.addEventListener('click', (event) => {
    if (event.target.className === 'remove') {
      let id = event.target.parentElement.id;

      removeTask(Number(id));
    }

    if (event.target.className === 'edit') {
      toggleInput(event, taskGenerator, 'input');
    }

    if (event.target.className === 'save') {
      toggleInput(event, taskGenerator);
    }
  });

  tasksEl.addEventListener('keyup', (event) => {
    if (event.target.className === 'task-title') {
      let task = getTask(event);
      task.title = event.target.value;
    }
    if (event.target.className === 'description') {
      let task = getTask(event);
      task.description = event.target.value;
    }
  });

  nav.addEventListener('click', (event) => {
    if (event.target.className === 'project-add') {
      display(newProject('New Project'));
    }
  })
}

function toggleInput(event, taskGenerator, setting) {
  let parent = getParent(event);
  let element = taskGenerator(getTask(event), setting);
  parent.replaceChildren(...element.childNodes);

  if (setting) {
    let save = document.createElement('div');
    save.classList.add('save');
    save.textContent = 'Save';
    parent.appendChild(save);
  }
}

function getParent(event) {
  return event.target.parentElement;
}

function getParentId(event) {
  const parent = event.target.parentElement;
  return Number(parent.id);
}

function getTask(event) {
  return getTaskById(getParentId(event));
}
