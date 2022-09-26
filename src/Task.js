let number = 1;

export default function createTask(title1, description, dueDate, priority) {
  let project;
  let id = number++;
  let title = title1;
  let completed = false;
  return {
    get title() {
      return title;
    },
    set title(value) {
      title = value;
    },
    set completed(value) {
      completed = value;
    }
    ,
    get completed() {
      return completed;
    }

    ,
    description,
    dueDate,
    priority,
    project,
    id,
    completed
  };
}
