import { createProject } from './Project';
import { display, main, update } from './UI';

let projects = [];
let initialProject;

function init() {
  defaultProject();
  main();
  display(initialProject);
}

function defaultProject() {
  initialProject = newProject('All');
  initialProject.tasks = getAllTasks();
}

function updateTasks() {
  initialProject.tasks = getAllTasks();
}

function removeTask(id) {
  let task = getTaskById(id);

  task.project.remove(getTaskIndex(task));

  updateTasks();
  update();
}

function getTaskById(id) {
  let found;
  projects.forEach(
    (project) => (found = project.tasks.find((task) => task.id === id))
  );
  console.log(found);
  return found;
}

function locateProject(projectIndex) {
  let project = projects[projectIndex];

  return project;
}

function getTaskIndex(task) {
  const project = task.project;
  const index = project.tasks.indexOf(task);
  if (index > -1) {
    return index;
  }
  return null;
}

function getAllTasks() {
  let array = [];
  projects.forEach((project) => {
    if (project.title === 'All') return;
    array = array.concat(project.tasks);
  });
  return array;
}

function getProjectIndex(project) {
  let index = projects.indexOf(project);
  return index;
}

function getProjectsAndTitles() {
  let titles = new Map();
  projects.forEach((project) => {
    titles.set(project.title, project);
  });
  return titles;
}

function newProject(title) {
  let project = createProject(title);
  projects.push(project);

  return project;
}

function iterate(fun) {
  projects.forEach(fun);
}

export {
  projects,
  newProject,
  iterate,
  init,
  getProjectsAndTitles as getProjectsTitles,
  removeTask,
  getProjectIndex,
  getTaskById,
};
