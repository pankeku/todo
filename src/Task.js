let number = 0;

export default function createTask(title1, description, dueDate, priority) {  
  let project;
  let id = number++;
  let title = title1;
  return {
    get title() {
      return title;
    },
    set title(value) { 
      title = value;
    },
    description,
    dueDate,
    priority,
    project,
    id
  };
}
