import { render as renderNav} from './ui-modules/nav';
import { displayProject, render as renderContent } from './ui-modules/content';
import {render as renderHeader} from './ui-modules/header';


const mainContainer = createHtmlElement('div', null, ['main-container'], null, null);
const header = renderHeader();
const container = createHtmlElement('div', null, ['container'], null, null);
const content = renderContent();


function display(project) {
displayProject(project);

}


function main() {
  const nav = renderNav();

  document.body.appendChild(mainContainer);
  mainContainer.append(header, container);
  container.append(nav, content);
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
  element.contentEditable = true;

  element.addEventListener('keyup', () => {
    content = element.textContent;
  });
}

function update() {}

export { main, update, display, container, createHtmlElement, makeEditable};
