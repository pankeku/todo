import { config, priorityBorderColors, priorityColors } from "../config";
import { dueDateChecker } from "../helper";
import { getProjectById, getProjectsTitles, getUpdatedHomeProject } from "../Manager";
import { activeSortOption, activeSortOrder, sorter, sortOptions } from "../sorter";
import { activeProject, createHtmlElement } from "../UI";

const content = createHtmlElement("div", null, ["content"], null);

function render() {
  return content;
}

function displayProject(project) {
  clearContentElement();
  renderProject(project);
}

function renderProject(project) {
  const projectEl = generateProjectElement(project);

  if (!(project.id == config.done.id)) projectEl.append(generateNewTaskBar());

  projectEl.append(generateTasksSorterElement(), generateTasks(project));

  content.append(projectEl);
}

function generateNewTaskBar() {
  const newTaskContainer = createHtmlElement(
    "div",
    null,
    ["task-container"],
    null
  );

  const container = createHtmlElement(
    "div",
    null,
    ["task-inside-container"],
    null
  );

  const textBar = createHtmlElement("input", null, ["text-bar"], null, [
    ["placeholder", "New todo..."],
  ]);

  newTaskContainer.append(container);
  container.appendChild(textBar);

  return newTaskContainer;
}

function generateProjectElement(project) {
  const projectElement = createHtmlElement(
    "div",
    project.id,
    ["project"],
    null
  );

  const headerWrapper = createHtmlElement("div", null, ["project-header"]);

  const titleWrapper = createHtmlElement("div", null, [
    "project-title-wrapper",
  ]);

  const projectTitle = createHtmlElement(
    "div",
    null,
    ["project-title"],
    project.title
  );
  titleWrapper.append(projectTitle);

  headerWrapper.append(titleWrapper);

  projectElement.appendChild(headerWrapper);

  //as paskaites apie single-responsibility ir dependency inversion, ir biski apie composition, vis galvoju, kad tokius zemiau esancius metodus reiktu callint is isores, kad pvz. cia generateProjectElement() nebutu priklausomas nuo situ dvieju metodu. Ideja tokia, kad tiems dviems metodams passinu projectElement, kuri dabar generateProjectElement() returnina. Tada passintam parente pagal savo vidine logika jie susirastu ko jiems reikia ir patys pridetu savo elementus. Arba vapse jiems nieko nepassinu, tada kai buna pacallinti, jie susiranda parentElement per querySelector ir visi metodai gyvena sau atskirai ir laimingai.
  //bet tada atrodo daaaug daugiau kodo bus, ir, kas man atrodo svarbu, daug daugiau resursu isnaudota bus, nors as srity performance vs maintanable and readable code nesigaudau :D ka manai?

  addProjectTitleEditElement(titleWrapper);
  addProjectRemoveElement(titleWrapper);

  return projectElement;
}

function addProjectTitleEditElement(titleElement) {
  if (
    titleElement.closest(".project").id == -1 ||
    titleElement.closest(".project").id == config.done.id
  ) {
    return;
  }

  const titleEdit = createHtmlElement(
    "div",
    null,
    ["project-title-edit"],
    null
  );

  titleElement.appendChild(titleEdit);
}

function addProjectRemoveElement(titleElement) {
  if (
    titleElement.closest(".project").id == -1 ||
    titleElement.closest(".project").id == config.done.id
  ) {
    return;
  }

  const projectRemove = createHtmlElement("div", null, ["project-remove"], "");

  titleElement.appendChild(projectRemove);
}

function generateTasks(project) {
  const taskList = project.tasks;
  const tasksElement = createHtmlElement("div", null, ["tasks"]);

  taskList.forEach((task) => {
    let element = generateTaskElement(task);

    tasksElement.append(element);

    element.addEventListener("click", () => {});
  });

  return tasksElement;
}

function generateTaskElement(task) {
  const taskElement = createHtmlElement("div", task.id, ["task"], null);

  addCheckBox(task, taskElement);

  const title = createHtmlElement("div", null, ["task-title"], task.title);

  const dueStatus = createHtmlElement(
    "div",
    null,
    ["due-status"],
    dueDateChecker(task.dueDate)
  );

  let assignedProject = createHtmlElement(
    "div",
    null,
    ["assigned-project"],
    getProjectById(task.project).title
  );

  const leftWrapper = createHtmlElement("div", null, ["task-content-wrapper"]);
  leftWrapper.append(title, dueStatus);

  taskElement.append(leftWrapper, assignedProject);

  addTaskActionsElement(taskElement);

  return taskElement;
}

function generateExpandedTaskElement(task) {
  const taskElement = generateTaskElement(task);
  const leftWrapper = taskElement.querySelector(".task-content-wrapper");
  leftWrapper.replaceChildren();

  const title = createHtmlElement("div", null, ["task-title"], task.title);

  const description = createHtmlElement(
    "div",
    null,
    ["description"],
    task.description
  );

  const dateAndPriorityWrapper = createHtmlElement("div", null, [
    "task-properties-wrapper",
  ]);

  let projectSelector = generateProjectSelectElement();

  showAssignedProjectInSelector(projectSelector, task);

  dateAndPriorityWrapper.append(
    generateTaskDateElements(task),
    generateTaskPriorityElements(task),
    projectSelector
  );

  const textWrapper = createHtmlElement("div", null, ["input-text-wrapper"]);

  textWrapper.append(title, description);

  leftWrapper.append(textWrapper);
  taskElement.append(dateAndPriorityWrapper);
  taskElement.classList.add("task--expanded");

  return taskElement;
}

function generateTaskWithInput(task) {
  let taskElement = generateExpandedTaskElement(task);
  const leftWrapper = taskElement.querySelector(".task-content-wrapper");
  const title = leftWrapper.querySelector(".task-title");
  const description = leftWrapper.querySelector(".description");

  leftWrapper.classList.add("task-edit");

  title.setAttribute("contenteditable", "true");
  title.setAttribute("autofocus", "");

  description.setAttribute("contenteditable", "true");

  return taskElement;
}

function createDateInputElement(date) {
  if (!date) date = "Due date";

  const newDate = createHtmlElement("input", "date", ["new-task-date"], "Date", [
    ["type", "text"],
    ["value", date],
    ["name", "date"],
    ["title", "Set due date"],
  ]);

  return newDate;
}

function generateTaskPrioritySelectorElement(taskPriority) {
  const priority = createHtmlElement(
    "select",
    "priority-select",
    ["task-priority-reselector"],
    null,
    [
      ["name", "priority"],
      ["title", "Set priority"],
    ]
  );

  const priorities = config.priorities;

  priorities.forEach((P) => {
    const option = createHtmlElement("option", null, null, P, [["value", P]]);

    if (P == "P1") {
      option.setAttribute("selected", "");
    }

    if (P == taskPriority) {
      option.setAttribute("selected", "");
    }

    priority.appendChild(option);
  });

  return priority;
}

function setCheckBoxColor(element, task) {
  element.style.backgroundColor = `var(${priorityColors[task.priority]})`;
}

function setCheckBoxOutlineColor(element, task) {
  element.style.outlineColor = `var(${priorityBorderColors[task.priority]})`;
}

function showAssignedProjectInSelector(selectorElement, task) {
  const options = selectorElement.querySelector(".project-select").options;
  for (let option in options) {
    if (options[option].id == task.project) {
      options[option].setAttribute("selected", "");
    }
  }
}

function generateProjectSelectElement() {
  const projectSelectWrapper = createHtmlElement("div", null, [
    "project-select-wrapper",
  ]);

  const projectSelect = createHtmlElement(
    "select",
    "project-select",
    ["project-select"],
    null,
    [
      ["name", "project-selector"],
      ["title", "Choose project"],
    ]
  );

  const projectSelectLabel = createHtmlElement(
    "div",
    null,
    ["project-select-label"],
    null,
    [["for", projectSelect.id]]
  );

  getProjectsTitles().forEach((item) => {
    for (let title in item) {
      const projectId = item[title];

      const option = createHtmlElement("option", projectId, null, title, [
        ["value", title],
      ]);

      if (projectId == activeProject.id) {
        option.setAttribute("selected", "");
      }

      projectSelect.appendChild(option);
    }
  });

  projectSelectWrapper.append(projectSelectLabel, projectSelect);

  return projectSelectWrapper;
}

function generateTaskPriorityElements(task) {
  let priority = "P1";

  if (task) {
    priority = task.priority;
  }

  const priorityWrapper = createHtmlElement("div", null, ["priority-wrapper"]);

  const newPriority = generateTaskPrioritySelectorElement(priority);
  newPriority.className = "new-task-priority";

  const priorityLabel = createHtmlElement(
    "div",
    null,
    ["priority-label"],
    null,
    [["for", newPriority.id]]
  );

  priorityWrapper.append(priorityLabel, newPriority);

  return priorityWrapper;
}

function generateTaskDateElements(task) {
  let dateSetting = false;
  if (task) {
    dateSetting = task.dueDate;
  }

  const dateWrapper = createHtmlElement("div", null, ["task-date-wrapper"]);

  const date = createDateInputElement(dateSetting);

  const dateLabel = createHtmlElement("div", null, ["date-label"], "Due date", [
    ["for", date.id],
  ]);
  dateWrapper.append(dateLabel, date);

  return dateWrapper;
}

function generateTasksSorterElement() {
  const sorterWrapper = createHtmlElement("div", null, [
    "project-sorter-wrapper",
  ]);

  const sorter = createHtmlElement("div", "sorter", ["project-sorter"]);

  const wrapper = createHtmlElement("div", null, ["sort-icons-wrapper"]);
  const sortArrow = createHtmlElement("div", null, ["sort-arrow"]);

  if (activeSortOrder === "ascending") {
    sortArrow.classList.add("sort-arrow--up");
  }

  const sortLabel = createHtmlElement("label", null, ["sort-label"], null, [
    ["for", sorter.id],
  ]);

  wrapper.append(sortArrow, sortLabel);
  let options = sortOptions;

  options = options.filter((item) => item !== activeSortOption);
  options.unshift(activeSortOption);

  options.forEach((option) => {
    const sortOption = createHtmlElement("div", null, ["sort-option"], option);
    if (option == activeSortOption) sortOption.id = "selected";
    sorter.append(sortOption);
  });

  sorterWrapper.append(wrapper, sorter);

  return sorterWrapper;
}



function addTaskRemoveElement(element) {
  const remove = document.createElement("div");
  remove.classList.add("remove");
  remove.textContent = "Remove";

  element.appendChild(remove);
}

function addTaskEditElement(element) {
  const edit = document.createElement("div");
  edit.classList.add("edit");
  edit.textContent = "Edit";

  element.appendChild(edit);
}

function addCheckBox(task, taskElement) {
  const checkbox = createHtmlElement("input", null, ["complete"], null, [
    ["type", "checkbox"],
  ]);

  setCheckBoxColor(checkbox, task);
  taskElement.append(checkbox);
  checkbox.checked = task.completed;
}

function addTaskActionsElement(element) {
  const actionsWrapper = createHtmlElement("div", null, [
    "task-actions-wrapper",
  ]);

  addTaskEditElement(actionsWrapper);
  addTaskRemoveElement(actionsWrapper);

  element.append(actionsWrapper);
}

function clearContentElement() {
  content.replaceChildren();
}

function updateTasksElement() {

  const projectId = document.querySelector('.project').id;
  const oldTasks = document.querySelector('.tasks');

   oldTasks.classList.add("project--fading");

   let project;

   if (projectId === '-1') {
    project = getUpdatedHomeProject();
  } else {
    project = getProjectById(projectId);
  }
   sorter(project);
    const tasks = generateTasks(project);

  setTimeout(() => {
    oldTasks.replaceWith(tasks);
    tasks.classList.add("project--fading");
    setTimeout(() => {
      tasks.classList.remove("project--fading");
    }, 200);
  }, 100);

}


export {
  render,
  displayProject,
  generateTaskElement,
  generateNewTaskBar,
  setCheckBoxColor,
  setCheckBoxOutlineColor,
  generateProjectSelectElement,
  generateTaskPriorityElements,
  generateTaskDateElements,
  generateExpandedTaskElement,
  generateTaskWithInput,
  generateTasks,
  updateTasksElement
};
