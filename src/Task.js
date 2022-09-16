let number = 0;

export default function createTask(title, description, dueDate, priority) {  
  let project;
  let id = number++;
  return {
    title,
    description,
    dueDate,
    priority,
    project,
    id
  };
}
