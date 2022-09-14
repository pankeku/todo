/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iterate": () => (/* binding */ iterate),
/* harmony export */   "newProject": () => (/* binding */ newProject),
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


let projects = [];

function newProject() {
  let project = (0,_Project__WEBPACK_IMPORTED_MODULE_0__.createProject)();
  projects.push(project);

  return project;
}

function iterate(fun) {
  projects.forEach(fun);
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "removeTask": () => (/* binding */ removeTask)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




function createProject() {
  let title = 'PROJECT TITLE';
  let tasks = [];

  return {
    get title() {
      return title;
    },

    set title(value) {
      title = value;
    },

    get tasks() {
      return tasks;
    },

    add: function (task) {
      tasks.push(task);
    },

    remove: function (index) {
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
  };
}

function addTask(project, task) {
  project.add(task);
}

function removeTask(project, task) {
  let index = locateIndex(project, task);
  project.remove(index);
}

function editTask(project, task) {}

function locateIndex(project, task) {
  const index = project.tasks.indexOf(task);
  if (index > -1) {
    return index;
  }

  return null;
}




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createTask)
/* harmony export */ });
function createTask(title, description, dueDate, priority) {  
  return {
    title,
    description,
    dueDate,
    priority,
  };
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateId": () => (/* binding */ generateId)
/* harmony export */ });
let id = 0;

function generateId() {
    id = id + 1;
    return id;
}



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



const content = document.createElement('div');
content.classList.add('content');
document.body.append(content);

function main() {
content.appendChild(createProjects());
}


//ar geriau projectGenerator injectint sitaip, ar tiesiog pacallint projectGenerator() methodo viduj, pvz. projects.forEach(projectGenerator())? jei injectinu, createProjects tampa daugiau loosely coupled nuo projectGenerator? Is kitos puses, vis tiek callindamas createProjects turesiu norodyt projectGenerator kaip argument, bet cia gaunasi, kad createProjects panaudojimas tampa universalesnis, nes galiu injectint ka noriu?
//ir dar, createProjects ir projectsArray siuo atveju yra tightly coupled? irgi reiktu injectint? ar importinimas moduly jau skaitosi kaip injectinimas?

function createProjects() {
  const projectsElement = document.createElement('div');
  projectsElement.classList.add('projects');

  _Manager__WEBPACK_IMPORTED_MODULE_0__.projects.forEach((project) => {
    let projectElement = projectGenerator();

    generateText(project, projectElement);

    let tasksElement = createTasks(project);

    projectElement.append(tasksElement);
    projectsElement.append(projectElement);

    makeEditable(project, projectElement);
  });

  return projectsElement;
}

function projectGenerator() {
  const projectElement = document.createElement('div');
  projectElement.classList.add('project');

  const projectTitle = document.createElement('div');
  projectTitle.classList.add('project-title');

  projectElement.appendChild(projectTitle);

  return projectElement;
}

function createTasks(project) {
  console.log(project);
  const taskList = project.tasks;

  const tasksElement = document.createElement('div');
  tasksElement.classList.add('tasks');

  taskList.forEach((task) => {
    let element = taskGenerator(task);
    generateText(task, element);
    tasksElement.append(element);
    makeEditable(task, element);
  });

  return tasksElement;
}

function taskGenerator(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  const title = document.createElement('div');
  title.classList.add('task-title');

  title.addEventListener('keyup', () => {
    task.title = title.textContent;
    console.log(task.title);
  });

  const description = document.createElement('div');
  description.classList.add('description');

  const priority = document.createElement('div');
  priority.classList.add('priority');

  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date');

  taskElement.append(title, description, priority, dueDate);

  return taskElement;
}

function makeEditable(object, element) {
  element.childNodes.forEach((child) => {
    for (let item in _config__WEBPACK_IMPORTED_MODULE_1__["default"].editables) {
      if (item === child.classList[0]) {
        child.contentEditable = true;

        child.addEventListener('keyup', () => {
          object.title = child.textContent;
          console.log(object.title);
        });
      }
    }
  });
}

function generateText(object, element) {
  element.childNodes.forEach((child) => {
    for (let item in _config__WEBPACK_IMPORTED_MODULE_1__["default"].text) {
      if (item === child.classList[0]) {
        child.textContent = object[_config__WEBPACK_IMPORTED_MODULE_1__["default"].text[item]];
      }
    }
  });
}



function update() {}




/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let config = {
  text: {
    'project-title': 'title',
    'task-title': 'title',
    'description': 'description',
    'priority': 'priority',
    'due-date': 'dueDate',
  },
  editables: {
    'project-title': 'title',
    'task-title': 'title',
    'description': 'description',
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './style.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());






let task = (0,_Task__WEBPACK_IMPORTED_MODULE_2__["default"])('a', 'f', 'b', 'c');
let project = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)();
let project2 = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)();
let project3 = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)();
let project4 = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)();
let project5 = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)();
(0,_Project__WEBPACK_IMPORTED_MODULE_1__.addTask)(project, task);

(0,_Project__WEBPACK_IMPORTED_MODULE_1__.addTask)(project2, task);
console.log(_Manager__WEBPACK_IMPORTED_MODULE_0__.projects[0].tasks[0]);

(0,_Project__WEBPACK_IMPORTED_MODULE_1__.addTask)(project3, task);

(0,_UI__WEBPACK_IMPORTED_MODULE_3__.main)();




(0,_UI__WEBPACK_IMPORTED_MODULE_3__.update)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7O0FBRUE7QUFDQSxnQkFBZ0IsdURBQWE7QUFDN0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JpQztBQUNLO0FBQ0w7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFNkM7Ozs7Ozs7Ozs7O0FDckQ5QjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1BBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNMK0Q7QUFDakM7O0FBRTlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUsc0RBQXFCO0FBQ3ZCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLHlEQUFnQjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsb0RBQVc7QUFDaEM7QUFDQSxtQ0FBbUMsb0RBQVc7QUFDOUM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7OztBQUlBOztBQUV3Qjs7Ozs7Ozs7Ozs7QUN2SHhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7O1VDZnRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTitDO0FBQ0M7QUFDaEI7QUFDSTtBQUNOOztBQUU5QixXQUFXLGlEQUFVO0FBQ3JCLGNBQWMsb0RBQVU7QUFDeEIsZUFBZSxvREFBVTtBQUN6QixlQUFlLG9EQUFVO0FBQ3pCLGVBQWUsb0RBQVU7QUFDekIsZUFBZSxvREFBVTtBQUN6QixpREFBTzs7QUFFUCxpREFBTztBQUNQLFlBQVksMERBQW9COztBQUVoQyxpREFBTzs7QUFFUCx5Q0FBSTs7Ozs7QUFLSiwyQ0FBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9NYW5hZ2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlUHJvamVjdCwgYWRkVGFza30gZnJvbSAnLi9Qcm9qZWN0JztcblxubGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIG5ld1Byb2plY3QoKSB7XG4gIGxldCBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdCgpO1xuICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuXG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5mdW5jdGlvbiBpdGVyYXRlKGZ1bikge1xuICBwcm9qZWN0cy5mb3JFYWNoKGZ1bik7XG59XG5cblxuZXhwb3J0IHtwcm9qZWN0cywgbmV3UHJvamVjdCwgaXRlcmF0ZX07IiwiaW1wb3J0IHRhc2tGYWN0b3J5IGZyb20gJy4vVGFzayc7XG5pbXBvcnQgeyBnZW5lcmF0ZUlkIH0gZnJvbSAnLi9oZWxwZXInO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vTWFuYWdlcic7XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QoKSB7XG4gIGxldCB0aXRsZSA9ICdQUk9KRUNUIFRJVExFJztcbiAgbGV0IHRhc2tzID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgdGl0bGUoKSB7XG4gICAgICByZXR1cm4gdGl0bGU7XG4gICAgfSxcblxuICAgIHNldCB0aXRsZSh2YWx1ZSkge1xuICAgICAgdGl0bGUgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgZ2V0IHRhc2tzKCkge1xuICAgICAgcmV0dXJuIHRhc2tzO1xuICAgIH0sXG5cbiAgICBhZGQ6IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgIH0sXG5cbiAgICByZW1vdmU6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBhZGRUYXNrKHByb2plY3QsIHRhc2spIHtcbiAgcHJvamVjdC5hZGQodGFzayk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRhc2socHJvamVjdCwgdGFzaykge1xuICBsZXQgaW5kZXggPSBsb2NhdGVJbmRleChwcm9qZWN0LCB0YXNrKTtcbiAgcHJvamVjdC5yZW1vdmUoaW5kZXgpO1xufVxuXG5mdW5jdGlvbiBlZGl0VGFzayhwcm9qZWN0LCB0YXNrKSB7fVxuXG5mdW5jdGlvbiBsb2NhdGVJbmRleChwcm9qZWN0LCB0YXNrKSB7XG4gIGNvbnN0IGluZGV4ID0gcHJvamVjdC50YXNrcy5pbmRleE9mKHRhc2spO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0LCBhZGRUYXNrLCByZW1vdmVUYXNrfTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgeyAgXG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZSxcbiAgICBwcmlvcml0eSxcbiAgfTtcbn1cbiIsImxldCBpZCA9IDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSWQoKSB7XG4gICAgaWQgPSBpZCArIDE7XG4gICAgcmV0dXJuIGlkO1xufVxuXG5leHBvcnQge2dlbmVyYXRlSWR9OyIsImltcG9ydCB7IGl0ZXJhdGUsIHByb2plY3RzIGFzIHByb2plY3RzQXJyYXkgfSBmcm9tICcuL01hbmFnZXInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoY29udGVudCk7XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG5jb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZVByb2plY3RzKCkpO1xufVxuXG5cbi8vYXIgZ2VyaWF1IHByb2plY3RHZW5lcmF0b3IgaW5qZWN0aW50IHNpdGFpcCwgYXIgdGllc2lvZyBwYWNhbGxpbnQgcHJvamVjdEdlbmVyYXRvcigpIG1ldGhvZG8gdmlkdWosIHB2ei4gcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0R2VuZXJhdG9yKCkpPyBqZWkgaW5qZWN0aW51LCBjcmVhdGVQcm9qZWN0cyB0YW1wYSBkYXVnaWF1IGxvb3NlbHkgY291cGxlZCBudW8gcHJvamVjdEdlbmVyYXRvcj8gSXMga2l0b3MgcHVzZXMsIHZpcyB0aWVrIGNhbGxpbmRhbWFzIGNyZWF0ZVByb2plY3RzIHR1cmVzaXUgbm9yb2R5dCBwcm9qZWN0R2VuZXJhdG9yIGthaXAgYXJndW1lbnQsIGJldCBjaWEgZ2F1bmFzaSwga2FkIGNyZWF0ZVByb2plY3RzIHBhbmF1ZG9qaW1hcyB0YW1wYSB1bml2ZXJzYWxlc25pcywgbmVzIGdhbGl1IGluamVjdGludCBrYSBub3JpdT9cbi8vaXIgZGFyLCBjcmVhdGVQcm9qZWN0cyBpciBwcm9qZWN0c0FycmF5IHNpdW8gYXR2ZWp1IHlyYSB0aWdodGx5IGNvdXBsZWQ/IGlyZ2kgcmVpa3R1IGluamVjdGludD8gYXIgaW1wb3J0aW5pbWFzIG1vZHVseSBqYXUgc2thaXRvc2kga2FpcCBpbmplY3RpbmltYXM/XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RzKCkge1xuICBjb25zdCBwcm9qZWN0c0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvamVjdHNFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XG5cbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgbGV0IHByb2plY3RFbGVtZW50ID0gcHJvamVjdEdlbmVyYXRvcigpO1xuXG4gICAgZ2VuZXJhdGVUZXh0KHByb2plY3QsIHByb2plY3RFbGVtZW50KTtcblxuICAgIGxldCB0YXNrc0VsZW1lbnQgPSBjcmVhdGVUYXNrcyhwcm9qZWN0KTtcblxuICAgIHByb2plY3RFbGVtZW50LmFwcGVuZCh0YXNrc0VsZW1lbnQpO1xuICAgIHByb2plY3RzRWxlbWVudC5hcHBlbmQocHJvamVjdEVsZW1lbnQpO1xuXG4gICAgbWFrZUVkaXRhYmxlKHByb2plY3QsIHByb2plY3RFbGVtZW50KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb2plY3RzRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gcHJvamVjdEdlbmVyYXRvcigpIHtcbiAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuXG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10aXRsZScpO1xuXG4gIHByb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG5cbiAgcmV0dXJuIHByb2plY3RFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrcyhwcm9qZWN0KSB7XG4gIGNvbnNvbGUubG9nKHByb2plY3QpO1xuICBjb25zdCB0YXNrTGlzdCA9IHByb2plY3QudGFza3M7XG5cbiAgY29uc3QgdGFza3NFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRhc2tzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0YXNrcycpO1xuXG4gIHRhc2tMaXN0LmZvckVhY2goKHRhc2spID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IHRhc2tHZW5lcmF0b3IodGFzayk7XG4gICAgZ2VuZXJhdGVUZXh0KHRhc2ssIGVsZW1lbnQpO1xuICAgIHRhc2tzRWxlbWVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgbWFrZUVkaXRhYmxlKHRhc2ssIGVsZW1lbnQpO1xuICB9KTtcblxuICByZXR1cm4gdGFza3NFbGVtZW50O1xufVxuXG5mdW5jdGlvbiB0YXNrR2VuZXJhdG9yKHRhc2spIHtcbiAgY29uc3QgdGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGFzaycpO1xuXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcblxuICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcbiAgICB0YXNrLnRpdGxlID0gdGl0bGUudGV4dENvbnRlbnQ7XG4gICAgY29uc29sZS5sb2codGFzay50aXRsZSk7XG4gIH0pO1xuXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rlc2NyaXB0aW9uJyk7XG5cbiAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKTtcblxuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlLWRhdGUnKTtcblxuICB0YXNrRWxlbWVudC5hcHBlbmQodGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSk7XG5cbiAgcmV0dXJuIHRhc2tFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBtYWtlRWRpdGFibGUob2JqZWN0LCBlbGVtZW50KSB7XG4gIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gY29uZmlnLmVkaXRhYmxlcykge1xuICAgICAgaWYgKGl0ZW0gPT09IGNoaWxkLmNsYXNzTGlzdFswXSkge1xuICAgICAgICBjaGlsZC5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuXG4gICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xuICAgICAgICAgIG9iamVjdC50aXRsZSA9IGNoaWxkLnRleHRDb250ZW50O1xuICAgICAgICAgIGNvbnNvbGUubG9nKG9iamVjdC50aXRsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGV4dChvYmplY3QsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgZm9yIChsZXQgaXRlbSBpbiBjb25maWcudGV4dCkge1xuICAgICAgaWYgKGl0ZW0gPT09IGNoaWxkLmNsYXNzTGlzdFswXSkge1xuICAgICAgICBjaGlsZC50ZXh0Q29udGVudCA9IG9iamVjdFtjb25maWcudGV4dFtpdGVtXV07XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHt9XG5cbmV4cG9ydCB7IG1haW4sIHVwZGF0ZSB9O1xuIiwibGV0IGNvbmZpZyA9IHtcbiAgdGV4dDoge1xuICAgICdwcm9qZWN0LXRpdGxlJzogJ3RpdGxlJyxcbiAgICAndGFzay10aXRsZSc6ICd0aXRsZScsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ2Rlc2NyaXB0aW9uJyxcbiAgICAncHJpb3JpdHknOiAncHJpb3JpdHknLFxuICAgICdkdWUtZGF0ZSc6ICdkdWVEYXRlJyxcbiAgfSxcbiAgZWRpdGFibGVzOiB7XG4gICAgJ3Byb2plY3QtdGl0bGUnOiAndGl0bGUnLFxuICAgICd0YXNrLXRpdGxlJzogJ3RpdGxlJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnZGVzY3JpcHRpb24nLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge25ld1Byb2plY3QsIHByb2plY3RzfSBmcm9tICcuL01hbmFnZXInO1xuaW1wb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzayB9IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgY3JlYXRlVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHsgbWFpbiwgdXBkYXRlIH0gZnJvbSAnLi9VSSc7XG5pbXBvcnQgY3NzIGZyb20gJy4vc3R5bGUuY3NzJztcblxubGV0IHRhc2sgPSBjcmVhdGVUYXNrKCdhJywgJ2YnLCAnYicsICdjJyk7XG5sZXQgcHJvamVjdCA9IG5ld1Byb2plY3QoKTtcbmxldCBwcm9qZWN0MiA9IG5ld1Byb2plY3QoKTtcbmxldCBwcm9qZWN0MyA9IG5ld1Byb2plY3QoKTtcbmxldCBwcm9qZWN0NCA9IG5ld1Byb2plY3QoKTtcbmxldCBwcm9qZWN0NSA9IG5ld1Byb2plY3QoKTtcbmFkZFRhc2socHJvamVjdCwgdGFzayk7XG5cbmFkZFRhc2socHJvamVjdDIsIHRhc2spO1xuY29uc29sZS5sb2cocHJvamVjdHNbMF0udGFza3NbMF0pO1xuXG5hZGRUYXNrKHByb2plY3QzLCB0YXNrKTtcblxubWFpbigpO1xuXG5cblxuXG51cGRhdGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==