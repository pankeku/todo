import { createProject, addTask } from './Project';
import createTask from './Task';
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
  //initialProject.id = -9;
}

function updateTasks() {
  initialProject.tasks = getAllTasks();
}


function addNewTask(projectId, title1, description, dueDate, priority) {
  let project = getProjectById(projectId);
  if (project.title = 'All') {
    project = initialProject;
  }
  addTask(project, createTask(title1, description, dueDate, priority));
  console.log(project);
}

function removeTask(id) {
  console.log('removing')
  let task = getTaskById(id);

  task.project.remove(getTaskIndex(task));

  console.log(task.project);

  updateTasks();
  update();
}

function getTaskById(id) {
  let found;
  projects.forEach(
    (project) => (found = project.tasks.find((task) => task.id === id))
  );
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

function getProjectById(id) {
  console.log(projects[0].id);
 const project = projects.find(item => item.id === Number(id));
 console.log(project);
 return project;
}

function getAllTasks() {
  let array = [];
  projects.forEach((project) => {
    if (project.title === 'All') {

    };
    array = array.concat(project.tasks);
  });
  return array;
}

function getProjectIndex(project) {
  let index = projects.indexOf(project);
  return index;
}

function getProjectsAndTitles() {
  let titles = [];
  projects.forEach((project) => {
    const obj = {};
    obj[project.title] = project;
    titles.push(obj);
  });
  return titles;
}

function newProject(title) {
  let project = createProject(title);
  projects.push(project);
  console.log(project.title + ' ' + project.id);

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
  addNewTask
};
