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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProjectsModal\": () => (/* binding */ ProjectsModal),\n/* harmony export */   \"TasksModal\": () => (/* binding */ TasksModal)\n/* harmony export */ });\n// All stuff related with modals\n\nfunction TasksModal() {\n  const taskForm = document.getElementById('modalCont');\n  const taskModal = document.querySelector('.task-modal');\n\n  openTasksModal();\n  closeTasksModal();\n  manageOnSubmit(taskForm, taskModal);\n\n  function openTasksModal() {\n    const mainAdd = document.querySelector('.main iconify-icon');\n    const taskModal = document.querySelector('.task-modal');\n\n    mainAdd.addEventListener('click', () => {\n      taskModal.classList.add('active');\n      manageOverlay().openOverlay();\n    });\n  }\n\n  function closeTasksModal() {\n    const taskModal = document.querySelector('.task-modal');\n    manageOverlay().closeOverlay(taskModal);\n  }\n}\n\nfunction ProjectsModal() {\n  const projectForm = document.getElementById('projectCont');\n  const projectModal = document.querySelector('.project-modal');\n\n  openProjectsModal();\n  closeProjectsModal();\n  manageOnSubmit(projectForm, projectModal);\n\n  function openProjectsModal() {\n    const addProject = document.querySelector('.projects-header iconify-icon');\n    const projectModal = document.querySelector('.project-modal');\n\n    addProject.addEventListener('click', () => {\n      projectModal.classList.add('active');\n      manageOverlay().openOverlay();\n    });\n  }\n\n  function closeProjectsModal() {\n    const projectModal = document.querySelector('.project-modal');\n    manageOverlay().closeOverlay(projectModal);\n  }\n}\n\nfunction manageOnSubmit(form, modal) {\n  const overlay = document.querySelector('.overlay');\n\n  form.addEventListener('submit', e => {\n    e.preventDefault();\n    modal.classList.remove('active');\n    setTimeout(() => {\n      overlay.classList.add('fade');\n      overlay.addEventListener('animationend', () => {\n        overlay.classList.remove('active');\n        form.reset();\n      });\n    }, 200);\n  });\n}\n\nfunction manageOverlay() {\n  const overlay = document.querySelector('.overlay');\n\n  function openOverlay() {\n    overlay.classList.add('active');\n    overlay.classList.remove('fade');\n  }\n\n  function closeOverlay(el) {\n    overlay.addEventListener('click', () => {\n      el.classList.remove('active');\n      setTimeout(() => {\n        overlay.classList.add('fade');\n        overlay.addEventListener('animationend', () => {\n          overlay.classList.remove('active');\n        });\n      }, 200);\n    });\n  }\n\n  return { openOverlay, closeOverlay };\n}\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/getModal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ \"./src/UI.js\");\n/* harmony import */ var _getModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getModal */ \"./src/getModal.js\");\n\n\n\n(0,_UI__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n(0,_getModal__WEBPACK_IMPORTED_MODULE_1__.TasksModal)();\n(0,_getModal__WEBPACK_IMPORTED_MODULE_1__.ProjectsModal)();\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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