import { getProjectsTitles } from '../Manager';
import { createHtmlElement, display } from '../UI';

const nav = createHtmlElement('div', null, ['nav'], null, null);

function render() {
  nav.append(generateNavItems(), addProjectButton());
  return nav;
}

function generateNavItems() {
  let navItems = createHtmlElement('div', null, ['nav-items'], null, null);
  let items = getProjectsTitles();
  console.log(items);
  let map = new Map();

  items.forEach((item) => {
    for (let key in item) {
      const element = createHtmlElement('ul', null, ['nav-item'], key, null);
      navItems.appendChild(element);

      map.set(element, item[key]);
    }
  });

  events(map);
  return navItems;
}

function updateNav() {
  nav.replaceChildren();
  nav.append(generateNavItems(), addProjectButton());
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
