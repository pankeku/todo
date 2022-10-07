import {
  getHomeProject,
  getProjectById,
  getUpdatedHomeProject,
  projectExists,
  updateTasks,
} from "./Manager";
import { sorter, activeSortOption, activeSortOrder } from "./sorter";
import { displayProject, render as renderContent } from "./ui-modules/content";
import { render as renderHeader } from "./ui-modules/header";
import { render as renderNav } from "./ui-modules/nav";

let activeProject = [];

function initUI() {
  const header = renderHeader();
  const nav = renderNav();
  const content = renderContent();

  const mainContainer = createHtmlElement("div", null, ["main-container"], null);
  document.body.appendChild(mainContainer);

  const container = createHtmlElement("div", null, ["container"], null);
  mainContainer.append(header, container);


  container.append(nav);
  container.append(content);
}

function display(project) {
  if (!projectExists(project) || project.id == -1) {
    project = getUpdatedHomeProject();
  }

  activeProject = project;

  sorter(project, activeSortOption, activeSortOrder);

  fadeDisplay(displayProject, project);
}

function update() {
  display(activeProject);
}

function fadeDisplay(displayFunction, project) {
  const pastProject = document.querySelector(".project");

  if (pastProject) {
    document.querySelector(".project").classList.add("project--fading");
  }

  setTimeout(() => {
    displayFunction(project);

    const newProject = document.querySelector(".project");

    newProject.classList.add("project--fading");

    setTimeout(() => {
      newProject.classList.remove("project--fading");
    }, 100);
  }, 100);
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

export { initUI, update, display, createHtmlElement, activeProject };
