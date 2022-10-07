import { getProjectById } from "./Manager";

let sortOptions = ["name", "priority", "date", "project"];
let activeSortOption = "name";
let activeSortOrder = "ascending";

function sorter(project) {
  project.tasks.sort((a, b) => {
    let titleA;
    let titleB;

    if (activeSortOption === "name") {
      titleA = a["title"].toUpperCase();
      titleB = b["title"].toUpperCase();
    }

    if (activeSortOption === "priority") {
      titleA = a["priority"];
      titleB = b["priority"];
    }

    if (activeSortOption === "date") {
      titleA = a["dueDate"];
      titleB = b["dueDate"];
    }

    if (activeSortOption === "project") {
      titleA = getProjectById(a.project).title.toUpperCase();
      titleB = getProjectById(b.project).title.toUpperCase();
    }

    if (activeSortOrder == "descending") {
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
