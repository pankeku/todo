import { getTaskNumber } from "./localStorage";

let number = getTaskNumber();

function createTask(title, description, dueDate, priority) {
  let project;
  let id = number++;

  return {
    title: title,
    completed: false,
    description: description,
    dueDate: dueDate,
    priority: priority,
    project: project,
    id: id,
  };
}

export { number, createTask };
