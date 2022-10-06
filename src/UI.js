import {
  getHomeProject,
  getProjectById,
  projectExists,
  updateTasks,
} from "./Manager";
import {
  sorter,
  activeSortOption,
  activeSortOrder,
} from "./sorter";
import { displayProject, render as renderContent } from "./ui-modules/content";
import { render as renderHeader } from "./ui-modules/header";
import { render as renderNav } from "./ui-modules/nav";

let activeProject = [];

const mainContainer = createHtmlElement("div", null, ["main-container"], null);
const header = renderHeader();
const container = createHtmlElement("div", null, ["container"], null);
let content = renderContent();


function main() {
  document.body.appendChild(mainContainer);
  mainContainer.append(header, container);

  const nav = renderNav();
  container.append(nav);
  container.append(content);
}

function display(project) {
  if (!projectExists(project) || project.id == -1) {
    updateTasks();
    project = getHomeProject();
  }

  activeProject = project;

  console.log(project);

  sorter(project, activeSortOption, activeSortOrder);

  displayProject(project);
}

function update() {
  display(activeProject);
}

function createHtmlElement(type, id, arrayClasses, content, attributes) {
  const element = document.createElement(type);
  if (id) {
    element.id = id;
  }
  if (arrayClasses)
    arrayClasses.forEach((myClass) => element.classList.add(myClass));

  if (content) element.textContent = content;

  if (attributes) {
    attributes.forEach((attribute) =>
      element.setAttribute(attribute[0], attribute[1])
    );
  }

  return element;
}

export { main, update, display, container, createHtmlElement, activeProject };
