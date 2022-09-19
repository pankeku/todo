import { getTaskById, newProject, removeTask, projects, addNewTask } from './Manager';
import { display, update } from './UI';
import { handler, taskGenerator } from './ui-modules/content';
import { updateNav } from './ui-modules/nav';

export default function loadListeners() {
  let tasksEl = document.querySelector('.tasks');
  let nav = document.querySelector('.nav');
  let project = document.querySelector('.project');
  let newTaskBar = document.querySelector('.text-bar')
  let content = document.querySelector('.content');

  content.addEventListener('click', (event) => {
    if (event.target.className === 'remove') {
      console.log('remove lciked')

      //PERRASYT SU CLOSEST
      let id = event.target.closest('.task').id;

      console.log(id);

      removeTask(Number(id));
    }

    if (event.target.className === 'edit') {
      toggleInput(event, taskGenerator, 'input');
    }

    if (event.target.className === 'save') {
      toggleInput(event, taskGenerator);
    }
  });

  content.addEventListener('keyup', (event) => {
    if (event.target.className === 'task-title') {
      let task = getTask(event);
      console.log(task);
      task.title = event.target.value;
    }
    if (event.target.className === 'description') {
      let task = getTask(event);
      task.description = event.target.value;
    }
  });

  nav.addEventListener('click', (event) => {
    
    if (event.target.className === 'project-add') {
      console.log('click')
      display(newProject('New Project'));
      updateNav();
    }
  })

  content.addEventListener('click', (event) => {
    

    if (event.target.className === 'task-close') {

      const description = event.currentTarget.querySelector('.new-description');
      console.log(description)
      const project = event.target.closest('.project');

      if (newTaskBar.value !== '' || description.value !== '') {
        addNewTask(project.id, newTaskBar.value, description.value, null, null);
      }

      update();
    }

    if (event.target.className === 'text-bar') {
      handler();
    }
  });

  
  




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

addEventListener('load', (event) => {
  loadListeners();
})
