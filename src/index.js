import {newProject, projects, init, removeTask} from './Manager';
import { addTask,  } from './Project';
import createTask from './Task';
import { main, update } from './UI';
import './style.css';
import loadListeners from './listeners';

let task = createTask('Take away trash', 'To the trash container', 'Priority', 'Date');
let task2 = createTask('Write a letter', 'Send it to bob@bob.bob', 'Priority', 'Date');
let task3 = createTask('Look at the trees', 'It should be nice', 'Priority', 'Date');
let project = newProject('Life');
let project2 = newProject('Work');
let project4 = newProject('Coding');
let project5 = newProject('Ideas');
let project3 = newProject('Other');
addTask(project, task);
addTask(project, createTask('Clean all windows', 'With the cloth', 'Priority', 'Date'))

addTask(project2, task2);

addTask(project3, task3);


//removeTask(task3);


//main();
//init();






init();


