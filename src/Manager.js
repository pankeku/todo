import { display } from './UI';
import { createProject } from './Project';


let projects = [];

function init() {
  let all = newProject('All');
  all.tasks = getAllTasks();
  
 display(all);
}

function getAllTasks() {
  let array = [];
  projects.forEach(project => {array = array.concat(project.tasks)});
  return array;
}

function getProjectsAndTitles() {
  let titles = new Map();
  projects.forEach(project => {titles.set(project.title, project)});
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


export { projects, newProject, iterate, init, getProjectsAndTitles as getProjectsTitles};
