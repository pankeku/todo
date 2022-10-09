/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNewTask": () => (/* binding */ addNewTask),
/* harmony export */   "done": () => (/* binding */ done),
/* harmony export */   "getDoneList": () => (/* binding */ getDoneList),
/* harmony export */   "getHomeProject": () => (/* binding */ getHomeProject),
/* harmony export */   "getProjectById": () => (/* binding */ getProjectById),
/* harmony export */   "getProjectIndex": () => (/* binding */ getProjectIndex),
/* harmony export */   "getProjectsTitles": () => (/* binding */ getProjectsAndTitles),
/* harmony export */   "getTaskById": () => (/* binding */ getTaskById),
/* harmony export */   "getUpdatedHomeProject": () => (/* binding */ getUpdatedHomeProject),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "moveTask": () => (/* binding */ moveTask),
/* harmony export */   "newProject": () => (/* binding */ newProject),
/* harmony export */   "projectExists": () => (/* binding */ projectExists),
/* harmony export */   "projects": () => (/* binding */ projects),
/* harmony export */   "removeProject": () => (/* binding */ removeProject),
/* harmony export */   "removeTask": () => (/* binding */ removeTask),
/* harmony export */   "runAndUpdate": () => (/* binding */ runAndUpdate),
/* harmony export */   "toggleTaskCompletion": () => (/* binding */ toggleTaskCompletion),
/* harmony export */   "updateTasks": () => (/* binding */ updateTasks)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39);
/* harmony import */ var _ui_modules_content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41);
/* harmony import */ var _ui_modules_nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43);





 // COMMENT: unused function



let projects = [];
let allTasksProject;
let done;

function init() {
  (0,_helper__WEBPACK_IMPORTED_MODULE_1__.initDefaultTasks)();
  initDefaultProjects();
  (0,_UI__WEBPACK_IMPORTED_MODULE_5__.initUI)();
  updateTasks();
  (0,_UI__WEBPACK_IMPORTED_MODULE_5__.display)(allTasksProject);
}

// COMMENT: this is usually called as `fn` or `func`, not `fun` :D
function runAndUpdate(fun, ...args) {
  fun(...args);
  (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.updateLocalStorage)();
  (0,_ui_modules_nav__WEBPACK_IMPORTED_MODULE_7__.updateNav)();
  (0,_ui_modules_content__WEBPACK_IMPORTED_MODULE_6__.updateTasksElement)();
}

function toggleTaskCompletion(task) {
  if (task.completed) {
    // COMMENT: done is defined as `let done;`, which means, that done can be undefined. You should check if done is defined before using it.
    done.remove(getTaskIndex(task, done));
    task.completed = false;

    let project = getProjectById(task.project);

    project.add(task);

    return;
  }

  task.completed = true;
  done.add(task);
  removeTask(task.id);
}

function initDefaultProjects() {
  createDoneTasksProject();
  createAllTasksProject();
  projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProjectsFromStorage)(projects);
  done = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getDoneProjectFromStorage)(done);
}

function createAllTasksProject() {
  allTasksProject = newProject(_config__WEBPACK_IMPORTED_MODULE_0__.config.allProject.title);
  allTasksProject.id = _config__WEBPACK_IMPORTED_MODULE_0__.config.allProject.id;
}

function getHomeProject() {
  return allTasksProject;
}

function getUpdatedHomeProject() {
  updateTasks();
  return allTasksProject;
}

function updateTasks() {
  allTasksProject.tasks = allTasksProject.tasks.filter((task) => {
    const project = getProjectById(task.project);
    if (project) return project.title === allTasksProject.title;
    return false;
  });
  allTasksProject.tasks = allTasksProject.tasks.concat(getAllTasks());
}

function createDoneTasksProject() {
  done = (0,_Project__WEBPACK_IMPORTED_MODULE_3__.createProject)(_config__WEBPACK_IMPORTED_MODULE_0__.config.done.title);
  done.id = _config__WEBPACK_IMPORTED_MODULE_0__.config.done.id;
}

function getDoneList() {
  return done;
}

function addNewTask(projectId, title, description, dueDate, priority) {
  (0,_Project__WEBPACK_IMPORTED_MODULE_3__.addTask)(
    getProjectById(projectId),
    (0,_Task__WEBPACK_IMPORTED_MODULE_4__.createTask)(title, description, dueDate, priority)
  );
}

function removeTask(id) {
  // COMMENT: after this function is ended, task, project and index are gonna be destroyed. You should use const for them.
  let task = getTaskById(id);
  let project = getProjectById(task.project);
  let index = getTaskIndex(task, project);
  project.remove(index);
}

function moveTask(task, newProjectId) {
  const newProject = getProjectById(newProjectId);
  removeTask(task.id);
  (0,_Project__WEBPACK_IMPORTED_MODULE_3__.addTask)(newProject, task);
}

function newProject(title) {
  // COMMENT: use const, and re-review other places that uses let instead of const. You should use const as much as possible.
  let project = (0,_Project__WEBPACK_IMPORTED_MODULE_3__.createProject)(title);
  projects.push(project);

  return project;
}

function removeProject(id) {
  let project = getProjectById(id);
  let index = getProjectIndex(project);
  projects.splice(index, 1);
}

function getTaskById(id, project) {
  id = Number(id);

  if (project) {
    return project.tasks.find((task) => task.id == id);
  }

  // COMMENT: found is really abstract. You should use a more descriptive name.
  let found;
  projects
    .filter((project) => project.id !== -1)
    .forEach((project) => {
      // COMMENT: you can use `find` instead of `forEach` and `if` statement
      project.tasks.forEach((task) => {
        if (task.id === id) {
          found = task;
        }
      });
    });
  if (!found) {
    found = done.tasks.find((task) => task.id == id);
  }

  return found;
}

function getTaskIndex(task, project) {
  const index = project.tasks.findIndex((item) => item.id == task.id);

  if (index > -1) {
    return index;
  } else { // COMMENT: else is not needed here
    throw new Error(
      // COMMENT: use template literals instead of string concatenation
      "TASK IS NOT FOUND IN THE PROJECT - " +
        project.title +
        ", TASK INDEX IS -1"
    );
  }
}

// COMMENT: function name must be a verb
function projectExists(project) {
  // COMMENT: whole function could be `return getProjectById(project.id) !== undefined` or something like that
  const found = getProjectById(project.id);
  if (!found) {
    return false;
  }

  return true;
}

function getProjectById(id) {
  id = Number(id);

  if (id === -1) return getHomeProject();
  if (id === _config__WEBPACK_IMPORTED_MODULE_0__.config.done.id) return getDoneList();

  const project = projects.find((project) => project.id == id); // COMMENT: === instead of ==
  return project;
}

function getAllTasks() {
  let array = []; // COMMENT: use const
  projects
    .filter((project) => project.title !== allTasksProject.title)
    .forEach((project) => {
      array = array.concat(project.tasks);
    });
  return array;
}

function getProjectIndex(project) {
  let index = projects.indexOf(project);
  return index; // COMMENT: you can just `return projects.indexOf(project)`
}

function getProjectsAndTitles() {
  let titles = [];
  projects
    .filter((project) => project.id !== allTasksProject.id)
    // COMMENT: use map instead of forEach and new array and return the result.
    .forEach((project) => {
      const obj = {};
      obj[project.title] = project.id;
      titles.push(obj);
    });
  return titles;
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "priorityBorderColors": () => (/* binding */ priorityBorderColors),
/* harmony export */   "priorityColors": () => (/* binding */ priorityColors)
/* harmony export */ });
let config = {
    page: {
        title: 'Tasks',
    },
    allProject: {
      title: 'All tasks',
      id: -1
    }
    ,
    done: {
      title: 'Completed tasks',
      id: -2,
    },
    priorities: ["P1", "P2", "P3", "P4"],
};


const priorityColors = {'P1' : '--p1-color',
'P2' : '--p2-color',
'P3' : '--p3-color',
'P4' : '--p4-color'};

const priorityBorderColors =
{'P1' : '--p1-border-color',
'P2' : '--p2-border-color',
'P3' : '--p3-border-color',
'P4' : '--p4-border-color'};




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dueDateChecker": () => (/* binding */ dueDateChecker),
/* harmony export */   "initDefaultTasks": () => (/* binding */ initDefaultTasks)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(38);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);





function dueDateChecker(date) {
  date = (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(date);

  if (date == "Invalid Date") return;
  let result = (0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(date);

  let status = (0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])(date, new Date())
    ? `${result} overdue`
    : `due in ${result}`;

  return status;
}

function initDefaultTasks() {
  let project = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)("Life");
  let project2 = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)("Work");
  let project5 = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)("Ideas");
  let project3 = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.newProject)("Other");

  (0,_Project__WEBPACK_IMPORTED_MODULE_1__.addTask)(
    project,
    (0,_Task__WEBPACK_IMPORTED_MODULE_2__.createTask)("Take out the trash", "somewhere!", "2022-09-23", "P1")
  );
  (0,_Project__WEBPACK_IMPORTED_MODULE_1__.addTask)(project, (0,_Task__WEBPACK_IMPORTED_MODULE_2__.createTask)("Clean all windows", "yeah", "2022-12-24", "P1"));

  (0,_Project__WEBPACK_IMPORTED_MODULE_1__.addTask)(
    project2,
    (0,_Task__WEBPACK_IMPORTED_MODULE_2__.createTask)("Write a letter", "Send it to bob@bob.bob", "2022-11-28", "P4")
  );

  (0,_Project__WEBPACK_IMPORTED_MODULE_1__.addTask)(
    project3,
    (0,_Task__WEBPACK_IMPORTED_MODULE_2__.createTask)("Look at the trees", "It should be nice", "2022-09-25", "P2")
  );
}





/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "number": () => (/* binding */ number)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


let number = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProjectNumber)();

function createProject(name = 'Project title') {
  let title = name;
  let id = number++;
  let tasks = [];

  return {
    title: title,
    id: id,
    tasks: tasks,
    add: function (task) {
      tasks.push(task);
    },
    remove: function (index) {
      if (index > -1) {
        return tasks.splice(index, 1);
      }
    }
  };
}


function addTask(project, task) {
  task.project = project.id;
  project.add(task);
}




/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDoneProjectFromStorage": () => (/* binding */ getDoneProjectFromStorage),
/* harmony export */   "getProjectNumber": () => (/* binding */ getProjectNumber),
/* harmony export */   "getProjectsFromStorage": () => (/* binding */ getProjectsFromStorage),
/* harmony export */   "getTaskNumber": () => (/* binding */ getTaskNumber),
/* harmony export */   "updateLocalStorage": () => (/* binding */ updateLocalStorage)
/* harmony export */ });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




function updateLocalStorage() {
   console.warn('UPDATING LOCAL STORAGE');
  localStorage.setItem("projects", JSON.stringify(_Manager__WEBPACK_IMPORTED_MODULE_0__.projects));
  localStorage.setItem("done", JSON.stringify(_Manager__WEBPACK_IMPORTED_MODULE_0__.done));
  localStorage.setItem("taskNumber", _Task__WEBPACK_IMPORTED_MODULE_2__.number);
  localStorage.setItem("projectNumber", _Project__WEBPACK_IMPORTED_MODULE_1__.number); 
}

function getTaskNumber() {
 return getNumber("taskNumber");
}

function getProjectNumber() {
 return getNumber("projectNumber");
}

function getNumber(key) {

  if (!localStorage.getItem(key)) {
    return 1;
  }

  return localStorage.getItem(key);
}

function getDoneProjectFromStorage(done) {
  if (localStorage.getItem("done")) {
    const stored = JSON.parse(localStorage.getItem("done"));

    readdMethods(stored);

    return stored;
  }

  return done;
}

function getProjectsFromStorage(projects) {
  if (localStorage.getItem("projects")) {
    const stored = JSON.parse(localStorage.getItem("projects"));

    stored.forEach((project) => {
      readdMethods(project);
    });

    return stored;
  }

  return projects;
}

function readdMethods(project) {
  project.add = function (task) {
    project.tasks.push(task);
  };

  project.remove = function (index) {
    if (index > -1) {
      return project.tasks.splice(index, 1);
    }
  };
}




/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTask": () => (/* binding */ createTask),
/* harmony export */   "number": () => (/* binding */ number)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


let number = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getTaskNumber)();

function createTask(title, description, dueDate, priority) {
  let project;
  let id = number++;

  return {
    title: title,
    completed: false,
    description: description,
    dueDate: dueDate,
    priority: priority,
    project: project,
    id: id,
  };
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseISO)
/* harmony export */ });
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, options) {
  var _options$additionalDi;

  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var additionalDigits = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])((_options$additionalDi = options === null || options === void 0 ? void 0 : options.additionalDigits) !== null && _options$additionalDi !== void 0 ? _options$additionalDi : 2);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time)) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.

    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }

  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString; // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].

  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: NaN,
    restDateString: ''
  };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null; // either year or century is null, not both

  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInHour + minutes * _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "daysInWeek": () => (/* binding */ daysInWeek),
/* harmony export */   "daysInYear": () => (/* binding */ daysInYear),
/* harmony export */   "maxTime": () => (/* binding */ maxTime),
/* harmony export */   "millisecondsInHour": () => (/* binding */ millisecondsInHour),
/* harmony export */   "millisecondsInMinute": () => (/* binding */ millisecondsInMinute),
/* harmony export */   "millisecondsInSecond": () => (/* binding */ millisecondsInSecond),
/* harmony export */   "minTime": () => (/* binding */ minTime),
/* harmony export */   "minutesInHour": () => (/* binding */ minutesInHour),
/* harmony export */   "monthsInQuarter": () => (/* binding */ monthsInQuarter),
/* harmony export */   "monthsInYear": () => (/* binding */ monthsInYear),
/* harmony export */   "quartersInYear": () => (/* binding */ quartersInYear),
/* harmony export */   "secondsInDay": () => (/* binding */ secondsInDay),
/* harmony export */   "secondsInHour": () => (/* binding */ secondsInHour),
/* harmony export */   "secondsInMinute": () => (/* binding */ secondsInMinute),
/* harmony export */   "secondsInMonth": () => (/* binding */ secondsInMonth),
/* harmony export */   "secondsInQuarter": () => (/* binding */ secondsInQuarter),
/* harmony export */   "secondsInWeek": () => (/* binding */ secondsInWeek),
/* harmony export */   "secondsInYear": () => (/* binding */ secondsInYear)
/* harmony export */ });
/**
 * Days in 1 week.
 *
 * @name daysInWeek
 * @constant
 * @type {number}
 * @default
 */
var daysInWeek = 7;
/**
 * Days in 1 year
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 *
 * @name daysInYear
 * @constant
 * @type {number}
 * @default
 */

var daysInYear = 365.2425;
/**
 * Maximum allowed time.
 *
 * @name maxTime
 * @constant
 * @type {number}
 * @default
 */

var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;
/**
 * Milliseconds in 1 minute
 *
 * @name millisecondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInMinute = 60000;
/**
 * Milliseconds in 1 hour
 *
 * @name millisecondsInHour
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInHour = 3600000;
/**
 * Milliseconds in 1 second
 *
 * @name millisecondsInSecond
 * @constant
 * @type {number}
 * @default
 */

var millisecondsInSecond = 1000;
/**
 * Minimum allowed time.
 *
 * @name minTime
 * @constant
 * @type {number}
 * @default
 */

var minTime = -maxTime;
/**
 * Minutes in 1 hour
 *
 * @name minutesInHour
 * @constant
 * @type {number}
 * @default
 */

var minutesInHour = 60;
/**
 * Months in 1 quarter
 *
 * @name monthsInQuarter
 * @constant
 * @type {number}
 * @default
 */

var monthsInQuarter = 3;
/**
 * Months in 1 year
 *
 * @name monthsInYear
 * @constant
 * @type {number}
 * @default
 */

var monthsInYear = 12;
/**
 * Quarters in 1 year
 *
 * @name quartersInYear
 * @constant
 * @type {number}
 * @default
 */

var quartersInYear = 4;
/**
 * Seconds in 1 hour
 *
 * @name secondsInHour
 * @constant
 * @type {number}
 * @default
 */

var secondsInHour = 3600;
/**
 * Seconds in 1 minute
 *
 * @name secondsInMinute
 * @constant
 * @type {number}
 * @default
 */

var secondsInMinute = 60;
/**
 * Seconds in 1 day
 *
 * @name secondsInDay
 * @constant
 * @type {number}
 * @default
 */

var secondsInDay = secondsInHour * 24;
/**
 * Seconds in 1 week
 *
 * @name secondsInWeek
 * @constant
 * @type {number}
 * @default
 */

var secondsInWeek = secondsInDay * 7;
/**
 * Seconds in 1 year
 *
 * @name secondsInYear
 * @constant
 * @type {number}
 * @default
 */

var secondsInYear = secondsInDay * daysInYear;
/**
 * Seconds in 1 month
 *
 * @name secondsInMonth
 * @constant
 * @type {number}
 * @default
 */

var secondsInMonth = secondsInYear / 12;
/**
 * Seconds in 1 quarter
 *
 * @name secondsInQuarter
 * @constant
 * @type {number}
 * @default
 */

var secondsInQuarter = secondsInMonth * 3;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDistanceToNow)
/* harmony export */ });
/* harmony import */ var _formatDistance_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);



/**
 * @name formatDistanceToNow
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result specifies if now is earlier or later than the passed date
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function formatDistanceToNow(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now(), options);
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDistance)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _compareAsc_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _differenceInMonths_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33);
/* harmony import */ var _differenceInSeconds_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29);
/* harmony import */ var _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _lib_assign_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(32);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);










var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */

function formatDistance(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale;

  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__["default"];

  if (!locale.formatDistance) {
    throw new RangeError('locale must contain formatDistance property');
  }

  var comparison = (0,_compareAsc_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate, dirtyBaseDate);

  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }

  var localizeOptions = (0,_lib_assign_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(options), {
    addSuffix: Boolean(options === null || options === void 0 ? void 0 : options.addSuffix),
    comparison: comparison
  });
  var dateLeft;
  var dateRight;

  if (comparison > 0) {
    dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyBaseDate);
    dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyDate);
  } else {
    dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyDate);
    dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyBaseDate);
  }

  var seconds = (0,_differenceInSeconds_index_js__WEBPACK_IMPORTED_MODULE_7__["default"])(dateRight, dateLeft);
  var offsetInSeconds = ((0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_8__["default"])(dateRight) - (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_8__["default"])(dateLeft)) / 1000;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months; // 0 up to 2 mins

  if (minutes < 2) {
    if (options !== null && options !== void 0 && options.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance('lessThanXSeconds', 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance('lessThanXSeconds', 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance('lessThanXSeconds', 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance('halfAMinute', 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale.formatDistance('xMinutes', 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale.formatDistance('xMinutes', minutes, localizeOptions);
      }
    } // 2 mins up to 0.75 hrs

  } else if (minutes < 45) {
    return locale.formatDistance('xMinutes', minutes, localizeOptions); // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return locale.formatDistance('aboutXHours', 1, localizeOptions); // 1.5 hrs up to 24 hrs
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale.formatDistance('aboutXHours', hours, localizeOptions); // 1 day up to 1.75 days
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale.formatDistance('xDays', 1, localizeOptions); // 1.75 days up to 30 days
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return locale.formatDistance('xDays', days, localizeOptions); // 1 month up to 2 months
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance('aboutXMonths', months, localizeOptions);
  }

  months = (0,_differenceInMonths_index_js__WEBPACK_IMPORTED_MODULE_9__["default"])(dateRight, dateLeft); // 2 months up to 12 months

  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance('xMonths', nearestMonth, localizeOptions); // 1 year up to max Date
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12); // N years up to 1 years 3 months

    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance('aboutXYears', years, localizeOptions); // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance('overXYears', years, localizeOptions); // N years 9 months up to N year 12 months
    } else {
      return locale.formatDistance('almostXYears', years + 1, localizeOptions);
    }
  }
}

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDefaultOptions": () => (/* binding */ getDefaultOptions),
/* harmony export */   "setDefaultOptions": () => (/* binding */ setDefaultOptions)
/* harmony export */ });
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);






/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDistance);

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatLong);

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};

var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatRelative);

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};

var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';

      case 2:
        return number + 'nd';

      case 3:
        return number + 'rd';
    }
  }

  return number + 'th';
};

var localize = {
  ordinalNumber: ordinalNumber,
  era: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
function buildLocalizeFn(args) {
  return function (dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!

    return valuesArray[index];
  };
}

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);


var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function valueCallback(index) {
      return index + 1;
    }
  }),
  month: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }

  return undefined;
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }

  return undefined;
}

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compareAsc)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */

function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ assign)
/* harmony export */ });
function assign(target, object) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }

  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      ;
      target[property] = object[property];
    }
  }

  return target;
}

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cloneObject)
/* harmony export */ });
/* harmony import */ var _assign_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);

function cloneObject(object) {
  return (0,_assign_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, object);
}

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInSeconds)
/* harmony export */ });
/* harmony import */ var _differenceInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _lib_roundingMethods_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);



/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
 * @returns {Number} the number of seconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */

function differenceInSeconds(dateLeft, dateRight, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var diff = (0,_differenceInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dateLeft, dateRight) / 1000;
  return (0,_lib_roundingMethods_index_js__WEBPACK_IMPORTED_MODULE_2__.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInMilliseconds)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */

function differenceInMilliseconds(dateLeft, dateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  return (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dateLeft).getTime() - (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dateRight).getTime();
}

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRoundingMethod": () => (/* binding */ getRoundingMethod)
/* harmony export */ });
var roundingMap = {
  ceil: Math.ceil,
  round: Math.round,
  floor: Math.floor,
  trunc: function trunc(value) {
    return value < 0 ? Math.ceil(value) : Math.floor(value);
  } // Math.trunc is not supported by IE

};
var defaultRoundingMethod = 'trunc';
function getRoundingMethod(method) {
  return method ? roundingMap[method] : roundingMap[defaultRoundingMethod];
}

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInMonths)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _differenceInCalendarMonths_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var _compareAsc_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _isLastDayOfMonth_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35);





/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates using trunc as a default rounding method.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */

function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var sign = (0,_compareAsc_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dateLeft, dateRight);
  var difference = Math.abs((0,_differenceInCalendarMonths_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dateLeft, dateRight));
  var result; // Check for the difference of less than month

  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      // This will check if the date is end of Feb and assign a higher end of month date
      // to compare it with Jan
      dateLeft.setDate(30);
    }

    dateLeft.setMonth(dateLeft.getMonth() - sign * difference); // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value

    var isLastMonthNotFull = (0,_compareAsc_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dateLeft, dateRight) === -sign; // Check for cases of one full calendar month

    if ((0,_isLastDayOfMonth_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft)) && difference === 1 && (0,_compareAsc_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }

    result = sign * (difference - Number(isLastMonthNotFull));
  } // Prevent negative zero


  return result === 0 ? 0 : result;
}

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInCalendarMonths)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */

function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLastDayOfMonth)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _endOfDay_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var _endOfMonth_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);




/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */

function isLastDayOfMonth(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  return (0,_endOfDay_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date).getTime() === (0,_endOfMonth_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date).getTime();
}

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */

function endOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endOfMonth)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */

function endOfMonth(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isBefore)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */

function isBefore(dirtyDate, dirtyDateToCompare) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var dateToCompare = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activeProject": () => (/* binding */ activeProject),
/* harmony export */   "createHtmlElement": () => (/* binding */ createHtmlElement),
/* harmony export */   "display": () => (/* binding */ display),
/* harmony export */   "initUI": () => (/* binding */ initUI),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _sorter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _ui_modules_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _ui_modules_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _ui_modules_nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);






let activeProject;

function initUI() {
  const header = (0,_ui_modules_header__WEBPACK_IMPORTED_MODULE_3__.render)();
  const nav = (0,_ui_modules_nav__WEBPACK_IMPORTED_MODULE_4__.render)();
  const content = (0,_ui_modules_content__WEBPACK_IMPORTED_MODULE_2__.render)();

  const mainContainer = createHtmlElement("div", null, ["main-container"], null);
  document.body.appendChild(mainContainer);

  const container = createHtmlElement("div", null, ["container"], null);
  mainContainer.append(header, container);


  container.append(nav);
  container.append(content);
}

function display(project) {
  if (!(0,_Manager__WEBPACK_IMPORTED_MODULE_0__.projectExists)(project) || project.id == -1) {
    project = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.getUpdatedHomeProject)();
  }

  activeProject = project;

  (0,_sorter__WEBPACK_IMPORTED_MODULE_1__.sorter)(project);

  fadeDisplay(_ui_modules_content__WEBPACK_IMPORTED_MODULE_2__.displayProject, project);
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




/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activeSortOption": () => (/* binding */ activeSortOption),
/* harmony export */   "activeSortOrder": () => (/* binding */ activeSortOrder),
/* harmony export */   "changeSortCriteria": () => (/* binding */ changeSortCriteria),
/* harmony export */   "changeSortOrder": () => (/* binding */ changeSortOrder),
/* harmony export */   "sortOptions": () => (/* binding */ sortOptions),
/* harmony export */   "sorter": () => (/* binding */ sorter)
/* harmony export */ });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
      titleA = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.getProjectById)(a.project).title.toUpperCase();
      titleB = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.getProjectById)(b.project).title.toUpperCase();
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




/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayProject": () => (/* binding */ displayProject),
/* harmony export */   "generateExpandedTaskElement": () => (/* binding */ generateExpandedTaskElement),
/* harmony export */   "generateNewTaskBar": () => (/* binding */ generateNewTaskBar),
/* harmony export */   "generateProjectSelectElement": () => (/* binding */ generateProjectSelectElement),
/* harmony export */   "generateTaskDateElements": () => (/* binding */ generateTaskDateElements),
/* harmony export */   "generateTaskElement": () => (/* binding */ generateTaskElement),
/* harmony export */   "generateTaskPriorityElements": () => (/* binding */ generateTaskPriorityElements),
/* harmony export */   "generateTaskWithInput": () => (/* binding */ generateTaskWithInput),
/* harmony export */   "generateTasks": () => (/* binding */ generateTasks),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "setCheckBoxColor": () => (/* binding */ setCheckBoxColor),
/* harmony export */   "setCheckBoxOutlineColor": () => (/* binding */ setCheckBoxOutlineColor),
/* harmony export */   "updateTasksElement": () => (/* binding */ updateTasksElement)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _sorter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39);






const content = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["content"], null);

function render() {
  return content;
}

function displayProject(project) {
  clearContentElement();
  renderProject(project);
}

function renderProject(project) {
  const projectEl = generateProjectElement(project);

  if (!(project.id == _config__WEBPACK_IMPORTED_MODULE_0__.config.done.id)) projectEl.append(generateNewTaskBar());

  projectEl.append(generateTasksSorterElement(), generateTasks(project));

  content.append(projectEl);
}

function generateNewTaskBar() {
  const newTaskContainer = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    null,
    ["task-container"],
    null
  );

  const container = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    null,
    ["task-inside-container"],
    null
  );

  const textBar = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("input", null, ["text-bar"], null, [
    ["placeholder", "New todo..."],
  ]);

  newTaskContainer.append(container);
  container.appendChild(textBar);

  return newTaskContainer;
}

function generateProjectElement(project) {
  const projectElement = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    project.id,
    ["project"],
    null
  );

  const headerWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["project-header"]);

  const titleWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, [
    "project-title-wrapper",
  ]);

  const projectTitle = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    null,
    ["project-title"],
    project.title
  );
  titleWrapper.append(projectTitle);

  headerWrapper.append(titleWrapper);

  projectElement.appendChild(headerWrapper);

  // as paskaites apie single-responsibility ir dependency inversion, ir biski apie composition, vis galvoju,
  // kad tokius zemiau esancius metodus reiktu callint is isores, kad pvz. cia generateProjectElement()
  // nebutu priklausomas nuo situ dvieju metodu. Ideja tokia, kad tiems dviems metodams passinu projectElement,
  // kuri dabar generateProjectElement() returnina. Tada passintam parente pagal savo vidine logika jie susirastu
  // ko jiems reikia ir patys pridetu savo elementus. Arba vapse jiems nieko nepassinu, tada kai buna pacallinti,
  // jie susiranda parentElement per querySelector ir visi metodai gyvena sau atskirai ir laimingai.
  // bet tada atrodo daaaug daugiau kodo bus, ir, kas man atrodo svarbu, daug daugiau resursu isnaudota bus, nors as
  // srity performance vs maintanable and readable code nesigaudau :D ka manai?

  addProjectTitleEditElement(titleWrapper);
  addProjectRemoveElement(titleWrapper);

  return projectElement;
}

function addProjectTitleEditElement(titleElement) {
  if (
    titleElement.closest(".project").id == -1 ||
    titleElement.closest(".project").id == _config__WEBPACK_IMPORTED_MODULE_0__.config.done.id
  ) {
    return;
  }

  const titleEdit = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
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
    titleElement.closest(".project").id == _config__WEBPACK_IMPORTED_MODULE_0__.config.done.id
  ) {
    return;
  }

  const projectRemove = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["project-remove"], "");

  titleElement.appendChild(projectRemove);
}

function generateTasks(project) {
  const taskList = project.tasks;
  const tasksElement = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["tasks"]);

  taskList.forEach((task) => {
    let element = generateTaskElement(task);

    tasksElement.append(element);

    element.addEventListener("click", () => {});
  });

  return tasksElement;
}

function generateTaskElement(task) {
  const taskElement = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", task.id, ["task"], null);

  addCheckBox(task, taskElement);

  const title = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["task-title"], task.title);

  const dueStatus = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    null,
    ["due-status"],
    (0,_helper__WEBPACK_IMPORTED_MODULE_1__.dueDateChecker)(task.dueDate)
  );

  let assignedProject = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    null,
    ["assigned-project"],
    (0,_Manager__WEBPACK_IMPORTED_MODULE_2__.getProjectById)(task.project).title
  );

  const leftWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["task-content-wrapper"]);
  leftWrapper.append(title, dueStatus);

  taskElement.append(leftWrapper, assignedProject);

  addTaskActionsElement(taskElement);

  return taskElement;
}

function generateExpandedTaskElement(task) {
  const taskElement = generateTaskElement(task);
  const leftWrapper = taskElement.querySelector(".task-content-wrapper");
  leftWrapper.replaceChildren();

  const title = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["task-title"], task.title);

  const description = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    null,
    ["description"],
    task.description
  );

  const dateAndPriorityWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, [
    "task-properties-wrapper",
  ]);

  let projectSelector = generateProjectSelectElement();

  showAssignedProjectInSelector(projectSelector, task);

  dateAndPriorityWrapper.append(
    generateTaskDateElements(task),
    generateTaskPriorityElements(task),
    projectSelector
  );

  const textWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["input-text-wrapper"]);

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

  const newDate = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("input", "date", ["new-task-date"], "Date", [
    ["type", "text"],
    ["value", date],
    ["name", "date"],
    ["title", "Set due date"],
  ]);

  return newDate;
}

function generateTaskPrioritySelectorElement(taskPriority) {
  const priority = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "select",
    "priority-select",
    ["task-priority-reselector"],
    null,
    [
      ["name", "priority"],
      ["title", "Set priority"],
    ]
  );

  const priorities = _config__WEBPACK_IMPORTED_MODULE_0__.config.priorities;

  priorities.forEach((P) => {
    const option = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("option", null, null, P, [["value", P]]);

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
  element.style.backgroundColor = `var(${_config__WEBPACK_IMPORTED_MODULE_0__.priorityColors[task.priority]})`;
}

function setCheckBoxOutlineColor(element, task) {
  element.style.outlineColor = `var(${_config__WEBPACK_IMPORTED_MODULE_0__.priorityBorderColors[task.priority]})`;
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
  const projectSelectWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, [
    "project-select-wrapper",
  ]);

  const projectSelect = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "select",
    "project-select",
    ["project-select"],
    null,
    [
      ["name", "project-selector"],
      ["title", "Choose project"],
    ]
  );

  const projectSelectLabel = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
    "div",
    null,
    ["project-select-label"],
    null,
    [["for", projectSelect.id]]
  );

  (0,_Manager__WEBPACK_IMPORTED_MODULE_2__.getProjectsTitles)().forEach((item) => {
    for (let title in item) {
      const projectId = item[title];

      const option = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("option", projectId, null, title, [
        ["value", title],
      ]);

      if (projectId == _UI__WEBPACK_IMPORTED_MODULE_4__.activeProject.id) {
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

  const priorityWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["priority-wrapper"]);

  const newPriority = generateTaskPrioritySelectorElement(priority);
  newPriority.className = "new-task-priority";

  const priorityLabel = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)(
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

  const dateWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["task-date-wrapper"]);

  const date = createDateInputElement(dateSetting);

  const dateLabel = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["date-label"], "Due date", [
    ["for", date.id],
  ]);
  dateWrapper.append(dateLabel, date);

  return dateWrapper;
}

function generateTasksSorterElement() {
  const sorterWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, [
    "project-sorter-wrapper",
  ]);

  const sorter = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", "sorter", ["project-sorter"]);

  const wrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["sort-icons-wrapper"]);
  const sortArrow = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["sort-arrow"]);

  if (_sorter__WEBPACK_IMPORTED_MODULE_3__.activeSortOrder === "ascending") {
    sortArrow.classList.add("sort-arrow--up");
  }

  const sortLabel = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("label", null, ["sort-label"], null, [
    ["for", sorter.id],
  ]);

  wrapper.append(sortArrow, sortLabel);
  let options = _sorter__WEBPACK_IMPORTED_MODULE_3__.sortOptions;

  options = options.filter((item) => item !== _sorter__WEBPACK_IMPORTED_MODULE_3__.activeSortOption);
  options.unshift(_sorter__WEBPACK_IMPORTED_MODULE_3__.activeSortOption);

  options.forEach((option) => {
    const sortOption = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, ["sort-option"], option);
    if (option == _sorter__WEBPACK_IMPORTED_MODULE_3__.activeSortOption) sortOption.id = "selected";
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
  const checkbox = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("input", null, ["complete"], null, [
    ["type", "checkbox"],
  ]);

  setCheckBoxColor(checkbox, task);
  taskElement.append(checkbox);
  checkbox.checked = task.completed;
}

function addTaskActionsElement(element) {
  const actionsWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_4__.createHtmlElement)("div", null, [
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
    project = (0,_Manager__WEBPACK_IMPORTED_MODULE_2__.getUpdatedHomeProject)();
  } else {
    project = (0,_Manager__WEBPACK_IMPORTED_MODULE_2__.getProjectById)(projectId);
  }
   (0,_sorter__WEBPACK_IMPORTED_MODULE_3__.sorter)(project);
    const tasks = generateTasks(project);

  setTimeout(() => {
    oldTasks.replaceWith(tasks);
    tasks.classList.add("project--fading");
    setTimeout(() => {
      tasks.classList.remove("project--fading");
    }, 200);
  }, 100);

}





/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);



function render() {
  const header = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)('div', null, ['header'], null, null);

  const headerText = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)(
    'div',
    null,
    ['header-text'],
    _config__WEBPACK_IMPORTED_MODULE_0__.config.page.title,
    null
  );

  header.appendChild(headerText);

 return header;
}




/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "updateNav": () => (/* binding */ updateNav)
/* harmony export */ });
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);



const nav = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)('div', null, ['nav'], null, null);

function render() {
  nav.append(generateHomeItem(), generateNavItems(), addProjectButton(), generateDoneTasksProj());
  return nav;
}

function generateDoneTasksProj() {
  const doneProject = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.getDoneList)();
  const done = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)('div', doneProject.id, ['done-tasks'], 'Completed tasks', null);

  return done;
}

function generateHomeItem() {
  const homeProject = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.getHomeProject)();
  const home = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)('div', homeProject.id, ['nav-home'], 'Home', null);

  return home;

}

function generateNavItems() {
  let navItems = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)('div', null, ['nav-items'], null, null);
  let items = (0,_Manager__WEBPACK_IMPORTED_MODULE_0__.getProjectsTitles)();
  items.forEach((item) => {
    for (let key in item) {
      const element = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)('ul', item[key], ['nav-item'], key, null);
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
      (0,_UI__WEBPACK_IMPORTED_MODULE_1__.display)(object);
    });
  });
}

function addProjectButton() {
  const element = (0,_UI__WEBPACK_IMPORTED_MODULE_1__.createHtmlElement)(
    'div',
    null,
    ['project-add'],
    'Add Project',
    null
  );
  return element;
}




/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 45 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 46 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 47 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 49 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 50 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 51 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(55), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(56), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(57), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(58), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(59), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(60), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(61), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(62), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --p1-color: rgba(0, 128, 0, 0.3);\n  --p2-color: rgba(255, 255, 0, 0.3);\n  --p3-color: rgba(255, 165, 0, 0.3);\n  --p4-color: rgba(255, 69, 0, 0.3);\n  --p1-border-color: rgba(0, 128, 0, 0.8);\n  --p2-border-color: rgba(255, 255, 0, 0.8);\n  --p3-border-color: rgba(255, 165, 0, 0.8);\n  --p4-border-color: rgba(255, 69, 0, 0.8);\n  --check-icon: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  --edit-icon: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  --remove-icon: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n}\n\nbody {\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 300;\n  font-size: 18px;\n  margin: 0px;\n}\n.main-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.task-container {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.149);\n  border-radius: 5px;\n  padding: 10px;\n  width: 100%;\n  height: 40px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n\n.task-inside-container {\n  flex: 1;\n  display: flex;\n}\n\n.new-task-content-wrapper {\n  display: flex;\n  width: 80%;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.task-properties-wrapper {\n  padding: 5px;\n  display: flex;\n  flex-direction: row;\n  gap: 20px;\n}\n\n.task .task-properties-wrapper {\n  grid-column: 2;\n  grid-row: 3;\n}\n\n.new-task-footer {\n  display: flex;\n  align-items: center;\n}\n\n.task-properties-wrapper,\n.close-wrapper {\n  width: 50%;\n}\n\n.new-task-priority {\n  width: 40px;\n}\n\n.close-wrapper {\n  flex: 1;\n  display: flex;\n  justify-content: left;\n  margin: 2px;\n}\n\n.task-close {\n  font-size: 0.8rem;\n}\n\n.date-label {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n}\n\n.project-select-wrapper {\n  display: flex;\n}\n\n.project-select-label {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n}\n\n.text-bar {\n  font-weight: 700;\n  padding: 5px;\n  width: 100%;\n  border: 0px;\n}\n\n.new-description {\n  border: 0px;\n  padding: 5px;\n}\n\ninput:focus {\n  outline: 0px;\n}\n\n.task-container--expand {\n  height: 120px;\n}\n\n.container {\n  display: flex;\n}\n\n.content {\n  padding: 20px;\n  width: 100%;\n}\n\n.notes-container {\n  display: grid;\n  grid-template-columns: 1fr 10fr;\n}\n\n.nav {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-width: 150px;\n  height: 100vh;\n  background-color: white;\n  font-size: 0.9rem;\n  font-weight: 600;\n  padding-top: 20px;\n}\n\n.nav-home {\n  padding: 10px;\n  margin-bottom: 20px;\n  width: 100px;\n}\n\n.nav-items {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 0px;\n}\n\n.nav-item {\n  all: unset;\n  width: 100px;\n  padding: 10px;\n}\n\n.nav-item:hover {\n  color: green;\n}\n\n.project-add {\n  padding: 10px;\n  margin-top: 20px;\n  width: 100px;\n}\n\n.done-tasks {\n  padding: 10px;\n  margin-top: 20px;\n  width: 100px;\n}\n\n.tasks {\n  opacity: 1;\n  transition: opacity 0.3s;\n}\n\n.header {\n  height: 40px;\n  background-color: black;\n  display: flex;\n  justify-content: left;\n  align-items: center;\n}\n\n.header-text {\n  margin-left: 20px;\n  color: white;\n}\n\n.projects {\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 1fr;\n}\n\n.project {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  opacity: 1;\n  transition: opacity 0.1s;\n}\n\n.project--fading {\n  opacity: 0;\n}\n\n.project-header {\n  display: flex;\n}\n\n.project-title-wrapper {\n  display: flex;\n  gap: 5px;\n  width: 50%;\n}\n\n.project-sorter-wrapper {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n  width: 100%;\n  margin-top: 20px;\n}\n\n.sort-icons-wrapper {\n  display: flex;\n}\n\n.sort-arrow {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  width: 15px;\n  height: 15px;\n  cursor: pointer;\n}\n\n.sort-arrow--up {\n  transform: rotate(180deg);\n}\n\n.sort-label {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n  width: 20px;\n  height: 20px;\n}\n\n.project-sorter {\n  overflow: hidden;\n  display: flex;\n  gap: 20px;\n  transition: all 0.1s;\n}\n\n.project-sorter:hover {\n  gap: 5px;\n}\n\n#selected {\n  display: block;\n  font-size: 0.7rem;\n  text-transform: uppercase;\n}\n\n.sort-option {\n  font-size: 0.7rem;\n  cursor: pointer;\n  display: none;\n  text-transform: uppercase;\n}\n\n.sort-option:hover {\n  font-weight: 700;\n  text-decoration: underline;\n}\n\n.project-sorter:hover .sort-option {\n  display: flex;\n}\n\n.project-sorter:hover #selected {\n  font-weight: 700;\n}\n\n.project-title {\n  font-size: 1.3rem;\n  font-weight: 700;\n  height: 30px;\n}\n\n.project-title-edit,\n.project-remove {\n  display: none;\n  width: 15px;\n  height: 15px;\n}\n\n.project-title-edit {\n  content: var(--edit-icon);\n}\n\n.project-remove {\n  content: var(--remove-icon);\n}\n\n.project-title-wrapper:hover :is(.project-title-edit, .project-remove) {\n  display: block;\n}\n\n.editing {\n  padding: 10px;\n}\n\n.task {\n  display: grid;\n  grid-template-columns: 30px 1fr 1fr 1fr;\n  grid-template-rows: 1fr 1fr;\n  padding: 10px;\n}\n\n.task--expanded {\n  grid-template-rows: 1fr 0.5fr 0.5fr;\n  grid-template-columns: 30px 1fr 1fr 150px;\n}\n\n.task:hover {\n  outline: 1px solid rgba(0, 128, 0, 0.1);\n}\n\n.save {\n  align-self: center;\n  justify-self: right;\n  font-size: 0.8rem;\n  grid-column: 3;\n  grid-row: 3;\n}\n\ninput[type=\"checkbox\"] {\n  appearance: none;\n  grid-row: span 2;\n  align-self: center;\n  /* background-color:rgba(255,0, 0, 0.4); */\n  margin: 0;\n  font: inherit;\n  color: white;\n  width: 1.15em;\n  height: 1.15em;\n  border-radius: 50px;\n  display: grid;\n  transition: outline 50ms 50ms ease-in-out;\n}\n\n.task:hover input[type=\"checkbox\"] {\n  outline: 0.15em solid;\n}\n\ninput[type=\"checkbox\"]:hover {\n  background-image: var(--check-icon);\n}\n\ninput[type=\"checkbox\"]:checked {\n  background-image: var(--check-icon);\n}\n\nselect {\n  outline: 0px;\n  border: 0px;\n  background-color: white;\n}\n\nselect:hover {\n  border: 1px solid black;\n  font-weight: 700;\n}\n\n.task-date-wrapper {\n  display: flex;\n  gap: 5px;\n}\n\n.new-task-date {\n  border: 0px;\n  width: 70px;\n  text-align: center;\n}\n\n.new-task-date:hover {\n  font-weight: 700;\n}\n\n.priority-wrapper {\n  display: flex;\n}\n\n.priority {\n  font-size: 0.9rem;\n}\n\n.priority-label {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\n}\n\n.date-priority-wrapper {\n  grid-column: 2;\n  grid-row: 3;\n  display: flex;\n  padding-left: 15px;\n  padding-top: 5px;\n}\n\n.task-actions-wrapper {\n  display: flex;\n  gap: 5px;\n\n  justify-self: end;\n  grid-column: 4;\n}\n\n.edit,\n.remove {\n  display: none;\n  font-size: 0.9rem;\n}\n\n.edit {\n  content: var(--edit-icon);\n  width: 25px;\n  height: 25px;\n}\n\n.remove {\n  content: var(--remove-icon);\n  width: 25px;\n  height: 25px;\n}\n\n.task-content-wrapper {\n  grid-row: span 2;\n  grid-column: span 2;\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n  background-color: white;\n  gap: 5px;\n}\n\n.input-text-wrapper {\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 5px;\n  gap: 5px;\n}\n\n\n.task-content-wrapper{\npointer-events: none;\n}\n\n.task-edit {\n  pointer-events:all;\n}\n\n\n\n\n.input-text-wrapper :is(.task-title, .description) {\n  border: none;\n  background-image: none;\n}\n\ntextarea {\n  font-family: \"Roboto\";\n  width: 300px;\n  resize: none;\n  margin: 0;\n  padding: 0;\n  overflow-y: hidden;\n}\n\n.task-edit {\n  border: none;\n  border-radius: 2pt;\n  box-shadow: 0 0 0 1pt grey;\n  outline: none;\n  transition: 1s;\n}\n\n.task-title {\n  font-weight: 700;\n  font-size: 1rem;\n  padding: 5px;\n  outline: 0px;\n  width: fit-content;\n}\n\n.task--expanded :is(.edit, .remove) {\n  display: block;\n}\n\n.task--expand {\n  display: flex;\n  height: 100px;\n  flex-direction: column;\n}\n\n.task-title--hidden {\n  display: none;\n}\n\n.description {\n  font-style: italic;\n  font-size: 0.8rem;\n  padding: 5px;\n  outline: 0px;\n  width: fit-content;\n}\n\n.task-edit :is(.task-title, .description) {\n  width: auto;\n}\n\n.assigned-project {\n  cursor: default;\n  user-select: none;\n  font-size: 0.8rem;\n  background-color: black;\n  color: white;\n  width: fit-content;\n  height: fit-content;\n  padding: 3px;\n  grid-row: 2;\n  grid-column: 4;\n  justify-self: end;\n}\n\n.due-status {\n  display: flex;\n  font-size: 0.8rem;\n  margin-left: 5px;\n}\n\n.task:hover .task-actions-wrapper > div {\n  display: block;\n}\n\ndiv[id=\"-2\"] .task .task-actions-wrapper {\n  display: none;\n}\n\n.new-task-date-picker {\n  display: none;\n  position: absolute;\n  top: 10px;\n  right: 50;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\n  --p1-color: rgba(0, 128, 0, 0.3);\n  --p2-color: rgba(255, 255, 0, 0.3);\n  --p3-color: rgba(255, 165, 0, 0.3);\n  --p4-color: rgba(255, 69, 0, 0.3);\n  --p1-border-color: rgba(0, 128, 0, 0.8);\n  --p2-border-color: rgba(255, 255, 0, 0.8);\n  --p3-border-color: rgba(255, 165, 0, 0.8);\n  --p4-border-color: rgba(255, 69, 0, 0.8);\n  --check-icon: url('data:image/svg+xml,<svg viewBox=\"0 0 16 16\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z\"/></svg>');\n  --edit-icon: url(../static/icons/edit.svg);\n  --remove-icon: url(../static/icons/delete.svg);\n}\n\nbody {\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 300;\n  font-size: 18px;\n  margin: 0px;\n}\n.main-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.task-container {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.149);\n  border-radius: 5px;\n  padding: 10px;\n  width: 100%;\n  height: 40px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n\n.task-inside-container {\n  flex: 1;\n  display: flex;\n}\n\n.new-task-content-wrapper {\n  display: flex;\n  width: 80%;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.task-properties-wrapper {\n  padding: 5px;\n  display: flex;\n  flex-direction: row;\n  gap: 20px;\n}\n\n.task .task-properties-wrapper {\n  grid-column: 2;\n  grid-row: 3;\n}\n\n.new-task-footer {\n  display: flex;\n  align-items: center;\n}\n\n.task-properties-wrapper,\n.close-wrapper {\n  width: 50%;\n}\n\n.new-task-priority {\n  width: 40px;\n}\n\n.close-wrapper {\n  flex: 1;\n  display: flex;\n  justify-content: left;\n  margin: 2px;\n}\n\n.task-close {\n  font-size: 0.8rem;\n}\n\n.date-label {\n  content: url(../static/icons/calendar.svg);\n}\n\n.project-select-wrapper {\n  display: flex;\n}\n\n.project-select-label {\n  content: url(../static/icons/folder.svg);\n}\n\n.text-bar {\n  font-weight: 700;\n  padding: 5px;\n  width: 100%;\n  border: 0px;\n}\n\n.new-description {\n  border: 0px;\n  padding: 5px;\n}\n\ninput:focus {\n  outline: 0px;\n}\n\n.task-container--expand {\n  height: 120px;\n}\n\n.container {\n  display: flex;\n}\n\n.content {\n  padding: 20px;\n  width: 100%;\n}\n\n.notes-container {\n  display: grid;\n  grid-template-columns: 1fr 10fr;\n}\n\n.nav {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-width: 150px;\n  height: 100vh;\n  background-color: white;\n  font-size: 0.9rem;\n  font-weight: 600;\n  padding-top: 20px;\n}\n\n.nav-home {\n  padding: 10px;\n  margin-bottom: 20px;\n  width: 100px;\n}\n\n.nav-items {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 0px;\n}\n\n.nav-item {\n  all: unset;\n  width: 100px;\n  padding: 10px;\n}\n\n.nav-item:hover {\n  color: green;\n}\n\n.project-add {\n  padding: 10px;\n  margin-top: 20px;\n  width: 100px;\n}\n\n.done-tasks {\n  padding: 10px;\n  margin-top: 20px;\n  width: 100px;\n}\n\n.tasks {\n  opacity: 1;\n  transition: opacity 0.3s;\n}\n\n.header {\n  height: 40px;\n  background-color: black;\n  display: flex;\n  justify-content: left;\n  align-items: center;\n}\n\n.header-text {\n  margin-left: 20px;\n  color: white;\n}\n\n.projects {\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 1fr;\n}\n\n.project {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  opacity: 1;\n  transition: opacity 0.1s;\n}\n\n.project--fading {\n  opacity: 0;\n}\n\n.project-header {\n  display: flex;\n}\n\n.project-title-wrapper {\n  display: flex;\n  gap: 5px;\n  width: 50%;\n}\n\n.project-sorter-wrapper {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n  width: 100%;\n  margin-top: 20px;\n}\n\n.sort-icons-wrapper {\n  display: flex;\n}\n\n.sort-arrow {\n  content: url(../static/icons/arrow.svg);\n  width: 15px;\n  height: 15px;\n  cursor: pointer;\n}\n\n.sort-arrow--up {\n  transform: rotate(180deg);\n}\n\n.sort-label {\n  content: url(../static/icons/sort.svg);\n  width: 20px;\n  height: 20px;\n}\n\n.project-sorter {\n  overflow: hidden;\n  display: flex;\n  gap: 20px;\n  transition: all 0.1s;\n}\n\n.project-sorter:hover {\n  gap: 5px;\n}\n\n#selected {\n  display: block;\n  font-size: 0.7rem;\n  text-transform: uppercase;\n}\n\n.sort-option {\n  font-size: 0.7rem;\n  cursor: pointer;\n  display: none;\n  text-transform: uppercase;\n}\n\n.sort-option:hover {\n  font-weight: 700;\n  text-decoration: underline;\n}\n\n.project-sorter:hover .sort-option {\n  display: flex;\n}\n\n.project-sorter:hover #selected {\n  font-weight: 700;\n}\n\n.project-title {\n  font-size: 1.3rem;\n  font-weight: 700;\n  height: 30px;\n}\n\n.project-title-edit,\n.project-remove {\n  display: none;\n  width: 15px;\n  height: 15px;\n}\n\n.project-title-edit {\n  content: var(--edit-icon);\n}\n\n.project-remove {\n  content: var(--remove-icon);\n}\n\n.project-title-wrapper:hover :is(.project-title-edit, .project-remove) {\n  display: block;\n}\n\n.editing {\n  padding: 10px;\n}\n\n.task {\n  display: grid;\n  grid-template-columns: 30px 1fr 1fr 1fr;\n  grid-template-rows: 1fr 1fr;\n  padding: 10px;\n}\n\n.task--expanded {\n  grid-template-rows: 1fr 0.5fr 0.5fr;\n  grid-template-columns: 30px 1fr 1fr 150px;\n}\n\n.task:hover {\n  outline: 1px solid rgba(0, 128, 0, 0.1);\n}\n\n.save {\n  align-self: center;\n  justify-self: right;\n  font-size: 0.8rem;\n  grid-column: 3;\n  grid-row: 3;\n}\n\ninput[type=\"checkbox\"] {\n  appearance: none;\n  grid-row: span 2;\n  align-self: center;\n  /* background-color:rgba(255,0, 0, 0.4); */\n  margin: 0;\n  font: inherit;\n  color: white;\n  width: 1.15em;\n  height: 1.15em;\n  border-radius: 50px;\n  display: grid;\n  transition: outline 50ms 50ms ease-in-out;\n}\n\n.task:hover input[type=\"checkbox\"] {\n  outline: 0.15em solid;\n}\n\ninput[type=\"checkbox\"]:hover {\n  background-image: var(--check-icon);\n}\n\ninput[type=\"checkbox\"]:checked {\n  background-image: var(--check-icon);\n}\n\nselect {\n  outline: 0px;\n  border: 0px;\n  background-color: white;\n}\n\nselect:hover {\n  border: 1px solid black;\n  font-weight: 700;\n}\n\n.task-date-wrapper {\n  display: flex;\n  gap: 5px;\n}\n\n.new-task-date {\n  border: 0px;\n  width: 70px;\n  text-align: center;\n}\n\n.new-task-date:hover {\n  font-weight: 700;\n}\n\n.priority-wrapper {\n  display: flex;\n}\n\n.priority {\n  font-size: 0.9rem;\n}\n\n.priority-label {\n  content: url(../static/icons/priority.svg);\n}\n\n.date-priority-wrapper {\n  grid-column: 2;\n  grid-row: 3;\n  display: flex;\n  padding-left: 15px;\n  padding-top: 5px;\n}\n\n.task-actions-wrapper {\n  display: flex;\n  gap: 5px;\n\n  justify-self: end;\n  grid-column: 4;\n}\n\n.edit,\n.remove {\n  display: none;\n  font-size: 0.9rem;\n}\n\n.edit {\n  content: var(--edit-icon);\n  width: 25px;\n  height: 25px;\n}\n\n.remove {\n  content: var(--remove-icon);\n  width: 25px;\n  height: 25px;\n}\n\n.task-content-wrapper {\n  grid-row: span 2;\n  grid-column: span 2;\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n  background-color: white;\n  gap: 5px;\n}\n\n.input-text-wrapper {\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  border-radius: 5px;\n  gap: 5px;\n}\n\n\n.task-content-wrapper{\npointer-events: none;\n}\n\n.task-edit {\n  pointer-events:all;\n}\n\n\n\n\n.input-text-wrapper :is(.task-title, .description) {\n  border: none;\n  background-image: none;\n}\n\ntextarea {\n  font-family: \"Roboto\";\n  width: 300px;\n  resize: none;\n  margin: 0;\n  padding: 0;\n  overflow-y: hidden;\n}\n\n.task-edit {\n  border: none;\n  border-radius: 2pt;\n  box-shadow: 0 0 0 1pt grey;\n  outline: none;\n  transition: 1s;\n}\n\n.task-title {\n  font-weight: 700;\n  font-size: 1rem;\n  padding: 5px;\n  outline: 0px;\n  width: fit-content;\n}\n\n.task--expanded :is(.edit, .remove) {\n  display: block;\n}\n\n.task--expand {\n  display: flex;\n  height: 100px;\n  flex-direction: column;\n}\n\n.task-title--hidden {\n  display: none;\n}\n\n.description {\n  font-style: italic;\n  font-size: 0.8rem;\n  padding: 5px;\n  outline: 0px;\n  width: fit-content;\n}\n\n.task-edit :is(.task-title, .description) {\n  width: auto;\n}\n\n.assigned-project {\n  cursor: default;\n  user-select: none;\n  font-size: 0.8rem;\n  background-color: black;\n  color: white;\n  width: fit-content;\n  height: fit-content;\n  padding: 3px;\n  grid-row: 2;\n  grid-column: 4;\n  justify-self: end;\n}\n\n.due-status {\n  display: flex;\n  font-size: 0.8rem;\n  margin-left: 5px;\n}\n\n.task:hover .task-actions-wrapper > div {\n  display: block;\n}\n\ndiv[id=\"-2\"] .task .task-actions-wrapper {\n  display: none;\n}\n\n.new-task-date-picker {\n  display: none;\n  position: absolute;\n  top: 10px;\n  right: 50;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 52 */
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 53 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 54 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = "data:image/svg+xml,<svg viewBox=\"0 0 16 16\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z\"/></svg>";

/***/ }),
/* 56 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "49f75adc8d73036c195b.svg";

/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a1f8d83cf55cd091c7f0.svg";

/***/ }),
/* 58 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6d50c92024de208c7240.svg";

/***/ }),
/* 59 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9ed1ce9fb3173446dea6.svg";

/***/ }),
/* 60 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "30004be3665277be9eb0.svg";

/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7cdc1793f50cc0d817ca.svg";

/***/ }),
/* 62 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "29b27fc9c312aa4a2e74.svg";

/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadListeners)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _sorter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39);
/* harmony import */ var _ui_modules_content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41);
/* harmony import */ var _ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64);
/* harmony import */ var _ui_modules_nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43);









function loadListeners() {
  let nav = document.querySelector(".nav");
  let content = document.querySelector(".content");

  nav.addEventListener("click", (event) => {
    if (event.target.className === "nav-home") {
      const project = (0,_Manager__WEBPACK_IMPORTED_MODULE_2__.getHomeProject)();
      (0,_UI__WEBPACK_IMPORTED_MODULE_4__.display)(project);
    }

    if (event.target.className === "nav-item") {
      const project = (0,_Manager__WEBPACK_IMPORTED_MODULE_2__.getProjectById)(event.target.id);
      (0,_UI__WEBPACK_IMPORTED_MODULE_4__.display)(project);
    }

    if (event.target.className === "done-tasks") {
      const project = (0,_Manager__WEBPACK_IMPORTED_MODULE_2__.getDoneList)();
      (0,_UI__WEBPACK_IMPORTED_MODULE_4__.display)(project);
    }

    if (event.target.className === "project-add") {
      (0,_UI__WEBPACK_IMPORTED_MODULE_4__.display)((0,_Manager__WEBPACK_IMPORTED_MODULE_2__.newProject)());
      (0,_ui_modules_nav__WEBPACK_IMPORTED_MODULE_7__.updateNav)();
    }
  });

  content.addEventListener("change", (event) => {
    if (event.target.className === "complete") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.markTaskDoneHandler)(event);
    }

    if (event.target.className === "new-task-date-picker") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.changeTaskDueDateHandler)(event);
      (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.updateLocalStorage)();
    }
  });

  content.addEventListener("click", (event) => {
    if (event.target.className === "project-title-edit") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.projectTitleEditHandler)(event);
    }

    if (event.target.className === "project-remove") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.projectRemoveHandler)(event);
    }

    if (event.target.className === "new-task-date") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.popUpDatePickerHandler)(event);
    }

    if (event.target.className === "task-close") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.closingNewTaskBarHandler)(event);
    }

    if (event.target.className === "text-bar") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.expandingNewTaskBarHandler)(event);
    }

    if (event.target.classList.contains("sort-arrow")) {
      (0,_sorter__WEBPACK_IMPORTED_MODULE_3__.changeSortOrder)();
      (0,_ui_modules_content__WEBPACK_IMPORTED_MODULE_5__.updateTasksElement)();
    }

    if (event.target.className === "sort-option") {
      (0,_sorter__WEBPACK_IMPORTED_MODULE_3__.changeSortCriteria)(event.target);
      (0,_ui_modules_content__WEBPACK_IMPORTED_MODULE_5__.updateTasksElement)();
    }

    if (
      event.target.className === "new-task-priority" &&
      event.target.closest(".task") !== null
    ) {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskPriorityChangeHandler)(event);
      (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.updateLocalStorage)();
    }

    if (
      event.target.className === "project-select" &&
      event.target.closest(".task") !== null
    ) {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskAssignedProjectChangeHandler)(event);
    }

    if (event.target.classList.contains("task--expanded")) {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskExpandHandler)(event);
      return;
    }

    if (event.target.classList.contains("task")) {
      if (event.target.closest(".project").id === _config__WEBPACK_IMPORTED_MODULE_0__.config.done.id) return;
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskExpandHandler)(event);
    }

    if (event.target.className === "remove") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskRemoveHandler)(event);
    }

    if (event.target.className === "edit") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskMakeEditableHandler)(event);
    }

    if (event.target.className === "save") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskExpandHandler)(event);
      (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.updateLocalStorage)();
    }
  });

  content.addEventListener("keyup", (event) => {
    if (event.target.classList.contains("project-title")) {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.projectTitleChangeHandler)(event);
    }

    if (event.target.className === "task-title") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskTitleChangeHandler)(event);
    }
    if (event.target.className === "description") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskDescriptionChangeHandler)(event);
    }
  });

  content.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("task")) {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.taskHoveredCheckboxHandler)(event);
    }
  });

  content.addEventListener("focusout", (event) => {
    if (event.target.className === "project-title editing") {
      (0,_ui_modules_handlers_contentHandlers__WEBPACK_IMPORTED_MODULE_6__.projectTitleDoneEditingHandler)();
    }
  });
}

addEventListener("load", (event) => {
  loadListeners();
});


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeTaskDueDateHandler": () => (/* binding */ changeTaskDueDateHandler),
/* harmony export */   "closingNewTaskBarHandler": () => (/* binding */ closingNewTaskBarHandler),
/* harmony export */   "expandingNewTaskBarHandler": () => (/* binding */ expandingNewTaskBarHandler),
/* harmony export */   "markTaskDoneHandler": () => (/* binding */ markTaskDoneHandler),
/* harmony export */   "popUpDatePickerHandler": () => (/* binding */ popUpDatePickerHandler),
/* harmony export */   "projectRemoveHandler": () => (/* binding */ projectRemoveHandler),
/* harmony export */   "projectTitleChangeHandler": () => (/* binding */ projectTitleChangeHandler),
/* harmony export */   "projectTitleDoneEditingHandler": () => (/* binding */ projectTitleDoneEditingHandler),
/* harmony export */   "projectTitleEditHandler": () => (/* binding */ projectTitleEditHandler),
/* harmony export */   "taskAssignedProjectChangeHandler": () => (/* binding */ taskAssignedProjectChangeHandler),
/* harmony export */   "taskDescriptionChangeHandler": () => (/* binding */ taskDescriptionChangeHandler),
/* harmony export */   "taskExpandHandler": () => (/* binding */ taskExpandHandler),
/* harmony export */   "taskHoveredCheckboxHandler": () => (/* binding */ taskHoveredCheckboxHandler),
/* harmony export */   "taskMakeEditableHandler": () => (/* binding */ taskMakeEditableHandler),
/* harmony export */   "taskPriorityChangeHandler": () => (/* binding */ taskPriorityChangeHandler),
/* harmony export */   "taskRemoveHandler": () => (/* binding */ taskRemoveHandler),
/* harmony export */   "taskTitleChangeHandler": () => (/* binding */ taskTitleChangeHandler)
/* harmony export */ });
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);






function markTaskDoneHandler(event) {
  const task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(Number(event.target.closest(".task").id));

  (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.runAndUpdate)(_Manager__WEBPACK_IMPORTED_MODULE_1__.toggleTaskCompletion, task);
}

function changeTaskDueDateHandler(event) {
  const date = event.target.closest(".new-task-date");
  date.value = event.target.value;

  let taskElement = event.target.closest(".task");

  if (taskElement) {
    let task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(taskElement.id);
    task.dueDate = date.value;
  }
}

function projectTitleEditHandler(event) {
  const projectTitle = document.querySelector(".project-title");
  projectTitle.setAttribute("contenteditable", "true");
  projectTitle.focus();
  projectTitle.classList.add("editing");
}

function projectRemoveHandler(event) {
  const id = event.target.closest(".project").id;
  (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.runAndUpdate)(_Manager__WEBPACK_IMPORTED_MODULE_1__.removeProject, id);
}

function popUpDatePickerHandler(event) {
  let todaysDate = new Date().toISOString().slice(0, 10);
  const newDate = (0,_UI__WEBPACK_IMPORTED_MODULE_2__.createHtmlElement)(
    "input",
    null,
    ["new-task-date-picker"],
    "Date",
    [
      ["type", "date"],
      ["min", todaysDate],
      ["value", todaysDate],
    ]
  );

  if (!event.target.contains(newDate)) event.target.appendChild(newDate);

  if (event.target.value == "Set date") {
    event.target.value = newDate.value;
  }
  newDate.showPicker();
}

function closingNewTaskBarHandler() {
  const description = document.querySelector(".new-description");
  let newTaskBar = document.querySelector(".text-bar");
  const dueDate = document.querySelector(".new-task-date");
  const priority = document.querySelector(".new-task-priority");
  const projectSelector = document.querySelector(".project-select");

  if (newTaskBar.value == "" && description.value !== "") {
    (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.runAndUpdate)(
      _Manager__WEBPACK_IMPORTED_MODULE_1__.addNewTask,
      projectSelector.options[projectSelector.selectedIndex].id,
      description.value,
      newTaskBar.value,
      dueDate.value,
      priority.value
    );
  }

  if (newTaskBar.value !== "") {
    (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.runAndUpdate)(
      _Manager__WEBPACK_IMPORTED_MODULE_1__.addNewTask,
      projectSelector.options[projectSelector.selectedIndex].id,
      newTaskBar.value,
      description.value,
      dueDate.value,
      priority.value
    );
  }

  const taskContainer = document.querySelector(".task-container");

  taskContainer.replaceWith((0,_content__WEBPACK_IMPORTED_MODULE_3__.generateNewTaskBar)());
}

function expandingNewTaskBarHandler(event) {
  let taskContainer = document.querySelector(".task-container");
  let container = document.querySelector(".task-inside-container");
  const description = (0,_UI__WEBPACK_IMPORTED_MODULE_2__.createHtmlElement)(
    "input",
    null,
    ["new-description"],
    null,
    [["placeholder", "Description"]]
  );
  const taskFooter = (0,_UI__WEBPACK_IMPORTED_MODULE_2__.createHtmlElement)("div", null, ["new-task-footer"], null);

  const leftWrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_2__.createHtmlElement)(
    "div",
    null,
    ["new-task-content-wrapper"],
    null
  );
  const titleBar = document.querySelector(".text-bar");
  titleBar.setAttribute("placeholder", "Title");
  titleBar.setAttribute("autofocus", "");

  titleBar.classList.add("open");

  leftWrapper.append(titleBar, description);

  const dateAndPriorityContainer = (0,_UI__WEBPACK_IMPORTED_MODULE_2__.createHtmlElement)("div", null, [
    "task-properties-wrapper",
  ]);
  dateAndPriorityContainer.append(
    (0,_content__WEBPACK_IMPORTED_MODULE_3__.generateTaskDateElements)(),
    (0,_content__WEBPACK_IMPORTED_MODULE_3__.generateTaskPriorityElements)()
  );

  const projectSelection = (0,_content__WEBPACK_IMPORTED_MODULE_3__.generateProjectSelectElement)();
  dateAndPriorityContainer.append(projectSelection);

  taskContainer.classList.add("task-container--expand");

  if (container.lastChild === document.querySelector(".text-bar")) {

    container.append(leftWrapper);
    taskContainer.appendChild(taskFooter);
    taskFooter.appendChild(dateAndPriorityContainer);

    const wrapper = (0,_UI__WEBPACK_IMPORTED_MODULE_2__.createHtmlElement)("div", null, ["close-wrapper"]);
    const close = (0,_UI__WEBPACK_IMPORTED_MODULE_2__.createHtmlElement)("div", null, ["task-close"], "Close");
    wrapper.appendChild(close);

    taskFooter.append(wrapper);
  }

  return taskContainer;
}

function taskPriorityChangeHandler(event) {
  const taskElement = event.target.closest(".task");
  const task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(taskElement.id);

  task.priority = event.target.value;

  let checkbox = taskElement.querySelector('input[type="checkbox"]');

  (0,_content__WEBPACK_IMPORTED_MODULE_3__.setCheckBoxColor)(checkbox, task);
  (0,_content__WEBPACK_IMPORTED_MODULE_3__.setCheckBoxOutlineColor)(checkbox, task);
}

function taskAssignedProjectChangeHandler(event) {
  const taskElement = event.target.closest(".task");
  const task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(taskElement.id);
  const newProjectId =
    event.target.options[event.target.options.selectedIndex].id;

  (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.runAndUpdate)(_Manager__WEBPACK_IMPORTED_MODULE_1__.moveTask, task, newProjectId);
}

function taskExpandHandler(event) {
  let taskElement = event.target;

  if (!event.target.classList.contains("task")) {
    taskElement = event.target.closest(".task");
  }

  let task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(Number(taskElement.id));

  let isTaskExpanded = taskElement.classList.contains("task--expanded");

  if (isTaskExpanded) {
    const newElement = (0,_content__WEBPACK_IMPORTED_MODULE_3__.generateTaskElement)(task);
    taskElement.replaceWith(newElement);
    return;
  }

  const newElement = (0,_content__WEBPACK_IMPORTED_MODULE_3__.generateExpandedTaskElement)(task);

  taskElement.replaceWith(newElement);
}

function taskRemoveHandler(event) {
  let id = event.target.closest(".task").id;

  (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.runAndUpdate)(_Manager__WEBPACK_IMPORTED_MODULE_1__.removeTask, Number(id));
}

function taskMakeEditableHandler(event) {
  let taskElement = event.target.closest(".task");
  console.log(taskElement);

  let task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(taskElement.id);
  let element = (0,_content__WEBPACK_IMPORTED_MODULE_3__.generateTaskWithInput)(task);
  taskElement.replaceChildren(...element.childNodes);
  taskElement.classList.add("task--expanded");

  let save = document.createElement("div");
  save.classList.add("save");
  save.textContent = "Close";
  taskElement.appendChild(save);
}

function projectTitleChangeHandler(event) {
  const project = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getProjectById)(event.target.closest(".project").id);
  project.title = event.target.textContent;
}

function taskTitleChangeHandler(event) {
  let taskElement = event.target.closest(".task");
  let task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(taskElement.id);
  task.title = event.target.textContent;
}

function taskDescriptionChangeHandler(event) {
  let taskElement = event.target.closest(".task");
  let task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(taskElement.id);
  task.description = event.target.textContent;
}

function taskHoveredCheckboxHandler(event) {
  const task = (0,_Manager__WEBPACK_IMPORTED_MODULE_1__.getTaskById)(event.target.id);
  const checkbox = event.target.querySelector(".complete");
  (0,_content__WEBPACK_IMPORTED_MODULE_3__.setCheckBoxOutlineColor)(checkbox, task);
}

function projectTitleDoneEditingHandler() {
  (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.updateLocalStorage)();
  (0,_UI__WEBPACK_IMPORTED_MODULE_2__.update)();
  (0,_nav__WEBPACK_IMPORTED_MODULE_4__.updateNav)();
}




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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			0: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63);
// COMMENT: ' comma looks more clean than " :D
// COMMENT: Not required, but writing a README.md file is a good practice. It should include the project description, how to run it, how to build it, etc.
// Asmeni



 // COMMENT: unused import

(0,_Manager__WEBPACK_IMPORTED_MODULE_0__.init)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFTzs7Ozs7Ozs7Ozs7O0FDdExrRDtBQUNBOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUSxpRUFBaUU7QUFDcEYsYUFBYSxRQUFRO0FBQ3JCLFlBQVksV0FBVztBQUN2QixZQUFZLFlBQVk7QUFDeEIsWUFBWSxZQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLFNBQVMsb0VBQWU7QUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUZvRTtBQUNwQjtBQUNnQjtBQUNFO0FBQ1A7QUFDbkI7QUFDZTtBQUNWO0FBQ2tEO0FBQ3RDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUSxpRUFBaUU7QUFDcEYsYUFBYSxRQUFRO0FBQ3JCLFlBQVksV0FBVztBQUN2QixZQUFZLFlBQVk7QUFDeEIsWUFBWSxZQUFZO0FBQ3hCLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRWU7QUFDZjs7QUFFQSxFQUFFLHNFQUFZO0FBQ2QsdUJBQXVCLCtFQUFpQjtBQUN4QyxtT0FBbU8sbUVBQWE7O0FBRWhQO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsZ0VBQVU7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsZ0VBQU0sQ0FBQyxxRUFBVztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDREQUFNO0FBQ3JCLGdCQUFnQiw0REFBTTtBQUN0QixJQUFJO0FBQ0osZUFBZSw0REFBTTtBQUNyQixnQkFBZ0IsNERBQU07QUFDdEI7O0FBRUEsZ0JBQWdCLHlFQUFtQjtBQUNuQyx5QkFBeUIseUZBQStCLGNBQWMseUZBQStCO0FBQ3JHO0FBQ0EsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07O0FBRU4sSUFBSTtBQUNKLHdFQUF3RTtBQUN4RSxJQUFJO0FBQ0oscUVBQXFFO0FBQ3JFLElBQUk7QUFDSjtBQUNBLHlFQUF5RTtBQUN6RSxJQUFJO0FBQ0osK0RBQStEO0FBQy9ELElBQUk7QUFDSjtBQUNBLGtFQUFrRTtBQUNsRSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLFdBQVcsd0VBQWtCLHVCQUF1Qjs7QUFFcEQ7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RSxJQUFJO0FBQ0o7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0EsMkVBQTJFO0FBQzNFLE1BQU07QUFDTiwwRUFBMEU7QUFDMUUsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdMQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7QUNOd0Q7QUFDeEQsaUVBQWUsOERBQWE7Ozs7Ozs7Ozs7Ozs7OztBQ0RnQztBQUNSO0FBQ1E7QUFDWjtBQUNOOztBQUUxQztBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9FQUFjO0FBQ2hDLGNBQWMsZ0VBQVU7QUFDeEIsa0JBQWtCLG9FQUFjO0FBQ2hDLFlBQVksOERBQVE7QUFDcEIsU0FBUywyREFBSztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsTUFBTTs7Ozs7Ozs7OztBQzdCckI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEMsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixHQUFHO0FBQ0g7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixHQUFHO0FBQ0g7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQixHQUFHO0FBQ0g7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0oseUNBQXlDLE9BQU87QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLGNBQWM7Ozs7Ozs7Ozs7O0FDdkY0QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTyxPQUFPLE1BQU07QUFDL0IsV0FBVyxPQUFPLE9BQU8sTUFBTTtBQUMvQixhQUFhLE1BQU0sSUFBSSxNQUFNO0FBQzdCLFlBQVksTUFBTSxJQUFJLE1BQU07QUFDNUI7QUFDQTtBQUNBLFFBQVEsMkVBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsUUFBUSwyRUFBaUI7QUFDekI7QUFDQTtBQUNBLEdBQUc7QUFDSCxZQUFZLDJFQUFpQjtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUVBQWUsVUFBVTs7Ozs7Ozs7OztBQ2pDVjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxjQUFjOzs7Ozs7Ozs7OztBQ2J3QztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPLHlFQUFlO0FBQ3RCO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsV0FBVyx5RUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFNBQVMseUVBQWU7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPLHlFQUFlO0FBQ3RCO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsYUFBYSx5RUFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlFQUFlLFFBQVE7Ozs7Ozs7Ozs7QUNqSlI7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx3RkFBd0Y7O0FBRXhGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckIrRDtBQUNjO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw2RUFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPLHNFQUFZO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFdBQVcsc0VBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsU0FBUyxzRUFBWTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPLHNFQUFZO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGFBQWEsc0VBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpRUFBZSxLQUFLOzs7Ozs7Ozs7O0FDakdMO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNoQmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDL0N3QztBQUNpQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsUUFBUTtBQUNyQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QsaUJBQWlCLDREQUFNO0FBQ3ZCLGtCQUFrQiw0REFBTTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGNBQWMsMEJBQTBCO0FBQ3hDLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaERBLHdCQUF3QiwyQkFBMkIsMkVBQTJFLGtDQUFrQyx3QkFBd0IsT0FBTyxrQ0FBa0MsbUlBQW1JOztBQUUzUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLE1BQU07QUFDbkIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QseURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLDBPQUEwTzs7QUFFMU87QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNyRGU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDYndDO0FBQ3pCO0FBQ2YsU0FBUyw0REFBTSxHQUFHO0FBQ2xCOzs7Ozs7Ozs7Ozs7O0FDSDRFO0FBQ25CO0FBQ1k7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLGFBQWEsOEVBQXdCO0FBQ3JDLFNBQVMsZ0ZBQWlCO0FBQzFCOzs7Ozs7Ozs7Ozs7QUNoQ3dDO0FBQ2lCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsUUFBUTtBQUNyQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QsU0FBUyw0REFBTSx1QkFBdUIsNERBQU07QUFDNUM7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2Z3QztBQUN3QztBQUNoQztBQUNTO0FBQ0c7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYSxRQUFRO0FBQ3JCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QsaUJBQWlCLDREQUFNO0FBQ3ZCLGtCQUFrQiw0REFBTTtBQUN4QixhQUFhLGdFQUFVO0FBQ3ZCLDRCQUE0QixnRkFBMEI7QUFDdEQsY0FBYzs7QUFFZDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0VBQWdFO0FBQ2hFOztBQUVBLDZCQUE2QixnRUFBVSxpQ0FBaUM7O0FBRXhFLFFBQVEsc0VBQWdCLENBQUMsNERBQU0sd0NBQXdDLGdFQUFVO0FBQ2pGO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOzs7QUFHSjtBQUNBOzs7Ozs7Ozs7Ozs7QUN2RHdDO0FBQ2lCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsUUFBUTtBQUNyQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLGlCQUFpQiw0REFBTTtBQUN2QixrQkFBa0IsNERBQU07QUFDeEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDL0J3QztBQUNJO0FBQ0k7QUFDUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsU0FBUztBQUN0QixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLGFBQWEsNERBQU07QUFDbkIsU0FBUyw4REFBUSxxQkFBcUIsZ0VBQVU7QUFDaEQ7Ozs7Ozs7Ozs7OztBQzFCd0M7QUFDaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsTUFBTTtBQUNuQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLGFBQWEsNERBQU07QUFDbkI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQndDO0FBQ2lCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLE1BQU07QUFDbkIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxhQUFhLDREQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVCd0M7QUFDaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYSxTQUFTO0FBQ3RCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QsYUFBYSw0REFBTTtBQUNuQixzQkFBc0IsNERBQU07QUFDNUI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCbUI7QUFDZTtBQUM2QztBQUNsQjtBQUNOOztBQUV2RDs7QUFFQTtBQUNBLGlCQUFpQiwwREFBWTtBQUM3QixjQUFjLHVEQUFTO0FBQ3ZCLGtCQUFrQiwyREFBYTs7QUFFL0I7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLHVEQUFhO0FBQ3BCLGNBQWMsK0RBQXFCO0FBQ25DOztBQUVBOztBQUVBLEVBQUUsK0NBQU07O0FBRVIsY0FBYywrREFBYztBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRXFFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGMUI7O0FBRTNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsd0RBQWM7QUFDN0IsZUFBZSx3REFBYztBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBU0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RXVFO0FBQzlCO0FBQzJDO0FBQ0g7QUFDMUI7O0FBRXpELGdCQUFnQixzREFBaUI7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQixtREFBYzs7QUFFcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixzREFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isc0RBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHNEQUFpQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixzREFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0Isc0RBQWlCOztBQUV6Qyx1QkFBdUIsc0RBQWlCO0FBQ3hDO0FBQ0E7O0FBRUEsdUJBQXVCLHNEQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG1EQUFjO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isc0RBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsbURBQWM7QUFDekQ7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixzREFBaUI7O0FBRXpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixzREFBaUI7O0FBRXhDO0FBQ0E7O0FBRUE7O0FBRUEsOENBQThDO0FBQzlDLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixzREFBaUI7O0FBRXZDOztBQUVBLGdCQUFnQixzREFBaUI7O0FBRWpDLG9CQUFvQixzREFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBYztBQUNsQjs7QUFFQSx3QkFBd0Isc0RBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQWM7QUFDbEI7O0FBRUEsc0JBQXNCLHNEQUFpQjtBQUN2Qzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixzREFBaUI7O0FBRWpDLHNCQUFzQixzREFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsc0RBQWlCO0FBQ2xEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0Isc0RBQWlCOztBQUV2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixzREFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHNEQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHNEQUFpQjs7QUFFdEM7QUFDQSxtQkFBbUIsc0RBQWlCOztBQUVwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0EseUNBQXlDLG1EQUFjLGdCQUFnQjtBQUN2RTs7QUFFQTtBQUNBLHNDQUFzQyx5REFBb0IsZ0JBQWdCO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0Isc0RBQWlCO0FBQ2hEO0FBQ0E7O0FBRUEsd0JBQXdCLHNEQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLHNEQUFpQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSwyREFBaUI7QUFDbkI7QUFDQTs7QUFFQSxxQkFBcUIsc0RBQWlCO0FBQ3RDO0FBQ0E7O0FBRUEsdUJBQXVCLGlEQUFnQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLHNEQUFpQjs7QUFFM0M7QUFDQTs7QUFFQSx3QkFBd0Isc0RBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLHNEQUFpQjs7QUFFdkM7O0FBRUEsb0JBQW9CLHNEQUFpQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixzREFBaUI7QUFDekM7QUFDQTs7QUFFQSxpQkFBaUIsc0RBQWlCOztBQUVsQyxrQkFBa0Isc0RBQWlCO0FBQ25DLG9CQUFvQixzREFBaUI7O0FBRXJDLE1BQU0sb0RBQWU7QUFDckI7QUFDQTs7QUFFQSxvQkFBb0Isc0RBQWlCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsZ0RBQVc7O0FBRTNCLDhDQUE4QyxxREFBZ0I7QUFDOUQsa0JBQWtCLHFEQUFnQjs7QUFFbEM7QUFDQSx1QkFBdUIsc0RBQWlCO0FBQ3hDLGtCQUFrQixxREFBZ0I7QUFDbEM7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0RBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsc0RBQWlCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsY0FBYywrREFBcUI7QUFDbkMsSUFBSTtBQUNKLGNBQWMsd0RBQWM7QUFDNUI7QUFDQSxHQUFHLCtDQUFNO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIOzs7QUFpQkU7Ozs7Ozs7Ozs7Ozs7QUM5ZStCO0FBQ1E7O0FBRXpDO0FBQ0EsaUJBQWlCLHNEQUFpQjs7QUFFbEMscUJBQXFCLHNEQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFpQjtBQUNyQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7OztBQ25CMEQ7QUFDekI7O0FBRW5ELFlBQVksc0RBQWlCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixxREFBVztBQUNqQyxlQUFlLHNEQUFpQjs7QUFFaEM7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQix3REFBYztBQUNwQyxlQUFlLHNEQUFpQjs7QUFFaEM7O0FBRUE7O0FBRUE7QUFDQSxpQkFBaUIsc0RBQWlCO0FBQ2xDLGNBQWMsMkRBQWlCO0FBQy9CO0FBQ0E7QUFDQSxzQkFBc0Isc0RBQWlCO0FBQ3ZDO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTSw0Q0FBTztBQUNiLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxrQkFBa0Isc0RBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0Q3QixNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQzBHO0FBQ2pCO0FBQ087QUFDaEcsNENBQTRDLGlFQUE0UDtBQUN4Uyw0Q0FBNEMsaUVBQTJDO0FBQ3ZGLDRDQUE0QyxpRUFBNkM7QUFDekYsNENBQTRDLGlFQUErQztBQUMzRiw0Q0FBNEMsaUVBQTZDO0FBQ3pGLDRDQUE0QyxpRUFBNEM7QUFDeEYsNENBQTRDLGlFQUEyQztBQUN2Riw0Q0FBNEMsaUVBQStDO0FBQzNGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0YseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0EsaURBQWlELHFDQUFxQyx1Q0FBdUMsdUNBQXVDLHNDQUFzQyw0Q0FBNEMsOENBQThDLDhDQUE4Qyw2Q0FBNkMsa0VBQWtFLGlFQUFpRSxtRUFBbUUsR0FBRyxVQUFVLHdDQUF3QyxxQkFBcUIsb0JBQW9CLGdCQUFnQixHQUFHLG1CQUFtQixrQkFBa0IsMkJBQTJCLEdBQUcscUJBQXFCLGtCQUFrQiwyQkFBMkIsMkJBQTJCLHNEQUFzRCx1QkFBdUIsa0JBQWtCLGdCQUFnQixpQkFBaUIscUJBQXFCLDhCQUE4QixHQUFHLDRCQUE0QixZQUFZLGtCQUFrQixHQUFHLCtCQUErQixrQkFBa0IsZUFBZSwyQkFBMkIsYUFBYSxHQUFHLDhCQUE4QixpQkFBaUIsa0JBQWtCLHdCQUF3QixjQUFjLEdBQUcsb0NBQW9DLG1CQUFtQixnQkFBZ0IsR0FBRyxzQkFBc0Isa0JBQWtCLHdCQUF3QixHQUFHLCtDQUErQyxlQUFlLEdBQUcsd0JBQXdCLGdCQUFnQixHQUFHLG9CQUFvQixZQUFZLGtCQUFrQiwwQkFBMEIsZ0JBQWdCLEdBQUcsaUJBQWlCLHNCQUFzQixHQUFHLGlCQUFpQiw2REFBNkQsR0FBRyw2QkFBNkIsa0JBQWtCLEdBQUcsMkJBQTJCLDZEQUE2RCxHQUFHLGVBQWUscUJBQXFCLGlCQUFpQixnQkFBZ0IsZ0JBQWdCLEdBQUcsc0JBQXNCLGdCQUFnQixpQkFBaUIsR0FBRyxpQkFBaUIsaUJBQWlCLEdBQUcsNkJBQTZCLGtCQUFrQixHQUFHLGdCQUFnQixrQkFBa0IsR0FBRyxjQUFjLGtCQUFrQixnQkFBZ0IsR0FBRyxzQkFBc0Isa0JBQWtCLG9DQUFvQyxHQUFHLFVBQVUsa0JBQWtCLDJCQUEyQix3QkFBd0IscUJBQXFCLGtCQUFrQiw0QkFBNEIsc0JBQXNCLHFCQUFxQixzQkFBc0IsR0FBRyxlQUFlLGtCQUFrQix3QkFBd0IsaUJBQWlCLEdBQUcsZ0JBQWdCLGtCQUFrQiwyQkFBMkIsd0JBQXdCLGdCQUFnQixHQUFHLGVBQWUsZUFBZSxpQkFBaUIsa0JBQWtCLEdBQUcscUJBQXFCLGlCQUFpQixHQUFHLGtCQUFrQixrQkFBa0IscUJBQXFCLGlCQUFpQixHQUFHLGlCQUFpQixrQkFBa0IscUJBQXFCLGlCQUFpQixHQUFHLFlBQVksZUFBZSw2QkFBNkIsR0FBRyxhQUFhLGlCQUFpQiw0QkFBNEIsa0JBQWtCLDBCQUEwQix3QkFBd0IsR0FBRyxrQkFBa0Isc0JBQXNCLGlCQUFpQixHQUFHLGVBQWUsa0JBQWtCLDJCQUEyQiwyQkFBMkIsR0FBRyxjQUFjLGtCQUFrQiwyQkFBMkIsY0FBYyxlQUFlLDZCQUE2QixHQUFHLHNCQUFzQixlQUFlLEdBQUcscUJBQXFCLGtCQUFrQixHQUFHLDRCQUE0QixrQkFBa0IsYUFBYSxlQUFlLEdBQUcsNkJBQTZCLGtCQUFrQixhQUFhLHdCQUF3QixnQkFBZ0IscUJBQXFCLEdBQUcseUJBQXlCLGtCQUFrQixHQUFHLGlCQUFpQiw2REFBNkQsZ0JBQWdCLGlCQUFpQixvQkFBb0IsR0FBRyxxQkFBcUIsOEJBQThCLEdBQUcsaUJBQWlCLDZEQUE2RCxnQkFBZ0IsaUJBQWlCLEdBQUcscUJBQXFCLHFCQUFxQixrQkFBa0IsY0FBYyx5QkFBeUIsR0FBRywyQkFBMkIsYUFBYSxHQUFHLGVBQWUsbUJBQW1CLHNCQUFzQiw4QkFBOEIsR0FBRyxrQkFBa0Isc0JBQXNCLG9CQUFvQixrQkFBa0IsOEJBQThCLEdBQUcsd0JBQXdCLHFCQUFxQiwrQkFBK0IsR0FBRyx3Q0FBd0Msa0JBQWtCLEdBQUcscUNBQXFDLHFCQUFxQixHQUFHLG9CQUFvQixzQkFBc0IscUJBQXFCLGlCQUFpQixHQUFHLDJDQUEyQyxrQkFBa0IsZ0JBQWdCLGlCQUFpQixHQUFHLHlCQUF5Qiw4QkFBOEIsR0FBRyxxQkFBcUIsZ0NBQWdDLEdBQUcsNEVBQTRFLG1CQUFtQixHQUFHLGNBQWMsa0JBQWtCLEdBQUcsV0FBVyxrQkFBa0IsNENBQTRDLGdDQUFnQyxrQkFBa0IsR0FBRyxxQkFBcUIsd0NBQXdDLDhDQUE4QyxHQUFHLGlCQUFpQiw0Q0FBNEMsR0FBRyxXQUFXLHVCQUF1Qix3QkFBd0Isc0JBQXNCLG1CQUFtQixnQkFBZ0IsR0FBRyw4QkFBOEIscUJBQXFCLHFCQUFxQix1QkFBdUIsNkNBQTZDLGdCQUFnQixrQkFBa0IsaUJBQWlCLGtCQUFrQixtQkFBbUIsd0JBQXdCLGtCQUFrQiw4Q0FBOEMsR0FBRywwQ0FBMEMsMEJBQTBCLEdBQUcsb0NBQW9DLHdDQUF3QyxHQUFHLHNDQUFzQyx3Q0FBd0MsR0FBRyxZQUFZLGlCQUFpQixnQkFBZ0IsNEJBQTRCLEdBQUcsa0JBQWtCLDRCQUE0QixxQkFBcUIsR0FBRyx3QkFBd0Isa0JBQWtCLGFBQWEsR0FBRyxvQkFBb0IsZ0JBQWdCLGdCQUFnQix1QkFBdUIsR0FBRywwQkFBMEIscUJBQXFCLEdBQUcsdUJBQXVCLGtCQUFrQixHQUFHLGVBQWUsc0JBQXNCLEdBQUcscUJBQXFCLDZEQUE2RCxHQUFHLDRCQUE0QixtQkFBbUIsZ0JBQWdCLGtCQUFrQix1QkFBdUIscUJBQXFCLEdBQUcsMkJBQTJCLGtCQUFrQixhQUFhLHdCQUF3QixtQkFBbUIsR0FBRyxxQkFBcUIsa0JBQWtCLHNCQUFzQixHQUFHLFdBQVcsOEJBQThCLGdCQUFnQixpQkFBaUIsR0FBRyxhQUFhLGdDQUFnQyxnQkFBZ0IsaUJBQWlCLEdBQUcsMkJBQTJCLHFCQUFxQix3QkFBd0Isa0JBQWtCLDJCQUEyQixrQkFBa0IsNEJBQTRCLGFBQWEsR0FBRyx5QkFBeUIsNEJBQTRCLGtCQUFrQiwyQkFBMkIsdUJBQXVCLGFBQWEsR0FBRyw0QkFBNEIsdUJBQXVCLEdBQUcsZ0JBQWdCLHVCQUF1QixHQUFHLDhEQUE4RCxpQkFBaUIsMkJBQTJCLEdBQUcsY0FBYyw0QkFBNEIsaUJBQWlCLGlCQUFpQixjQUFjLGVBQWUsdUJBQXVCLEdBQUcsZ0JBQWdCLGlCQUFpQix1QkFBdUIsK0JBQStCLGtCQUFrQixtQkFBbUIsR0FBRyxpQkFBaUIscUJBQXFCLG9CQUFvQixpQkFBaUIsaUJBQWlCLHVCQUF1QixHQUFHLHlDQUF5QyxtQkFBbUIsR0FBRyxtQkFBbUIsa0JBQWtCLGtCQUFrQiwyQkFBMkIsR0FBRyx5QkFBeUIsa0JBQWtCLEdBQUcsa0JBQWtCLHVCQUF1QixzQkFBc0IsaUJBQWlCLGlCQUFpQix1QkFBdUIsR0FBRywrQ0FBK0MsZ0JBQWdCLEdBQUcsdUJBQXVCLG9CQUFvQixzQkFBc0Isc0JBQXNCLDRCQUE0QixpQkFBaUIsdUJBQXVCLHdCQUF3QixpQkFBaUIsZ0JBQWdCLG1CQUFtQixzQkFBc0IsR0FBRyxpQkFBaUIsa0JBQWtCLHNCQUFzQixxQkFBcUIsR0FBRyw2Q0FBNkMsbUJBQW1CLEdBQUcsZ0RBQWdELGtCQUFrQixHQUFHLDJCQUEyQixrQkFBa0IsdUJBQXVCLGNBQWMsY0FBYyxHQUFHLFNBQVMsZ0ZBQWdGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sTUFBTSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFdBQVcsWUFBWSxXQUFXLE9BQU8sTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFVBQVUsS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxnQ0FBZ0MscUNBQXFDLHVDQUF1Qyx1Q0FBdUMsc0NBQXNDLDRDQUE0Qyw4Q0FBOEMsOENBQThDLDZD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Z2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vcGFyc2VJU08vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vY29uc3RhbnRzL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vZm9ybWF0RGlzdGFuY2VUb05vdy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0UmVsYXRpdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVGbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL21hdGNoL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hGbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2NvbXBhcmVBc2MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvY2xvbmVPYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9kaWZmZXJlbmNlSW5TZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yb3VuZGluZ01ldGhvZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9kaWZmZXJlbmNlSW5Nb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9kaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzTGFzdERheU9mTW9udGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9lbmRPZkRheS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2VuZE9mTW9udGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc0JlZm9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3NvcnRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdWktbW9kdWxlcy9jb250ZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91aS1tb2R1bGVzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdWktbW9kdWxlcy9uYXYuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdWktbW9kdWxlcy9oYW5kbGVycy9jb250ZW50SGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBpbml0RGVmYXVsdFRhc2tzIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQge1xuICBnZXREb25lUHJvamVjdEZyb21TdG9yYWdlLFxuICBnZXRQcm9qZWN0c0Zyb21TdG9yYWdlLFxuICB1cGRhdGVMb2NhbFN0b3JhZ2UsXG59IGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgYWRkVGFzayB9IGZyb20gXCIuL1Byb2plY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2sgfSBmcm9tIFwiLi9UYXNrXCI7XG5pbXBvcnQgeyBkaXNwbGF5LCBpbml0VUksIHVwZGF0ZSB9IGZyb20gXCIuL1VJXCI7IC8vIENPTU1FTlQ6IHVudXNlZCBmdW5jdGlvblxuaW1wb3J0IHsgdXBkYXRlVGFza3NFbGVtZW50IH0gZnJvbSBcIi4vdWktbW9kdWxlcy9jb250ZW50XCI7XG5pbXBvcnQgeyB1cGRhdGVOYXYgfSBmcm9tIFwiLi91aS1tb2R1bGVzL25hdlwiO1xuXG5sZXQgcHJvamVjdHMgPSBbXTtcbmxldCBhbGxUYXNrc1Byb2plY3Q7XG5sZXQgZG9uZTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgaW5pdERlZmF1bHRUYXNrcygpO1xuICBpbml0RGVmYXVsdFByb2plY3RzKCk7XG4gIGluaXRVSSgpO1xuICB1cGRhdGVUYXNrcygpO1xuICBkaXNwbGF5KGFsbFRhc2tzUHJvamVjdCk7XG59XG5cbi8vIENPTU1FTlQ6IHRoaXMgaXMgdXN1YWxseSBjYWxsZWQgYXMgYGZuYCBvciBgZnVuY2AsIG5vdCBgZnVuYCA6RFxuZnVuY3Rpb24gcnVuQW5kVXBkYXRlKGZ1biwgLi4uYXJncykge1xuICBmdW4oLi4uYXJncyk7XG4gIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuICB1cGRhdGVOYXYoKTtcbiAgdXBkYXRlVGFza3NFbGVtZW50KCk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHRhc2spIHtcbiAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgLy8gQ09NTUVOVDogZG9uZSBpcyBkZWZpbmVkIGFzIGBsZXQgZG9uZTtgLCB3aGljaCBtZWFucywgdGhhdCBkb25lIGNhbiBiZSB1bmRlZmluZWQuIFlvdSBzaG91bGQgY2hlY2sgaWYgZG9uZSBpcyBkZWZpbmVkIGJlZm9yZSB1c2luZyBpdC5cbiAgICBkb25lLnJlbW92ZShnZXRUYXNrSW5kZXgodGFzaywgZG9uZSkpO1xuICAgIHRhc2suY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICBsZXQgcHJvamVjdCA9IGdldFByb2plY3RCeUlkKHRhc2sucHJvamVjdCk7XG5cbiAgICBwcm9qZWN0LmFkZCh0YXNrKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHRhc2suY29tcGxldGVkID0gdHJ1ZTtcbiAgZG9uZS5hZGQodGFzayk7XG4gIHJlbW92ZVRhc2sodGFzay5pZCk7XG59XG5cbmZ1bmN0aW9uIGluaXREZWZhdWx0UHJvamVjdHMoKSB7XG4gIGNyZWF0ZURvbmVUYXNrc1Byb2plY3QoKTtcbiAgY3JlYXRlQWxsVGFza3NQcm9qZWN0KCk7XG4gIHByb2plY3RzID0gZ2V0UHJvamVjdHNGcm9tU3RvcmFnZShwcm9qZWN0cyk7XG4gIGRvbmUgPSBnZXREb25lUHJvamVjdEZyb21TdG9yYWdlKGRvbmUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbGxUYXNrc1Byb2plY3QoKSB7XG4gIGFsbFRhc2tzUHJvamVjdCA9IG5ld1Byb2plY3QoY29uZmlnLmFsbFByb2plY3QudGl0bGUpO1xuICBhbGxUYXNrc1Byb2plY3QuaWQgPSBjb25maWcuYWxsUHJvamVjdC5pZDtcbn1cblxuZnVuY3Rpb24gZ2V0SG9tZVByb2plY3QoKSB7XG4gIHJldHVybiBhbGxUYXNrc1Byb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGdldFVwZGF0ZWRIb21lUHJvamVjdCgpIHtcbiAgdXBkYXRlVGFza3MoKTtcbiAgcmV0dXJuIGFsbFRhc2tzUHJvamVjdDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGFza3MoKSB7XG4gIGFsbFRhc2tzUHJvamVjdC50YXNrcyA9IGFsbFRhc2tzUHJvamVjdC50YXNrcy5maWx0ZXIoKHRhc2spID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdEJ5SWQodGFzay5wcm9qZWN0KTtcbiAgICBpZiAocHJvamVjdCkgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IGFsbFRhc2tzUHJvamVjdC50aXRsZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBhbGxUYXNrc1Byb2plY3QudGFza3MgPSBhbGxUYXNrc1Byb2plY3QudGFza3MuY29uY2F0KGdldEFsbFRhc2tzKCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEb25lVGFza3NQcm9qZWN0KCkge1xuICBkb25lID0gY3JlYXRlUHJvamVjdChjb25maWcuZG9uZS50aXRsZSk7XG4gIGRvbmUuaWQgPSBjb25maWcuZG9uZS5pZDtcbn1cblxuZnVuY3Rpb24gZ2V0RG9uZUxpc3QoKSB7XG4gIHJldHVybiBkb25lO1xufVxuXG5mdW5jdGlvbiBhZGROZXdUYXNrKHByb2plY3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICBhZGRUYXNrKFxuICAgIGdldFByb2plY3RCeUlkKHByb2plY3RJZCksXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KVxuICApO1xufVxuXG5mdW5jdGlvbiByZW1vdmVUYXNrKGlkKSB7XG4gIC8vIENPTU1FTlQ6IGFmdGVyIHRoaXMgZnVuY3Rpb24gaXMgZW5kZWQsIHRhc2ssIHByb2plY3QgYW5kIGluZGV4IGFyZSBnb25uYSBiZSBkZXN0cm95ZWQuIFlvdSBzaG91bGQgdXNlIGNvbnN0IGZvciB0aGVtLlxuICBsZXQgdGFzayA9IGdldFRhc2tCeUlkKGlkKTtcbiAgbGV0IHByb2plY3QgPSBnZXRQcm9qZWN0QnlJZCh0YXNrLnByb2plY3QpO1xuICBsZXQgaW5kZXggPSBnZXRUYXNrSW5kZXgodGFzaywgcHJvamVjdCk7XG4gIHByb2plY3QucmVtb3ZlKGluZGV4KTtcbn1cblxuZnVuY3Rpb24gbW92ZVRhc2sodGFzaywgbmV3UHJvamVjdElkKSB7XG4gIGNvbnN0IG5ld1Byb2plY3QgPSBnZXRQcm9qZWN0QnlJZChuZXdQcm9qZWN0SWQpO1xuICByZW1vdmVUYXNrKHRhc2suaWQpO1xuICBhZGRUYXNrKG5ld1Byb2plY3QsIHRhc2spO1xufVxuXG5mdW5jdGlvbiBuZXdQcm9qZWN0KHRpdGxlKSB7XG4gIC8vIENPTU1FTlQ6IHVzZSBjb25zdCwgYW5kIHJlLXJldmlldyBvdGhlciBwbGFjZXMgdGhhdCB1c2VzIGxldCBpbnN0ZWFkIG9mIGNvbnN0LiBZb3Ugc2hvdWxkIHVzZSBjb25zdCBhcyBtdWNoIGFzIHBvc3NpYmxlLlxuICBsZXQgcHJvamVjdCA9IGNyZWF0ZVByb2plY3QodGl0bGUpO1xuICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuXG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVQcm9qZWN0KGlkKSB7XG4gIGxldCBwcm9qZWN0ID0gZ2V0UHJvamVjdEJ5SWQoaWQpO1xuICBsZXQgaW5kZXggPSBnZXRQcm9qZWN0SW5kZXgocHJvamVjdCk7XG4gIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG59XG5cbmZ1bmN0aW9uIGdldFRhc2tCeUlkKGlkLCBwcm9qZWN0KSB7XG4gIGlkID0gTnVtYmVyKGlkKTtcblxuICBpZiAocHJvamVjdCkge1xuICAgIHJldHVybiBwcm9qZWN0LnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suaWQgPT0gaWQpO1xuICB9XG5cbiAgLy8gQ09NTUVOVDogZm91bmQgaXMgcmVhbGx5IGFic3RyYWN0LiBZb3Ugc2hvdWxkIHVzZSBhIG1vcmUgZGVzY3JpcHRpdmUgbmFtZS5cbiAgbGV0IGZvdW5kO1xuICBwcm9qZWN0c1xuICAgIC5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IC0xKVxuICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAvLyBDT01NRU5UOiB5b3UgY2FuIHVzZSBgZmluZGAgaW5zdGVhZCBvZiBgZm9yRWFjaGAgYW5kIGBpZmAgc3RhdGVtZW50XG4gICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgaWYgKHRhc2suaWQgPT09IGlkKSB7XG4gICAgICAgICAgZm91bmQgPSB0YXNrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgaWYgKCFmb3VuZCkge1xuICAgIGZvdW5kID0gZG9uZS50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmlkID09IGlkKTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuZnVuY3Rpb24gZ2V0VGFza0luZGV4KHRhc2ssIHByb2plY3QpIHtcbiAgY29uc3QgaW5kZXggPSBwcm9qZWN0LnRhc2tzLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PSB0YXNrLmlkKTtcblxuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfSBlbHNlIHsgLy8gQ09NTUVOVDogZWxzZSBpcyBub3QgbmVlZGVkIGhlcmVcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAvLyBDT01NRU5UOiB1c2UgdGVtcGxhdGUgbGl0ZXJhbHMgaW5zdGVhZCBvZiBzdHJpbmcgY29uY2F0ZW5hdGlvblxuICAgICAgXCJUQVNLIElTIE5PVCBGT1VORCBJTiBUSEUgUFJPSkVDVCAtIFwiICtcbiAgICAgICAgcHJvamVjdC50aXRsZSArXG4gICAgICAgIFwiLCBUQVNLIElOREVYIElTIC0xXCJcbiAgICApO1xuICB9XG59XG5cbi8vIENPTU1FTlQ6IGZ1bmN0aW9uIG5hbWUgbXVzdCBiZSBhIHZlcmJcbmZ1bmN0aW9uIHByb2plY3RFeGlzdHMocHJvamVjdCkge1xuICAvLyBDT01NRU5UOiB3aG9sZSBmdW5jdGlvbiBjb3VsZCBiZSBgcmV0dXJuIGdldFByb2plY3RCeUlkKHByb2plY3QuaWQpICE9PSB1bmRlZmluZWRgIG9yIHNvbWV0aGluZyBsaWtlIHRoYXRcbiAgY29uc3QgZm91bmQgPSBnZXRQcm9qZWN0QnlJZChwcm9qZWN0LmlkKTtcbiAgaWYgKCFmb3VuZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9qZWN0QnlJZChpZCkge1xuICBpZCA9IE51bWJlcihpZCk7XG5cbiAgaWYgKGlkID09PSAtMSkgcmV0dXJuIGdldEhvbWVQcm9qZWN0KCk7XG4gIGlmIChpZCA9PT0gY29uZmlnLmRvbmUuaWQpIHJldHVybiBnZXREb25lTGlzdCgpO1xuXG4gIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09IGlkKTsgLy8gQ09NTUVOVDogPT09IGluc3RlYWQgb2YgPT1cbiAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIGdldEFsbFRhc2tzKCkge1xuICBsZXQgYXJyYXkgPSBbXTsgLy8gQ09NTUVOVDogdXNlIGNvbnN0XG4gIHByb2plY3RzXG4gICAgLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSAhPT0gYWxsVGFza3NQcm9qZWN0LnRpdGxlKVxuICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBhcnJheSA9IGFycmF5LmNvbmNhdChwcm9qZWN0LnRhc2tzKTtcbiAgICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRQcm9qZWN0SW5kZXgocHJvamVjdCkge1xuICBsZXQgaW5kZXggPSBwcm9qZWN0cy5pbmRleE9mKHByb2plY3QpO1xuICByZXR1cm4gaW5kZXg7IC8vIENPTU1FTlQ6IHlvdSBjYW4ganVzdCBgcmV0dXJuIHByb2plY3RzLmluZGV4T2YocHJvamVjdClgXG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3RzQW5kVGl0bGVzKCkge1xuICBsZXQgdGl0bGVzID0gW107XG4gIHByb2plY3RzXG4gICAgLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5pZCAhPT0gYWxsVGFza3NQcm9qZWN0LmlkKVxuICAgIC8vIENPTU1FTlQ6IHVzZSBtYXAgaW5zdGVhZCBvZiBmb3JFYWNoIGFuZCBuZXcgYXJyYXkgYW5kIHJldHVybiB0aGUgcmVzdWx0LlxuICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgIG9ialtwcm9qZWN0LnRpdGxlXSA9IHByb2plY3QuaWQ7XG4gICAgICB0aXRsZXMucHVzaChvYmopO1xuICAgIH0pO1xuICByZXR1cm4gdGl0bGVzO1xufVxuXG5leHBvcnQge1xuICBwcm9qZWN0cyxcbiAgZG9uZSxcbiAgbmV3UHJvamVjdCxcbiAgaW5pdCxcbiAgZ2V0UHJvamVjdHNBbmRUaXRsZXMgYXMgZ2V0UHJvamVjdHNUaXRsZXMsXG4gIHJlbW92ZVRhc2ssXG4gIGdldFByb2plY3RJbmRleCxcbiAgZ2V0VGFza0J5SWQsXG4gIGFkZE5ld1Rhc2ssXG4gIGdldEhvbWVQcm9qZWN0LFxuICBnZXRQcm9qZWN0QnlJZCxcbiAgZ2V0RG9uZUxpc3QsXG4gIHRvZ2dsZVRhc2tDb21wbGV0aW9uLFxuICBtb3ZlVGFzayxcbiAgcmVtb3ZlUHJvamVjdCxcbiAgcnVuQW5kVXBkYXRlLFxuICBwcm9qZWN0RXhpc3RzLFxuICBnZXRVcGRhdGVkSG9tZVByb2plY3QsXG4gIHVwZGF0ZVRhc2tzLFxufTtcbiIsImxldCBjb25maWcgPSB7XG4gICAgcGFnZToge1xuICAgICAgICB0aXRsZTogJ1Rhc2tzJyxcbiAgICB9LFxuICAgIGFsbFByb2plY3Q6IHtcbiAgICAgIHRpdGxlOiAnQWxsIHRhc2tzJyxcbiAgICAgIGlkOiAtMVxuICAgIH1cbiAgICAsXG4gICAgZG9uZToge1xuICAgICAgdGl0bGU6ICdDb21wbGV0ZWQgdGFza3MnLFxuICAgICAgaWQ6IC0yLFxuICAgIH0sXG4gICAgcHJpb3JpdGllczogW1wiUDFcIiwgXCJQMlwiLCBcIlAzXCIsIFwiUDRcIl0sXG59O1xuXG5cbmNvbnN0IHByaW9yaXR5Q29sb3JzID0geydQMScgOiAnLS1wMS1jb2xvcicsXG4nUDInIDogJy0tcDItY29sb3InLFxuJ1AzJyA6ICctLXAzLWNvbG9yJyxcbidQNCcgOiAnLS1wNC1jb2xvcid9O1xuXG5jb25zdCBwcmlvcml0eUJvcmRlckNvbG9ycyA9XG57J1AxJyA6ICctLXAxLWJvcmRlci1jb2xvcicsXG4nUDInIDogJy0tcDItYm9yZGVyLWNvbG9yJyxcbidQMycgOiAnLS1wMy1ib3JkZXItY29sb3InLFxuJ1A0JyA6ICctLXA0LWJvcmRlci1jb2xvcid9O1xuXG5leHBvcnQge2NvbmZpZywgcHJpb3JpdHlDb2xvcnMsIHByaW9yaXR5Qm9yZGVyQ29sb3JzfTtcbiIsImltcG9ydCB7IGZvcm1hdERpc3RhbmNlVG9Ob3csIGlzQmVmb3JlLCBwYXJzZUlTTyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgbmV3UHJvamVjdCB9IGZyb20gXCIuL01hbmFnZXJcIjtcbmltcG9ydCB7IGFkZFRhc2sgfSBmcm9tIFwiLi9Qcm9qZWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVUYXNrIH0gZnJvbSBcIi4vVGFza1wiO1xuXG5mdW5jdGlvbiBkdWVEYXRlQ2hlY2tlcihkYXRlKSB7XG4gIGRhdGUgPSBwYXJzZUlTTyhkYXRlKTtcblxuICBpZiAoZGF0ZSA9PSBcIkludmFsaWQgRGF0ZVwiKSByZXR1cm47XG4gIGxldCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93KGRhdGUpO1xuXG4gIGxldCBzdGF0dXMgPSBpc0JlZm9yZShkYXRlLCBuZXcgRGF0ZSgpKVxuICAgID8gYCR7cmVzdWx0fSBvdmVyZHVlYFxuICAgIDogYGR1ZSBpbiAke3Jlc3VsdH1gO1xuXG4gIHJldHVybiBzdGF0dXM7XG59XG5cbmZ1bmN0aW9uIGluaXREZWZhdWx0VGFza3MoKSB7XG4gIGxldCBwcm9qZWN0ID0gbmV3UHJvamVjdChcIkxpZmVcIik7XG4gIGxldCBwcm9qZWN0MiA9IG5ld1Byb2plY3QoXCJXb3JrXCIpO1xuICBsZXQgcHJvamVjdDUgPSBuZXdQcm9qZWN0KFwiSWRlYXNcIik7XG4gIGxldCBwcm9qZWN0MyA9IG5ld1Byb2plY3QoXCJPdGhlclwiKTtcblxuICBhZGRUYXNrKFxuICAgIHByb2plY3QsXG4gICAgY3JlYXRlVGFzayhcIlRha2Ugb3V0IHRoZSB0cmFzaFwiLCBcInNvbWV3aGVyZSFcIiwgXCIyMDIyLTA5LTIzXCIsIFwiUDFcIilcbiAgKTtcbiAgYWRkVGFzayhwcm9qZWN0LCBjcmVhdGVUYXNrKFwiQ2xlYW4gYWxsIHdpbmRvd3NcIiwgXCJ5ZWFoXCIsIFwiMjAyMi0xMi0yNFwiLCBcIlAxXCIpKTtcblxuICBhZGRUYXNrKFxuICAgIHByb2plY3QyLFxuICAgIGNyZWF0ZVRhc2soXCJXcml0ZSBhIGxldHRlclwiLCBcIlNlbmQgaXQgdG8gYm9iQGJvYi5ib2JcIiwgXCIyMDIyLTExLTI4XCIsIFwiUDRcIilcbiAgKTtcblxuICBhZGRUYXNrKFxuICAgIHByb2plY3QzLFxuICAgIGNyZWF0ZVRhc2soXCJMb29rIGF0IHRoZSB0cmVlc1wiLCBcIkl0IHNob3VsZCBiZSBuaWNlXCIsIFwiMjAyMi0wOS0yNVwiLCBcIlAyXCIpXG4gICk7XG59XG5cbmV4cG9ydCB7IGR1ZURhdGVDaGVja2VyLCBpbml0RGVmYXVsdFRhc2tzIH07XG5cbiIsImltcG9ydCB7IGdldFByb2plY3ROdW1iZXIgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcblxubGV0IG51bWJlciA9IGdldFByb2plY3ROdW1iZXIoKTtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lID0gJ1Byb2plY3QgdGl0bGUnKSB7XG4gIGxldCB0aXRsZSA9IG5hbWU7XG4gIGxldCBpZCA9IG51bWJlcisrO1xuICBsZXQgdGFza3MgPSBbXTtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBpZDogaWQsXG4gICAgdGFza3M6IHRhc2tzLFxuICAgIGFkZDogZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIGFkZFRhc2socHJvamVjdCwgdGFzaykge1xuICB0YXNrLnByb2plY3QgPSBwcm9qZWN0LmlkO1xuICBwcm9qZWN0LmFkZCh0YXNrKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgYWRkVGFzaywgbnVtYmVyfTtcbiIsImltcG9ydCB7IGRvbmUsIGdldERvbmVMaXN0LCBwcm9qZWN0cyB9IGZyb20gXCIuL01hbmFnZXJcIjtcbmltcG9ydCB7IG51bWJlciBhcyBwcm9qZWN0TnVtYmVyIH0gZnJvbSBcIi4vUHJvamVjdFwiO1xuaW1wb3J0IHsgbnVtYmVyIGFzIHRhc2tOdW1iZXIgfSBmcm9tIFwiLi9UYXNrXCI7XG5cbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcbiAgIGNvbnNvbGUud2FybignVVBEQVRJTkcgTE9DQUwgU1RPUkFHRScpO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZG9uZVwiLCBKU09OLnN0cmluZ2lmeShkb25lKSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza051bWJlclwiLCB0YXNrTnVtYmVyKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TnVtYmVyXCIsIHByb2plY3ROdW1iZXIpOyBcbn1cblxuZnVuY3Rpb24gZ2V0VGFza051bWJlcigpIHtcbiByZXR1cm4gZ2V0TnVtYmVyKFwidGFza051bWJlclwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvamVjdE51bWJlcigpIHtcbiByZXR1cm4gZ2V0TnVtYmVyKFwicHJvamVjdE51bWJlclwiKTtcbn1cblxuZnVuY3Rpb24gZ2V0TnVtYmVyKGtleSkge1xuXG4gIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG59XG5cbmZ1bmN0aW9uIGdldERvbmVQcm9qZWN0RnJvbVN0b3JhZ2UoZG9uZSkge1xuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkb25lXCIpKSB7XG4gICAgY29uc3Qgc3RvcmVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRvbmVcIikpO1xuXG4gICAgcmVhZGRNZXRob2RzKHN0b3JlZCk7XG5cbiAgICByZXR1cm4gc3RvcmVkO1xuICB9XG5cbiAgcmV0dXJuIGRvbmU7XG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3RzRnJvbVN0b3JhZ2UocHJvamVjdHMpIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHtcbiAgICBjb25zdCBzdG9yZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xuXG4gICAgc3RvcmVkLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIHJlYWRkTWV0aG9kcyhwcm9qZWN0KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdG9yZWQ7XG4gIH1cblxuICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmZ1bmN0aW9uIHJlYWRkTWV0aG9kcyhwcm9qZWN0KSB7XG4gIHByb2plY3QuYWRkID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICBwcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XG4gIH07XG5cbiAgcHJvamVjdC5yZW1vdmUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIHByb2plY3QudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIGdldFRhc2tOdW1iZXIsXG4gIGdldFByb2plY3ROdW1iZXIsXG4gIHVwZGF0ZUxvY2FsU3RvcmFnZSxcbiAgZ2V0RG9uZVByb2plY3RGcm9tU3RvcmFnZSxcbiAgZ2V0UHJvamVjdHNGcm9tU3RvcmFnZSxcbn07XG4iLCJpbXBvcnQgeyBnZXRUYXNrTnVtYmVyIH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlXCI7XG5cbmxldCBudW1iZXIgPSBnZXRUYXNrTnVtYmVyKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICBsZXQgcHJvamVjdDtcbiAgbGV0IGlkID0gbnVtYmVyKys7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgZHVlRGF0ZTogZHVlRGF0ZSxcbiAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgcHJvamVjdDogcHJvamVjdCxcbiAgICBpZDogaWQsXG4gIH07XG59XG5cbmV4cG9ydCB7IG51bWJlciwgY3JlYXRlVGFzayB9O1xuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5Ib3VyLCBtaWxsaXNlY29uZHNJbk1pbnV0ZSB9IGZyb20gXCIuLi9jb25zdGFudHMvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBwYXJzZUlTT1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBQYXJzZSBJU08gc3RyaW5nXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gc3RyaW5nIGluIElTTyA4NjAxIGZvcm1hdCBhbmQgcmV0dXJuIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpc24ndCBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIGNhbm5vdCBwYXJzZSB0aGUgc3RyaW5nIG9yXG4gKiB0aGUgdmFsdWVzIGFyZSBpbnZhbGlkLCBpdCByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHBhcnNlSVNPKCcyMDE0LTAyLTExVDExOjMwOjMwJylcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgc3RyaW5nICcrMDIwMTQxMDEnIHRvIGRhdGUsXG4gKiAvLyBpZiB0aGUgYWRkaXRpb25hbCBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBleHRlbmRlZCB5ZWFyIGZvcm1hdCBpcyAxOlxuICogY29uc3QgcmVzdWx0ID0gcGFyc2VJU08oJyswMjAxNDEwMScsIHsgYWRkaXRpb25hbERpZ2l0czogMSB9KVxuICogLy89PiBGcmkgQXByIDExIDIwMTQgMDA6MDA6MDBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUlTTyhhcmd1bWVudCwgb3B0aW9ucykge1xuICB2YXIgX29wdGlvbnMkYWRkaXRpb25hbERpO1xuXG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYWRkaXRpb25hbERpZ2l0cyA9IHRvSW50ZWdlcigoX29wdGlvbnMkYWRkaXRpb25hbERpID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHMpICE9PSBudWxsICYmIF9vcHRpb25zJGFkZGl0aW9uYWxEaSAhPT0gdm9pZCAwID8gX29wdGlvbnMkYWRkaXRpb25hbERpIDogMik7XG5cbiAgaWYgKGFkZGl0aW9uYWxEaWdpdHMgIT09IDIgJiYgYWRkaXRpb25hbERpZ2l0cyAhPT0gMSAmJiBhZGRpdGlvbmFsRGlnaXRzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2FkZGl0aW9uYWxEaWdpdHMgbXVzdCBiZSAwLCAxIG9yIDInKTtcbiAgfVxuXG4gIGlmICghKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICB2YXIgZGF0ZVN0cmluZ3MgPSBzcGxpdERhdGVTdHJpbmcoYXJndW1lbnQpO1xuICB2YXIgZGF0ZTtcblxuICBpZiAoZGF0ZVN0cmluZ3MuZGF0ZSkge1xuICAgIHZhciBwYXJzZVllYXJSZXN1bHQgPSBwYXJzZVllYXIoZGF0ZVN0cmluZ3MuZGF0ZSwgYWRkaXRpb25hbERpZ2l0cyk7XG4gICAgZGF0ZSA9IHBhcnNlRGF0ZShwYXJzZVllYXJSZXN1bHQucmVzdERhdGVTdHJpbmcsIHBhcnNlWWVhclJlc3VsdC55ZWFyKTtcbiAgfVxuXG4gIGlmICghZGF0ZSB8fCBpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgdmFyIHRpbWUgPSAwO1xuICB2YXIgb2Zmc2V0O1xuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lKSB7XG4gICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKTtcblxuICAgIGlmIChpc05hTih0aW1lKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGVTdHJpbmdzLnRpbWV6b25lKSB7XG4gICAgb2Zmc2V0ID0gcGFyc2VUaW1lem9uZShkYXRlU3RyaW5ncy50aW1lem9uZSk7XG5cbiAgICBpZiAoaXNOYU4ob2Zmc2V0KSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBkaXJ0eURhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lKTsgLy8ganMgcGFyc2VkIHN0cmluZyBhc3N1bWluZyBpdCdzIGluIFVUQyB0aW1lem9uZVxuICAgIC8vIGJ1dCB3ZSBuZWVkIGl0IHRvIGJlIHBhcnNlZCBpbiBvdXIgdGltZXpvbmVcbiAgICAvLyBzbyB3ZSB1c2UgdXRjIHZhbHVlcyB0byBidWlsZCBkYXRlIGluIG91ciB0aW1lem9uZS5cbiAgICAvLyBZZWFyIHZhbHVlcyBmcm9tIDAgdG8gOTkgbWFwIHRvIHRoZSB5ZWFycyAxOTAwIHRvIDE5OTlcbiAgICAvLyBzbyBzZXQgeWVhciBleHBsaWNpdGx5IHdpdGggc2V0RnVsbFllYXIuXG5cbiAgICB2YXIgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldEZ1bGxZZWFyKGRpcnR5RGF0ZS5nZXRVVENGdWxsWWVhcigpLCBkaXJ0eURhdGUuZ2V0VVRDTW9udGgoKSwgZGlydHlEYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgcmVzdWx0LnNldEhvdXJzKGRpcnR5RGF0ZS5nZXRVVENIb3VycygpLCBkaXJ0eURhdGUuZ2V0VVRDTWludXRlcygpLCBkaXJ0eURhdGUuZ2V0VVRDU2Vjb25kcygpLCBkaXJ0eURhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSArIG9mZnNldCk7XG59XG52YXIgcGF0dGVybnMgPSB7XG4gIGRhdGVUaW1lRGVsaW1pdGVyOiAvW1QgXS8sXG4gIHRpbWVab25lRGVsaW1pdGVyOiAvW1ogXS9pLFxuICB0aW1lem9uZTogLyhbWistXS4qKSQvXG59O1xudmFyIGRhdGVSZWdleCA9IC9eLT8oPzooXFxkezN9KXwoXFxkezJ9KSg/Oi0/KFxcZHsyfSkpP3xXKFxcZHsyfSkoPzotPyhcXGR7MX0pKT98KSQvO1xudmFyIHRpbWVSZWdleCA9IC9eKFxcZHsyfSg/OlsuLF1cXGQqKT8pKD86Oj8oXFxkezJ9KD86Wy4sXVxcZCopPykpPyg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8kLztcbnZhciB0aW1lem9uZVJlZ2V4ID0gL14oWystXSkoXFxkezJ9KSg/Ojo/KFxcZHsyfSkpPyQvO1xuXG5mdW5jdGlvbiBzcGxpdERhdGVTdHJpbmcoZGF0ZVN0cmluZykge1xuICB2YXIgZGF0ZVN0cmluZ3MgPSB7fTtcbiAgdmFyIGFycmF5ID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy5kYXRlVGltZURlbGltaXRlcik7XG4gIHZhciB0aW1lU3RyaW5nOyAvLyBUaGUgcmVnZXggbWF0Y2ggc2hvdWxkIG9ubHkgcmV0dXJuIGF0IG1heGltdW0gdHdvIGFycmF5IGVsZW1lbnRzLlxuICAvLyBbZGF0ZV0sIFt0aW1lXSwgb3IgW2RhdGUsIHRpbWVdLlxuXG4gIGlmIChhcnJheS5sZW5ndGggPiAyKSB7XG4gICAgcmV0dXJuIGRhdGVTdHJpbmdzO1xuICB9XG5cbiAgaWYgKC86Ly50ZXN0KGFycmF5WzBdKSkge1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVswXTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gYXJyYXlbMF07XG4gICAgdGltZVN0cmluZyA9IGFycmF5WzFdO1xuXG4gICAgaWYgKHBhdHRlcm5zLnRpbWVab25lRGVsaW1pdGVyLnRlc3QoZGF0ZVN0cmluZ3MuZGF0ZSkpIHtcbiAgICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBkYXRlU3RyaW5nLnNwbGl0KHBhdHRlcm5zLnRpbWVab25lRGVsaW1pdGVyKVswXTtcbiAgICAgIHRpbWVTdHJpbmcgPSBkYXRlU3RyaW5nLnN1YnN0cihkYXRlU3RyaW5ncy5kYXRlLmxlbmd0aCwgZGF0ZVN0cmluZy5sZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgdmFyIHRva2VuID0gcGF0dGVybnMudGltZXpvbmUuZXhlYyh0aW1lU3RyaW5nKTtcblxuICAgIGlmICh0b2tlbikge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmcucmVwbGFjZSh0b2tlblsxXSwgJycpO1xuICAgICAgZGF0ZVN0cmluZ3MudGltZXpvbmUgPSB0b2tlblsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGVTdHJpbmdzO1xufVxuXG5mdW5jdGlvbiBwYXJzZVllYXIoZGF0ZVN0cmluZywgYWRkaXRpb25hbERpZ2l0cykge1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdeKD86KFxcXFxkezR9fFsrLV1cXFxcZHsnICsgKDQgKyBhZGRpdGlvbmFsRGlnaXRzKSArICd9KXwoXFxcXGR7Mn18WystXVxcXFxkeycgKyAoMiArIGFkZGl0aW9uYWxEaWdpdHMpICsgJ30pJCknKTtcbiAgdmFyIGNhcHR1cmVzID0gZGF0ZVN0cmluZy5tYXRjaChyZWdleCk7IC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG5cbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIHtcbiAgICB5ZWFyOiBOYU4sXG4gICAgcmVzdERhdGVTdHJpbmc6ICcnXG4gIH07XG4gIHZhciB5ZWFyID0gY2FwdHVyZXNbMV0gPyBwYXJzZUludChjYXB0dXJlc1sxXSkgOiBudWxsO1xuICB2YXIgY2VudHVyeSA9IGNhcHR1cmVzWzJdID8gcGFyc2VJbnQoY2FwdHVyZXNbMl0pIDogbnVsbDsgLy8gZWl0aGVyIHllYXIgb3IgY2VudHVyeSBpcyBudWxsLCBub3QgYm90aFxuXG4gIHJldHVybiB7XG4gICAgeWVhcjogY2VudHVyeSA9PT0gbnVsbCA/IHllYXIgOiBjZW50dXJ5ICogMTAwLFxuICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKChjYXB0dXJlc1sxXSB8fCBjYXB0dXJlc1syXSkubGVuZ3RoKVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZVN0cmluZywgeWVhcikge1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICBpZiAoeWVhciA9PT0gbnVsbCkgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIHZhciBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2goZGF0ZVJlZ2V4KTsgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHN0cmluZ1xuXG4gIGlmICghY2FwdHVyZXMpIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB2YXIgaXNXZWVrRGF0ZSA9ICEhY2FwdHVyZXNbNF07XG4gIHZhciBkYXlPZlllYXIgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzFdKTtcbiAgdmFyIG1vbnRoID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1syXSkgLSAxO1xuICB2YXIgZGF5ID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1szXSk7XG4gIHZhciB3ZWVrID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1s0XSk7XG4gIHZhciBkYXlPZldlZWsgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzVdKSAtIDE7XG5cbiAgaWYgKGlzV2Vla0RhdGUpIHtcbiAgICBpZiAoIXZhbGlkYXRlV2Vla0RhdGUoeWVhciwgd2VlaywgZGF5T2ZXZWVrKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRheU9mSVNPV2Vla1llYXIoeWVhciwgd2VlaywgZGF5T2ZXZWVrKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApO1xuXG4gICAgaWYgKCF2YWxpZGF0ZURhdGUoeWVhciwgbW9udGgsIGRheSkgfHwgIXZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG5cbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoLCBNYXRoLm1heChkYXlPZlllYXIsIGRheSkpO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZVVuaXQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID8gcGFyc2VJbnQodmFsdWUpIDogMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lKHRpbWVTdHJpbmcpIHtcbiAgdmFyIGNhcHR1cmVzID0gdGltZVN0cmluZy5tYXRjaCh0aW1lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gTmFOOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuXG4gIHZhciBob3VycyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMV0pO1xuICB2YXIgbWludXRlcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMl0pO1xuICB2YXIgc2Vjb25kcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbM10pO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gaG91cnMgKiBtaWxsaXNlY29uZHNJbkhvdXIgKyBtaW51dGVzICogbWlsbGlzZWNvbmRzSW5NaW51dGUgKyBzZWNvbmRzICogMTAwMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lVW5pdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgcGFyc2VGbG9hdCh2YWx1ZS5yZXBsYWNlKCcsJywgJy4nKSkgfHwgMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lem9uZSh0aW1lem9uZVN0cmluZykge1xuICBpZiAodGltZXpvbmVTdHJpbmcgPT09ICdaJykgcmV0dXJuIDA7XG4gIHZhciBjYXB0dXJlcyA9IHRpbWV6b25lU3RyaW5nLm1hdGNoKHRpbWV6b25lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gMDtcbiAgdmFyIHNpZ24gPSBjYXB0dXJlc1sxXSA9PT0gJysnID8gLTEgOiAxO1xuICB2YXIgaG91cnMgPSBwYXJzZUludChjYXB0dXJlc1syXSk7XG4gIHZhciBtaW51dGVzID0gY2FwdHVyZXNbM10gJiYgcGFyc2VJbnQoY2FwdHVyZXNbM10pIHx8IDA7XG5cbiAgaWYgKCF2YWxpZGF0ZVRpbWV6b25lKGhvdXJzLCBtaW51dGVzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gc2lnbiAqIChob3VycyAqIG1pbGxpc2Vjb25kc0luSG91ciArIG1pbnV0ZXMgKiBtaWxsaXNlY29uZHNJbk1pbnV0ZSk7XG59XG5cbmZ1bmN0aW9uIGRheU9mSVNPV2Vla1llYXIoaXNvV2Vla1llYXIsIHdlZWssIGRheSkge1xuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGlzb1dlZWtZZWFyLCAwLCA0KTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeURheSA9IGRhdGUuZ2V0VVRDRGF5KCkgfHwgNztcbiAgdmFyIGRpZmYgPSAod2VlayAtIDEpICogNyArIGRheSArIDEgLSBmb3VydGhPZkphbnVhcnlEYXk7XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpO1xuICByZXR1cm4gZGF0ZTtcbn0gLy8gVmFsaWRhdGlvbiBmdW5jdGlvbnNcbi8vIEZlYnJ1YXJ5IGlzIG51bGwgdG8gaGFuZGxlIHRoZSBsZWFwIHllYXIgKHVzaW5nIHx8KVxuXG5cbnZhciBkYXlzSW5Nb250aHMgPSBbMzEsIG51bGwsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuZnVuY3Rpb24gaXNMZWFwWWVhckluZGV4KHllYXIpIHtcbiAgcmV0dXJuIHllYXIgJSA0MDAgPT09IDAgfHwgeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSB7XG4gIHJldHVybiBtb250aCA+PSAwICYmIG1vbnRoIDw9IDExICYmIGRhdGUgPj0gMSAmJiBkYXRlIDw9IChkYXlzSW5Nb250aHNbbW9udGhdIHx8IChpc0xlYXBZZWFySW5kZXgoeWVhcikgPyAyOSA6IDI4KSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpIHtcbiAgcmV0dXJuIGRheU9mWWVhciA+PSAxICYmIGRheU9mWWVhciA8PSAoaXNMZWFwWWVhckluZGV4KHllYXIpID8gMzY2IDogMzY1KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVXZWVrRGF0ZShfeWVhciwgd2VlaywgZGF5KSB7XG4gIHJldHVybiB3ZWVrID49IDEgJiYgd2VlayA8PSA1MyAmJiBkYXkgPj0gMCAmJiBkYXkgPD0gNjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSB7XG4gIGlmIChob3VycyA9PT0gMjQpIHtcbiAgICByZXR1cm4gbWludXRlcyA9PT0gMCAmJiBzZWNvbmRzID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIHNlY29uZHMgPj0gMCAmJiBzZWNvbmRzIDwgNjAgJiYgbWludXRlcyA+PSAwICYmIG1pbnV0ZXMgPCA2MCAmJiBob3VycyA+PSAwICYmIGhvdXJzIDwgMjU7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVGltZXpvbmUoX2hvdXJzLCBtaW51dGVzKSB7XG4gIHJldHVybiBtaW51dGVzID49IDAgJiYgbWludXRlcyA8PSA1OTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0ludGVnZXIoZGlydHlOdW1iZXIpIHtcbiAgaWYgKGRpcnR5TnVtYmVyID09PSBudWxsIHx8IGRpcnR5TnVtYmVyID09PSB0cnVlIHx8IGRpcnR5TnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXI7XG4gIH1cblxuICByZXR1cm4gbnVtYmVyIDwgMCA/IE1hdGguY2VpbChudW1iZXIpIDogTWF0aC5mbG9vcihudW1iZXIpO1xufSIsIi8qKlxuICogRGF5cyBpbiAxIHdlZWsuXG4gKlxuICogQG5hbWUgZGF5c0luV2Vla1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuZXhwb3J0IHZhciBkYXlzSW5XZWVrID0gNztcbi8qKlxuICogRGF5cyBpbiAxIHllYXJcbiAqIE9uZSB5ZWFycyBlcXVhbHMgMzY1LjI0MjUgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIGZvcm11bGE6XG4gKlxuICogPiBMZWFwIHllYXIgb2NjdXJlcyBldmVyeSA0IHllYXJzLCBleGNlcHQgZm9yIHllYXJzIHRoYXQgYXJlIGRpdmlzYWJsZSBieSAxMDAgYW5kIG5vdCBkaXZpc2FibGUgYnkgNDAwLlxuICogPiAxIG1lYW4geWVhciA9ICgzNjUrMS80LTEvMTAwKzEvNDAwKSBkYXlzID0gMzY1LjI0MjUgZGF5c1xuICpcbiAqIEBuYW1lIGRheXNJblllYXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBkYXlzSW5ZZWFyID0gMzY1LjI0MjU7XG4vKipcbiAqIE1heGltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBuYW1lIG1heFRpbWVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtYXhUaW1lID0gTWF0aC5wb3coMTAsIDgpICogMjQgKiA2MCAqIDYwICogMTAwMDtcbi8qKlxuICogTWlsbGlzZWNvbmRzIGluIDEgbWludXRlXG4gKlxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5NaW51dGVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaWxsaXNlY29uZHNJbk1pbnV0ZSA9IDYwMDAwO1xuLyoqXG4gKiBNaWxsaXNlY29uZHMgaW4gMSBob3VyXG4gKlxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5Ib3VyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5Ib3VyID0gMzYwMDAwMDtcbi8qKlxuICogTWlsbGlzZWNvbmRzIGluIDEgc2Vjb25kXG4gKlxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5TZWNvbmRcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaWxsaXNlY29uZHNJblNlY29uZCA9IDEwMDA7XG4vKipcbiAqIE1pbmltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBuYW1lIG1pblRpbWVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaW5UaW1lID0gLW1heFRpbWU7XG4vKipcbiAqIE1pbnV0ZXMgaW4gMSBob3VyXG4gKlxuICogQG5hbWUgbWludXRlc0luSG91clxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pbnV0ZXNJbkhvdXIgPSA2MDtcbi8qKlxuICogTW9udGhzIGluIDEgcXVhcnRlclxuICpcbiAqIEBuYW1lIG1vbnRoc0luUXVhcnRlclxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1vbnRoc0luUXVhcnRlciA9IDM7XG4vKipcbiAqIE1vbnRocyBpbiAxIHllYXJcbiAqXG4gKiBAbmFtZSBtb250aHNJblllYXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtb250aHNJblllYXIgPSAxMjtcbi8qKlxuICogUXVhcnRlcnMgaW4gMSB5ZWFyXG4gKlxuICogQG5hbWUgcXVhcnRlcnNJblllYXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBxdWFydGVyc0luWWVhciA9IDQ7XG4vKipcbiAqIFNlY29uZHMgaW4gMSBob3VyXG4gKlxuICogQG5hbWUgc2Vjb25kc0luSG91clxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIHNlY29uZHNJbkhvdXIgPSAzNjAwO1xuLyoqXG4gKiBTZWNvbmRzIGluIDEgbWludXRlXG4gKlxuICogQG5hbWUgc2Vjb25kc0luTWludXRlXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgc2Vjb25kc0luTWludXRlID0gNjA7XG4vKipcbiAqIFNlY29uZHMgaW4gMSBkYXlcbiAqXG4gKiBAbmFtZSBzZWNvbmRzSW5EYXlcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBzZWNvbmRzSW5EYXkgPSBzZWNvbmRzSW5Ib3VyICogMjQ7XG4vKipcbiAqIFNlY29uZHMgaW4gMSB3ZWVrXG4gKlxuICogQG5hbWUgc2Vjb25kc0luV2Vla1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIHNlY29uZHNJbldlZWsgPSBzZWNvbmRzSW5EYXkgKiA3O1xuLyoqXG4gKiBTZWNvbmRzIGluIDEgeWVhclxuICpcbiAqIEBuYW1lIHNlY29uZHNJblllYXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBzZWNvbmRzSW5ZZWFyID0gc2Vjb25kc0luRGF5ICogZGF5c0luWWVhcjtcbi8qKlxuICogU2Vjb25kcyBpbiAxIG1vbnRoXG4gKlxuICogQG5hbWUgc2Vjb25kc0luTW9udGhcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBzZWNvbmRzSW5Nb250aCA9IHNlY29uZHNJblllYXIgLyAxMjtcbi8qKlxuICogU2Vjb25kcyBpbiAxIHF1YXJ0ZXJcbiAqXG4gKiBAbmFtZSBzZWNvbmRzSW5RdWFydGVyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgc2Vjb25kc0luUXVhcnRlciA9IHNlY29uZHNJbk1vbnRoICogMzsiLCJpbXBvcnQgZGlzdGFuY2VJbldvcmRzIGZyb20gXCIuLi9mb3JtYXREaXN0YW5jZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcblxuLyoqXG4gKiBAbmFtZSBmb3JtYXREaXN0YW5jZVRvTm93XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZSBhbmQgbm93IGluIHdvcmRzLlxuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZSBhbmQgbm93IGluIHdvcmRzLlxuICpcbiAqIHwgRGlzdGFuY2UgdG8gbm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSZXN1bHQgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCAuLi4gMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBsZXNzIHRoYW4gYSBtaW51dGUgIHxcbiAqIHwgMzAgc2VjcyAuLi4gMSBtaW4gMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAxIG1pbnV0ZSAgICAgICAgICAgIHxcbiAqIHwgMSBtaW4gMzAgc2VjcyAuLi4gNDQgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBbMi4uNDRdIG1pbnV0ZXMgICAgIHxcbiAqIHwgNDQgbWlucyAuLi4gMzAgc2VjcyAuLi4gODkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCAxIGhvdXIgICAgICAgIHxcbiAqIHwgODkgbWlucyAzMCBzZWNzIC4uLiAyMyBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCBbMi4uMjRdIGhvdXJzIHxcbiAqIHwgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNDEgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgfCAxIGRheSAgICAgICAgICAgICAgIHxcbiAqIHwgNDEgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gMjkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgfCBbMi4uMzBdIGRheXMgICAgICAgIHxcbiAqIHwgMjkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA0NCBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgfCBhYm91dCAxIG1vbnRoICAgICAgIHxcbiAqIHwgNDQgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA1OSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgfCBhYm91dCAyIG1vbnRocyAgICAgIHxcbiAqIHwgNTkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiAxIHlyICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBbMi4uMTJdIG1vbnRocyAgICAgIHxcbiAqIHwgMSB5ciAuLi4gMSB5ciAzIG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCAxIHllYXIgICAgICAgIHxcbiAqIHwgMSB5ciAzIG1vbnRocyAuLi4gMSB5ciA5IG1vbnRoIHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBvdmVyIDEgeWVhciAgICAgICAgIHxcbiAqIHwgMSB5ciA5IG1vbnRocyAuLi4gMiB5cnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhbG1vc3QgMiB5ZWFycyAgICAgIHxcbiAqIHwgTiB5cnMgLi4uIE4geXJzIDMgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCBOIHllYXJzICAgICAgIHxcbiAqIHwgTiB5cnMgMyBtb250aHMgLi4uIE4geXJzIDkgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBvdmVyIE4geWVhcnMgICAgICAgIHxcbiAqIHwgTiB5cnMgOSBtb250aHMgLi4uIE4rMSB5cnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhbG1vc3QgTisxIHllYXJzICAgIHxcbiAqXG4gKiBXaXRoIGBvcHRpb25zLmluY2x1ZGVTZWNvbmRzID09IHRydWVgOlxuICogfCBEaXN0YW5jZSB0byBub3cgICAgIHwgUmVzdWx0ICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIHNlY3MgLi4uIDUgc2VjcyAgIHwgbGVzcyB0aGFuIDUgc2Vjb25kcyAgfFxuICogfCA1IHNlY3MgLi4uIDEwIHNlY3MgIHwgbGVzcyB0aGFuIDEwIHNlY29uZHMgfFxuICogfCAxMCBzZWNzIC4uLiAyMCBzZWNzIHwgbGVzcyB0aGFuIDIwIHNlY29uZHMgfFxuICogfCAyMCBzZWNzIC4uLiA0MCBzZWNzIHwgaGFsZiBhIG1pbnV0ZSAgICAgICAgfFxuICogfCA0MCBzZWNzIC4uLiA2MCBzZWNzIHwgbGVzcyB0aGFuIGEgbWludXRlICAgfFxuICogfCA2MCBzZWNzIC4uLiA5MCBzZWNzIHwgMSBtaW51dGUgICAgICAgICAgICAgfFxuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBub3QgcHJlc2VudCBpbiB0aGUgRlAgc3VibW9kdWxlIGFzXG4gKiA+IGl0IHVzZXMgYERhdGUubm93KClgIGludGVybmFsbHkgaGVuY2UgaW1wdXJlIGFuZCBjYW4ndCBiZSBzYWZlbHkgY3VycmllZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5pbmNsdWRlU2Vjb25kcz1mYWxzZV0gLSBkaXN0YW5jZXMgbGVzcyB0aGFuIGEgbWludXRlIGFyZSBtb3JlIGRldGFpbGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkZFN1ZmZpeD1mYWxzZV0gLSByZXN1bHQgc3BlY2lmaWVzIGlmIG5vdyBpcyBlYXJsaWVyIG9yIGxhdGVyIHRoYW4gdGhlIHBhc3NlZCBkYXRlXG4gKiBAcGFyYW0ge0xvY2FsZX0gW29wdGlvbnMubG9jYWxlPWRlZmF1bHRMb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3QuIFNlZSBbTG9jYWxlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL0xvY2FsZX1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgZGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0RGlzdGFuY2VgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDEgSmFudWFyeSAyMDE1LCB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAyIEp1bHkgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpXG4gKiApXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgbm93IGlzIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwLFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTUsIGluY2x1ZGluZyBzZWNvbmRzP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vdyhcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICB7aW5jbHVkZVNlY29uZHM6IHRydWV9XG4gKiApXG4gKiAvLz0+ICdsZXNzIHRoYW4gMjAgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNiwgd2l0aCBhIHN1ZmZpeD9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDAsIDEpLFxuICogICB7YWRkU3VmZml4OiB0cnVlfVxuICogKVxuICogLy89PiAnaW4gYWJvdXQgMSB5ZWFyJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgQXVndXN0IDIwMTYgaW4gRXNwZXJhbnRvP1xuICogY29uc3QgZW9Mb2NhbGUgPSByZXF1aXJlKCdkYXRlLWZucy9sb2NhbGUvZW8nKVxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vdyhcbiAqICAgbmV3IERhdGUoMjAxNiwgNywgMSksXG4gKiAgIHtsb2NhbGU6IGVvTG9jYWxlfVxuICogKVxuICogLy89PiAncGxpIG9sIDEgamFybydcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2VUb05vdyhkaXJ0eURhdGUsIG9wdGlvbnMpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHJldHVybiBkaXN0YW5jZUluV29yZHMoZGlydHlEYXRlLCBEYXRlLm5vdygpLCBvcHRpb25zKTtcbn0iLCJpbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9fbGliL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5pbXBvcnQgY29tcGFyZUFzYyBmcm9tIFwiLi4vY29tcGFyZUFzYy9pbmRleC5qc1wiO1xuaW1wb3J0IGRpZmZlcmVuY2VJbk1vbnRocyBmcm9tIFwiLi4vZGlmZmVyZW5jZUluTW9udGhzL2luZGV4LmpzXCI7XG5pbXBvcnQgZGlmZmVyZW5jZUluU2Vjb25kcyBmcm9tIFwiLi4vZGlmZmVyZW5jZUluU2Vjb25kcy9pbmRleC5qc1wiO1xuaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgY2xvbmVPYmplY3QgZnJvbSBcIi4uL19saWIvY2xvbmVPYmplY3QvaW5kZXguanNcIjtcbmltcG9ydCBhc3NpZ24gZnJvbSBcIi4uL19saWIvYXNzaWduL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTlVURVNfSU5fREFZID0gMTQ0MDtcbnZhciBNSU5VVEVTX0lOX0FMTU9TVF9UV09fREFZUyA9IDI1MjA7XG52YXIgTUlOVVRFU19JTl9NT05USCA9IDQzMjAwO1xudmFyIE1JTlVURVNfSU5fVFdPX01PTlRIUyA9IDg2NDAwO1xuLyoqXG4gKiBAbmFtZSBmb3JtYXREaXN0YW5jZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3Jkcy5cbiAqXG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUmVzdWx0ICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgLi4uIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbGVzcyB0aGFuIGEgbWludXRlICB8XG4gKiB8IDMwIHNlY3MgLi4uIDEgbWluIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMSBtaW51dGUgICAgICAgICAgICB8XG4gKiB8IDEgbWluIDMwIHNlY3MgLi4uIDQ0IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWzIuLjQ0XSBtaW51dGVzICAgICB8XG4gKiB8IDQ0IG1pbnMgLi4uIDMwIHNlY3MgLi4uIDg5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgMSBob3VyICAgICAgICB8XG4gKiB8IDg5IG1pbnMgMzAgc2VjcyAuLi4gMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgWzIuLjI0XSBob3VycyB8XG4gKiB8IDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDQxIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgIHwgMSBkYXkgICAgICAgICAgICAgICB8XG4gKiB8IDQxIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDI5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgIHwgWzIuLjMwXSBkYXlzICAgICAgICB8XG4gKiB8IDI5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNDQgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIHwgYWJvdXQgMSBtb250aCAgICAgICB8XG4gKiB8IDQ0IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNTkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIHwgYWJvdXQgMiBtb250aHMgICAgICB8XG4gKiB8IDU5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gMSB5ciAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWzIuLjEyXSBtb250aHMgICAgICB8XG4gKiB8IDEgeXIgLi4uIDEgeXIgMyBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgMSB5ZWFyICAgICAgICB8XG4gKiB8IDEgeXIgMyBtb250aHMgLi4uIDEgeXIgOSBtb250aCBzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgb3ZlciAxIHllYXIgICAgICAgICB8XG4gKiB8IDEgeXIgOSBtb250aHMgLi4uIDIgeXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWxtb3N0IDIgeWVhcnMgICAgICB8XG4gKiB8IE4geXJzIC4uLiBOIHlycyAzIG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgTiB5ZWFycyAgICAgICB8XG4gKiB8IE4geXJzIDMgbW9udGhzIC4uLiBOIHlycyA5IG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgb3ZlciBOIHllYXJzICAgICAgICB8XG4gKiB8IE4geXJzIDkgbW9udGhzIC4uLiBOKzEgeXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWxtb3N0IE4rMSB5ZWFycyAgICB8XG4gKlxuICogV2l0aCBgb3B0aW9ucy5pbmNsdWRlU2Vjb25kcyA9PSB0cnVlYDpcbiAqIHwgRGlzdGFuY2UgYmV0d2VlbiBkYXRlcyB8IFJlc3VsdCAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCBzZWNzIC4uLiA1IHNlY3MgICAgICB8IGxlc3MgdGhhbiA1IHNlY29uZHMgIHxcbiAqIHwgNSBzZWNzIC4uLiAxMCBzZWNzICAgICB8IGxlc3MgdGhhbiAxMCBzZWNvbmRzIHxcbiAqIHwgMTAgc2VjcyAuLi4gMjAgc2VjcyAgICB8IGxlc3MgdGhhbiAyMCBzZWNvbmRzIHxcbiAqIHwgMjAgc2VjcyAuLi4gNDAgc2VjcyAgICB8IGhhbGYgYSBtaW51dGUgICAgICAgIHxcbiAqIHwgNDAgc2VjcyAuLi4gNjAgc2VjcyAgICB8IGxlc3MgdGhhbiBhIG1pbnV0ZSAgIHxcbiAqIHwgNjAgc2VjcyAuLi4gOTAgc2VjcyAgICB8IDEgbWludXRlICAgICAgICAgICAgIHxcbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGJhc2VEYXRlIC0gdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaW5jbHVkZVNlY29uZHM9ZmFsc2VdIC0gZGlzdGFuY2VzIGxlc3MgdGhhbiBhIG1pbnV0ZSBhcmUgbW9yZSBkZXRhaWxlZFxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGRTdWZmaXg9ZmFsc2VdIC0gcmVzdWx0IGluZGljYXRlcyBpZiB0aGUgc2Vjb25kIGRhdGUgaXMgZWFybGllciBvciBsYXRlciB0aGFuIHRoZSBmaXJzdFxuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZGlzdGFuY2UgaW4gd29yZHNcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBiYXNlRGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0RGlzdGFuY2VgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMiBKdWx5IDIwMTQgYW5kIDEgSmFudWFyeSAyMDE1P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2UobmV3IERhdGUoMjAxNCwgNiwgMiksIG5ldyBEYXRlKDIwMTUsIDAsIDEpKVxuICogLy89PiAnNiBtb250aHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTVcbiAqIC8vIGFuZCAxIEphbnVhcnkgMjAxNSAwMDowMDowMCwgaW5jbHVkaW5nIHNlY29uZHM/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZShcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAwKSxcbiAqICAgeyBpbmNsdWRlU2Vjb25kczogdHJ1ZSB9XG4gKiApXG4gKiAvLz0+ICdsZXNzIHRoYW4gMjAgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMSBKYW51YXJ5IDIwMTUsIHdpdGggYSBzdWZmaXg/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZShuZXcgRGF0ZSgyMDE1LCAwLCAxKSwgbmV3IERhdGUoMjAxNiwgMCwgMSksIHtcbiAqICAgYWRkU3VmZml4OiB0cnVlXG4gKiB9KVxuICogLy89PiAnYWJvdXQgMSB5ZWFyIGFnbydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEF1Z3VzdCAyMDE2IGFuZCAxIEphbnVhcnkgMjAxNSBpbiBFc3BlcmFudG8/XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlKG5ldyBEYXRlKDIwMTYsIDcsIDEpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAncGxpIG9sIDEgamFybydcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXREaXN0YW5jZShkaXJ0eURhdGUsIGRpcnR5QmFzZURhdGUsIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYsIF9vcHRpb25zJGxvY2FsZTtcblxuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgdmFyIGxvY2FsZSA9IChfcmVmID0gKF9vcHRpb25zJGxvY2FsZSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5sb2NhbGUpICE9PSBudWxsICYmIF9vcHRpb25zJGxvY2FsZSAhPT0gdm9pZCAwID8gX29wdGlvbnMkbG9jYWxlIDogZGVmYXVsdE9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogZGVmYXVsdExvY2FsZTtcblxuICBpZiAoIWxvY2FsZS5mb3JtYXREaXN0YW5jZSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdsb2NhbGUgbXVzdCBjb250YWluIGZvcm1hdERpc3RhbmNlIHByb3BlcnR5Jyk7XG4gIH1cblxuICB2YXIgY29tcGFyaXNvbiA9IGNvbXBhcmVBc2MoZGlydHlEYXRlLCBkaXJ0eUJhc2VEYXRlKTtcblxuICBpZiAoaXNOYU4oY29tcGFyaXNvbikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIH1cblxuICB2YXIgbG9jYWxpemVPcHRpb25zID0gYXNzaWduKGNsb25lT2JqZWN0KG9wdGlvbnMpLCB7XG4gICAgYWRkU3VmZml4OiBCb29sZWFuKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5hZGRTdWZmaXgpLFxuICAgIGNvbXBhcmlzb246IGNvbXBhcmlzb25cbiAgfSk7XG4gIHZhciBkYXRlTGVmdDtcbiAgdmFyIGRhdGVSaWdodDtcblxuICBpZiAoY29tcGFyaXNvbiA+IDApIHtcbiAgICBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eUJhc2VEYXRlKTtcbiAgICBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICAgIGRhdGVSaWdodCA9IHRvRGF0ZShkaXJ0eUJhc2VEYXRlKTtcbiAgfVxuXG4gIHZhciBzZWNvbmRzID0gZGlmZmVyZW5jZUluU2Vjb25kcyhkYXRlUmlnaHQsIGRhdGVMZWZ0KTtcbiAgdmFyIG9mZnNldEluU2Vjb25kcyA9IChnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGVSaWdodCkgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGVMZWZ0KSkgLyAxMDAwO1xuICB2YXIgbWludXRlcyA9IE1hdGgucm91bmQoKHNlY29uZHMgLSBvZmZzZXRJblNlY29uZHMpIC8gNjApO1xuICB2YXIgbW9udGhzOyAvLyAwIHVwIHRvIDIgbWluc1xuXG4gIGlmIChtaW51dGVzIDwgMikge1xuICAgIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmluY2x1ZGVTZWNvbmRzKSB7XG4gICAgICBpZiAoc2Vjb25kcyA8IDUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgnbGVzc1RoYW5YU2Vjb25kcycsIDUsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCAxMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCdsZXNzVGhhblhTZWNvbmRzJywgMTAsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCAyMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCdsZXNzVGhhblhTZWNvbmRzJywgMjAsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCA0MCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCdoYWxmQU1pbnV0ZScsIDAsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCA2MCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCdsZXNzVGhhblhNaW51dGVzJywgMSwgbG9jYWxpemVPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hNaW51dGVzJywgMSwgbG9jYWxpemVPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1pbnV0ZXMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgnbGVzc1RoYW5YTWludXRlcycsIDEsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4TWludXRlcycsIG1pbnV0ZXMsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSAvLyAyIG1pbnMgdXAgdG8gMC43NSBocnNcblxuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCA0NSkge1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hNaW51dGVzJywgbWludXRlcywgbG9jYWxpemVPcHRpb25zKTsgLy8gMC43NSBocnMgdXAgdG8gMS41IGhyc1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCA5MCkge1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ2Fib3V0WEhvdXJzJywgMSwgbG9jYWxpemVPcHRpb25zKTsgLy8gMS41IGhycyB1cCB0byAyNCBocnNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgTUlOVVRFU19JTl9EQVkpIHtcbiAgICB2YXIgaG91cnMgPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyA2MCk7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgnYWJvdXRYSG91cnMnLCBob3VycywgbG9jYWxpemVPcHRpb25zKTsgLy8gMSBkYXkgdXAgdG8gMS43NSBkYXlzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fQUxNT1NUX1RXT19EQVlTKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneERheXMnLCAxLCBsb2NhbGl6ZU9wdGlvbnMpOyAvLyAxLjc1IGRheXMgdXAgdG8gMzAgZGF5c1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBNSU5VVEVTX0lOX01PTlRIKSB7XG4gICAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyBNSU5VVEVTX0lOX0RBWSk7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneERheXMnLCBkYXlzLCBsb2NhbGl6ZU9wdGlvbnMpOyAvLyAxIG1vbnRoIHVwIHRvIDIgbW9udGhzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fVFdPX01PTlRIUykge1xuICAgIG1vbnRocyA9IE1hdGgucm91bmQobWludXRlcyAvIE1JTlVURVNfSU5fTU9OVEgpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ2Fib3V0WE1vbnRocycsIG1vbnRocywgbG9jYWxpemVPcHRpb25zKTtcbiAgfVxuXG4gIG1vbnRocyA9IGRpZmZlcmVuY2VJbk1vbnRocyhkYXRlUmlnaHQsIGRhdGVMZWZ0KTsgLy8gMiBtb250aHMgdXAgdG8gMTIgbW9udGhzXG5cbiAgaWYgKG1vbnRocyA8IDEyKSB7XG4gICAgdmFyIG5lYXJlc3RNb250aCA9IE1hdGgucm91bmQobWludXRlcyAvIE1JTlVURVNfSU5fTU9OVEgpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hNb250aHMnLCBuZWFyZXN0TW9udGgsIGxvY2FsaXplT3B0aW9ucyk7IC8vIDEgeWVhciB1cCB0byBtYXggRGF0ZVxuICB9IGVsc2Uge1xuICAgIHZhciBtb250aHNTaW5jZVN0YXJ0T2ZZZWFyID0gbW9udGhzICUgMTI7XG4gICAgdmFyIHllYXJzID0gTWF0aC5mbG9vcihtb250aHMgLyAxMik7IC8vIE4geWVhcnMgdXAgdG8gMSB5ZWFycyAzIG1vbnRoc1xuXG4gICAgaWYgKG1vbnRoc1NpbmNlU3RhcnRPZlllYXIgPCAzKSB7XG4gICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCdhYm91dFhZZWFycycsIHllYXJzLCBsb2NhbGl6ZU9wdGlvbnMpOyAvLyBOIHllYXJzIDMgbW9udGhzIHVwIHRvIE4geWVhcnMgOSBtb250aHNcbiAgICB9IGVsc2UgaWYgKG1vbnRoc1NpbmNlU3RhcnRPZlllYXIgPCA5KSB7XG4gICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCdvdmVyWFllYXJzJywgeWVhcnMsIGxvY2FsaXplT3B0aW9ucyk7IC8vIE4geWVhcnMgOSBtb250aHMgdXAgdG8gTiB5ZWFyIDEyIG1vbnRoc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCdhbG1vc3RYWWVhcnMnLCB5ZWFycyArIDEsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgfVxuICB9XG59IiwidmFyIGRlZmF1bHRPcHRpb25zID0ge307XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn0iLCJpbXBvcnQgZGVmYXVsdExvY2FsZSBmcm9tIFwiLi4vLi4vbG9jYWxlL2VuLVVTL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0TG9jYWxlOyIsImltcG9ydCBmb3JtYXREaXN0YW5jZSBmcm9tIFwiLi9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0TG9uZyBmcm9tIFwiLi9fbGliL2Zvcm1hdExvbmcvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXRSZWxhdGl2ZSBmcm9tIFwiLi9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9jYWxpemUgZnJvbSBcIi4vX2xpYi9sb2NhbGl6ZS9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoIGZyb20gXCIuL19saWIvbWF0Y2gvaW5kZXguanNcIjtcblxuLyoqXG4gKiBAdHlwZSB7TG9jYWxlfVxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnB9XG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3Nde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3N9XG4gKi9cbnZhciBsb2NhbGUgPSB7XG4gIGNvZGU6ICdlbi1VUycsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMFxuICAgIC8qIFN1bmRheSAqL1xuICAgICxcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDFcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsZTsiLCJ2YXIgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBzZWNvbmQnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICB4U2Vjb25kczoge1xuICAgIG9uZTogJzEgc2Vjb25kJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICBoYWxmQU1pbnV0ZTogJ2hhbGYgYSBtaW51dGUnLFxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiAnbGVzcyB0aGFuIGEgbWludXRlJyxcbiAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgeE1pbnV0ZXM6IHtcbiAgICBvbmU6ICcxIG1pbnV0ZScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgYWJvdXRYSG91cnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIGhvdXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4SG91cnM6IHtcbiAgICBvbmU6ICcxIGhvdXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4RGF5czoge1xuICAgIG9uZTogJzEgZGF5JyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBkYXlzJ1xuICB9LFxuICBhYm91dFhXZWVrczoge1xuICAgIG9uZTogJ2Fib3V0IDEgd2VlaycsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIHhXZWVrczoge1xuICAgIG9uZTogJzEgd2VlaycsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIGFib3V0WE1vbnRoczoge1xuICAgIG9uZTogJ2Fib3V0IDEgbW9udGgnLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgeE1vbnRoczoge1xuICAgIG9uZTogJzEgbW9udGgnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIHllYXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IHllYXJzJ1xuICB9LFxuICB4WWVhcnM6IHtcbiAgICBvbmU6ICcxIHllYXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IHllYXJzJ1xuICB9LFxuICBvdmVyWFllYXJzOiB7XG4gICAgb25lOiAnb3ZlciAxIHllYXInLFxuICAgIG90aGVyOiAnb3ZlciB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogJ2FsbW9zdCAxIHllYXInLFxuICAgIG90aGVyOiAnYWxtb3N0IHt7Y291bnR9fSB5ZWFycydcbiAgfVxufTtcblxudmFyIGZvcm1hdERpc3RhbmNlID0gZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2UodG9rZW4sIGNvdW50LCBvcHRpb25zKSB7XG4gIHZhciByZXN1bHQ7XG4gIHZhciB0b2tlblZhbHVlID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dO1xuXG4gIGlmICh0eXBlb2YgdG9rZW5WYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlO1xuICB9IGVsc2UgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZS5vbmU7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZS5vdGhlci5yZXBsYWNlKCd7e2NvdW50fX0nLCBjb3VudC50b1N0cmluZygpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmFkZFN1ZmZpeCkge1xuICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gJiYgb3B0aW9ucy5jb21wYXJpc29uID4gMCkge1xuICAgICAgcmV0dXJuICdpbiAnICsgcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0ICsgJyBhZ28nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXREaXN0YW5jZTsiLCJpbXBvcnQgYnVpbGRGb3JtYXRMb25nRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRGb3JtYXRMb25nRm4vaW5kZXguanNcIjtcbnZhciBkYXRlRm9ybWF0cyA9IHtcbiAgZnVsbDogJ0VFRUUsIE1NTU0gZG8sIHknLFxuICBsb25nOiAnTU1NTSBkbywgeScsXG4gIG1lZGl1bTogJ01NTSBkLCB5JyxcbiAgc2hvcnQ6ICdNTS9kZC95eXl5J1xufTtcbnZhciB0aW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogJ2g6bW06c3MgYSB6enp6JyxcbiAgbG9uZzogJ2g6bW06c3MgYSB6JyxcbiAgbWVkaXVtOiAnaDptbTpzcyBhJyxcbiAgc2hvcnQ6ICdoOm1tIGEnXG59O1xudmFyIGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIGxvbmc6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBtZWRpdW06ICd7e2RhdGV9fSwge3t0aW1lfX0nLFxuICBzaG9ydDogJ3t7ZGF0ZX19LCB7e3RpbWV9fSdcbn07XG52YXIgZm9ybWF0TG9uZyA9IHtcbiAgZGF0ZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pLFxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIGRhdGVUaW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZVRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pXG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0TG9uZzsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZvcm1hdExvbmdGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIC8vIFRPRE86IFJlbW92ZSBTdHJpbmcoKVxuICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICB2YXIgZm9ybWF0ID0gYXJncy5mb3JtYXRzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHNbYXJncy5kZWZhdWx0V2lkdGhdO1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH07XG59IiwidmFyIGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogXCInbGFzdCcgZWVlZSAnYXQnIHBcIixcbiAgeWVzdGVyZGF5OiBcIid5ZXN0ZXJkYXkgYXQnIHBcIixcbiAgdG9kYXk6IFwiJ3RvZGF5IGF0JyBwXCIsXG4gIHRvbW9ycm93OiBcIid0b21vcnJvdyBhdCcgcFwiLFxuICBuZXh0V2VlazogXCJlZWVlICdhdCcgcFwiLFxuICBvdGhlcjogJ1AnXG59O1xuXG52YXIgZm9ybWF0UmVsYXRpdmUgPSBmdW5jdGlvbiBmb3JtYXRSZWxhdGl2ZSh0b2tlbiwgX2RhdGUsIF9iYXNlRGF0ZSwgX29wdGlvbnMpIHtcbiAgcmV0dXJuIGZvcm1hdFJlbGF0aXZlTG9jYWxlW3Rva2VuXTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdFJlbGF0aXZlOyIsImltcG9ydCBidWlsZExvY2FsaXplRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzXCI7XG52YXIgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnQicsICdBJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0JDJywgJ0FEJ10sXG4gIHdpZGU6IFsnQmVmb3JlIENocmlzdCcsICdBbm5vIERvbWluaSddXG59O1xudmFyIHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWycxJywgJzInLCAnMycsICc0J10sXG4gIGFiYnJldmlhdGVkOiBbJ1ExJywgJ1EyJywgJ1EzJywgJ1E0J10sXG4gIHdpZGU6IFsnMXN0IHF1YXJ0ZXInLCAnMm5kIHF1YXJ0ZXInLCAnM3JkIHF1YXJ0ZXInLCAnNHRoIHF1YXJ0ZXInXVxufTsgLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxuXG52YXIgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydKJywgJ0YnLCAnTScsICdBJywgJ00nLCAnSicsICdKJywgJ0EnLCAnUycsICdPJywgJ04nLCAnRCddLFxuICBhYmJyZXZpYXRlZDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICB3aWRlOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxufTtcbnZhciBkYXlWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ10sXG4gIHNob3J0OiBbJ1N1JywgJ01vJywgJ1R1JywgJ1dlJywgJ1RoJywgJ0ZyJywgJ1NhJ10sXG4gIGFiYnJldmlhdGVkOiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICB3aWRlOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J11cbn07XG52YXIgZGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogJ2EnLFxuICAgIHBtOiAncCcsXG4gICAgbWlkbmlnaHQ6ICdtaScsXG4gICAgbm9vbjogJ24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiAnQU0nLFxuICAgIHBtOiAnUE0nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiAnYS5tLicsXG4gICAgcG06ICdwLm0uJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH1cbn07XG52YXIgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06ICdhJyxcbiAgICBwbTogJ3AnLFxuICAgIG1pZG5pZ2h0OiAnbWknLFxuICAgIG5vb246ICduJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogJ0FNJyxcbiAgICBwbTogJ1BNJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogJ2EubS4nLFxuICAgIHBtOiAncC5tLicsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9XG59O1xuXG52YXIgb3JkaW5hbE51bWJlciA9IGZ1bmN0aW9uIG9yZGluYWxOdW1iZXIoZGlydHlOdW1iZXIsIF9vcHRpb25zKSB7XG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpOyAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIHZhciByZW0xMDAgPSBudW1iZXIgJSAxMDA7XG5cbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3N0JztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ25kJztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3JkJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVtYmVyICsgJ3RoJztcbn07XG5cbnZhciBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcjogb3JkaW5hbE51bWJlcixcbiAgZXJhOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZXJhVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBhcmd1bWVudENhbGxiYWNrOiBmdW5jdGlvbiBhcmd1bWVudENhbGxiYWNrKHF1YXJ0ZXIpIHtcbiAgICAgIHJldHVybiBxdWFydGVyIC0gMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IG1vbnRoVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRGb3JtYXR0aW5nV2lkdGg6ICd3aWRlJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsaXplOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlJbmRleCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiAnc3RhbmRhbG9uZSc7XG4gICAgdmFyIHZhbHVlc0FycmF5O1xuXG4gICAgaWYgKGNvbnRleHQgPT09ICdmb3JtYXR0aW5nJyAmJiBhcmdzLmZvcm1hdHRpbmdWYWx1ZXMpIHtcbiAgICAgIHZhciBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRGb3JtYXR0aW5nV2lkdGggfHwgYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YXIgd2lkdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogZGVmYXVsdFdpZHRoO1xuICAgICAgdmFsdWVzQXJyYXkgPSBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2RlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YXIgX3dpZHRoID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW193aWR0aF0gfHwgYXJncy52YWx1ZXNbX2RlZmF1bHRXaWR0aF07XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gYXJncy5hcmd1bWVudENhbGxiYWNrID8gYXJncy5hcmd1bWVudENhbGxiYWNrKGRpcnR5SW5kZXgpIDogZGlydHlJbmRleDsgLy8gQHRzLWlnbm9yZTogRm9yIHNvbWUgcmVhc29uIFR5cGVTY3JpcHQganVzdCBkb24ndCB3YW50IHRvIG1hdGNoIGl0LCBubyBtYXR0ZXIgaG93IGhhcmQgd2UgdHJ5LiBJIGNoYWxsZW5nZSB5b3UgdG8gdHJ5IHRvIHJlbW92ZSBpdCFcblxuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF07XG4gIH07XG59IiwiaW1wb3J0IGJ1aWxkTWF0Y2hGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanNcIjtcbmltcG9ydCBidWlsZE1hdGNoUGF0dGVybkZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanNcIjtcbnZhciBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL14oXFxkKykodGh8c3R8bmR8cmQpPy9pO1xudmFyIHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXFxkKy9pO1xudmFyIG1hdGNoRXJhUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYnxhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oYlxcLj9cXHM/Y1xcLj98YlxcLj9cXHM/Y1xcLj9cXHM/ZVxcLj98YVxcLj9cXHM/ZFxcLj98Y1xcLj9cXHM/ZVxcLj8pL2ksXG4gIHdpZGU6IC9eKGJlZm9yZSBjaHJpc3R8YmVmb3JlIGNvbW1vbiBlcmF8YW5ubyBkb21pbml8Y29tbW9uIGVyYSkvaVxufTtcbnZhciBwYXJzZUVyYVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmIvaSwgL14oYXxjKS9pXVxufTtcbnZhciBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXlsxMjM0XS9pLFxuICBhYmJyZXZpYXRlZDogL15xWzEyMzRdL2ksXG4gIHdpZGU6IC9eWzEyMzRdKHRofHN0fG5kfHJkKT8gcXVhcnRlci9pXG59O1xudmFyIHBhcnNlUXVhcnRlclBhdHRlcm5zID0ge1xuICBhbnk6IFsvMS9pLCAvMi9pLCAvMy9pLCAvNC9pXVxufTtcbnZhciBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaVxufTtcbnZhciBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9eai9pLCAvXmYvaSwgL15tL2ksIC9eYS9pLCAvXm0vaSwgL15qL2ksIC9eai9pLCAvXmEvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldLFxuICBhbnk6IFsvXmphL2ksIC9eZi9pLCAvXm1hci9pLCAvXmFwL2ksIC9ebWF5L2ksIC9eanVuL2ksIC9eanVsL2ksIC9eYXUvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldXG59O1xudmFyIG1hdGNoRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bc210d2ZdL2ksXG4gIHNob3J0OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAgd2lkZTogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2lcbn07XG52YXIgcGFyc2VEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15zL2ksIC9ebS9pLCAvXnQvaSwgL153L2ksIC9edC9pLCAvXmYvaSwgL15zL2ldLFxuICBhbnk6IFsvXnN1L2ksIC9ebS9pLCAvXnR1L2ksIC9edy9pLCAvXnRoL2ksIC9eZi9pLCAvXnNhL2ldXG59O1xudmFyIG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pXG59O1xudmFyIHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaVxuICB9XG59O1xudmFyIG1hdGNoID0ge1xuICBvcmRpbmFsTnVtYmVyOiBidWlsZE1hdGNoUGF0dGVybkZuKHtcbiAgICBtYXRjaFBhdHRlcm46IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgcGFyc2VQYXR0ZXJuOiBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHZhbHVlQ2FsbGJhY2s6IGZ1bmN0aW9uIHZhbHVlQ2FsbGJhY2sodmFsdWUpIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIH1cbiAgfSksXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIHF1YXJ0ZXI6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueScsXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gdmFsdWVDYWxsYmFjayhpbmRleCkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaE1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXk6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ2FueScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBtYXRjaDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MubWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLnBhcnNlUGF0dGVybik7XG4gICAgaWYgKCFwYXJzZVJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKSA6IHBhcnNlUmVzdWx0WzBdO1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNYXRjaEZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICB2YXIgbWF0Y2hQYXR0ZXJuID0gd2lkdGggJiYgYXJncy5tYXRjaFBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLm1hdGNoUGF0dGVybnNbYXJncy5kZWZhdWx0TWF0Y2hXaWR0aF07XG4gICAgdmFyIG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKG1hdGNoUGF0dGVybik7XG5cbiAgICBpZiAoIW1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVBhdHRlcm5zID0gd2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG4gICAgdmFyIGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucykgPyBmaW5kSW5kZXgocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSkgOiBmaW5kS2V5KHBhcnNlUGF0dGVybnMsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpO1xuICAgIH0pO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhrZXkpIDoga2V5O1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqZWN0LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwcmVkaWNhdGUob2JqZWN0W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBjb21wYXJlQXNjXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgcmVzdWx0IG9mIHRoZSBjb21wYXJpc29uXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbXBhcmUgMTEgRmVicnVhcnkgMTk4NyBhbmQgMTAgSnVseSAxOTg5OlxuICogY29uc3QgcmVzdWx0ID0gY29tcGFyZUFzYyhuZXcgRGF0ZSgxOTg3LCAxLCAxMSksIG5ldyBEYXRlKDE5ODksIDYsIDEwKSlcbiAqIC8vPT4gLTFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXM6XG4gKiBjb25zdCByZXN1bHQgPSBbXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogXS5zb3J0KGNvbXBhcmVBc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICogLy8gXVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBhcmVBc2MoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eURhdGVMZWZ0KTtcbiAgdmFyIGRhdGVSaWdodCA9IHRvRGF0ZShkaXJ0eURhdGVSaWdodCk7XG4gIHZhciBkaWZmID0gZGF0ZUxlZnQuZ2V0VGltZSgpIC0gZGF0ZVJpZ2h0LmdldFRpbWUoKTtcblxuICBpZiAoZGlmZiA8IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICByZXR1cm4gMTsgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cbn0iLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpOyAvLyBDbG9uZSB0aGUgZGF0ZVxuXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgX3R5cGVvZihhcmd1bWVudCkgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNzdHJpbmctYXJndW1lbnRzXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgb2JqZWN0KSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Fzc2lnbiByZXF1aXJlcyB0aGF0IGlucHV0IHBhcmFtZXRlciBub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIGZvciAodmFyIHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgIDtcbiAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSBvYmplY3RbcHJvcGVydHldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiaW1wb3J0IGFzc2lnbiBmcm9tIFwiLi4vYXNzaWduL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuIGFzc2lnbih7fSwgb2JqZWN0KTtcbn0iLCJpbXBvcnQgZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9kaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXRSb3VuZGluZ01ldGhvZCB9IGZyb20gXCIuLi9fbGliL3JvdW5kaW5nTWV0aG9kcy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5TZWNvbmRzXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIHNlY29uZHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBzZWNvbmRzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJvdW5kaW5nTWV0aG9kPSd0cnVuYyddIC0gYSByb3VuZGluZyBtZXRob2QgKGBjZWlsYCwgYGZsb29yYCwgYHJvdW5kYCBvciBgdHJ1bmNgKVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBzZWNvbmRzXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IHNlY29uZHMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDE0IDEyOjMwOjA3Ljk5OSBhbmQgMiBKdWx5IDIwMTQgMTI6MzA6MjAuMDAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluU2Vjb25kcyhcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiwgMTIsIDMwLCAyMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgNywgOTk5KVxuICogKVxuICogLy89PiAxMlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJblNlY29uZHMoZGF0ZUxlZnQsIGRhdGVSaWdodCwgb3B0aW9ucykge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMoZGF0ZUxlZnQsIGRhdGVSaWdodCkgLyAxMDAwO1xuICByZXR1cm4gZ2V0Um91bmRpbmdNZXRob2Qob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnJvdW5kaW5nTWV0aG9kKShkaWZmKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kc1xuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kc1xuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBtaWxsaXNlY29uZHMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDE0IDEyOjMwOjIwLjYwMCBhbmQgMiBKdWx5IDIwMTQgMTI6MzA6MjEuNzAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDIxLCA3MDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDIwLCA2MDApXG4gKiApXG4gKiAvLz0+IDExMDBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMoZGF0ZUxlZnQsIGRhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRvRGF0ZShkYXRlTGVmdCkuZ2V0VGltZSgpIC0gdG9EYXRlKGRhdGVSaWdodCkuZ2V0VGltZSgpO1xufSIsInZhciByb3VuZGluZ01hcCA9IHtcbiAgY2VpbDogTWF0aC5jZWlsLFxuICByb3VuZDogTWF0aC5yb3VuZCxcbiAgZmxvb3I6IE1hdGguZmxvb3IsXG4gIHRydW5jOiBmdW5jdGlvbiB0cnVuYyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA8IDAgPyBNYXRoLmNlaWwodmFsdWUpIDogTWF0aC5mbG9vcih2YWx1ZSk7XG4gIH0gLy8gTWF0aC50cnVuYyBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cbn07XG52YXIgZGVmYXVsdFJvdW5kaW5nTWV0aG9kID0gJ3RydW5jJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3VuZGluZ01ldGhvZChtZXRob2QpIHtcbiAgcmV0dXJuIG1ldGhvZCA/IHJvdW5kaW5nTWFwW21ldGhvZF0gOiByb3VuZGluZ01hcFtkZWZhdWx0Um91bmRpbmdNZXRob2RdO1xufSIsIi8qKlxuICogR29vZ2xlIENocm9tZSBhcyBvZiA2Ny4wLjMzOTYuODcgaW50cm9kdWNlZCB0aW1lem9uZXMgd2l0aCBvZmZzZXQgdGhhdCBpbmNsdWRlcyBzZWNvbmRzLlxuICogVGhleSB1c3VhbGx5IGFwcGVhciBmb3IgZGF0ZXMgdGhhdCBkZW5vdGUgdGltZSBiZWZvcmUgdGhlIHRpbWV6b25lcyB3ZXJlIGludHJvZHVjZWRcbiAqIChlLmcuIGZvciAnRXVyb3BlL1ByYWd1ZScgdGltZXpvbmUgdGhlIG9mZnNldCBpcyBHTVQrMDA6NTc6NDQgYmVmb3JlIDEgT2N0b2JlciAxODkxXG4gKiBhbmQgR01UKzAxOjAwOjAwIGFmdGVyIHRoYXQgZGF0ZSlcbiAqXG4gKiBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgdGhlIG9mZnNldCBpbiBtaW51dGVzIGFuZCB3b3VsZCByZXR1cm4gNTcgZm9yIHRoZSBleGFtcGxlIGFib3ZlLFxuICogd2hpY2ggd291bGQgbGVhZCB0byBpbmNvcnJlY3QgY2FsY3VsYXRpb25zLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGltZXpvbmUgb2Zmc2V0IGluIG1pbGxpc2Vjb25kcyB0aGF0IHRha2VzIHNlY29uZHMgaW4gYWNjb3VudC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gIHZhciB1dGNEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSwgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkpO1xuICB1dGNEYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSAtIHV0Y0RhdGUuZ2V0VGltZSgpO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIGZyb20gXCIuLi9kaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocy9pbmRleC5qc1wiO1xuaW1wb3J0IGNvbXBhcmVBc2MgZnJvbSBcIi4uL2NvbXBhcmVBc2MvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgaXNMYXN0RGF5T2ZNb250aCBmcm9tIFwiLi4vaXNMYXN0RGF5T2ZNb250aC9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5Nb250aHNcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBmdWxsIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIHVzaW5nIHRydW5jIGFzIGEgZGVmYXVsdCByb3VuZGluZyBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBmdWxsIG1vbnRoc1xuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBmdWxsIG1vbnRocyBhcmUgYmV0d2VlbiAzMSBKYW51YXJ5IDIwMTQgYW5kIDEgU2VwdGVtYmVyIDIwMTQ/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5Nb250aHMobmV3IERhdGUoMjAxNCwgOCwgMSksIG5ldyBEYXRlKDIwMTQsIDAsIDMxKSlcbiAqIC8vPT4gN1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbk1vbnRocyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZVJpZ2h0KTtcbiAgdmFyIHNpZ24gPSBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpO1xuICB2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGRhdGVMZWZ0LCBkYXRlUmlnaHQpKTtcbiAgdmFyIHJlc3VsdDsgLy8gQ2hlY2sgZm9yIHRoZSBkaWZmZXJlbmNlIG9mIGxlc3MgdGhhbiBtb250aFxuXG4gIGlmIChkaWZmZXJlbmNlIDwgMSkge1xuICAgIHJlc3VsdCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRhdGVMZWZ0LmdldE1vbnRoKCkgPT09IDEgJiYgZGF0ZUxlZnQuZ2V0RGF0ZSgpID4gMjcpIHtcbiAgICAgIC8vIFRoaXMgd2lsbCBjaGVjayBpZiB0aGUgZGF0ZSBpcyBlbmQgb2YgRmViIGFuZCBhc3NpZ24gYSBoaWdoZXIgZW5kIG9mIG1vbnRoIGRhdGVcbiAgICAgIC8vIHRvIGNvbXBhcmUgaXQgd2l0aCBKYW5cbiAgICAgIGRhdGVMZWZ0LnNldERhdGUoMzApO1xuICAgIH1cblxuICAgIGRhdGVMZWZ0LnNldE1vbnRoKGRhdGVMZWZ0LmdldE1vbnRoKCkgLSBzaWduICogZGlmZmVyZW5jZSk7IC8vIE1hdGguYWJzKGRpZmYgaW4gZnVsbCBtb250aHMgLSBkaWZmIGluIGNhbGVuZGFyIG1vbnRocykgPT09IDEgaWYgbGFzdCBjYWxlbmRhciBtb250aCBpcyBub3QgZnVsbFxuICAgIC8vIElmIHNvLCByZXN1bHQgbXVzdCBiZSBkZWNyZWFzZWQgYnkgMSBpbiBhYnNvbHV0ZSB2YWx1ZVxuXG4gICAgdmFyIGlzTGFzdE1vbnRoTm90RnVsbCA9IGNvbXBhcmVBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodCkgPT09IC1zaWduOyAvLyBDaGVjayBmb3IgY2FzZXMgb2Ygb25lIGZ1bGwgY2FsZW5kYXIgbW9udGhcblxuICAgIGlmIChpc0xhc3REYXlPZk1vbnRoKHRvRGF0ZShkaXJ0eURhdGVMZWZ0KSkgJiYgZGlmZmVyZW5jZSA9PT0gMSAmJiBjb21wYXJlQXNjKGRpcnR5RGF0ZUxlZnQsIGRhdGVSaWdodCkgPT09IDEpIHtcbiAgICAgIGlzTGFzdE1vbnRoTm90RnVsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IHNpZ24gKiAoZGlmZmVyZW5jZSAtIE51bWJlcihpc0xhc3RNb250aE5vdEZ1bGwpKTtcbiAgfSAvLyBQcmV2ZW50IG5lZ2F0aXZlIHplcm9cblxuXG4gIHJldHVybiByZXN1bHQgPT09IDAgPyAwIDogcmVzdWx0O1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHNcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBtb250aHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBtb250aHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciBtb250aHNcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgbW9udGhzIGFyZSBiZXR3ZWVuIDMxIEphbnVhcnkgMjAxNCBhbmQgMSBTZXB0ZW1iZXIgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgMCwgMzEpXG4gKiApXG4gKiAvLz0+IDhcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZVJpZ2h0KTtcbiAgdmFyIHllYXJEaWZmID0gZGF0ZUxlZnQuZ2V0RnVsbFllYXIoKSAtIGRhdGVSaWdodC5nZXRGdWxsWWVhcigpO1xuICB2YXIgbW9udGhEaWZmID0gZGF0ZUxlZnQuZ2V0TW9udGgoKSAtIGRhdGVSaWdodC5nZXRNb250aCgpO1xuICByZXR1cm4geWVhckRpZmYgKiAxMiArIG1vbnRoRGlmZjtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBlbmRPZkRheSBmcm9tIFwiLi4vZW5kT2ZEYXkvaW5kZXguanNcIjtcbmltcG9ydCBlbmRPZk1vbnRoIGZyb20gXCIuLi9lbmRPZk1vbnRoL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc0xhc3REYXlPZk1vbnRoXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdGhlIGxhc3QgZGF5IG9mIGEgbW9udGg/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0aGUgbGFzdCBkYXkgb2YgYSBtb250aD9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB0aGUgbGFzdCBkYXkgb2YgYSBtb250aFxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDI4IEZlYnJ1YXJ5IDIwMTQgdGhlIGxhc3QgZGF5IG9mIGEgbW9udGg/XG4gKiBjb25zdCByZXN1bHQgPSBpc0xhc3REYXlPZk1vbnRoKG5ldyBEYXRlKDIwMTQsIDEsIDI4KSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGFzdERheU9mTW9udGgoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICByZXR1cm4gZW5kT2ZEYXkoZGF0ZSkuZ2V0VGltZSgpID09PSBlbmRPZk1vbnRoKGRhdGUpLmdldFRpbWUoKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGVuZE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhIGRheVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSBkYXkgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kT2ZEYXkoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgZW5kT2ZNb250aFxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlbmQgb2YgYSBtb250aFxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSBtb250aCBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGVuZE9mTW9udGgobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAzMCAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuZE9mTW9udGgoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aCArIDEsIDApO1xuICBkYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNCZWZvcmVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0aGF0IHNob3VsZCBiZSBiZWZvcmUgdGhlIG90aGVyIG9uZSB0byByZXR1cm4gdHJ1ZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVRvQ29tcGFyZSAtIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMTAgSnVseSAxOTg5IGJlZm9yZSAxMSBGZWJydWFyeSAxOTg3P1xuICogY29uc3QgcmVzdWx0ID0gaXNCZWZvcmUobmV3IERhdGUoMTk4OSwgNiwgMTApLCBuZXcgRGF0ZSgxOTg3LCAxLCAxMSkpXG4gKiAvLz0+IGZhbHNlXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNCZWZvcmUoZGlydHlEYXRlLCBkaXJ0eURhdGVUb0NvbXBhcmUpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBkYXRlVG9Db21wYXJlID0gdG9EYXRlKGRpcnR5RGF0ZVRvQ29tcGFyZSk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSA8IGRhdGVUb0NvbXBhcmUuZ2V0VGltZSgpO1xufSIsImltcG9ydCB7XG4gIGdldFVwZGF0ZWRIb21lUHJvamVjdCxcbiAgcHJvamVjdEV4aXN0c1xufSBmcm9tIFwiLi9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBzb3J0ZXIgfSBmcm9tIFwiLi9zb3J0ZXJcIjtcbmltcG9ydCB7IGRpc3BsYXlQcm9qZWN0LCByZW5kZXIgYXMgcmVuZGVyQ29udGVudCB9IGZyb20gXCIuL3VpLW1vZHVsZXMvY29udGVudFwiO1xuaW1wb3J0IHsgcmVuZGVyIGFzIHJlbmRlckhlYWRlciB9IGZyb20gXCIuL3VpLW1vZHVsZXMvaGVhZGVyXCI7XG5pbXBvcnQgeyByZW5kZXIgYXMgcmVuZGVyTmF2IH0gZnJvbSBcIi4vdWktbW9kdWxlcy9uYXZcIjtcblxubGV0IGFjdGl2ZVByb2plY3Q7XG5cbmZ1bmN0aW9uIGluaXRVSSgpIHtcbiAgY29uc3QgaGVhZGVyID0gcmVuZGVySGVhZGVyKCk7XG4gIGNvbnN0IG5hdiA9IHJlbmRlck5hdigpO1xuICBjb25zdCBjb250ZW50ID0gcmVuZGVyQ29udGVudCgpO1xuXG4gIGNvbnN0IG1haW5Db250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXCJtYWluLWNvbnRhaW5lclwiXSwgbnVsbCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWFpbkNvbnRhaW5lcik7XG5cbiAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1wiY29udGFpbmVyXCJdLCBudWxsKTtcbiAgbWFpbkNvbnRhaW5lci5hcHBlbmQoaGVhZGVyLCBjb250YWluZXIpO1xuXG5cbiAgY29udGFpbmVyLmFwcGVuZChuYXYpO1xuICBjb250YWluZXIuYXBwZW5kKGNvbnRlbnQpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5KHByb2plY3QpIHtcbiAgaWYgKCFwcm9qZWN0RXhpc3RzKHByb2plY3QpIHx8IHByb2plY3QuaWQgPT0gLTEpIHtcbiAgICBwcm9qZWN0ID0gZ2V0VXBkYXRlZEhvbWVQcm9qZWN0KCk7XG4gIH1cblxuICBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdDtcblxuICBzb3J0ZXIocHJvamVjdCk7XG5cbiAgZmFkZURpc3BsYXkoZGlzcGxheVByb2plY3QsIHByb2plY3QpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIGRpc3BsYXkoYWN0aXZlUHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIGZhZGVEaXNwbGF5KGRpc3BsYXlGdW5jdGlvbiwgcHJvamVjdCkge1xuICBjb25zdCBwYXN0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdFwiKTtcblxuICBpZiAocGFzdFByb2plY3QpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RcIikuY2xhc3NMaXN0LmFkZChcInByb2plY3QtLWZhZGluZ1wiKTtcbiAgfVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRpc3BsYXlGdW5jdGlvbihwcm9qZWN0KTtcblxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RcIik7XG5cbiAgICBuZXdQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LS1mYWRpbmdcIik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5ld1Byb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3QtLWZhZGluZ1wiKTtcbiAgICB9LCAxMDApO1xuICB9LCAxMDApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIdG1sRWxlbWVudCh0eXBlLCBpZCwgYXJyYXlDbGFzc2VzLCBjb250ZW50LCBhdHRyaWJ1dGVzKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBpZiAoaWQpIHtcbiAgICBlbGVtZW50LmlkID0gaWQ7XG4gIH1cbiAgaWYgKGFycmF5Q2xhc3NlcylcbiAgICBhcnJheUNsYXNzZXMuZm9yRWFjaCgobXlDbGFzcykgPT4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKG15Q2xhc3MpKTtcblxuICBpZiAoY29udGVudCkgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG5cbiAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJpYnV0ZSkgPT5cbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZVswXSwgYXR0cmlidXRlWzFdKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IHsgaW5pdFVJLCB1cGRhdGUsIGRpc3BsYXksIGNyZWF0ZUh0bWxFbGVtZW50LCBhY3RpdmVQcm9qZWN0IH07XG4iLCJpbXBvcnQgeyBnZXRQcm9qZWN0QnlJZCB9IGZyb20gXCIuL01hbmFnZXJcIjtcblxubGV0IHNvcnRPcHRpb25zID0gW1wibmFtZVwiLCBcInByaW9yaXR5XCIsIFwiZGF0ZVwiLCBcInByb2plY3RcIl07XG5sZXQgYWN0aXZlU29ydE9wdGlvbiA9IFwibmFtZVwiO1xubGV0IGFjdGl2ZVNvcnRPcmRlciA9IFwiYXNjZW5kaW5nXCI7XG5cbmZ1bmN0aW9uIHNvcnRlcihwcm9qZWN0KSB7XG4gIHByb2plY3QudGFza3Muc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCB0aXRsZUE7XG4gICAgbGV0IHRpdGxlQjtcblxuICAgIGlmIChhY3RpdmVTb3J0T3B0aW9uID09PSBcIm5hbWVcIikge1xuICAgICAgdGl0bGVBID0gYVtcInRpdGxlXCJdLnRvVXBwZXJDYXNlKCk7XG4gICAgICB0aXRsZUIgPSBiW1widGl0bGVcIl0udG9VcHBlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlU29ydE9wdGlvbiA9PT0gXCJwcmlvcml0eVwiKSB7XG4gICAgICB0aXRsZUEgPSBhW1wicHJpb3JpdHlcIl07XG4gICAgICB0aXRsZUIgPSBiW1wicHJpb3JpdHlcIl07XG4gICAgfVxuXG4gICAgaWYgKGFjdGl2ZVNvcnRPcHRpb24gPT09IFwiZGF0ZVwiKSB7XG4gICAgICB0aXRsZUEgPSBhW1wiZHVlRGF0ZVwiXTtcbiAgICAgIHRpdGxlQiA9IGJbXCJkdWVEYXRlXCJdO1xuICAgIH1cblxuICAgIGlmIChhY3RpdmVTb3J0T3B0aW9uID09PSBcInByb2plY3RcIikge1xuICAgICAgdGl0bGVBID0gZ2V0UHJvamVjdEJ5SWQoYS5wcm9qZWN0KS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgdGl0bGVCID0gZ2V0UHJvamVjdEJ5SWQoYi5wcm9qZWN0KS50aXRsZS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmIChhY3RpdmVTb3J0T3JkZXIgPT0gXCJkZXNjZW5kaW5nXCIpIHtcbiAgICAgIGNvbnN0IHRlbXAgPSB0aXRsZUE7XG4gICAgICB0aXRsZUEgPSB0aXRsZUI7XG4gICAgICB0aXRsZUIgPSB0ZW1wO1xuICAgIH1cblxuICAgIGlmICh0aXRsZUEgPCB0aXRsZUIpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKHRpdGxlQSA+IHRpdGxlQikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VTb3J0T3JkZXIoKSB7XG4gIGlmIChhY3RpdmVTb3J0T3JkZXIgPT09IFwiYXNjZW5kaW5nXCIpIHtcbiAgICBhY3RpdmVTb3J0T3JkZXIgPSBcImRlc2NlbmRpbmdcIjtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGFjdGl2ZVNvcnRPcmRlciA9IFwiYXNjZW5kaW5nXCI7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVNvcnRDcml0ZXJpYShlbGVtZW50KSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWRcIikuaWQgPSBcIlwiO1xuICBlbGVtZW50LmlkID0gXCJzZWxlY3RlZFwiO1xuICBhY3RpdmVTb3J0T3B0aW9uID0gZWxlbWVudC50ZXh0Q29udGVudDtcbn1cblxuZXhwb3J0IHtcbiAgc29ydGVyLFxuICBjaGFuZ2VTb3J0Q3JpdGVyaWEsXG4gIGNoYW5nZVNvcnRPcmRlcixcbiAgYWN0aXZlU29ydE9wdGlvbixcbiAgYWN0aXZlU29ydE9yZGVyLFxuICBzb3J0T3B0aW9ucyxcbn07XG4iLCJpbXBvcnQgeyBjb25maWcsIHByaW9yaXR5Qm9yZGVyQ29sb3JzLCBwcmlvcml0eUNvbG9ycyB9IGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7IGR1ZURhdGVDaGVja2VyIH0gZnJvbSBcIi4uL2hlbHBlclwiO1xuaW1wb3J0IHsgZ2V0UHJvamVjdEJ5SWQsIGdldFByb2plY3RzVGl0bGVzLCBnZXRVcGRhdGVkSG9tZVByb2plY3QgfSBmcm9tIFwiLi4vTWFuYWdlclwiO1xuaW1wb3J0IHsgYWN0aXZlU29ydE9wdGlvbiwgYWN0aXZlU29ydE9yZGVyLCBzb3J0ZXIsIHNvcnRPcHRpb25zIH0gZnJvbSBcIi4uL3NvcnRlclwiO1xuaW1wb3J0IHsgYWN0aXZlUHJvamVjdCwgY3JlYXRlSHRtbEVsZW1lbnQgfSBmcm9tIFwiLi4vVUlcIjtcblxuY29uc3QgY29udGVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcImNvbnRlbnRcIl0sIG51bGwpO1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0KSB7XG4gIGNsZWFyQ29udGVudEVsZW1lbnQoKTtcbiAgcmVuZGVyUHJvamVjdChwcm9qZWN0KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdChwcm9qZWN0KSB7XG4gIGNvbnN0IHByb2plY3RFbCA9IGdlbmVyYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdCk7XG5cbiAgaWYgKCEocHJvamVjdC5pZCA9PSBjb25maWcuZG9uZS5pZCkpIHByb2plY3RFbC5hcHBlbmQoZ2VuZXJhdGVOZXdUYXNrQmFyKCkpO1xuXG4gIHByb2plY3RFbC5hcHBlbmQoZ2VuZXJhdGVUYXNrc1NvcnRlckVsZW1lbnQoKSwgZ2VuZXJhdGVUYXNrcyhwcm9qZWN0KSk7XG5cbiAgY29udGVudC5hcHBlbmQocHJvamVjdEVsKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXdUYXNrQmFyKCkge1xuICBjb25zdCBuZXdUYXNrQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICBudWxsLFxuICAgIFtcInRhc2stY29udGFpbmVyXCJdLFxuICAgIG51bGxcbiAgKTtcblxuICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIG51bGwsXG4gICAgW1widGFzay1pbnNpZGUtY29udGFpbmVyXCJdLFxuICAgIG51bGxcbiAgKTtcblxuICBjb25zdCB0ZXh0QmFyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJpbnB1dFwiLCBudWxsLCBbXCJ0ZXh0LWJhclwiXSwgbnVsbCwgW1xuICAgIFtcInBsYWNlaG9sZGVyXCIsIFwiTmV3IHRvZG8uLi5cIl0sXG4gIF0pO1xuXG4gIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kKGNvbnRhaW5lcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0QmFyKTtcblxuICByZXR1cm4gbmV3VGFza0NvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0KSB7XG4gIGNvbnN0IHByb2plY3RFbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICBwcm9qZWN0LmlkLFxuICAgIFtcInByb2plY3RcIl0sXG4gICAgbnVsbFxuICApO1xuXG4gIGNvbnN0IGhlYWRlcldyYXBwZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXCJwcm9qZWN0LWhlYWRlclwiXSk7XG5cbiAgY29uc3QgdGl0bGVXcmFwcGVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1xuICAgIFwicHJvamVjdC10aXRsZS13cmFwcGVyXCIsXG4gIF0pO1xuXG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAgbnVsbCxcbiAgICBbXCJwcm9qZWN0LXRpdGxlXCJdLFxuICAgIHByb2plY3QudGl0bGVcbiAgKTtcbiAgdGl0bGVXcmFwcGVyLmFwcGVuZChwcm9qZWN0VGl0bGUpO1xuXG4gIGhlYWRlcldyYXBwZXIuYXBwZW5kKHRpdGxlV3JhcHBlcik7XG5cbiAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyV3JhcHBlcik7XG5cbiAgLy8gYXMgcGFza2FpdGVzIGFwaWUgc2luZ2xlLXJlc3BvbnNpYmlsaXR5IGlyIGRlcGVuZGVuY3kgaW52ZXJzaW9uLCBpciBiaXNraSBhcGllIGNvbXBvc2l0aW9uLCB2aXMgZ2Fsdm9qdSxcbiAgLy8ga2FkIHRva2l1cyB6ZW1pYXUgZXNhbmNpdXMgbWV0b2R1cyByZWlrdHUgY2FsbGludCBpcyBpc29yZXMsIGthZCBwdnouIGNpYSBnZW5lcmF0ZVByb2plY3RFbGVtZW50KClcbiAgLy8gbmVidXR1IHByaWtsYXVzb21hcyBudW8gc2l0dSBkdmllanUgbWV0b2R1LiBJZGVqYSB0b2tpYSwga2FkIHRpZW1zIGR2aWVtcyBtZXRvZGFtcyBwYXNzaW51IHByb2plY3RFbGVtZW50LFxuICAvLyBrdXJpIGRhYmFyIGdlbmVyYXRlUHJvamVjdEVsZW1lbnQoKSByZXR1cm5pbmEuIFRhZGEgcGFzc2ludGFtIHBhcmVudGUgcGFnYWwgc2F2byB2aWRpbmUgbG9naWthIGppZSBzdXNpcmFzdHVcbiAgLy8ga28gamllbXMgcmVpa2lhIGlyIHBhdHlzIHByaWRldHUgc2F2byBlbGVtZW50dXMuIEFyYmEgdmFwc2UgamllbXMgbmlla28gbmVwYXNzaW51LCB0YWRhIGthaSBidW5hIHBhY2FsbGludGksXG4gIC8vIGppZSBzdXNpcmFuZGEgcGFyZW50RWxlbWVudCBwZXIgcXVlcnlTZWxlY3RvciBpciB2aXNpIG1ldG9kYWkgZ3l2ZW5hIHNhdSBhdHNraXJhaSBpciBsYWltaW5nYWkuXG4gIC8vIGJldCB0YWRhIGF0cm9kbyBkYWFhdWcgZGF1Z2lhdSBrb2RvIGJ1cywgaXIsIGthcyBtYW4gYXRyb2RvIHN2YXJidSwgZGF1ZyBkYXVnaWF1IHJlc3Vyc3UgaXNuYXVkb3RhIGJ1cywgbm9ycyBhc1xuICAvLyBzcml0eSBwZXJmb3JtYW5jZSB2cyBtYWludGFuYWJsZSBhbmQgcmVhZGFibGUgY29kZSBuZXNpZ2F1ZGF1IDpEIGthIG1hbmFpP1xuXG4gIGFkZFByb2plY3RUaXRsZUVkaXRFbGVtZW50KHRpdGxlV3JhcHBlcik7XG4gIGFkZFByb2plY3RSZW1vdmVFbGVtZW50KHRpdGxlV3JhcHBlcik7XG5cbiAgcmV0dXJuIHByb2plY3RFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0VGl0bGVFZGl0RWxlbWVudCh0aXRsZUVsZW1lbnQpIHtcbiAgaWYgKFxuICAgIHRpdGxlRWxlbWVudC5jbG9zZXN0KFwiLnByb2plY3RcIikuaWQgPT0gLTEgfHxcbiAgICB0aXRsZUVsZW1lbnQuY2xvc2VzdChcIi5wcm9qZWN0XCIpLmlkID09IGNvbmZpZy5kb25lLmlkXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRpdGxlRWRpdCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAgbnVsbCxcbiAgICBbXCJwcm9qZWN0LXRpdGxlLWVkaXRcIl0sXG4gICAgbnVsbFxuICApO1xuXG4gIHRpdGxlRWxlbWVudC5hcHBlbmRDaGlsZCh0aXRsZUVkaXQpO1xufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0UmVtb3ZlRWxlbWVudCh0aXRsZUVsZW1lbnQpIHtcbiAgaWYgKFxuICAgIHRpdGxlRWxlbWVudC5jbG9zZXN0KFwiLnByb2plY3RcIikuaWQgPT0gLTEgfHxcbiAgICB0aXRsZUVsZW1lbnQuY2xvc2VzdChcIi5wcm9qZWN0XCIpLmlkID09IGNvbmZpZy5kb25lLmlkXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHByb2plY3RSZW1vdmUgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXCJwcm9qZWN0LXJlbW92ZVwiXSwgXCJcIik7XG5cbiAgdGl0bGVFbGVtZW50LmFwcGVuZENoaWxkKHByb2plY3RSZW1vdmUpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhc2tzKHByb2plY3QpIHtcbiAgY29uc3QgdGFza0xpc3QgPSBwcm9qZWN0LnRhc2tzO1xuICBjb25zdCB0YXNrc0VsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXCJ0YXNrc1wiXSk7XG5cbiAgdGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZ2VuZXJhdGVUYXNrRWxlbWVudCh0YXNrKTtcblxuICAgIHRhc2tzRWxlbWVudC5hcHBlbmQoZWxlbWVudCk7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7fSk7XG4gIH0pO1xuXG4gIHJldHVybiB0YXNrc0VsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGFza0VsZW1lbnQodGFzaykge1xuICBjb25zdCB0YXNrRWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIHRhc2suaWQsIFtcInRhc2tcIl0sIG51bGwpO1xuXG4gIGFkZENoZWNrQm94KHRhc2ssIHRhc2tFbGVtZW50KTtcblxuICBjb25zdCB0aXRsZSA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcInRhc2stdGl0bGVcIl0sIHRhc2sudGl0bGUpO1xuXG4gIGNvbnN0IGR1ZVN0YXR1cyA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAgbnVsbCxcbiAgICBbXCJkdWUtc3RhdHVzXCJdLFxuICAgIGR1ZURhdGVDaGVja2VyKHRhc2suZHVlRGF0ZSlcbiAgKTtcblxuICBsZXQgYXNzaWduZWRQcm9qZWN0ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICBudWxsLFxuICAgIFtcImFzc2lnbmVkLXByb2plY3RcIl0sXG4gICAgZ2V0UHJvamVjdEJ5SWQodGFzay5wcm9qZWN0KS50aXRsZVxuICApO1xuXG4gIGNvbnN0IGxlZnRXcmFwcGVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1widGFzay1jb250ZW50LXdyYXBwZXJcIl0pO1xuICBsZWZ0V3JhcHBlci5hcHBlbmQodGl0bGUsIGR1ZVN0YXR1cyk7XG5cbiAgdGFza0VsZW1lbnQuYXBwZW5kKGxlZnRXcmFwcGVyLCBhc3NpZ25lZFByb2plY3QpO1xuXG4gIGFkZFRhc2tBY3Rpb25zRWxlbWVudCh0YXNrRWxlbWVudCk7XG5cbiAgcmV0dXJuIHRhc2tFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUV4cGFuZGVkVGFza0VsZW1lbnQodGFzaykge1xuICBjb25zdCB0YXNrRWxlbWVudCA9IGdlbmVyYXRlVGFza0VsZW1lbnQodGFzayk7XG4gIGNvbnN0IGxlZnRXcmFwcGVyID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRlbnQtd3JhcHBlclwiKTtcbiAgbGVmdFdyYXBwZXIucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXCJ0YXNrLXRpdGxlXCJdLCB0YXNrLnRpdGxlKTtcblxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAgbnVsbCxcbiAgICBbXCJkZXNjcmlwdGlvblwiXSxcbiAgICB0YXNrLmRlc2NyaXB0aW9uXG4gICk7XG5cbiAgY29uc3QgZGF0ZUFuZFByaW9yaXR5V3JhcHBlciA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcbiAgICBcInRhc2stcHJvcGVydGllcy13cmFwcGVyXCIsXG4gIF0pO1xuXG4gIGxldCBwcm9qZWN0U2VsZWN0b3IgPSBnZW5lcmF0ZVByb2plY3RTZWxlY3RFbGVtZW50KCk7XG5cbiAgc2hvd0Fzc2lnbmVkUHJvamVjdEluU2VsZWN0b3IocHJvamVjdFNlbGVjdG9yLCB0YXNrKTtcblxuICBkYXRlQW5kUHJpb3JpdHlXcmFwcGVyLmFwcGVuZChcbiAgICBnZW5lcmF0ZVRhc2tEYXRlRWxlbWVudHModGFzayksXG4gICAgZ2VuZXJhdGVUYXNrUHJpb3JpdHlFbGVtZW50cyh0YXNrKSxcbiAgICBwcm9qZWN0U2VsZWN0b3JcbiAgKTtcblxuICBjb25zdCB0ZXh0V3JhcHBlciA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcImlucHV0LXRleHQtd3JhcHBlclwiXSk7XG5cbiAgdGV4dFdyYXBwZXIuYXBwZW5kKHRpdGxlLCBkZXNjcmlwdGlvbik7XG5cbiAgbGVmdFdyYXBwZXIuYXBwZW5kKHRleHRXcmFwcGVyKTtcbiAgdGFza0VsZW1lbnQuYXBwZW5kKGRhdGVBbmRQcmlvcml0eVdyYXBwZXIpO1xuICB0YXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidGFzay0tZXhwYW5kZWRcIik7XG5cbiAgcmV0dXJuIHRhc2tFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhc2tXaXRoSW5wdXQodGFzaykge1xuICBsZXQgdGFza0VsZW1lbnQgPSBnZW5lcmF0ZUV4cGFuZGVkVGFza0VsZW1lbnQodGFzayk7XG4gIGNvbnN0IGxlZnRXcmFwcGVyID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRlbnQtd3JhcHBlclwiKTtcbiAgY29uc3QgdGl0bGUgPSBsZWZ0V3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIik7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gbGVmdFdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKTtcblxuICBsZWZ0V3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidGFzay1lZGl0XCIpO1xuXG4gIHRpdGxlLnNldEF0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiLCBcInRydWVcIik7XG4gIHRpdGxlLnNldEF0dHJpYnV0ZShcImF1dG9mb2N1c1wiLCBcIlwiKTtcblxuICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIiwgXCJ0cnVlXCIpO1xuXG4gIHJldHVybiB0YXNrRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGF0ZUlucHV0RWxlbWVudChkYXRlKSB7XG4gIGlmICghZGF0ZSkgZGF0ZSA9IFwiRHVlIGRhdGVcIjtcblxuICBjb25zdCBuZXdEYXRlID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJpbnB1dFwiLCBcImRhdGVcIiwgW1wibmV3LXRhc2stZGF0ZVwiXSwgXCJEYXRlXCIsIFtcbiAgICBbXCJ0eXBlXCIsIFwidGV4dFwiXSxcbiAgICBbXCJ2YWx1ZVwiLCBkYXRlXSxcbiAgICBbXCJuYW1lXCIsIFwiZGF0ZVwiXSxcbiAgICBbXCJ0aXRsZVwiLCBcIlNldCBkdWUgZGF0ZVwiXSxcbiAgXSk7XG5cbiAgcmV0dXJuIG5ld0RhdGU7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGFza1ByaW9yaXR5U2VsZWN0b3JFbGVtZW50KHRhc2tQcmlvcml0eSkge1xuICBjb25zdCBwcmlvcml0eSA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwic2VsZWN0XCIsXG4gICAgXCJwcmlvcml0eS1zZWxlY3RcIixcbiAgICBbXCJ0YXNrLXByaW9yaXR5LXJlc2VsZWN0b3JcIl0sXG4gICAgbnVsbCxcbiAgICBbXG4gICAgICBbXCJuYW1lXCIsIFwicHJpb3JpdHlcIl0sXG4gICAgICBbXCJ0aXRsZVwiLCBcIlNldCBwcmlvcml0eVwiXSxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgcHJpb3JpdGllcyA9IGNvbmZpZy5wcmlvcml0aWVzO1xuXG4gIHByaW9yaXRpZXMuZm9yRWFjaCgoUCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZUh0bWxFbGVtZW50KFwib3B0aW9uXCIsIG51bGwsIG51bGwsIFAsIFtbXCJ2YWx1ZVwiLCBQXV0pO1xuXG4gICAgaWYgKFAgPT0gXCJQMVwiKSB7XG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJcIik7XG4gICAgfVxuXG4gICAgaWYgKFAgPT0gdGFza1ByaW9yaXR5KSB7XG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJcIik7XG4gICAgfVxuXG4gICAgcHJpb3JpdHkuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByaW9yaXR5O1xufVxuXG5mdW5jdGlvbiBzZXRDaGVja0JveENvbG9yKGVsZW1lbnQsIHRhc2spIHtcbiAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgdmFyKCR7cHJpb3JpdHlDb2xvcnNbdGFzay5wcmlvcml0eV19KWA7XG59XG5cbmZ1bmN0aW9uIHNldENoZWNrQm94T3V0bGluZUNvbG9yKGVsZW1lbnQsIHRhc2spIHtcbiAgZWxlbWVudC5zdHlsZS5vdXRsaW5lQ29sb3IgPSBgdmFyKCR7cHJpb3JpdHlCb3JkZXJDb2xvcnNbdGFzay5wcmlvcml0eV19KWA7XG59XG5cbmZ1bmN0aW9uIHNob3dBc3NpZ25lZFByb2plY3RJblNlbGVjdG9yKHNlbGVjdG9yRWxlbWVudCwgdGFzaykge1xuICBjb25zdCBvcHRpb25zID0gc2VsZWN0b3JFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1zZWxlY3RcIikub3B0aW9ucztcbiAgZm9yIChsZXQgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9uc1tvcHRpb25dLmlkID09IHRhc2sucHJvamVjdCkge1xuICAgICAgb3B0aW9uc1tvcHRpb25dLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVByb2plY3RTZWxlY3RFbGVtZW50KCkge1xuICBjb25zdCBwcm9qZWN0U2VsZWN0V3JhcHBlciA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcbiAgICBcInByb2plY3Qtc2VsZWN0LXdyYXBwZXJcIixcbiAgXSk7XG5cbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwic2VsZWN0XCIsXG4gICAgXCJwcm9qZWN0LXNlbGVjdFwiLFxuICAgIFtcInByb2plY3Qtc2VsZWN0XCJdLFxuICAgIG51bGwsXG4gICAgW1xuICAgICAgW1wibmFtZVwiLCBcInByb2plY3Qtc2VsZWN0b3JcIl0sXG4gICAgICBbXCJ0aXRsZVwiLCBcIkNob29zZSBwcm9qZWN0XCJdLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCBwcm9qZWN0U2VsZWN0TGFiZWwgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIG51bGwsXG4gICAgW1wicHJvamVjdC1zZWxlY3QtbGFiZWxcIl0sXG4gICAgbnVsbCxcbiAgICBbW1wiZm9yXCIsIHByb2plY3RTZWxlY3QuaWRdXVxuICApO1xuXG4gIGdldFByb2plY3RzVGl0bGVzKCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGZvciAobGV0IHRpdGxlIGluIGl0ZW0pIHtcbiAgICAgIGNvbnN0IHByb2plY3RJZCA9IGl0ZW1bdGl0bGVdO1xuXG4gICAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVIdG1sRWxlbWVudChcIm9wdGlvblwiLCBwcm9qZWN0SWQsIG51bGwsIHRpdGxlLCBbXG4gICAgICAgIFtcInZhbHVlXCIsIHRpdGxlXSxcbiAgICAgIF0pO1xuXG4gICAgICBpZiAocHJvamVjdElkID09IGFjdGl2ZVByb2plY3QuaWQpIHtcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xuICAgICAgfVxuXG4gICAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfVxuICB9KTtcblxuICBwcm9qZWN0U2VsZWN0V3JhcHBlci5hcHBlbmQocHJvamVjdFNlbGVjdExhYmVsLCBwcm9qZWN0U2VsZWN0KTtcblxuICByZXR1cm4gcHJvamVjdFNlbGVjdFdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGFza1ByaW9yaXR5RWxlbWVudHModGFzaykge1xuICBsZXQgcHJpb3JpdHkgPSBcIlAxXCI7XG5cbiAgaWYgKHRhc2spIHtcbiAgICBwcmlvcml0eSA9IHRhc2sucHJpb3JpdHk7XG4gIH1cblxuICBjb25zdCBwcmlvcml0eVdyYXBwZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXCJwcmlvcml0eS13cmFwcGVyXCJdKTtcblxuICBjb25zdCBuZXdQcmlvcml0eSA9IGdlbmVyYXRlVGFza1ByaW9yaXR5U2VsZWN0b3JFbGVtZW50KHByaW9yaXR5KTtcbiAgbmV3UHJpb3JpdHkuY2xhc3NOYW1lID0gXCJuZXctdGFzay1wcmlvcml0eVwiO1xuXG4gIGNvbnN0IHByaW9yaXR5TGFiZWwgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIG51bGwsXG4gICAgW1wicHJpb3JpdHktbGFiZWxcIl0sXG4gICAgbnVsbCxcbiAgICBbW1wiZm9yXCIsIG5ld1ByaW9yaXR5LmlkXV1cbiAgKTtcblxuICBwcmlvcml0eVdyYXBwZXIuYXBwZW5kKHByaW9yaXR5TGFiZWwsIG5ld1ByaW9yaXR5KTtcblxuICByZXR1cm4gcHJpb3JpdHlXcmFwcGVyO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhc2tEYXRlRWxlbWVudHModGFzaykge1xuICBsZXQgZGF0ZVNldHRpbmcgPSBmYWxzZTtcbiAgaWYgKHRhc2spIHtcbiAgICBkYXRlU2V0dGluZyA9IHRhc2suZHVlRGF0ZTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVXcmFwcGVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1widGFzay1kYXRlLXdyYXBwZXJcIl0pO1xuXG4gIGNvbnN0IGRhdGUgPSBjcmVhdGVEYXRlSW5wdXRFbGVtZW50KGRhdGVTZXR0aW5nKTtcblxuICBjb25zdCBkYXRlTGFiZWwgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXCJkYXRlLWxhYmVsXCJdLCBcIkR1ZSBkYXRlXCIsIFtcbiAgICBbXCJmb3JcIiwgZGF0ZS5pZF0sXG4gIF0pO1xuICBkYXRlV3JhcHBlci5hcHBlbmQoZGF0ZUxhYmVsLCBkYXRlKTtcblxuICByZXR1cm4gZGF0ZVdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGFza3NTb3J0ZXJFbGVtZW50KCkge1xuICBjb25zdCBzb3J0ZXJXcmFwcGVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1xuICAgIFwicHJvamVjdC1zb3J0ZXItd3JhcHBlclwiLFxuICBdKTtcblxuICBjb25zdCBzb3J0ZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBcInNvcnRlclwiLCBbXCJwcm9qZWN0LXNvcnRlclwiXSk7XG5cbiAgY29uc3Qgd3JhcHBlciA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcInNvcnQtaWNvbnMtd3JhcHBlclwiXSk7XG4gIGNvbnN0IHNvcnRBcnJvdyA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcInNvcnQtYXJyb3dcIl0pO1xuXG4gIGlmIChhY3RpdmVTb3J0T3JkZXIgPT09IFwiYXNjZW5kaW5nXCIpIHtcbiAgICBzb3J0QXJyb3cuY2xhc3NMaXN0LmFkZChcInNvcnQtYXJyb3ctLXVwXCIpO1xuICB9XG5cbiAgY29uc3Qgc29ydExhYmVsID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBbXCJzb3J0LWxhYmVsXCJdLCBudWxsLCBbXG4gICAgW1wiZm9yXCIsIHNvcnRlci5pZF0sXG4gIF0pO1xuXG4gIHdyYXBwZXIuYXBwZW5kKHNvcnRBcnJvdywgc29ydExhYmVsKTtcbiAgbGV0IG9wdGlvbnMgPSBzb3J0T3B0aW9ucztcblxuICBvcHRpb25zID0gb3B0aW9ucy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGFjdGl2ZVNvcnRPcHRpb24pO1xuICBvcHRpb25zLnVuc2hpZnQoYWN0aXZlU29ydE9wdGlvbik7XG5cbiAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICBjb25zdCBzb3J0T3B0aW9uID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1wic29ydC1vcHRpb25cIl0sIG9wdGlvbik7XG4gICAgaWYgKG9wdGlvbiA9PSBhY3RpdmVTb3J0T3B0aW9uKSBzb3J0T3B0aW9uLmlkID0gXCJzZWxlY3RlZFwiO1xuICAgIHNvcnRlci5hcHBlbmQoc29ydE9wdGlvbik7XG4gIH0pO1xuXG4gIHNvcnRlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIsIHNvcnRlcik7XG5cbiAgcmV0dXJuIHNvcnRlcldyYXBwZXI7XG59XG5cblxuXG5mdW5jdGlvbiBhZGRUYXNrUmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHJlbW92ZS5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlXCIpO1xuICByZW1vdmUudGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiO1xuXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQocmVtb3ZlKTtcbn1cblxuZnVuY3Rpb24gYWRkVGFza0VkaXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVkaXQuY2xhc3NMaXN0LmFkZChcImVkaXRcIik7XG4gIGVkaXQudGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblxuICBlbGVtZW50LmFwcGVuZENoaWxkKGVkaXQpO1xufVxuXG5mdW5jdGlvbiBhZGRDaGVja0JveCh0YXNrLCB0YXNrRWxlbWVudCkge1xuICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiaW5wdXRcIiwgbnVsbCwgW1wiY29tcGxldGVcIl0sIG51bGwsIFtcbiAgICBbXCJ0eXBlXCIsIFwiY2hlY2tib3hcIl0sXG4gIF0pO1xuXG4gIHNldENoZWNrQm94Q29sb3IoY2hlY2tib3gsIHRhc2spO1xuICB0YXNrRWxlbWVudC5hcHBlbmQoY2hlY2tib3gpO1xuICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZWQ7XG59XG5cbmZ1bmN0aW9uIGFkZFRhc2tBY3Rpb25zRWxlbWVudChlbGVtZW50KSB7XG4gIGNvbnN0IGFjdGlvbnNXcmFwcGVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1xuICAgIFwidGFzay1hY3Rpb25zLXdyYXBwZXJcIixcbiAgXSk7XG5cbiAgYWRkVGFza0VkaXRFbGVtZW50KGFjdGlvbnNXcmFwcGVyKTtcbiAgYWRkVGFza1JlbW92ZUVsZW1lbnQoYWN0aW9uc1dyYXBwZXIpO1xuXG4gIGVsZW1lbnQuYXBwZW5kKGFjdGlvbnNXcmFwcGVyKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDb250ZW50RWxlbWVudCgpIHtcbiAgY29udGVudC5yZXBsYWNlQ2hpbGRyZW4oKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGFza3NFbGVtZW50KCkge1xuXG4gIGNvbnN0IHByb2plY3RJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0JykuaWQ7XG4gIGNvbnN0IG9sZFRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJyk7XG5cbiAgIG9sZFRhc2tzLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LS1mYWRpbmdcIik7XG5cbiAgIGxldCBwcm9qZWN0O1xuXG4gICBpZiAocHJvamVjdElkID09PSAnLTEnKSB7XG4gICAgcHJvamVjdCA9IGdldFVwZGF0ZWRIb21lUHJvamVjdCgpO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3QgPSBnZXRQcm9qZWN0QnlJZChwcm9qZWN0SWQpO1xuICB9XG4gICBzb3J0ZXIocHJvamVjdCk7XG4gICAgY29uc3QgdGFza3MgPSBnZW5lcmF0ZVRhc2tzKHByb2plY3QpO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG9sZFRhc2tzLnJlcGxhY2VXaXRoKHRhc2tzKTtcbiAgICB0YXNrcy5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC0tZmFkaW5nXCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFza3MuY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3QtLWZhZGluZ1wiKTtcbiAgICB9LCAyMDApO1xuICB9LCAxMDApO1xuXG59XG5cblxuZXhwb3J0IHtcbiAgcmVuZGVyLFxuICBkaXNwbGF5UHJvamVjdCxcbiAgZ2VuZXJhdGVUYXNrRWxlbWVudCxcbiAgZ2VuZXJhdGVOZXdUYXNrQmFyLFxuICBzZXRDaGVja0JveENvbG9yLFxuICBzZXRDaGVja0JveE91dGxpbmVDb2xvcixcbiAgZ2VuZXJhdGVQcm9qZWN0U2VsZWN0RWxlbWVudCxcbiAgZ2VuZXJhdGVUYXNrUHJpb3JpdHlFbGVtZW50cyxcbiAgZ2VuZXJhdGVUYXNrRGF0ZUVsZW1lbnRzLFxuICBnZW5lcmF0ZUV4cGFuZGVkVGFza0VsZW1lbnQsXG4gIGdlbmVyYXRlVGFza1dpdGhJbnB1dCxcbiAgZ2VuZXJhdGVUYXNrcyxcbiAgdXBkYXRlVGFza3NFbGVtZW50XG59O1xuIiwiaW1wb3J0IHtjb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge2NyZWF0ZUh0bWxFbGVtZW50IH0gZnJvbSAnLi4vVUknO1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBudWxsLCBbJ2hlYWRlciddLCBudWxsLCBudWxsKTtcblxuICBjb25zdCBoZWFkZXJUZXh0ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgbnVsbCxcbiAgICBbJ2hlYWRlci10ZXh0J10sXG4gICAgY29uZmlnLnBhZ2UudGl0bGUsXG4gICAgbnVsbFxuICApO1xuXG4gIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KTtcblxuIHJldHVybiBoZWFkZXI7XG59XG5cbmV4cG9ydCB7IHJlbmRlciB9O1xuIiwiaW1wb3J0IHsgZ2V0RG9uZUxpc3QsIGdldEhvbWVQcm9qZWN0LCBnZXRQcm9qZWN0c1RpdGxlcyB9IGZyb20gJy4uL01hbmFnZXInO1xuaW1wb3J0IHsgY3JlYXRlSHRtbEVsZW1lbnQsIGRpc3BsYXkgfSBmcm9tICcuLi9VSSc7XG5cbmNvbnN0IG5hdiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBudWxsLCBbJ25hdiddLCBudWxsLCBudWxsKTtcblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBuYXYuYXBwZW5kKGdlbmVyYXRlSG9tZUl0ZW0oKSwgZ2VuZXJhdGVOYXZJdGVtcygpLCBhZGRQcm9qZWN0QnV0dG9uKCksIGdlbmVyYXRlRG9uZVRhc2tzUHJvaigpKTtcbiAgcmV0dXJuIG5hdjtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEb25lVGFza3NQcm9qKCkge1xuICBjb25zdCBkb25lUHJvamVjdCA9IGdldERvbmVMaXN0KCk7XG4gIGNvbnN0IGRvbmUgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgZG9uZVByb2plY3QuaWQsIFsnZG9uZS10YXNrcyddLCAnQ29tcGxldGVkIHRhc2tzJywgbnVsbCk7XG5cbiAgcmV0dXJuIGRvbmU7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSG9tZUl0ZW0oKSB7XG4gIGNvbnN0IGhvbWVQcm9qZWN0ID0gZ2V0SG9tZVByb2plY3QoKTtcbiAgY29uc3QgaG9tZSA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBob21lUHJvamVjdC5pZCwgWyduYXYtaG9tZSddLCAnSG9tZScsIG51bGwpO1xuXG4gIHJldHVybiBob21lO1xuXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmF2SXRlbXMoKSB7XG4gIGxldCBuYXZJdGVtcyA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBudWxsLCBbJ25hdi1pdGVtcyddLCBudWxsLCBudWxsKTtcbiAgbGV0IGl0ZW1zID0gZ2V0UHJvamVjdHNUaXRsZXMoKTtcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBpdGVtKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3VsJywgaXRlbVtrZXldLCBbJ25hdi1pdGVtJ10sIGtleSwgbnVsbCk7XG4gICAgICBuYXZJdGVtcy5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBuYXZJdGVtcztcbn1cblxuZnVuY3Rpb24gdXBkYXRlTmF2KCkge1xuICBuYXYucmVwbGFjZUNoaWxkcmVuKCk7XG4gIHJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBldmVudHMobWFwKSB7XG4gIG1hcC5mb3JFYWNoKChvYmplY3QsIGVsZW1lbnQpID0+IHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgZGlzcGxheShvYmplY3QpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdEJ1dHRvbigpIHtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIG51bGwsXG4gICAgWydwcm9qZWN0LWFkZCddLFxuICAgICdBZGQgUHJvamVjdCcsXG4gICAgbnVsbFxuICApO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IHsgcmVuZGVyLCB1cGRhdGVOYXYgfTtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgdmlld0JveD1cXFwiMCAwIDE2IDE2XFxcIiBmaWxsPVxcXCJ3aGl0ZVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cGF0aCBkPVxcXCJNMTIuMjA3IDQuNzkzYTEgMSAwIDAxMCAxLjQxNGwtNSA1YTEgMSAwIDAxLTEuNDE0IDBsLTItMmExIDEgMCAwMTEuNDE0LTEuNDE0TDYuNSA5LjA4Nmw0LjI5My00LjI5M2ExIDEgMCAwMTEuNDE0IDB6XFxcIi8+PC9zdmc+XCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vc3RhdGljL2ljb25zL2VkaXQuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi4vc3RhdGljL2ljb25zL2RlbGV0ZS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuLi9zdGF0aWMvaWNvbnMvY2FsZW5kYXIuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi4vc3RhdGljL2ljb25zL2ZvbGRlci5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuLi9zdGF0aWMvaWNvbnMvYXJyb3cuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSBuZXcgVVJMKFwiLi4vc3RhdGljL2ljb25zL3NvcnQuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzdfX18gPSBuZXcgVVJMKFwiLi4vc3RhdGljL2ljb25zL3ByaW9yaXR5LnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLXAxLWNvbG9yOiByZ2JhKDAsIDEyOCwgMCwgMC4zKTtcXG4gIC0tcDItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMyk7XFxuICAtLXAzLWNvbG9yOiByZ2JhKDI1NSwgMTY1LCAwLCAwLjMpO1xcbiAgLS1wNC1jb2xvcjogcmdiYSgyNTUsIDY5LCAwLCAwLjMpO1xcbiAgLS1wMS1ib3JkZXItY29sb3I6IHJnYmEoMCwgMTI4LCAwLCAwLjgpO1xcbiAgLS1wMi1ib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuOCk7XFxuICAtLXAzLWJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDE2NSwgMCwgMC44KTtcXG4gIC0tcDQtYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgNjksIDAsIDAuOCk7XFxuICAtLWNoZWNrLWljb246IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICAtLWVkaXQtaWNvbjogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gIC0tcmVtb3ZlLWljb246IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIG1hcmdpbjogMHB4O1xcbn1cXG4ubWFpbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi50YXNrLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3gtc2hhZG93OiAwIDJweCA2cHggMnB4IHJnYmEoNjAsIDY0LCA2NywgMC4xNDkpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxufVxcblxcbi50YXNrLWluc2lkZS1jb250YWluZXIge1xcbiAgZmxleDogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5uZXctdGFzay1jb250ZW50LXdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA4MCU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiA1cHg7XFxufVxcblxcbi50YXNrLXByb3BlcnRpZXMtd3JhcHBlciB7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnRhc2sgLnRhc2stcHJvcGVydGllcy13cmFwcGVyIHtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZ3JpZC1yb3c6IDM7XFxufVxcblxcbi5uZXctdGFzay1mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50YXNrLXByb3BlcnRpZXMtd3JhcHBlcixcXG4uY2xvc2Utd3JhcHBlciB7XFxuICB3aWR0aDogNTAlO1xcbn1cXG5cXG4ubmV3LXRhc2stcHJpb3JpdHkge1xcbiAgd2lkdGg6IDQwcHg7XFxufVxcblxcbi5jbG9zZS13cmFwcGVyIHtcXG4gIGZsZXg6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbiAgbWFyZ2luOiAycHg7XFxufVxcblxcbi50YXNrLWNsb3NlIHtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbn1cXG5cXG4uZGF0ZS1sYWJlbCB7XFxuICBjb250ZW50OiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbn1cXG5cXG4ucHJvamVjdC1zZWxlY3Qtd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucHJvamVjdC1zZWxlY3QtbGFiZWwge1xcbiAgY29udGVudDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyArIFwiKTtcXG59XFxuXFxuLnRleHQtYmFyIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBwYWRkaW5nOiA1cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMHB4O1xcbn1cXG5cXG4ubmV3LWRlc2NyaXB0aW9uIHtcXG4gIGJvcmRlcjogMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbn1cXG5cXG5pbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiAwcHg7XFxufVxcblxcbi50YXNrLWNvbnRhaW5lci0tZXhwYW5kIHtcXG4gIGhlaWdodDogMTIwcHg7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ubm90ZXMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxMGZyO1xcbn1cXG5cXG4ubmF2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi13aWR0aDogMTUwcHg7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IDAuOXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG59XFxuXFxuLm5hdi1ob21lIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgd2lkdGg6IDEwMHB4O1xcbn1cXG5cXG4ubmF2LWl0ZW1zIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbjogMHB4O1xcbn1cXG5cXG4ubmF2LWl0ZW0ge1xcbiAgYWxsOiB1bnNldDtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi5uYXYtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogZ3JlZW47XFxufVxcblxcbi5wcm9qZWN0LWFkZCB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIHdpZHRoOiAxMDBweDtcXG59XFxuXFxuLmRvbmUtdGFza3Mge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICB3aWR0aDogMTAwcHg7XFxufVxcblxcbi50YXNrcyB7XFxuICBvcGFjaXR5OiAxO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5oZWFkZXItdGV4dCB7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnByb2plY3RzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAgZ3JpZC1hdXRvLWNvbHVtbnM6IDFmcjtcXG59XFxuXFxuLnByb2plY3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDEwcHg7XFxuICBvcGFjaXR5OiAxO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjFzO1xcbn1cXG5cXG4ucHJvamVjdC0tZmFkaW5nIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbi5wcm9qZWN0LWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucHJvamVjdC10aXRsZS13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDVweDtcXG4gIHdpZHRoOiA1MCU7XFxufVxcblxcbi5wcm9qZWN0LXNvcnRlci13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDVweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5zb3J0LWljb25zLXdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnNvcnQtYXJyb3cge1xcbiAgY29udGVudDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyArIFwiKTtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc29ydC1hcnJvdy0tdXAge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG59XFxuXFxuLnNvcnQtbGFiZWwge1xcbiAgY29udGVudDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyArIFwiKTtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbn1cXG5cXG4ucHJvamVjdC1zb3J0ZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4xcztcXG59XFxuXFxuLnByb2plY3Qtc29ydGVyOmhvdmVyIHtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG4jc2VsZWN0ZWQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDAuN3JlbTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5zb3J0LW9wdGlvbiB7XFxuICBmb250LXNpemU6IDAuN3JlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG5cXG4uc29ydC1vcHRpb246aG92ZXIge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4ucHJvamVjdC1zb3J0ZXI6aG92ZXIgLnNvcnQtb3B0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wcm9qZWN0LXNvcnRlcjpob3ZlciAjc2VsZWN0ZWQge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxuLnByb2plY3QtdGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4ucHJvamVjdC10aXRsZS1lZGl0LFxcbi5wcm9qZWN0LXJlbW92ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxufVxcblxcbi5wcm9qZWN0LXRpdGxlLWVkaXQge1xcbiAgY29udGVudDogdmFyKC0tZWRpdC1pY29uKTtcXG59XFxuXFxuLnByb2plY3QtcmVtb3ZlIHtcXG4gIGNvbnRlbnQ6IHZhcigtLXJlbW92ZS1pY29uKTtcXG59XFxuXFxuLnByb2plY3QtdGl0bGUtd3JhcHBlcjpob3ZlciA6aXMoLnByb2plY3QtdGl0bGUtZWRpdCwgLnByb2plY3QtcmVtb3ZlKSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmVkaXRpbmcge1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuLnRhc2sge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCAxZnIgMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDFmcjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi50YXNrLS1leHBhbmRlZCB7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAwLjVmciAwLjVmcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCAxZnIgMWZyIDE1MHB4O1xcbn1cXG5cXG4udGFzazpob3ZlciB7XFxuICBvdXRsaW5lOiAxcHggc29saWQgcmdiYSgwLCAxMjgsIDAsIDAuMSk7XFxufVxcblxcbi5zYXZlIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogcmlnaHQ7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIGdyaWQtY29sdW1uOiAzO1xcbiAgZ3JpZC1yb3c6IDM7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGdyaWQtcm93OiBzcGFuIDI7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDAsIDAsIDAuNCk7ICovXFxuICBtYXJnaW46IDA7XFxuICBmb250OiBpbmhlcml0O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgd2lkdGg6IDEuMTVlbTtcXG4gIGhlaWdodDogMS4xNWVtO1xcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB0cmFuc2l0aW9uOiBvdXRsaW5lIDUwbXMgNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRhc2s6aG92ZXIgaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICBvdXRsaW5lOiAwLjE1ZW0gc29saWQ7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06aG92ZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tY2hlY2staWNvbik7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB2YXIoLS1jaGVjay1pY29uKTtcXG59XFxuXFxuc2VsZWN0IHtcXG4gIG91dGxpbmU6IDBweDtcXG4gIGJvcmRlcjogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbnNlbGVjdDpob3ZlciB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi50YXNrLWRhdGUtd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiA1cHg7XFxufVxcblxcbi5uZXctdGFzay1kYXRlIHtcXG4gIGJvcmRlcjogMHB4O1xcbiAgd2lkdGg6IDcwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5uZXctdGFzay1kYXRlOmhvdmVyIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5wcmlvcml0eS13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wcmlvcml0eSB7XFxuICBmb250LXNpemU6IDAuOXJlbTtcXG59XFxuXFxuLnByaW9yaXR5LWxhYmVsIHtcXG4gIGNvbnRlbnQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gKyBcIik7XFxufVxcblxcbi5kYXRlLXByaW9yaXR5LXdyYXBwZXIge1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBncmlkLXJvdzogMztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XFxuICBwYWRkaW5nLXRvcDogNXB4O1xcbn1cXG5cXG4udGFzay1hY3Rpb25zLXdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogNXB4O1xcblxcbiAganVzdGlmeS1zZWxmOiBlbmQ7XFxuICBncmlkLWNvbHVtbjogNDtcXG59XFxuXFxuLmVkaXQsXFxuLnJlbW92ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZm9udC1zaXplOiAwLjlyZW07XFxufVxcblxcbi5lZGl0IHtcXG4gIGNvbnRlbnQ6IHZhcigtLWVkaXQtaWNvbik7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG59XFxuXFxuLnJlbW92ZSB7XFxuICBjb250ZW50OiB2YXIoLS1yZW1vdmUtaWNvbik7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG59XFxuXFxuLnRhc2stY29udGVudC13cmFwcGVyIHtcXG4gIGdyaWQtcm93OiBzcGFuIDI7XFxuICBncmlkLWNvbHVtbjogc3BhbiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBnYXA6IDVweDtcXG59XFxuXFxuLmlucHV0LXRleHQtd3JhcHBlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgZ2FwOiA1cHg7XFxufVxcblxcblxcbi50YXNrLWNvbnRlbnQtd3JhcHBlcntcXG5wb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLnRhc2stZWRpdCB7XFxuICBwb2ludGVyLWV2ZW50czphbGw7XFxufVxcblxcblxcblxcblxcbi5pbnB1dC10ZXh0LXdyYXBwZXIgOmlzKC50YXNrLXRpdGxlLCAuZGVzY3JpcHRpb24pIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxufVxcblxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIjtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIHJlc2l6ZTogbm9uZTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxufVxcblxcbi50YXNrLWVkaXQge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMnB0O1xcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB0IGdyZXk7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgdHJhbnNpdGlvbjogMXM7XFxufVxcblxcbi50YXNrLXRpdGxlIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBwYWRkaW5nOiA1cHg7XFxuICBvdXRsaW5lOiAwcHg7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcblxcbi50YXNrLS1leHBhbmRlZCA6aXMoLmVkaXQsIC5yZW1vdmUpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4udGFzay0tZXhwYW5kIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnRhc2stdGl0bGUtLWhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZGVzY3JpcHRpb24ge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBwYWRkaW5nOiA1cHg7XFxuICBvdXRsaW5lOiAwcHg7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcblxcbi50YXNrLWVkaXQgOmlzKC50YXNrLXRpdGxlLCAuZGVzY3JpcHRpb24pIHtcXG4gIHdpZHRoOiBhdXRvO1xcbn1cXG5cXG4uYXNzaWduZWQtcHJvamVjdCB7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZzogM3B4O1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBncmlkLWNvbHVtbjogNDtcXG4gIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG4uZHVlLXN0YXR1cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBtYXJnaW4tbGVmdDogNXB4O1xcbn1cXG5cXG4udGFzazpob3ZlciAudGFzay1hY3Rpb25zLXdyYXBwZXIgPiBkaXYge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmRpdltpZD1cXFwiLTJcXFwiXSAudGFzayAudGFzay1hY3Rpb25zLXdyYXBwZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLm5ldy10YXNrLWRhdGUtcGlja2VyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwcHg7XFxuICByaWdodDogNTA7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxnQ0FBZ0M7RUFDaEMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyxpQ0FBaUM7RUFDakMsdUNBQXVDO0VBQ3ZDLHlDQUF5QztFQUN6Qyx5Q0FBeUM7RUFDekMsd0NBQXdDO0VBQ3hDLHFEQUFzUDtFQUN0UCxvREFBMEM7RUFDMUMsc0RBQThDO0FBQ2hEOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsV0FBVztBQUNiO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JB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QVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixXQUFXO0VBQ1gsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsU0FBUztFQUNULFNBQVM7QUFDWFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLXAxLWNvbG9yOiByZ2JhKDAsIDEyOCwgMCwgMC4zKTtcXG4gIC0tcDItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMyk7XFxuICAtLXAzLWNvbG9yOiByZ2JhKDI1NSwgMTY1LCAwLCAwLjMpO1xcbiAgLS1wNC1jb2xvcjogcmdiYSgyNTUsIDY5LCAwLCAwLjMpO1xcbiAgLS1wMS1ib3JkZXItY29sb3I6IHJnYmEoMCwgMTI4LCAwLCAwLjgpO1xcbiAgLS1wMi1ib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuOCk7XFxuICAtLXAzLWJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDE2NSwgMCwgMC44KTtcXG4gIC0tcDQtYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgNjksIDAsIDAuOCk7XFxuICAtLWNoZWNrLWljb246IHVybCgnZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgdmlld0JveD1cXFwiMCAwIDE2IDE2XFxcIiBmaWxsPVxcXCJ3aGl0ZVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cGF0aCBkPVxcXCJNMTIuMjA3IDQuNzkzYTEgMSAwIDAxMCAxLjQxNGwtNSA1YTEgMSAwIDAxLTEuNDE0IDBsLTItMmExIDEgMCAwMTEuNDE0LTEuNDE0TDYuNSA5LjA4Nmw0LjI5My00LjI5M2ExIDEgMCAwMTEuNDE0IDB6XFxcIi8+PC9zdmc+Jyk7XFxuICAtLWVkaXQtaWNvbjogdXJsKC4uL3N0YXRpYy9pY29ucy9lZGl0LnN2Zyk7XFxuICAtLXJlbW92ZS1pY29uOiB1cmwoLi4vc3RhdGljL2ljb25zL2RlbGV0ZS5zdmcpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBtYXJnaW46IDBweDtcXG59XFxuLm1haW4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4udGFzay1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm94LXNoYWRvdzogMCAycHggNnB4IDJweCByZ2JhKDYwLCA2NCwgNjcsIDAuMTQ5KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNDBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbn1cXG5cXG4udGFzay1pbnNpZGUtY29udGFpbmVyIHtcXG4gIGZsZXg6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ubmV3LXRhc2stY29udGVudC13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogODAlO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG4udGFzay1wcm9wZXJ0aWVzLXdyYXBwZXIge1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi50YXNrIC50YXNrLXByb3BlcnRpZXMtd3JhcHBlciB7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAzO1xcbn1cXG5cXG4ubmV3LXRhc2stZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udGFzay1wcm9wZXJ0aWVzLXdyYXBwZXIsXFxuLmNsb3NlLXdyYXBwZXIge1xcbiAgd2lkdGg6IDUwJTtcXG59XFxuXFxuLm5ldy10YXNrLXByaW9yaXR5IHtcXG4gIHdpZHRoOiA0MHB4O1xcbn1cXG5cXG4uY2xvc2Utd3JhcHBlciB7XFxuICBmbGV4OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG4gIG1hcmdpbjogMnB4O1xcbn1cXG5cXG4udGFzay1jbG9zZSB7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG59XFxuXFxuLmRhdGUtbGFiZWwge1xcbiAgY29udGVudDogdXJsKC4uL3N0YXRpYy9pY29ucy9jYWxlbmRhci5zdmcpO1xcbn1cXG5cXG4ucHJvamVjdC1zZWxlY3Qtd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucHJvamVjdC1zZWxlY3QtbGFiZWwge1xcbiAgY29udGVudDogdXJsKC4uL3N0YXRpYy9pY29ucy9mb2xkZXIuc3ZnKTtcXG59XFxuXFxuLnRleHQtYmFyIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBwYWRkaW5nOiA1cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMHB4O1xcbn1cXG5cXG4ubmV3LWRlc2NyaXB0aW9uIHtcXG4gIGJvcmRlcjogMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbn1cXG5cXG5pbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiAwcHg7XFxufVxcblxcbi50YXNrLWNvbnRhaW5lci0tZXhwYW5kIHtcXG4gIGhlaWdodDogMTIwcHg7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ubm90ZXMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxMGZyO1xcbn1cXG5cXG4ubmF2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi13aWR0aDogMTUwcHg7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IDAuOXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG59XFxuXFxuLm5hdi1ob21lIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgd2lkdGg6IDEwMHB4O1xcbn1cXG5cXG4ubmF2LWl0ZW1zIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbjogMHB4O1xcbn1cXG5cXG4ubmF2LWl0ZW0ge1xcbiAgYWxsOiB1bnNldDtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi5uYXYtaXRlbTpob3ZlciB7XFxuICBjb2xvcjogZ3JlZW47XFxufVxcblxcbi5wcm9qZWN0LWFkZCB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIHdpZHRoOiAxMDBweDtcXG59XFxuXFxuLmRvbmUtdGFza3Mge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICB3aWR0aDogMTAwcHg7XFxufVxcblxcbi50YXNrcyB7XFxuICBvcGFjaXR5OiAxO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5oZWFkZXItdGV4dCB7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnByb2plY3RzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAgZ3JpZC1hdXRvLWNvbHVtbnM6IDFmcjtcXG59XFxuXFxuLnByb2plY3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDEwcHg7XFxuICBvcGFjaXR5OiAxO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjFzO1xcbn1cXG5cXG4ucHJvamVjdC0tZmFkaW5nIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbi5wcm9qZWN0LWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucHJvamVjdC10aXRsZS13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDVweDtcXG4gIHdpZHRoOiA1MCU7XFxufVxcblxcbi5wcm9qZWN0LXNvcnRlci13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDVweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5zb3J0LWljb25zLXdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnNvcnQtYXJyb3cge1xcbiAgY29udGVudDogdXJsKC4uL3N0YXRpYy9pY29ucy9hcnJvdy5zdmcpO1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zb3J0LWFycm93LS11cCB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4uc29ydC1sYWJlbCB7XFxuICBjb250ZW50OiB1cmwoLi4vc3RhdGljL2ljb25zL3NvcnQuc3ZnKTtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbn1cXG5cXG4ucHJvamVjdC1zb3J0ZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4xcztcXG59XFxuXFxuLnByb2plY3Qtc29ydGVyOmhvdmVyIHtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG4jc2VsZWN0ZWQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDAuN3JlbTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5zb3J0LW9wdGlvbiB7XFxuICBmb250LXNpemU6IDAuN3JlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG5cXG4uc29ydC1vcHRpb246aG92ZXIge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4ucHJvamVjdC1zb3J0ZXI6aG92ZXIgLnNvcnQtb3B0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wcm9qZWN0LXNvcnRlcjpob3ZlciAjc2VsZWN0ZWQge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxuLnByb2plY3QtdGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4ucHJvamVjdC10aXRsZS1lZGl0LFxcbi5wcm9qZWN0LXJlbW92ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxufVxcblxcbi5wcm9qZWN0LXRpdGxlLWVkaXQge1xcbiAgY29udGVudDogdmFyKC0tZWRpdC1pY29uKTtcXG59XFxuXFxuLnByb2plY3QtcmVtb3ZlIHtcXG4gIGNvbnRlbnQ6IHZhcigtLXJlbW92ZS1pY29uKTtcXG59XFxuXFxuLnByb2plY3QtdGl0bGUtd3JhcHBlcjpob3ZlciA6aXMoLnByb2plY3QtdGl0bGUtZWRpdCwgLnByb2plY3QtcmVtb3ZlKSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmVkaXRpbmcge1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuLnRhc2sge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCAxZnIgMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDFmcjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbi50YXNrLS1leHBhbmRlZCB7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAwLjVmciAwLjVmcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCAxZnIgMWZyIDE1MHB4O1xcbn1cXG5cXG4udGFzazpob3ZlciB7XFxuICBvdXRsaW5lOiAxcHggc29saWQgcmdiYSgwLCAxMjgsIDAsIDAuMSk7XFxufVxcblxcbi5zYXZlIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogcmlnaHQ7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIGdyaWQtY29sdW1uOiAzO1xcbiAgZ3JpZC1yb3c6IDM7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGdyaWQtcm93OiBzcGFuIDI7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDAsIDAsIDAuNCk7ICovXFxuICBtYXJnaW46IDA7XFxuICBmb250OiBpbmhlcml0O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgd2lkdGg6IDEuMTVlbTtcXG4gIGhlaWdodDogMS4xNWVtO1xcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB0cmFuc2l0aW9uOiBvdXRsaW5lIDUwbXMgNTBtcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRhc2s6aG92ZXIgaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICBvdXRsaW5lOiAwLjE1ZW0gc29saWQ7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06aG92ZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tY2hlY2staWNvbik7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB2YXIoLS1jaGVjay1pY29uKTtcXG59XFxuXFxuc2VsZWN0IHtcXG4gIG91dGxpbmU6IDBweDtcXG4gIGJvcmRlcjogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbnNlbGVjdDpob3ZlciB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi50YXNrLWRhdGUtd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiA1cHg7XFxufVxcblxcbi5uZXctdGFzay1kYXRlIHtcXG4gIGJvcmRlcjogMHB4O1xcbiAgd2lkdGg6IDcwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5uZXctdGFzay1kYXRlOmhvdmVyIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5wcmlvcml0eS13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wcmlvcml0eSB7XFxuICBmb250LXNpemU6IDAuOXJlbTtcXG59XFxuXFxuLnByaW9yaXR5LWxhYmVsIHtcXG4gIGNvbnRlbnQ6IHVybCguLi9zdGF0aWMvaWNvbnMvcHJpb3JpdHkuc3ZnKTtcXG59XFxuXFxuLmRhdGUtcHJpb3JpdHktd3JhcHBlciB7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIHBhZGRpbmctdG9wOiA1cHg7XFxufVxcblxcbi50YXNrLWFjdGlvbnMtd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiA1cHg7XFxuXFxuICBqdXN0aWZ5LXNlbGY6IGVuZDtcXG4gIGdyaWQtY29sdW1uOiA0O1xcbn1cXG5cXG4uZWRpdCxcXG4ucmVtb3ZlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmb250LXNpemU6IDAuOXJlbTtcXG59XFxuXFxuLmVkaXQge1xcbiAgY29udGVudDogdmFyKC0tZWRpdC1pY29uKTtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgaGVpZ2h0OiAyNXB4O1xcbn1cXG5cXG4ucmVtb3ZlIHtcXG4gIGNvbnRlbnQ6IHZhcigtLXJlbW92ZS1pY29uKTtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgaGVpZ2h0OiAyNXB4O1xcbn1cXG5cXG4udGFzay1jb250ZW50LXdyYXBwZXIge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMjtcXG4gIGdyaWQtY29sdW1uOiBzcGFuIDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG4uaW5wdXQtdGV4dC13cmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBnYXA6IDVweDtcXG59XFxuXFxuXFxuLnRhc2stY29udGVudC13cmFwcGVye1xcbnBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4udGFzay1lZGl0IHtcXG4gIHBvaW50ZXItZXZlbnRzOmFsbDtcXG59XFxuXFxuXFxuXFxuXFxuLmlucHV0LXRleHQtd3JhcHBlciA6aXMoLnRhc2stdGl0bGUsIC5kZXNjcmlwdGlvbikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG59XFxuXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcmVzaXplOiBub25lO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG59XFxuXFxuLnRhc2stZWRpdCB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAycHQ7XFxuICBib3gtc2hhZG93OiAwIDAgMCAxcHQgZ3JleTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiAxcztcXG59XFxuXFxuLnRhc2stdGl0bGUge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG91dGxpbmU6IDBweDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG59XFxuXFxuLnRhc2stLWV4cGFuZGVkIDppcyguZWRpdCwgLnJlbW92ZSkge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi50YXNrLS1leHBhbmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4udGFzay10aXRsZS0taGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5kZXNjcmlwdGlvbiB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG91dGxpbmU6IDBweDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG59XFxuXFxuLnRhc2stZWRpdCA6aXMoLnRhc2stdGl0bGUsIC5kZXNjcmlwdGlvbikge1xcbiAgd2lkdGg6IGF1dG87XFxufVxcblxcbi5hc3NpZ25lZC1wcm9qZWN0IHtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBwYWRkaW5nOiAzcHg7XFxuICBncmlkLXJvdzogMjtcXG4gIGdyaWQtY29sdW1uOiA0O1xcbiAganVzdGlmeS1zZWxmOiBlbmQ7XFxufVxcblxcbi5kdWUtc3RhdHVzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XFxufVxcblxcbi50YXNrOmhvdmVyIC50YXNrLWFjdGlvbnMtd3JhcHBlciA+IGRpdiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuZGl2W2lkPVxcXCItMlxcXCJdIC50YXNrIC50YXNrLWFjdGlvbnMtd3JhcHBlciB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4ubmV3LXRhc2stZGF0ZS1waWNrZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTBweDtcXG4gIHJpZ2h0OiA1MDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyB1cGRhdGVMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcbmltcG9ydCB7XG4gIGdldERvbmVMaXN0LFxuICBnZXRIb21lUHJvamVjdCxcbiAgZ2V0UHJvamVjdEJ5SWQsXG4gIG5ld1Byb2plY3Rcbn0gZnJvbSBcIi4vTWFuYWdlclwiO1xuaW1wb3J0IHsgY2hhbmdlU29ydENyaXRlcmlhLCBjaGFuZ2VTb3J0T3JkZXIgfSBmcm9tIFwiLi9zb3J0ZXJcIjtcbmltcG9ydCB7IGRpc3BsYXkgfSBmcm9tIFwiLi9VSVwiO1xuaW1wb3J0IHsgdXBkYXRlVGFza3NFbGVtZW50IH0gZnJvbSBcIi4vdWktbW9kdWxlcy9jb250ZW50XCI7XG5pbXBvcnQge1xuICBjaGFuZ2VUYXNrRHVlRGF0ZUhhbmRsZXIsXG4gIGNsb3NpbmdOZXdUYXNrQmFySGFuZGxlcixcbiAgZXhwYW5kaW5nTmV3VGFza0JhckhhbmRsZXIsXG4gIG1hcmtUYXNrRG9uZUhhbmRsZXIsXG4gIHBvcFVwRGF0ZVBpY2tlckhhbmRsZXIsXG4gIHByb2plY3RSZW1vdmVIYW5kbGVyLFxuICBwcm9qZWN0VGl0bGVDaGFuZ2VIYW5kbGVyLFxuICBwcm9qZWN0VGl0bGVEb25lRWRpdGluZ0hhbmRsZXIsXG4gIHByb2plY3RUaXRsZUVkaXRIYW5kbGVyLFxuICB0YXNrQXNzaWduZWRQcm9qZWN0Q2hhbmdlSGFuZGxlcixcbiAgdGFza0Rlc2NyaXB0aW9uQ2hhbmdlSGFuZGxlcixcbiAgdGFza0V4cGFuZEhhbmRsZXIsXG4gIHRhc2tIb3ZlcmVkQ2hlY2tib3hIYW5kbGVyLFxuICB0YXNrTWFrZUVkaXRhYmxlSGFuZGxlcixcbiAgdGFza1ByaW9yaXR5Q2hhbmdlSGFuZGxlcixcbiAgdGFza1JlbW92ZUhhbmRsZXIsXG4gIHRhc2tUaXRsZUNoYW5nZUhhbmRsZXJcbn0gZnJvbSBcIi4vdWktbW9kdWxlcy9oYW5kbGVycy9jb250ZW50SGFuZGxlcnNcIjtcbmltcG9ydCB7IHVwZGF0ZU5hdiB9IGZyb20gXCIuL3VpLW1vZHVsZXMvbmF2XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRMaXN0ZW5lcnMoKSB7XG4gIGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdlwiKTtcbiAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG5cbiAgbmF2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJuYXYtaG9tZVwiKSB7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gZ2V0SG9tZVByb2plY3QoKTtcbiAgICAgIGRpc3BsYXkocHJvamVjdCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwibmF2LWl0ZW1cIikge1xuICAgICAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3RCeUlkKGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICBkaXNwbGF5KHByb2plY3QpO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcImRvbmUtdGFza3NcIikge1xuICAgICAgY29uc3QgcHJvamVjdCA9IGdldERvbmVMaXN0KCk7XG4gICAgICBkaXNwbGF5KHByb2plY3QpO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInByb2plY3QtYWRkXCIpIHtcbiAgICAgIGRpc3BsYXkobmV3UHJvamVjdCgpKTtcbiAgICAgIHVwZGF0ZU5hdigpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgIG1hcmtUYXNrRG9uZUhhbmRsZXIoZXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcIm5ldy10YXNrLWRhdGUtcGlja2VyXCIpIHtcbiAgICAgIGNoYW5nZVRhc2tEdWVEYXRlSGFuZGxlcihldmVudCk7XG4gICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInByb2plY3QtdGl0bGUtZWRpdFwiKSB7XG4gICAgICBwcm9qZWN0VGl0bGVFZGl0SGFuZGxlcihldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwicHJvamVjdC1yZW1vdmVcIikge1xuICAgICAgcHJvamVjdFJlbW92ZUhhbmRsZXIoZXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcIm5ldy10YXNrLWRhdGVcIikge1xuICAgICAgcG9wVXBEYXRlUGlja2VySGFuZGxlcihldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFzay1jbG9zZVwiKSB7XG4gICAgICBjbG9zaW5nTmV3VGFza0JhckhhbmRsZXIoZXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInRleHQtYmFyXCIpIHtcbiAgICAgIGV4cGFuZGluZ05ld1Rhc2tCYXJIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNvcnQtYXJyb3dcIikpIHtcbiAgICAgIGNoYW5nZVNvcnRPcmRlcigpO1xuICAgICAgdXBkYXRlVGFza3NFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwic29ydC1vcHRpb25cIikge1xuICAgICAgY2hhbmdlU29ydENyaXRlcmlhKGV2ZW50LnRhcmdldCk7XG4gICAgICB1cGRhdGVUYXNrc0VsZW1lbnQoKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcIm5ldy10YXNrLXByaW9yaXR5XCIgJiZcbiAgICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnRhc2tcIikgIT09IG51bGxcbiAgICApIHtcbiAgICAgIHRhc2tQcmlvcml0eUNoYW5nZUhhbmRsZXIoZXZlbnQpO1xuICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwcm9qZWN0LXNlbGVjdFwiICYmXG4gICAgICBldmVudC50YXJnZXQuY2xvc2VzdChcIi50YXNrXCIpICE9PSBudWxsXG4gICAgKSB7XG4gICAgICB0YXNrQXNzaWduZWRQcm9qZWN0Q2hhbmdlSGFuZGxlcihldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLS1leHBhbmRlZFwiKSkge1xuICAgICAgdGFza0V4cGFuZEhhbmRsZXIoZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza1wiKSkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByb2plY3RcIikuaWQgPT09IGNvbmZpZy5kb25lLmlkKSByZXR1cm47XG4gICAgICB0YXNrRXhwYW5kSGFuZGxlcihldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIHRhc2tSZW1vdmVIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJlZGl0XCIpIHtcbiAgICAgIHRhc2tNYWtlRWRpdGFibGVIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJzYXZlXCIpIHtcbiAgICAgIHRhc2tFeHBhbmRIYW5kbGVyKGV2ZW50KTtcbiAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LXRpdGxlXCIpKSB7XG4gICAgICBwcm9qZWN0VGl0bGVDaGFuZ2VIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YXNrLXRpdGxlXCIpIHtcbiAgICAgIHRhc2tUaXRsZUNoYW5nZUhhbmRsZXIoZXZlbnQpO1xuICAgIH1cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJkZXNjcmlwdGlvblwiKSB7XG4gICAgICB0YXNrRGVzY3JpcHRpb25DaGFuZ2VIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tcIikpIHtcbiAgICAgIHRhc2tIb3ZlcmVkQ2hlY2tib3hIYW5kbGVyKGV2ZW50KTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInByb2plY3QtdGl0bGUgZWRpdGluZ1wiKSB7XG4gICAgICBwcm9qZWN0VGl0bGVEb25lRWRpdGluZ0hhbmRsZXIoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZXZlbnQpID0+IHtcbiAgbG9hZExpc3RlbmVycygpO1xufSk7XG4iLCJpbXBvcnQgeyB1cGRhdGVMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi4vLi4vbG9jYWxTdG9yYWdlLmpzXCI7XG5pbXBvcnQge1xuICBhZGROZXdUYXNrLFxuICBnZXRQcm9qZWN0QnlJZCxcbiAgZ2V0VGFza0J5SWQsXG4gIG1vdmVUYXNrLFxuICByZW1vdmVQcm9qZWN0LFxuICByZW1vdmVUYXNrLFxuICBydW5BbmRVcGRhdGUsXG4gIHRvZ2dsZVRhc2tDb21wbGV0aW9uLFxufSBmcm9tIFwiLi4vLi4vTWFuYWdlclwiO1xuaW1wb3J0IHsgY3JlYXRlSHRtbEVsZW1lbnQsIHVwZGF0ZSB9IGZyb20gXCIuLi8uLi9VSVwiO1xuaW1wb3J0IHtcbiAgc2V0Q2hlY2tCb3hDb2xvcixcbiAgc2V0Q2hlY2tCb3hPdXRsaW5lQ29sb3IsXG4gIGdlbmVyYXRlTmV3VGFza0JhcixcbiAgZ2VuZXJhdGVUYXNrRWxlbWVudCxcbiAgZ2VuZXJhdGVQcm9qZWN0U2VsZWN0RWxlbWVudCxcbiAgZ2VuZXJhdGVUYXNrUHJpb3JpdHlFbGVtZW50cyxcbiAgZ2VuZXJhdGVUYXNrRGF0ZUVsZW1lbnRzLFxuICBnZW5lcmF0ZUV4cGFuZGVkVGFza0VsZW1lbnQsXG4gIGdlbmVyYXRlVGFza1dpdGhJbnB1dCxcbiAgZXhwYW5kTmV3VGFzayxcbn0gZnJvbSBcIi4uL2NvbnRlbnRcIjtcbmltcG9ydCB7IHVwZGF0ZU5hdiB9IGZyb20gXCIuLi9uYXZcIjtcblxuZnVuY3Rpb24gbWFya1Rhc2tEb25lSGFuZGxlcihldmVudCkge1xuICBjb25zdCB0YXNrID0gZ2V0VGFza0J5SWQoTnVtYmVyKGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnRhc2tcIikuaWQpKTtcblxuICBydW5BbmRVcGRhdGUodG9nZ2xlVGFza0NvbXBsZXRpb24sIHRhc2spO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VUYXNrRHVlRGF0ZUhhbmRsZXIoZXZlbnQpIHtcbiAgY29uc3QgZGF0ZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLm5ldy10YXNrLWRhdGVcIik7XG4gIGRhdGUudmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgbGV0IHRhc2tFbGVtZW50ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIudGFza1wiKTtcblxuICBpZiAodGFza0VsZW1lbnQpIHtcbiAgICBsZXQgdGFzayA9IGdldFRhc2tCeUlkKHRhc2tFbGVtZW50LmlkKTtcbiAgICB0YXNrLmR1ZURhdGUgPSBkYXRlLnZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb2plY3RUaXRsZUVkaXRIYW5kbGVyKGV2ZW50KSB7XG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKTtcbiAgcHJvamVjdFRpdGxlLnNldEF0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiLCBcInRydWVcIik7XG4gIHByb2plY3RUaXRsZS5mb2N1cygpO1xuICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZChcImVkaXRpbmdcIik7XG59XG5cbmZ1bmN0aW9uIHByb2plY3RSZW1vdmVIYW5kbGVyKGV2ZW50KSB7XG4gIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJvamVjdFwiKS5pZDtcbiAgcnVuQW5kVXBkYXRlKHJlbW92ZVByb2plY3QsIGlkKTtcbn1cblxuZnVuY3Rpb24gcG9wVXBEYXRlUGlja2VySGFuZGxlcihldmVudCkge1xuICBsZXQgdG9kYXlzRGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gIGNvbnN0IG5ld0RhdGUgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICBcImlucHV0XCIsXG4gICAgbnVsbCxcbiAgICBbXCJuZXctdGFzay1kYXRlLXBpY2tlclwiXSxcbiAgICBcIkRhdGVcIixcbiAgICBbXG4gICAgICBbXCJ0eXBlXCIsIFwiZGF0ZVwiXSxcbiAgICAgIFtcIm1pblwiLCB0b2RheXNEYXRlXSxcbiAgICAgIFtcInZhbHVlXCIsIHRvZGF5c0RhdGVdLFxuICAgIF1cbiAgKTtcblxuICBpZiAoIWV2ZW50LnRhcmdldC5jb250YWlucyhuZXdEYXRlKSkgZXZlbnQudGFyZ2V0LmFwcGVuZENoaWxkKG5ld0RhdGUpO1xuXG4gIGlmIChldmVudC50YXJnZXQudmFsdWUgPT0gXCJTZXQgZGF0ZVwiKSB7XG4gICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gbmV3RGF0ZS52YWx1ZTtcbiAgfVxuICBuZXdEYXRlLnNob3dQaWNrZXIoKTtcbn1cblxuZnVuY3Rpb24gY2xvc2luZ05ld1Rhc2tCYXJIYW5kbGVyKCkge1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LWRlc2NyaXB0aW9uXCIpO1xuICBsZXQgbmV3VGFza0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dC1iYXJcIik7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLWRhdGVcIik7XG4gIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFzay1wcmlvcml0eVwiKTtcbiAgY29uc3QgcHJvamVjdFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXNlbGVjdFwiKTtcblxuICBpZiAobmV3VGFza0Jhci52YWx1ZSA9PSBcIlwiICYmIGRlc2NyaXB0aW9uLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgcnVuQW5kVXBkYXRlKFxuICAgICAgYWRkTmV3VGFzayxcbiAgICAgIHByb2plY3RTZWxlY3Rvci5vcHRpb25zW3Byb2plY3RTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pZCxcbiAgICAgIGRlc2NyaXB0aW9uLnZhbHVlLFxuICAgICAgbmV3VGFza0Jhci52YWx1ZSxcbiAgICAgIGR1ZURhdGUudmFsdWUsXG4gICAgICBwcmlvcml0eS52YWx1ZVxuICAgICk7XG4gIH1cblxuICBpZiAobmV3VGFza0Jhci52YWx1ZSAhPT0gXCJcIikge1xuICAgIHJ1bkFuZFVwZGF0ZShcbiAgICAgIGFkZE5ld1Rhc2ssXG4gICAgICBwcm9qZWN0U2VsZWN0b3Iub3B0aW9uc1twcm9qZWN0U2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaWQsXG4gICAgICBuZXdUYXNrQmFyLnZhbHVlLFxuICAgICAgZGVzY3JpcHRpb24udmFsdWUsXG4gICAgICBkdWVEYXRlLnZhbHVlLFxuICAgICAgcHJpb3JpdHkudmFsdWVcbiAgICApO1xuICB9XG5cbiAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG5cbiAgdGFza0NvbnRhaW5lci5yZXBsYWNlV2l0aChnZW5lcmF0ZU5ld1Rhc2tCYXIoKSk7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZGluZ05ld1Rhc2tCYXJIYW5kbGVyKGV2ZW50KSB7XG4gIGxldCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcbiAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1pbnNpZGUtY29udGFpbmVyXCIpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwiaW5wdXRcIixcbiAgICBudWxsLFxuICAgIFtcIm5ldy1kZXNjcmlwdGlvblwiXSxcbiAgICBudWxsLFxuICAgIFtbXCJwbGFjZWhvbGRlclwiLCBcIkRlc2NyaXB0aW9uXCJdXVxuICApO1xuICBjb25zdCB0YXNrRm9vdGVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1wibmV3LXRhc2stZm9vdGVyXCJdLCBudWxsKTtcblxuICBjb25zdCBsZWZ0V3JhcHBlciA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAgbnVsbCxcbiAgICBbXCJuZXctdGFzay1jb250ZW50LXdyYXBwZXJcIl0sXG4gICAgbnVsbFxuICApO1xuICBjb25zdCB0aXRsZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dC1iYXJcIik7XG4gIHRpdGxlQmFyLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiVGl0bGVcIik7XG4gIHRpdGxlQmFyLnNldEF0dHJpYnV0ZShcImF1dG9mb2N1c1wiLCBcIlwiKTtcblxuICB0aXRsZUJhci5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcblxuICBsZWZ0V3JhcHBlci5hcHBlbmQodGl0bGVCYXIsIGRlc2NyaXB0aW9uKTtcblxuICBjb25zdCBkYXRlQW5kUHJpb3JpdHlDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBudWxsLCBbXG4gICAgXCJ0YXNrLXByb3BlcnRpZXMtd3JhcHBlclwiLFxuICBdKTtcbiAgZGF0ZUFuZFByaW9yaXR5Q29udGFpbmVyLmFwcGVuZChcbiAgICBnZW5lcmF0ZVRhc2tEYXRlRWxlbWVudHMoKSxcbiAgICBnZW5lcmF0ZVRhc2tQcmlvcml0eUVsZW1lbnRzKClcbiAgKTtcblxuICBjb25zdCBwcm9qZWN0U2VsZWN0aW9uID0gZ2VuZXJhdGVQcm9qZWN0U2VsZWN0RWxlbWVudCgpO1xuICBkYXRlQW5kUHJpb3JpdHlDb250YWluZXIuYXBwZW5kKHByb2plY3RTZWxlY3Rpb24pO1xuXG4gIHRhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stY29udGFpbmVyLS1leHBhbmRcIik7XG5cbiAgaWYgKGNvbnRhaW5lci5sYXN0Q2hpbGQgPT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dC1iYXJcIikpIHtcblxuICAgIGNvbnRhaW5lci5hcHBlbmQobGVmdFdyYXBwZXIpO1xuICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Zvb3Rlcik7XG4gICAgdGFza0Zvb3Rlci5hcHBlbmRDaGlsZChkYXRlQW5kUHJpb3JpdHlDb250YWluZXIpO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIG51bGwsIFtcImNsb3NlLXdyYXBwZXJcIl0pO1xuICAgIGNvbnN0IGNsb3NlID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgW1widGFzay1jbG9zZVwiXSwgXCJDbG9zZVwiKTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlKTtcblxuICAgIHRhc2tGb290ZXIuYXBwZW5kKHdyYXBwZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRhc2tDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIHRhc2tQcmlvcml0eUNoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgY29uc3QgdGFza0VsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi50YXNrXCIpO1xuICBjb25zdCB0YXNrID0gZ2V0VGFza0J5SWQodGFza0VsZW1lbnQuaWQpO1xuXG4gIHRhc2sucHJpb3JpdHkgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgbGV0IGNoZWNrYm94ID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cbiAgc2V0Q2hlY2tCb3hDb2xvcihjaGVja2JveCwgdGFzayk7XG4gIHNldENoZWNrQm94T3V0bGluZUNvbG9yKGNoZWNrYm94LCB0YXNrKTtcbn1cblxuZnVuY3Rpb24gdGFza0Fzc2lnbmVkUHJvamVjdENoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgY29uc3QgdGFza0VsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi50YXNrXCIpO1xuICBjb25zdCB0YXNrID0gZ2V0VGFza0J5SWQodGFza0VsZW1lbnQuaWQpO1xuICBjb25zdCBuZXdQcm9qZWN0SWQgPVxuICAgIGV2ZW50LnRhcmdldC5vcHRpb25zW2V2ZW50LnRhcmdldC5vcHRpb25zLnNlbGVjdGVkSW5kZXhdLmlkO1xuXG4gIHJ1bkFuZFVwZGF0ZShtb3ZlVGFzaywgdGFzaywgbmV3UHJvamVjdElkKTtcbn1cblxuZnVuY3Rpb24gdGFza0V4cGFuZEhhbmRsZXIoZXZlbnQpIHtcbiAgbGV0IHRhc2tFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuXG4gIGlmICghZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tcIikpIHtcbiAgICB0YXNrRWxlbWVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnRhc2tcIik7XG4gIH1cblxuICBsZXQgdGFzayA9IGdldFRhc2tCeUlkKE51bWJlcih0YXNrRWxlbWVudC5pZCkpO1xuXG4gIGxldCBpc1Rhc2tFeHBhbmRlZCA9IHRhc2tFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2stLWV4cGFuZGVkXCIpO1xuXG4gIGlmIChpc1Rhc2tFeHBhbmRlZCkge1xuICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBnZW5lcmF0ZVRhc2tFbGVtZW50KHRhc2spO1xuICAgIHRhc2tFbGVtZW50LnJlcGxhY2VXaXRoKG5ld0VsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG5ld0VsZW1lbnQgPSBnZW5lcmF0ZUV4cGFuZGVkVGFza0VsZW1lbnQodGFzayk7XG5cbiAgdGFza0VsZW1lbnQucmVwbGFjZVdpdGgobmV3RWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHRhc2tSZW1vdmVIYW5kbGVyKGV2ZW50KSB7XG4gIGxldCBpZCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnRhc2tcIikuaWQ7XG5cbiAgcnVuQW5kVXBkYXRlKHJlbW92ZVRhc2ssIE51bWJlcihpZCkpO1xufVxuXG5mdW5jdGlvbiB0YXNrTWFrZUVkaXRhYmxlSGFuZGxlcihldmVudCkge1xuICBsZXQgdGFza0VsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi50YXNrXCIpO1xuICBjb25zb2xlLmxvZyh0YXNrRWxlbWVudCk7XG5cbiAgbGV0IHRhc2sgPSBnZXRUYXNrQnlJZCh0YXNrRWxlbWVudC5pZCk7XG4gIGxldCBlbGVtZW50ID0gZ2VuZXJhdGVUYXNrV2l0aElucHV0KHRhc2spO1xuICB0YXNrRWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oLi4uZWxlbWVudC5jaGlsZE5vZGVzKTtcbiAgdGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRhc2stLWV4cGFuZGVkXCIpO1xuXG4gIGxldCBzYXZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2F2ZS5jbGFzc0xpc3QuYWRkKFwic2F2ZVwiKTtcbiAgc2F2ZS50ZXh0Q29udGVudCA9IFwiQ2xvc2VcIjtcbiAgdGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQoc2F2ZSk7XG59XG5cbmZ1bmN0aW9uIHByb2plY3RUaXRsZUNoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3RCeUlkKGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByb2plY3RcIikuaWQpO1xuICBwcm9qZWN0LnRpdGxlID0gZXZlbnQudGFyZ2V0LnRleHRDb250ZW50O1xufVxuXG5mdW5jdGlvbiB0YXNrVGl0bGVDaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gIGxldCB0YXNrRWxlbWVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnRhc2tcIik7XG4gIGxldCB0YXNrID0gZ2V0VGFza0J5SWQodGFza0VsZW1lbnQuaWQpO1xuICB0YXNrLnRpdGxlID0gZXZlbnQudGFyZ2V0LnRleHRDb250ZW50O1xufVxuXG5mdW5jdGlvbiB0YXNrRGVzY3JpcHRpb25DaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gIGxldCB0YXNrRWxlbWVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnRhc2tcIik7XG4gIGxldCB0YXNrID0gZ2V0VGFza0J5SWQodGFza0VsZW1lbnQuaWQpO1xuICB0YXNrLmRlc2NyaXB0aW9uID0gZXZlbnQudGFyZ2V0LnRleHRDb250ZW50O1xufVxuXG5mdW5jdGlvbiB0YXNrSG92ZXJlZENoZWNrYm94SGFuZGxlcihldmVudCkge1xuICBjb25zdCB0YXNrID0gZ2V0VGFza0J5SWQoZXZlbnQudGFyZ2V0LmlkKTtcbiAgY29uc3QgY2hlY2tib3ggPSBldmVudC50YXJnZXQucXVlcnlTZWxlY3RvcihcIi5jb21wbGV0ZVwiKTtcbiAgc2V0Q2hlY2tCb3hPdXRsaW5lQ29sb3IoY2hlY2tib3gsIHRhc2spO1xufVxuXG5mdW5jdGlvbiBwcm9qZWN0VGl0bGVEb25lRWRpdGluZ0hhbmRsZXIoKSB7XG4gIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuICB1cGRhdGUoKTtcbiAgdXBkYXRlTmF2KCk7XG59XG5cbmV4cG9ydCB7XG4gIG1hcmtUYXNrRG9uZUhhbmRsZXIsXG4gIGNoYW5nZVRhc2tEdWVEYXRlSGFuZGxlcixcbiAgcHJvamVjdFRpdGxlRWRpdEhhbmRsZXIsXG4gIHByb2plY3RSZW1vdmVIYW5kbGVyLFxuICBwb3BVcERhdGVQaWNrZXJIYW5kbGVyLFxuICBjbG9zaW5nTmV3VGFza0JhckhhbmRsZXIsXG4gIGV4cGFuZGluZ05ld1Rhc2tCYXJIYW5kbGVyLFxuICB0YXNrUHJpb3JpdHlDaGFuZ2VIYW5kbGVyLFxuICB0YXNrQXNzaWduZWRQcm9qZWN0Q2hhbmdlSGFuZGxlcixcbiAgdGFza0V4cGFuZEhhbmRsZXIsXG4gIHRhc2tSZW1vdmVIYW5kbGVyLFxuICB0YXNrTWFrZUVkaXRhYmxlSGFuZGxlcixcbiAgcHJvamVjdFRpdGxlQ2hhbmdlSGFuZGxlcixcbiAgdGFza1RpdGxlQ2hhbmdlSGFuZGxlcixcbiAgdGFza0Rlc2NyaXB0aW9uQ2hhbmdlSGFuZGxlcixcbiAgdGFza0hvdmVyZWRDaGVja2JveEhhbmRsZXIsXG4gIHByb2plY3RUaXRsZURvbmVFZGl0aW5nSGFuZGxlcixcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHQwOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIvLyBDT01NRU5UOiAnIGNvbW1hIGxvb2tzIG1vcmUgY2xlYW4gdGhhbiBcIiA6RFxuLy8gQ09NTUVOVDogTm90IHJlcXVpcmVkLCBidXQgd3JpdGluZyBhIFJFQURNRS5tZCBmaWxlIGlzIGEgZ29vZCBwcmFjdGljZS4gSXQgc2hvdWxkIGluY2x1ZGUgdGhlIHByb2plY3QgZGVzY3JpcHRpb24sIGhvdyB0byBydW4gaXQsIGhvdyB0byBidWlsZCBpdCwgZXRjLlxuLy8gQXNtZW5pXG5cbmltcG9ydCB7IGluaXQgfSBmcm9tIFwiLi9NYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IGxvYWRMaXN0ZW5lcnMgZnJvbSBcIi4vbGlzdGVuZXJzXCI7IC8vIENPTU1FTlQ6IHVudXNlZCBpbXBvcnRcblxuaW5pdCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9