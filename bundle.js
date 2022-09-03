/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ changeToDoPages)\n/* harmony export */ });\n// All UI or animation related js\n\nfunction changeToDoPages() {\n  const inboxBtn = document.querySelector('.inbox');\n  const todayBtn = document.querySelector('.today');\n  const favoriteBtn = document.querySelector('.favorite');\n\n  const mainName = document.querySelector('.main > p');\n\n  inboxBtn.addEventListener('click', () => {\n    addCurrent(inboxBtn);\n    removeCurrent(todayBtn);\n    removeCurrent(favoriteBtn);\n    mainName.textContent = 'Inbox';\n  });\n\n  todayBtn.addEventListener('click', () => {\n    addCurrent(todayBtn);\n    removeCurrent(inboxBtn);\n    removeCurrent(favoriteBtn);\n    mainName.textContent = 'Today';\n  });\n\n  favoriteBtn.addEventListener('click', () => {\n    addCurrent(favoriteBtn);\n    removeCurrent(todayBtn);\n    removeCurrent(inboxBtn);\n    mainName.textContent = 'Favorite';\n  });\n\n  function addCurrent(el) {\n    el.classList.add('current');\n    return el;\n  }\n\n  function removeCurrent(el) {\n    el.classList.remove('current');\n  }\n}\n\n\n//# sourceURL=webpack://todo-list/./src/UI.js?");

/***/ }),

/***/ "./src/getModal.js":
/*!*************************!*\
  !*** ./src/getModal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProjectsModal\": () => (/* binding */ ProjectsModal),\n/* harmony export */   \"TasksModal\": () => (/* binding */ TasksModal),\n/* harmony export */   \"WarningModal\": () => (/* binding */ WarningModal)\n/* harmony export */ });\n// All stuff related with modals\nfunction TasksModal() {\n  const taskForm = document.getElementById('modalCont');\n  const taskModal = document.querySelector('.task-modal');\n\n  openTasksModal();\n  closeTasksModal();\n  manageOnSubmit(taskForm, taskModal);\n  minDate();\n\n  function openTasksModal() {\n    const mainAdd = document.querySelector('.main iconify-icon');\n    const taskModal = document.querySelector('.task-modal');\n\n    mainAdd.addEventListener('click', () => {\n      taskModal.classList.add('active');\n      manageOverlay().openOverlay();\n    });\n  }\n\n  function closeTasksModal() {\n    const taskModal = document.querySelector('.task-modal');\n    manageOverlay().closeOverlay(taskModal);\n  }\n}\n\nfunction ProjectsModal() {\n  const projectForm = document.getElementById('projectCont');\n  const projectModal = document.querySelector('.project-modal');\n\n  openProjectsModal();\n  closeProjectsModal();\n  manageOnSubmit(projectForm, projectModal);\n\n  function openProjectsModal() {\n    const addProject = document.querySelector('.projects-header iconify-icon');\n    const projectModal = document.querySelector('.project-modal');\n\n    addProject.addEventListener('click', () => {\n      projectModal.classList.add('active');\n      manageOverlay().openOverlay();\n    });\n  }\n\n  function closeProjectsModal() {\n    const projectModal = document.querySelector('.project-modal');\n    manageOverlay().closeOverlay(projectModal);\n  }\n}\n\nfunction manageOnSubmit(form, modal) {\n  const overlay = document.querySelector('.overlay');\n\n  form.addEventListener('submit', e => {\n    e.preventDefault();\n    modal.classList.remove('active');\n    setTimeout(() => {\n      overlay.classList.add('fade');\n      overlay.addEventListener('animationend', () => {\n        overlay.classList.remove('active');\n        form.reset();\n      });\n    }, 200);\n  });\n}\n\nfunction minDate() {\n  const dtToday = new Date();\n\n  let month = dtToday.getMonth() + 1;\n  let day = dtToday.getDate();\n  const year = dtToday.getFullYear();\n  if (month < 10) month = '0' + month.toString();\n  if (day < 10) day = '0' + day.toString();\n\n  const minDate = year + '-' + month + '-' + day;\n\n  const datePicker = document\n    .querySelector(`input[type='date']`)\n    .setAttribute('min', minDate);\n}\n\nfunction manageOverlay() {\n  const overlay = document.querySelector('.overlay');\n\n  function openOverlay() {\n    overlay.classList.add('active');\n    overlay.classList.remove('fade');\n  }\n\n  function closeOverlay(el) {\n    overlay.addEventListener('click', () => {\n      el.classList.remove('active');\n      setTimeout(() => {\n        overlay.classList.add('fade');\n        overlay.addEventListener('animationend', () => {\n          overlay.classList.remove('active');\n        });\n      }, 200);\n    });\n  }\n\n  return { openOverlay, closeOverlay };\n}\n\nfunction WarningModal() {\n  const warningModal = document.querySelector('.warning-modal');\n  const overlay = document.querySelector('.overlay');\n\n  closeWarningModal();\n\n  function openWarningModal() {\n    warningModal.classList.add('active');\n    manageOverlay().openOverlay();\n  }\n\n  function closeWarningIfYes() {\n    warningModal.classList.remove('active');\n    setTimeout(() => {\n      overlay.classList.add('fade');\n      overlay.addEventListener('animationend', () => {\n        overlay.classList.remove('active');\n      });\n    }, 200);\n  }\n\n  function closeWarningModal() {\n    const delNo = document.querySelector('.delNo');\n    manageOverlay().closeOverlay(warningModal);\n\n    delNo.addEventListener('click', () => {\n      warningModal.classList.remove('active');\n      setTimeout(() => {\n        overlay.classList.add('fade');\n        overlay.addEventListener('animationend', () => {\n          overlay.classList.remove('active');\n        });\n      }, 200);\n    });\n  }\n\n  return { openWarningModal, closeWarningIfYes };\n}\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/getModal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ \"./src/UI.js\");\n/* harmony import */ var _getModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getModal */ \"./src/getModal.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n\n\n\n\n(0,_tasks__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n(0,_UI__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n(0,_getModal__WEBPACK_IMPORTED_MODULE_1__.TasksModal)();\n(0,_getModal__WEBPACK_IMPORTED_MODULE_1__.ProjectsModal)();\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ tasksFunctionality)\n/* harmony export */ });\n/* harmony import */ var _getModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getModal */ \"./src/getModal.js\");\n\n\nfunction tasksFunctionality() {\n  makeToDo();\n\n  let ToDo = [];\n\n  class Task {\n    constructor(name, dueDate, priority, project, desc) {\n      this.name = name;\n      this.dueDate = dueDate;\n      this.priority = priority;\n      this.project = project;\n      this.desc = desc;\n      this.Id = makeID();\n\n      this.addTask = function () {\n        ToDo.push({\n          name: `${name}`,\n          date: `${dueDate}`,\n          priority: `${priority}`,\n          project: `${project}`,\n          description: `${desc}`,\n          id: `${this.Id}`,\n          checked: false,\n          favorite: false,\n        });\n      };\n    }\n  }\n\n  function makeID() {\n    return '_' + Math.floor(Math.random() * 100000) + 1;\n  }\n\n  function LoopTasks() {\n    const tasksCont = document.querySelector('.tasks');\n    tasksCont.innerHTML = '';\n    for (const obj of ToDo) {\n      createToDo(obj);\n    }\n  }\n\n  function makeToDo() {\n    const taskForm = document.getElementById('modalCont');\n\n    const nameInput = document.getElementById('task-name');\n    const dueDateInput = document.getElementById('task-date');\n    const priorityInput = document.getElementById('task-priority');\n    const projectInput = document.getElementById('task-project');\n    const descInput = document.getElementById('task-description');\n\n    taskForm.addEventListener('submit', () => {\n      const currTask = new Task(\n        nameInput.value,\n        dueDateInput.value,\n        priorityInput.value,\n        projectInput.value,\n        descInput.value\n      );\n      currTask.addTask();\n\n      LoopTasks();\n    });\n  }\n\n  const delYes = document.querySelector('.delYes');\n\n  function createToDo(item) {\n    const tasksCont = document.querySelector('.tasks');\n\n    const taskContainter = document.createElement('div');\n    taskContainter.classList.add('task-container');\n\n    const newTask = document.createElement('div');\n    newTask.classList.add(`toDo`);\n    newTask.id = `toDo${item.id}`;\n\n    newTask.addEventListener('click', e => {\n      if (infoCont.classList.contains('active')) {\n        infoCont.classList.remove('active');\n        arrowDiv.classList.remove('active');\n      } else {\n        infoCont.classList.add('active');\n        arrowDiv.classList.add('active');\n      }\n    });\n\n    const left = document.createElement('div');\n    left.classList.add('left');\n\n    const check = document.createElement('div');\n    check.classList.add('check');\n\n    const checkActive = document.createElement('iconify-icon');\n    editIcon(checkActive, 'akar-icons:circle-check-fill', 20);\n    checkActive.style.color = '#4ecb71';\n\n    check.addEventListener('click', e => {\n      e.stopPropagation();\n      if (!check.hasChildNodes()) {\n        check.classList.add('active');\n        check.appendChild(checkActive);\n        toggleChecked();\n      } else {\n        check.classList.remove('active');\n        check.removeChild(checkActive);\n        toggleChecked();\n      }\n    });\n\n    function toggleChecked() {\n      item.checked = !item.checked;\n      LoopTasks();\n    }\n\n    const taskName = document.createElement('p');\n    taskName.textContent = item.name;\n\n    left.appendChild(check);\n    left.appendChild(taskName);\n\n    const right = document.createElement('div');\n    right.classList.add('right');\n\n    const iconOne = document.createElement('div');\n    iconOne.classList.add('iconone');\n\n    const edit = document.createElement('iconify-icon');\n    editIcon(edit, 'clarity:note-edit-line', 20);\n\n    const iconTwo = document.createElement('div');\n    iconTwo.classList.add('icontwo');\n\n    const favorite = document.createElement('iconify-icon');\n    editIcon(favorite, 'bi:star', 20);\n\n    const favoriteActive = document.createElement('iconify-icon');\n    editIcon(favoriteActive, 'bi:star-fill', 20);\n    favoriteActive.classList.add('star');\n\n    iconTwo.addEventListener('click', e => {\n      e.stopPropagation();\n      if (iconTwo.contains(favorite)) {\n        iconTwo.removeChild(favorite);\n        iconTwo.appendChild(favoriteActive);\n        toggleFavorite();\n      } else if (iconTwo.contains(favoriteActive)) {\n        iconTwo.removeChild(favoriteActive);\n        iconTwo.appendChild(favorite);\n        toggleFavorite();\n      }\n    });\n\n    function toggleFavorite() {\n      item.favorite = !item.favorite;\n      LoopTasks();\n    }\n\n    const priorityDiv = document.createElement('div');\n    priorityDiv.classList.add('priority');\n    priorityDiv.classList.add(`${item.priority}`);\n\n    const iconThree = document.createElement('div');\n    iconThree.classList.add('iconthree');\n\n    const deleteBtn = document.createElement('iconify-icon');\n    editIcon(deleteBtn, 'clarity:trash-line', 20);\n    deleteBtn.classList.add('deleteToDo');\n\n    const infoCont = document.createElement('div');\n    infoCont.classList.add('information');\n    infoCont.id = `information${item.id}`;\n\n    const dueDate = document.createElement('div');\n    dueDate.classList.add('due-date');\n\n    const dateTitle = document.createElement('p');\n    dateTitle.textContent = 'Due-date:';\n\n    const dateInfo = document.createElement('p');\n    dateInfo.textContent = `${item.date}`;\n\n    const desc = document.createElement('div');\n    desc.classList.add('description');\n\n    const descTitle = document.createElement('p');\n    descTitle.textContent = 'Description:';\n\n    const descInfo = document.createElement('p');\n    descInfo.textContent = `${item.description}`;\n\n    infoCont.appendChild(dueDate);\n\n    dueDate.appendChild(dateTitle);\n    dueDate.appendChild(dateInfo);\n\n    infoCont.appendChild(desc);\n\n    desc.appendChild(descTitle);\n    desc.appendChild(descInfo);\n\n    right.appendChild(iconOne);\n    right.appendChild(iconTwo);\n    right.appendChild(priorityDiv);\n    right.appendChild(iconThree);\n\n    iconOne.appendChild(edit);\n    iconTwo.appendChild(favorite);\n    iconThree.appendChild(deleteBtn);\n\n    newTask.appendChild(left);\n    newTask.appendChild(right);\n\n    tasksCont.appendChild(taskContainter);\n\n    const arrowDiv = document.createElement('div');\n    arrowDiv.classList.add('arrow');\n\n    arrowDiv.addEventListener('click', () => {\n      arrowIcon.classList.toggle('active');\n    });\n\n    const arrowIcon = document.createElement('iconify-icon');\n    editIcon(arrowIcon, 'material-symbols:keyboard-arrow-down-rounded', 40);\n\n    taskContainter.appendChild(newTask);\n\n    newTask.appendChild(arrowDiv);\n    arrowDiv.appendChild(arrowIcon);\n\n    taskContainter.appendChild(infoCont);\n\n    deleteBtn.addEventListener('click', e => {\n      e.stopPropagation();\n      onDelete(item, infoCont);\n    });\n\n    function editIcon(el, attr, size) {\n      el.setAttribute('icon', `${attr}`);\n      el.setAttribute('width', `${size}`);\n      el.setAttribute('height', `${size}`);\n    }\n\n    ifChecked(check, checkActive, item);\n    ifFavorite(favorite, favoriteActive, iconTwo, item);\n  }\n\n  function ifChecked(checkBtn, checkActive, item) {\n    if (item.checked === false) {\n      checkBtn.classList.remove('active');\n      if (checkBtn.hasChildNodes()) {\n        checkBtn.removeChild(checkActive);\n      }\n    } else if (item.checked === true) {\n      checkBtn.classList.add('active');\n      checkBtn.appendChild(checkActive);\n    }\n  }\n\n  function ifFavorite(favorite, favoriteActive, container, item) {\n    if (item.favorite === false) {\n      container.removeChild(favoriteActive);\n      container.appendChild(favorite);\n    } else if (item.favorite === true) {\n      container.removeChild(favorite);\n      container.appendChild(favoriteActive);\n    }\n  }\n\n  function onDelete(itm, infoCont) {\n    let item = itm;\n    (0,_getModal__WEBPACK_IMPORTED_MODULE_0__.WarningModal)().openWarningModal();\n\n    delYes.addEventListener('click', () => {\n      if (infoCont.classList.contains('active')) {\n        infoCont.classList.remove('active');\n      }\n      deleteTask(item);\n      item = undefined;\n      (0,_getModal__WEBPACK_IMPORTED_MODULE_0__.WarningModal)().closeWarningIfYes();\n    });\n  }\n\n  function deleteTask(item) {\n    const targetNode = document.querySelector(`#toDo${item.id}`);\n    targetNode.parentNode.removeChild(targetNode);\n\n    for (let i = 0; i < ToDo.length; i++) {\n      if (ToDo[i].id == item.id) {\n        ToDo.splice(i, 1);\n        break;\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack://todo-list/./src/tasks.js?");

/***/ })

/******/ 	});
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;