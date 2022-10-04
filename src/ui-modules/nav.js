import { getDoneList, getHomeProject, getProjectsTitles } from '../Manager';
import { createHtmlElement, display } from '../UI';

const nav = createHtmlElement('div', null, ['nav'], null, null);

function render() {
  nav.append(generateHomeItem(), generateNavItems(), addProjectButton(), generateDoneTasksProj());
  return nav;
}

function generateDoneTasksProj() {
  const doneProject = getDoneList();
  const done = createHtmlElement('div', doneProject.id, ['done-tasks'], 'Completed tasks', null);

  return done;
}

function generateHomeItem() {
  const homeProject = getHomeProject();
  const home = createHtmlElement('div', homeProject.id, ['nav-home'], 'Home', null);

  return home;

}

function generateNavItems() {
  let navItems = createHtmlElement('div', null, ['nav-items'], null, null);
  let items = getProjectsTitles();
  items.forEach((item) => {
    for (let key in item) {
      const element = createHtmlElement('ul', item[key], ['nav-item'], key, null);
      navItems.appendChild(element);
    }
  });

  return navItems;
}

function updateNav() {
  nav.replaceChildren();
  render();
}

function events(map) {
  map.forEach((object, element) => {
    element.addEventListener('click', () => {
      display(object);
    });
  });
}

function addProjectButton() {
  const element = createHtmlElement(
    'div',
    null,
    ['project-add'],
    'Add Project',
    null
  );
  return element;
}

export { render, updateNav };
