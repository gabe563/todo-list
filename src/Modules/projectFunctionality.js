import { ProjectsModal, TasksModal, WarningModal } from './getModal';

import Project from './project';

import { changeToDoPages } from './UI';

import { getFromLocal, writeToLocal } from './mainFunctionality';

import { ToDo } from './taskFunctionality';

// All Project Functionality

// Projects array
export const project = getFromLocal('all.projects') || [
  new Project('inbox', true),
  new Project('today'),
  new Project('favorite'),
];

(function () {
  if (localStorage.getItem('all.projects') == null) {
    // Update in Local Storage
    writeToLocal('all.projects', project);
  }
})();

function saveProjectToLocal() {
  writeToLocal('all.projects', project);
}

// Add default id to project on load
export function defaultID([inbox, today, favorite]) {
  project.forEach(projct => {
    if (projct._name === 'inbox') {
      inbox.id = `projectCard${projct._Id}`;
    } else if (projct._name === 'today') {
      today.id = `projectCard${projct._Id}`;
    } else if (projct._name === 'favorite') {
      favorite.id = `projectCard${projct._Id}`;
    }
  });
}

export function projectFunctionality() {
  window.addEventListener('load', () => {
    // Loop through each project onload
    LoopProjects();

    // Initialize onsubmit function
    makeProject();
  });

  // Loop through each project
  function LoopProjects() {
    const projectsCont = document.querySelector('.projects');
    projectsCont.innerHTML = '';
    project.forEach(projct => {
      if (
        projct._name != 'inbox' &&
        projct._name != 'today' &&
        projct._name != 'favorite'
      ) {
        createNewProject(projct);
      }
    });
  }

  // Create project object onsubmit
  function makeProject() {
    const projectForm = document.getElementById('projectCont');
    const nameInput = document.getElementById('project-name');

    projectForm.addEventListener('submit', e => {
      e.preventDefault();
      const newProject = new Project(nameInput.value);

      project.push(newProject);
      LoopProjects();
      saveProjectToLocal();
    });
  }

  iterateOpt();

  // Set current project selected true or false on modal (link projectCard to project object)
  function iterateOpt() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        let optionID = option.id.substr(option.id.indexOf('_'));
        project.forEach(prjct => {
          prjct._current = false;
          if (optionID === prjct._Id) {
            prjct._current = true;
          }
        });
        writeToLocal('all.projects', project);
      });
    });
  }

  // Create project card
  function createNewProject(item) {
    const projectCont = document.querySelector('.projects');

    const projectCard = document.createElement('div');
    projectCard.classList.add('projectCard');
    projectCard.classList.add('option');
    projectCard.id = `projectCard${item._Id}`;

    const projectLine = document.createElement('hr');
    projectLine.classList.add('project-line');

    const projectName = document.createElement('p');
    projectName.textContent = item._name;

    const icons = document.createElement('div');
    icons.classList.add('project-icons');

    const editProject = document.createElement('iconify-icon');
    editIcon(editProject, 'akar-icons:pencil', 22);

    editProject.addEventListener('click', e => {
      e.stopPropagation();
      const editTaskForm = document.getElementById('projectEditCont');
      editTaskForm.setAttribute('data-id', item._Id);

      const nameInput = document.getElementById('project-edit-name');

      nameInput.value = item._name;

      onEdit();
    });

    const deleteIcon = document.createElement('iconify-icon');
    editIcon(deleteIcon, 'bx:trash-alt', 22);

    // Delete button onclick
    deleteIcon.addEventListener('click', e => {
      e.stopPropagation();
      onDelete(item);
    });

    // domHelper
    function editIcon(el, attr, size) {
      el.setAttribute('icon', `${attr}`);
      el.setAttribute('width', `${size}`);
      el.setAttribute('height', `${size}`);
    }

    icons.appendChild(editProject);
    icons.appendChild(deleteIcon);

    projectCard.appendChild(projectLine);
    projectCard.appendChild(projectName);
    projectCard.appendChild(icons);

    projectCont.appendChild(projectCard);

    const options = document.querySelectorAll('.option');

    // Same as iterateOpt
    options.forEach(option => {
      option.addEventListener('click', () => {
        let optionID = option.id.substr(option.id.indexOf('_'));
        project.forEach(prjct => {
          prjct._current = false;
          if (optionID === prjct._Id) {
            prjct._current = true;
          }
        });
        writeToLocal('all.projects', project);
      });
    });

    options.forEach(option => {
      project.forEach(prjct => {
        let optionID = option.id.substr(option.id.indexOf('_'));
        if (prjct._current === true) {
          if (prjct._Id === optionID) {
            if (!option.classList.contains('current')) {
              option.classList.add('current');
            }
          }
        }
      });
    });

    changeToDoPages();
    // Add new options in modals (add, edit)
    newTaskProject();
    newTaskEditProject();
  }

  function onDelete(itm) {
    const delYes = document.querySelector('.delYes');

    let item = itm;
    WarningModal().openWarningModal();

    delYes.addEventListener('click', () => {
      deleteProject(item);
      WarningModal().closeWarningIfYes();
    });
  }

  function onEdit() {
    const editProjectForm = document.getElementById('projectEditCont');

    ProjectsModal().openEditProjectModal();

    editProjectForm.addEventListener('submit', e => {
      e.preventDefault();
      editProject();
      ProjectsModal().closeOnEditProject();
    });

    newTaskProject();
    newTaskEditProject();
  }

  function deleteProject(item) {
    const targetNode = document.querySelector(`#projectCard${item._Id}`);

    try {
      targetNode.parentNode.removeChild(targetNode);
    } catch (err) {}

    const favoriteOpt = document.querySelector('.icons .favorite');
    const favoriteProjectID = favoriteOpt.id.substr(
      favoriteOpt.id.indexOf('_')
    );

    const todayOpt = document.querySelector('.icons .today');
    const todayProjectID = todayOpt.id.substr(todayOpt.id.indexOf('_'));

    // Delete toDo(s) from toDoArray
    project.forEach(projct => {
      if (projct._Id === item._Id) {
        projct._projectTasks.forEach(taskID => {
          let target = ToDo.filter(todo => todo._Id === taskID);
          ToDo.splice(ToDo.indexOf(target[0]), 1);
          // Update in Local Storage
          writeToLocal('all.tasks', ToDo);
        });
      }
    });

    checkForFavoriteCurrent();

    // Update favorite project if tasks in there project were deleted
    function checkForFavoriteCurrent() {
      if (favoriteOpt.classList.contains('current')) {
        let target = project.filter(projct => projct._Id === favoriteProjectID);

        const projectTasks = ToDo.filter(task =>
          target[0]._projectTasks.includes(task._Id)
        );

        LoopTasks(projectTasks);
      }
    }

    checkForTodayCurrent();

    // Update today project if tasks in there project were deleted
    function checkForTodayCurrent() {
      if (todayOpt.classList.contains('current')) {
        let target = project.filter(projct => projct._Id === todayProjectID);

        const projectTasks = ToDo.filter(task =>
          target[0]._projectTasks.includes(task._Id)
        );

        LoopTasks(projectTasks);
      }
    }

    manageTodayFavoriteIDs();

    function manageTodayFavoriteIDs() {
      project.forEach(projct => {
        if (projct._Id === item._Id) {
          projct._projectTasks.forEach(taskID => {
            const todayFavoriteprojects = project.filter(
              projt =>
                projt._Id === todayProjectID || projt._Id === favoriteProjectID
            );

            todayFavoriteprojects.forEach(projt => {
              projt._projectTasks.forEach(currID => {
                if (currID === taskID) {
                  projt._projectTasks.splice(
                    projt._projectTasks.indexOf(taskID),
                    1
                  );
                  // Update in Local Storage
                  writeToLocal('all.projects', project);
                }
              });
            });
          });
        }
      });
    }

    for (let i = 0; i < project.length; i++) {
      if (project[i]._Id === item._Id) {
        // Remove from projectsArray
        project.splice(i, 1);
        break;
      }
    }

    // Change to inbox if you are in current project to be deleted
    try {
      if (targetNode.classList.contains('current')) {
        const inboxOpt = document.querySelector('.icons .inbox');
        const inboxProjectID = inboxOpt.id.substr(inboxOpt.id.indexOf('_'));
        const pageName = document.querySelector('.main p');

        project.forEach(prjct => {
          prjct._current = false;
          if (inboxProjectID === prjct._Id) {
            prjct._current = true;
            if (!inboxOpt.classList.contains('current')) {
              inboxOpt.classList.add('current');
            }
            pageName.textContent = 'Inbox';
            // Update in Local Storage
            writeToLocal('all.projects', project);
          }
        });

        let target = project.filter(projct => projct._Id === inboxProjectID);

        const projectTasks = ToDo.filter(task =>
          target[0]._projectTasks.includes(task._Id)
        );

        LoopTasks(projectTasks);
        // Update in Local Storage
        writeToLocal('all.projects', project);
      }
    } catch (err) {}

    // Duplicated functions to prevent duplicate task bug due to taskFunctionality loop

    // Loop through each task from the current project
    function LoopTasks(tasks) {
      const tasksCont = document.querySelector('.tasks');
      tasksCont.innerHTML = '';
      tasks.forEach(obj => {
        renderTask(obj);
      });
    }

    // Call create task card function and append it to the main content
    function renderTask(item) {
      const tasksCont = document.querySelector('.tasks');
      const taskCard = tasksFunctionality().createToDo(item);
      tasksCont.appendChild(taskCard);
    }

    // Delete old options in modals (add, edit)
    newTaskProject();
    newTaskEditProject();

    // Update in Local Storage
    writeToLocal('all.tasks', ToDo);
    writeToLocal('all.projects', project);
  }

  function editProject() {
    const editProjectForm = document.getElementById('projectEditCont');
    const editID = editProjectForm.getAttribute('data-id');

    const pageName = document.querySelector('.main p');

    const options = document.querySelectorAll('.option');

    const nameInput = document.getElementById('project-edit-name');

    project.forEach(projct => {
      if (projct._Id === editID) {
        options.forEach(option => {
          const p = option.querySelector('p').textContent;
          if (p === projct._name) {
            if (option.classList.contains('current')) {
              pageName.textContent = nameInput.value;
            }
          }
        });
        projct._name = nameInput.value;
      }
    });

    LoopProjects();
    writeToLocal('all.projects', project);
  }

  newTaskProject();

  function newTaskProject() {
    const taskProject = document.getElementById('task-project');

    taskProject.innerHTML = '';

    project.forEach(projct => {
      if (projct._name != 'today' && projct._name != 'favorite') {
        const option = document.createElement('option');
        if (projct._name === 'inbox') {
          option.textContent = 'None';
          option.value = projct._name;
        } else {
          let projectNameCapitalized =
            projct._name[0].toUpperCase() + projct._name.slice(1).toLowerCase();
          option.textContent = projectNameCapitalized;
          option.value = projectNameCapitalized;
        }

        option.setAttribute('data-id', projct._Id);

        taskProject.append(option);
        TasksModal().currProjectSelected();
      }
    });
  }

  newTaskEditProject();

  function newTaskEditProject() {
    const editProject = document.getElementById('edit-project');

    editProject.innerHTML = '';

    project.forEach(projct => {
      if (projct._name != 'today' && projct._name != 'favorite') {
        const option = document.createElement('option');
        if (projct._name === 'inbox') {
          option.textContent = 'None';
          option.value = projct._name;
        } else {
          option.textContent = projct._name;
          option.value = projct._name;
        }
        option.setAttribute('data-id', projct._Id);

        editProject.append(option);
      }
    });
  }
}
