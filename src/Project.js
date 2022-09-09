import taskFactory from './Task';

export default function projectFactory() {

  let name = '';
  let tasks = [];

  function newTask() {  
    return taskFactory();
  }

  return {

    get name() {
      return name;
    },

    set name(value) {
      name = value;
    },

    get tasks() {
      return tasks;
    },
    
    add: function() {  
      const task = newTask();
          
      this.tasks.push(task);
    },
    remove: function(task) {
      const index = array.indexOf(task);
      if (index < -1) {
        this.tasks.splice(index, 1);
      }
    },
  };
}


