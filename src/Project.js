let number = 0;

function createProject(name = 'Project title') {
  let title = name;
  let id = number++;
  let tasks = [];

  return {
    get title() {
      return title;
    },

    set title(value) {
      title = value;
    },

    set id(value) {
      id = value;
    },

    get id() {
      return id;
    }
    ,

    get tasks() {
      return tasks;
    },

    set tasks(value) {
      tasks = value;
    },

    add: function (task) {
      tasks.push(task);
    },

    remove: function (index) {
      if (index > -1) {
        return tasks.splice(index, 1);
      }
    },
  };
}

function addTask(project, task) {
  task.project = project;
  project.add(task);

  console.log(task)
}

function editTask(project, task) {}



export { createProject, addTask};
