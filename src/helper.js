import { formatDistanceToNow, isBefore, parseISO } from "date-fns";
import { newProject } from "./Manager";
import { addTask } from "./Project";
import { createTask } from "./Task";

function dueDateChecker(date) {
  date = parseISO(date);

  if (date == "Invalid Date") return;
  let result = formatDistanceToNow(date);

  let status = isBefore(date, new Date())
    ? `${result} overdue`
    : `due in ${result}`;

  return status;
}

function initDefaultTasks() {
  let project = newProject("Life");
  let project2 = newProject("Work");
  let project5 = newProject("Ideas");
  let project3 = newProject("Other");

  addTask(
    project,
    createTask("Take out the trash", "somewhere!", "2022-09-23", "P1")
  );
  addTask(project, createTask("Clean all windows", "yeah", "2022-12-24", "P1"));

  addTask(
    project2,
    createTask("Write a letter", "Send it to bob@bob.bob", "2022-11-28", "P4")
  );

  addTask(
    project3,
    createTask("Look at the trees", "It should be nice", "2022-09-25", "P2")
  );
}

export { dueDateChecker, initDefaultTasks };

