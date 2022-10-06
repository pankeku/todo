import { getProjectNumber } from "./localStorage";

let number = getProjectNumber();

function createProject(name = 'Project title') {
  let title = name;
  let id = number++;
  let tasks = [];

  return {
    title: title,
    id: id,
    tasks: tasks,
    add: function (task) {
      tasks.push(task);
    },
    remove: function (index) {
      if (index > -1) {
        return tasks.splice(index, 1);
      }
    }
  };
}


function addTask(project, task) {
  task.project = project.id;
  project.add(task);
}

export { createProject, addTask, number};
