import {newProject, projects, init, removeTask} from './Manager';
import { addTask,  } from './Project';
import createTask from './Task';
import { main, update } from './UI';
import './style.css';
import loadListeners from './listeners';

let task = createTask('task makeditable tik kai paspaudi', 'task onclick madeEditable', 'Priority', 'Date');
let task2 = createTask('2', 'daryti', 'Priority', 'Date');
let task3 = createTask('3', 'eiti', 'Priority', 'Date');
let project = newProject('First');
let project2 = newProject('Second');
let project3 = newProject('Third');
let project4 = newProject('Fourth');
let project5 = newProject('Fifth');
addTask(project, task);
addTask(project, createTask('fafaf', 'fafa', 'faggg', 'fff'))

addTask(project2, task2);

addTask(project3, task3);


//removeTask(task3);


//main();
//init();






init();


