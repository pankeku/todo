import {newProject, projects, init} from './Manager';
import { addTask, removeTask } from './Project';
import createTask from './Task';
import { main, update } from './UI';
import './style.css';

let task = createTask('1', 'wasup', 'Priority', 'Date');
let task2 = createTask('2', 'daryti', 'Priority', 'Date');
let task3 = createTask('3', 'eiti', 'Priority', 'Date');
let project = newProject('First');
let project2 = newProject('Second');
let project3 = newProject('Third');
let project4 = newProject('Fourth');
let project5 = newProject('Fifth');
addTask(project, task);

addTask(project2, task2);

addTask(project3, task3);



init();
main();