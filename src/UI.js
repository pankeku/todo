function main() {

const content = document.createElement('div');
content.classList.add('content');
const projects = document.createElement('div');
projects.classList.add('projects');
/* const tasks = document.createElement('div');
tasks.classList.add('tasks');

projects.append(tasks); */
content.append(projects);

document.querySelector('body').append(content);
}

function displayProject(project) {
    const item = document.createElement('div');
    item.classList.add('project');
    document.querySelector('.projects').appendChild(item);
}

function displayTasks(tasks) {
    

}

export {main, displayProject};


