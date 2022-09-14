import {newProject, projects} from './Manager';
import { addTask, removeTask } from './Project';
import createTask from './Task';
import { main, update } from './UI';
import './style.css';

let task = createTask('Task title', 'Desription', 'Priority', 'Date');
let project = newProject();
let project2 = newProject();
let project3 = newProject();
let project4 = newProject();
let project5 = newProject();
addTask(project, task);

addTask(project2, task);
console.log(projects[0].tasks[0]);

addTask(project3, task);

main();




update();
