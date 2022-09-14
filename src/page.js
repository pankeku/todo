import config from "./config";

function load() {

    const container = document.createElement('div');
    container.classList.add('container');

  const content = document.createElement('div');
  content.classList.add('content');
  
  const header = document.createElement('div');
  header.classList.add('header');

  container.appendChild(header);
    container.appendChild(content);

  const headerText = document.createElement('div');
  headerText.classList.add('header-text');

  header.appendChild(headerText);

  headerText.textContent = config.page.title;

  const nav = document.createElement('div');
  nav.classList.add('nav');

  const notesContainer = document.createElement('div');
  notesContainer.classList.add('notes-container');
  notesContainer.appendChild(nav);

  content.appendChild(notesContainer);
  
  document.body.appendChild(container);
  

  return notesContainer;
}

export default load;
