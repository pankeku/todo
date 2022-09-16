import { render as renderNav} from './ui-modules/nav';
import { displayProject, render as renderContent } from './ui-modules/content';
import {render as renderHeader} from './ui-modules/header';
import loadListeners from './listeners';

let activeProject = [];

const mainContainer = createHtmlElement('div', null, ['main-container'], null, null);
const header = renderHeader();
const container = createHtmlElement('div', null, ['container'], null, null);
let content = renderContent();


function display(project) {
  activeProject = project;
displayProject(project);
loadListeners()

}


function main() {
  

  document.body.appendChild(mainContainer);
  mainContainer.append(header, container);
  
  const nav = renderNav();
  container.append(nav);
  container.append(content);
  
}


function createHtmlElement(type, id, arrayClasses, content, editable) {
  const element = document.createElement(type);
  if (id) element.id = id;
  if (arrayClasses)
    arrayClasses.forEach((myClass) => element.classList.add(myClass));

  if (content) element.textContent = content;

  if (editable) makeEditable(element, content);

  return element;
}

function makeEditable(element, content) {

  /* element.addEventListener('click', () => {
    element.contentEditable = true;
  })

  document.body.addEventListener('click', (event) => {
    event.stopPropagation()
    //element.contentEditable = false;
  }) */
  

  element.addEventListener('keyup', () => {
    content = element.textContent;
    console.log(content);
  });
}

function update() {
  display(activeProject);
  loadListeners();

  
}

export { main, update, display, container, createHtmlElement, makeEditable};
