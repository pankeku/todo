import { getProjectsTitles } from '../Manager';
import { createHtmlElement, display } from '../UI';

function render() {
  const nav = createHtmlElement('div', null, ['nav'], null, null);
  nav.appendChild(generateNavItems());
  return nav;
}

function generateNavItems() {
  let navItems = createHtmlElement('div', null, ['nav-items'], null, null);
  let items = getProjectsTitles();
  let map = new Map();
  items.forEach((object, title) => {
    const element = createHtmlElement('ul', null, ['nav-item'], title, null);
    navItems.appendChild(element);

    map.set(element, object);
  });
  events(map);
  return navItems;
}

function events(map) {
    map.forEach( (object, element)=> {
        element.addEventListener('click', () => {
            display(object);
        });
    });
    
}

export { render };
