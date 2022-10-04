import { newProject, projects, init, removeTask } from "./Manager";
import { addTask } from "./Project";
import {createTask} from "./Task";
import { main, update } from "./UI";
import "./style.css";
import loadListeners from "./listeners";

let task = createTask(
  "Take out trash",
  "To the trash container and the go to the supermaket to check prices for trashbags yuuuuuus wasup wasup im coming home wasup wasup ypo basketball is the greatest yeeeeeeeee",
  "2022-09-23",
  "P4"
);
let task2 = createTask(
  "Write a letter",
  "Send it to bob@bob.bob",
  "2022-11-28",
  "P4"
);
let task3 = createTask(
  "Look at the trees",
  "It should be nice",
  "2022-09-25",
  "P2"
);
let project = newProject("Life");
let project2 = newProject("Work");
let project4 = newProject("Coding");
let project5 = newProject("Ideas");
let project3 = newProject("Other");
addTask(project, task);
addTask(
  project,
  createTask("Clean all windows", "With the cloth", "2022-12-24", "P1")
);

addTask(project2, task2);

addTask(project3, task3);


//main();
//init();

init();
