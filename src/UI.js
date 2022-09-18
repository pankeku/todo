import { render as renderNav } from './ui-modules/nav';
import { displayProject, render as renderContent } from './ui-modules/content';
import { render as renderHeader } from './ui-modules/header';
import loadListeners from './listeners';
import { projects } from './Manager';

let activeProject = [];

const mainContainer = createHtmlElement('div', null, ['main-container'], null);
const header = renderHeader();
const container = createHtmlElement('div', null, ['container'], null);
let content = renderContent();

function display(project) {
  activeProject = project;
  displayProject(project);
  loadListeners();
}

function main() {
  document.body.appendChild(mainContainer);
  mainContainer.append(header, container);

  const nav = renderNav();
  container.append(nav);
  container.append(content);
}

function createHtmlElement(type, id, arrayClasses, content, attributes) {
  const element = document.createElement(type);
  if (id) element.id = id;
  if (arrayClasses)
    arrayClasses.forEach((myClass) => element.classList.add(myClass));

  if (content) element.textContent = content;

  if (attributes) {
    attributes.forEach((attribute) =>
      element.setAttribute(attributes[0], attributes[1])
    );
  }

  return element;
}

function update() {
  display(activeProject);
}

export { main, update, display, container, createHtmlElement};
