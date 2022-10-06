import { getProjectById } from "./Manager";

let sortOptions = ["name", "priority", "date", "project"];
let activeSortOption = "name";
let activeSortOrder = "ascending";

function sorter(project, setting, order) {
  project.tasks.sort((a, b) => {
    let titleA;
    let titleB;

    if (setting === "name") {
      titleA = a["title"].toUpperCase();
      titleB = b["title"].toUpperCase();
    }

    if (setting === "priority") {
      titleA = a["priority"];
      titleB = b["priority"];
    }

    if (setting === "date") {
      titleA = a["dueDate"];
      titleB = b["dueDate"];
    }

    if (setting === "project") {
      titleA = getProjectById(a.project).title.toUpperCase();
      titleB = getProjectById(b.project).title.toUpperCase();
    }

    if (order == "descending") {
      const temp = titleA;
      titleA = titleB;
      titleB = temp;
    }

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0;
  });
}

function changeSortOrder() {
  if (activeSortOrder === "ascending") {
    activeSortOrder = "descending";

    return;
  }

  activeSortOrder = "ascending";
}

function changeSortCriteria(element) {
  document.querySelector("#selected").id = "";
  element.id = "selected";
  activeSortOption = element.textContent;
}

export {
  sorter,
  changeSortCriteria,
  changeSortOrder,
  activeSortOption,
  activeSortOrder,
  sortOptions,
};
