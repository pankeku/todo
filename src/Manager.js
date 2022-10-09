import { config } from "./config";
import { initDefaultTasks } from "./helper";
import {
  getDoneProjectFromStorage,
  getProjectsFromStorage,
  updateLocalStorage,
} from "./localStorage";
import { createProject, addTask } from "./Project";
import { createTask } from "./Task";
import { display, initUI, update } from "./UI"; // COMMENT: unused function
import { updateTasksElement } from "./ui-modules/content";
import { updateNav } from "./ui-modules/nav";

let projects = [];
let allTasksProject;
let done;

function init() {
  initDefaultTasks();
  initDefaultProjects();
  initUI();
  updateTasks();
  display(allTasksProject);
}

// COMMENT: this is usually called as `fn` or `func`, not `fun` :D
function runAndUpdate(fun, ...args) {
  fun(...args);
  updateLocalStorage();
  updateNav();
  updateTasksElement();
}

function toggleTaskCompletion(task) {
  if (task.completed) {
    // COMMENT: done is defined as `let done;`, which means, that done can be undefined. You should check if done is defined before using it.
    done.remove(getTaskIndex(task, done));
    task.completed = false;

    let project = getProjectById(task.project);

    project.add(task);

    return;
  }

  task.completed = true;
  done.add(task);
  removeTask(task.id);
}

function initDefaultProjects() {
  createDoneTasksProject();
  createAllTasksProject();
  projects = getProjectsFromStorage(projects);
  done = getDoneProjectFromStorage(done);
}

function createAllTasksProject() {
  allTasksProject = newProject(config.allProject.title);
  allTasksProject.id = config.allProject.id;
}

function getHomeProject() {
  return allTasksProject;
}

function getUpdatedHomeProject() {
  updateTasks();
  return allTasksProject;
}

function updateTasks() {
  allTasksProject.tasks = allTasksProject.tasks.filter((task) => {
    const project = getProjectById(task.project);
    if (project) return project.title === allTasksProject.title;
    return false;
  });
  allTasksProject.tasks = allTasksProject.tasks.concat(getAllTasks());
}

function createDoneTasksProject() {
  done = createProject(config.done.title);
  done.id = config.done.id;
}

function getDoneList() {
  return done;
}

function addNewTask(projectId, title, description, dueDate, priority) {
  addTask(
    getProjectById(projectId),
    createTask(title, description, dueDate, priority)
  );
}

function removeTask(id) {
  // COMMENT: after this function is ended, task, project and index are gonna be destroyed. You should use const for them.
  let task = getTaskById(id);
  let project = getProjectById(task.project);
  let index = getTaskIndex(task, project);
  project.remove(index);
}

function moveTask(task, newProjectId) {
  const newProject = getProjectById(newProjectId);
  removeTask(task.id);
  addTask(newProject, task);
}

function newProject(title) {
  // COMMENT: use const, and re-review other places that uses let instead of const. You should use const as much as possible.
  let project = createProject(title);
  projects.push(project);

  return project;
}

function removeProject(id) {
  let project = getProjectById(id);
  let index = getProjectIndex(project);
  projects.splice(index, 1);
}

function getTaskById(id, project) {
  id = Number(id);

  if (project) {
    return project.tasks.find((task) => task.id == id);
  }

  // COMMENT: found is really abstract. You should use a more descriptive name.
  let found;
  projects
    .filter((project) => project.id !== -1)
    .forEach((project) => {
      // COMMENT: you can use `find` instead of `forEach` and `if` statement
      project.tasks.forEach((task) => {
        if (task.id === id) {
          found = task;
        }
      });
    });
  if (!found) {
    found = done.tasks.find((task) => task.id == id);
  }

  return found;
}

function getTaskIndex(task, project) {
  const index = project.tasks.findIndex((item) => item.id == task.id);

  if (index > -1) {
    return index;
  } else { // COMMENT: else is not needed here
    throw new Error(
      // COMMENT: use template literals instead of string concatenation
      "TASK IS NOT FOUND IN THE PROJECT - " +
        project.title +
        ", TASK INDEX IS -1"
    );
  }
}

// COMMENT: function name must be a verb
function projectExists(project) {
  // COMMENT: whole function could be `return getProjectById(project.id) !== undefined` or something like that
  const found = getProjectById(project.id);
  if (!found) {
    return false;
  }

  return true;
}

function getProjectById(id) {
  id = Number(id);

  if (id === -1) return getHomeProject();
  if (id === config.done.id) return getDoneList();

  const project = projects.find((project) => project.id == id); // COMMENT: === instead of ==
  return project;
}

function getAllTasks() {
  let array = []; // COMMENT: use const
  projects
    .filter((project) => project.title !== allTasksProject.title)
    .forEach((project) => {
      array = array.concat(project.tasks);
    });
  return array;
}

function getProjectIndex(project) {
  let index = projects.indexOf(project);
  return index; // COMMENT: you can just `return projects.indexOf(project)`
}

function getProjectsAndTitles() {
  let titles = [];
  projects
    .filter((project) => project.id !== allTasksProject.id)
    // COMMENT: use map instead of forEach and new array and return the result.
    .forEach((project) => {
      const obj = {};
      obj[project.title] = project.id;
      titles.push(obj);
    });
  return titles;
}

export {
  projects,
  done,
  newProject,
  init,
  getProjectsAndTitles as getProjectsTitles,
  removeTask,
  getProjectIndex,
  getTaskById,
  addNewTask,
  getHomeProject,
  getProjectById,
  getDoneList,
  toggleTaskCompletion,
  moveTask,
  removeProject,
  runAndUpdate,
  projectExists,
  getUpdatedHomeProject,
  updateTasks,
};
