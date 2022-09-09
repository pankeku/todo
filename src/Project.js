import taskFactory from './Task';

export default function projectFactory() {

  

  return {
    tasks: [],
    newTask: function () {
      const task = taskFactory();
      
      this.tasks.push(task);
    },
    remove: function (task) {
      const index = array.indexOf(task);
      if (index < -1) {
        this.tasks.splice(index, 1);
      }
    },
  };
}
