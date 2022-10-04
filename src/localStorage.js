import { done, getDoneList, projects } from "./Manager";
import { number as projectNumber } from "./Project";
import { number as taskNumber } from "./Task";

function updateLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("done", JSON.stringify(done));
  localStorage.setItem("taskNumber", taskNumber);
  localStorage.setItem("projectNumber", projectNumber);
}

function getTaskNumber() {
 return getNumber("taskNumber");
}

function getProjectNumber() {
 return getNumber("projectNumber");
}

function getNumber(key) {

  if (!localStorage.getItem(key)) {
    console.log('RETURNING 1')
    return 1;
  }

  return localStorage.getItem(key);
}

function getDoneProjectFromStorage(done) {
  if (localStorage.getItem("done")) {
    const stored = JSON.parse(localStorage.getItem("done"));

    readdMethods(stored);

    return stored;
  }

  return done;
}

function getProjectsFromStorage(projects) {
  if (localStorage.getItem("projects")) {
    const stored = JSON.parse(localStorage.getItem("projects"));

    stored.forEach((project) => {
      readdMethods(project);
    });

    return stored;
  }

  return projects;
}

function readdMethods(project) {
  project.add = function (task) {
    project.tasks.push(task);
  };

  project.remove = function (index) {
    if (index > -1) {
      return project.tasks.splice(index, 1);
    }
  };
}

export {
  getTaskNumber,
  getProjectNumber,
  updateLocalStorage,
  getDoneProjectFromStorage,
  getProjectsFromStorage,
};
