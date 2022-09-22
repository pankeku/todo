import { createProject, addTask } from "./Project";
import createTask from "./Task";
import { display, main, update } from "./UI";

let projects = [];
let homeProject;
let done;

function getDoneList() {
  return done;
}

function toggleTaskCompletion(task) {
  console.log(task);
  if (task.completed) {

    done.remove(done.tasks.indexOf(task));
    task.completed = false;
    task.project.add(task);
    console.log(task.project);


    updateTasks();
    update();

    return;
  }
  task.completed = true;
  done.add(task);
  removeTask(task.id);
  console.log(task)
  console.log(done.tasks);
  updateTasks();
  update();
}

function init() {
  createDoneTasksProject();
  defaultProject();
  main();
  display(homeProject);
}

function createDoneTasksProject() {
  done = createProject("Done");
  done.id = -2;
}

function getHomeProject() {
  return homeProject;
}

function defaultProject() {
  homeProject = newProject("Home");
  homeProject.id = -1;
  updateTasks();
}

function updateTasks() {
  homeProject.tasks = homeProject.tasks.filter(
    (task) => task.project.title === homeProject.title
  );
  homeProject.tasks = homeProject.tasks.concat(getAllTasks());
}

function addNewTask(projectId, title, description, dueDate, priority) {
  let project = getProjectById(Number(projectId));

  addTask(project, createTask(title, description, dueDate, priority));

  updateTasks();
  update();
}

function removeTask(id) {
  let task = getTaskById(id);

  task.project.remove(getTaskIndex(task));

  updateTasks();
  update();
}

function getTaskById(id, project) {
  id = Number(id);

  if (project) {
    return project.tasks.find((task) => task.id === id);
  }

  let found;
  projects.forEach((project) => {
    found = project.tasks.find((task) => task.id === id);
  });
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
  id = Number(id);

  if (id === -1) return getHomeProject();

  const project = projects.find((project) => project.id === id);
  return project;
}

function getAllTasks() {
  let array = [];
  projects
    .filter((project) => project.title !== homeProject.title)
    .forEach((project) => {
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
  projects
    .filter((project) => project.title !== homeProject.title)
    .forEach((project) => {
      const obj = {};
      obj[project.title] = project.id;
      titles.push(obj);
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
  addNewTask,
  getHomeProject,
  getProjectById,
  getDoneList,
  toggleTaskCompletion
};
