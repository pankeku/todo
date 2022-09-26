import {config} from '../config';
import {createHtmlElement } from '../UI';

function render() {
  const header = createHtmlElement('div', null, ['header'], null, null);

  const headerText = createHtmlElement(
    'div',
    null,
    ['header-text'],
    config.page.title,
    null
  );

  header.appendChild(headerText);

 return header;
}

export { render };
