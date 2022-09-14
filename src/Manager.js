import {createProject, addTask} from './Project';

let projects = [];

function newProject() {
  let project = createProject();
  projects.push(project);

  return project;
}

function iterate(fun) {
  projects.forEach(fun);
}


export {projects, newProject, iterate};