import taskFactory from './Task';
import { generateId } from './helper';
import projects from './Manager';

function createProject() {
  let title = 'PROJECT TITLE';
  let tasks = [];

  return {
    get title() {
      return title;
    },

    set title(value) {
      title = value;
    },

    get tasks() {
      return tasks;
    },

    add: function (task) {
      tasks.push(task);
    },

    remove: function (index) {
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
  };
}

function addTask(project, task) {
  project.add(task);
}

function removeTask(project, task) {
  let index = locateIndex(project, task);
  project.remove(index);
}

function editTask(project, task) {}

function locateIndex(project, task) {
  const index = project.tasks.indexOf(task);
  if (index > -1) {
    return index;
  }

  return null;
}

export { createProject, addTask, removeTask};
