import { iterate, projects as projectsArray } from './Manager';
import config from './config';
import load from './page';



function main() {
  
  let content = load();
content.appendChild(createProjects());
}


//ar geriau projectGenerator injectint sitaip, ar tiesiog pacallint projectGenerator() methodo viduj, pvz. projects.forEach(projectGenerator())? jei injectinu, createProjects tampa daugiau loosely coupled nuo projectGenerator? Is kitos puses, vis tiek callindamas createProjects turesiu norodyt projectGenerator kaip argument, bet cia gaunasi, kad createProjects panaudojimas tampa universalesnis, nes galiu injectint ka noriu?
//ir dar, createProjects ir projectsArray siuo atveju yra tightly coupled? irgi reiktu injectint? ar importinimas moduly jau skaitosi kaip injectinimas?

function createProjects() {
  const projectsElement = document.createElement('div');
  projectsElement.classList.add('projects');

  projectsArray.forEach((project) => {
    let projectElement = projectGenerator();

    generateText(project, projectElement);

    let tasksElement = createTasks(project);

    projectElement.append(tasksElement);
    projectsElement.append(projectElement);

    makeEditable(project, projectElement);
  });

  return projectsElement;
}

function projectGenerator() {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project');

  const projectTitle = document.createElement('div');
  projectTitle.classList.add('project-title');

  projectElement.appendChild(projectTitle);

  return projectElement;
}

function createTasks(project) {
  console.log(project);
  const taskList = project.tasks;

  const tasksElement = document.createElement('div');
  tasksElement.classList.add('tasks');

  taskList.forEach((task) => {
    let element = taskGenerator(task);
    generateText(task, element);
    tasksElement.append(element);
    makeEditable(task, element);
  });

  return tasksElement;
}

function taskGenerator(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  const title = document.createElement('div');
  title.classList.add('task-title');

  title.addEventListener('keyup', () => {
    task.title = title.textContent;
    console.log(task.title);
  });

  const description = document.createElement('div');
  description.classList.add('description');

  const priority = document.createElement('div');
  priority.classList.add('priority');

  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date');

  taskElement.append(title, description, priority, dueDate);

  return taskElement;
}

function makeEditable(object, element) {
  element.childNodes.forEach((child) => {
    for (let item in config.editables) {
      if (item === child.classList[0]) {
        child.contentEditable = true;

        child.addEventListener('keyup', () => {
          object.title = child.textContent;
          console.log(object.title);
        });
      }
    }
  });
}

function generateText(object, element) {
  element.childNodes.forEach((child) => {
    for (let item in config.text) {
      if (item === child.classList[0]) {
        child.textContent = object[config.text[item]];
      }
    }
  });
}



function update() {}

export { main, update };
