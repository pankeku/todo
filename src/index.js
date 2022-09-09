import projectFactory from "./Project";
import {main, displayProject} from "./UI";

main();

let project = projectFactory();

project.newTask();

console.log(project.tasks[0]);

displayProject(project);


