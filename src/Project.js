let number = 1;

function createProject(name = 'Project title') {
  let title = name;
  let id = number++;
  let tasks = [];

    function add(task) {
      tasks.push(task);
    }

    function remove (index) {
      if (index > -1) {
        return tasks.splice(index, 1);
      }
    }

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
    add, remove
  };
}


function addTask(project, task) {
  task.project = project.id;
  console.log(project)
  project.add(task);
}

export { createProject, addTask};
