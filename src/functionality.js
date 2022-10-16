import { ProjectsModal, TasksModal, WarningModal } from './getModal';

import { changeToDoPages } from './UI';

import Task from './task';
import Project from './project';
import { format } from 'date-fns';

// Dont select text when double clicking
document.addEventListener('mousedown', event => {
  if (event.detail > 1) {
    event.preventDefault();
  }
});

// Tasks array
const ToDo = getFromLocal('all.tasks') || [];

function saveTaskToLocal() {
  writeToLocal('all.tasks', ToDo);
  writeToLocal('all.projects', project);
}

// Projects array
const project = getFromLocal('all.projects') || [
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

export function tasksFunctionality() {
  // Default functions onload
  window.addEventListener('load', () => {
    // Get all tasks from ToDo array
    getAllTasks();

    // Set default ids of inbox, today and favorite "projects"
    defaultID([
      document.querySelector('.icons .inbox'),
      document.querySelector('.icons .today'),
      document.querySelector('.icons .favorite'),
    ]);

    // Get the id from inbox project
    const inboxOpt = document.querySelector('.icons .inbox');
    const inboxProjectID = inboxOpt.id.substr(inboxOpt.id.indexOf('_'));

    // Set _current propertie true
    setInboxCurrent(inboxProjectID);

    // Get all tasks in inbox project onload
    getProjectTasks(inboxProjectID);

    // Initialize projects onclick function
    renderTasksOnClick();

    // Initialize onsubmit function
    makeToDo();
  });

  function setInboxCurrent(id) {
    project.forEach(projct => {
      projct._current = false;
      if (projct._Id === id) {
        projct._current = true;
      }
    });

    // Update in Local Storage
    writeToLocal('all.projects', project);
  }

  function getAllTasks() {
    LoopTasks(ToDo);
  }

  // Change projects onclick function
  function renderTasksOnClick() {
    const opt = document.querySelector('.opt');

    opt.addEventListener('click', e => {
      e.stopPropagation();
      if (e.target.closest('div .option[id*="projectCard_"]')) {
        if (window.screen.availWidth < 1150) {
          document.querySelector('.main').classList.toggle('toggle');
          document.querySelector('.opt').classList.toggle('toggle');
        }

        getProjectTasks(
          e.target
            .closest('div .option')
            .id.substr(e.target.closest('div .option').id.indexOf('_'))
        );

        removeCurrentSelection();
        e.target.closest('div .option').classList.toggle('current');
      }
    });
  }

  // Remove current selection to prevent crash bug
  function removeCurrentSelection() {
    document.querySelector('.option.current')
      ? document
          .querySelector('.opt .option.current')
          .classList.remove('current')
      : undefined;
  }

  // Project id
  function currentProjectSelected() {
    const options = document.querySelectorAll('.option');
    let currOpt;
    options.forEach(option => {
      if (option.classList.contains('current')) {
        currOpt = option;
      }
    });
    return currOpt.id.substr(currOpt.id.indexOf('_'));
  }

  // Get the tasks from the actual projects
  function getProjectTasks(projectID) {
    console.log(projectID);
    let target = project.filter(projct => projct._Id === projectID);

    const projectTasks = ToDo.filter(task =>
      target[0]._projectTasks.includes(task._Id)
    );

    LoopTasks(projectTasks);
  }

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
    const taskCard = createToDo(item);
    tasksCont.appendChild(taskCard);
  }

  // Create task object
  function makeToDo() {
    const taskForm = document.getElementById('modalCont');

    const nameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('task-date');
    const priorityInput = document.getElementById('task-priority');
    const projectInput = document.getElementById('task-project');
    const descInput = document.getElementById('task-description');

    taskForm.addEventListener('submit', () => {
      const currTask = new Task(
        nameInput.value,
        dueDateInput.value,
        priorityInput.value,
        projectInput.value,
        descInput.value
      );

      // Add task to allTasks array
      ToDo.push(currTask);

      manageFromTodayProject();

      // Call function to add task id to project and manage each toDo for today project
      for (const obj of ToDo) {
        addTaskToProject(obj);
      }

      function selectedProject() {
        const taskProjectOpt = document.querySelectorAll(
          '#task-project option'
        );

        let currTaskOpt;

        taskProjectOpt.forEach(taskOption => {
          if (taskOption.selected === true) {
            currTaskOpt = taskOption;
          }
        });
        return currTaskOpt.dataset.id;
      }

      if (currentProjectSelected()) {
        getProjectTasks(currentProjectSelected());
        saveTaskToLocal();
      }

      // Set current project selected in modal
      TasksModal().currProjectSelected();
    });
  }

  // Create all of the tasks content
  function createToDo(item) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const newTask = document.createElement('div');
    newTask.classList.add(`toDo`);
    newTask.id = `toDo${item._Id}`;

    // Show or hide information container
    newTask.addEventListener('click', () => {
      if (infoCont.classList.contains('active')) {
        infoCont.classList.remove('active');
        arrowDiv.classList.remove('active');
      } else {
        infoCont.classList.add('active');
        arrowDiv.classList.add('active');
      }
    });

    const left = document.createElement('div');
    left.classList.add('left');

    const check = document.createElement('div');
    check.classList.add('check');

    const checkActive = document.createElement('iconify-icon');
    editIcon(checkActive, 'akar-icons:circle-check-fill', 20);
    checkActive.style.color = '#4ecb71';

    // Check or uncheck functionality
    check.addEventListener('click', e => {
      e.stopPropagation();
      if (!check.hasChildNodes()) {
        check.classList.add('active');
        check.appendChild(checkActive);
        toggleChecked();
      } else {
        check.classList.remove('active');
        check.removeChild(checkActive);
        toggleChecked();
      }
      writeToLocal('all.tasks', ToDo);
    });

    function toggleChecked() {
      item.checked = !item.checked;
      getProjectTasks(currentProjectSelected());
    }

    const taskName = document.createElement('p');
    taskName.textContent = item._name;

    left.appendChild(check);
    left.appendChild(taskName);

    const right = document.createElement('div');
    right.classList.add('right');

    const iconOne = document.createElement('div');
    iconOne.classList.add('iconone');

    const edit = document.createElement('iconify-icon');
    editIcon(edit, 'clarity:note-edit-line', 20);

    // Edit icon onclick functionality and get current values for editModal
    edit.addEventListener('click', e => {
      e.stopPropagation();

      const editTaskForm = document.getElementById('editCont');
      editTaskForm.setAttribute('data-id', item._Id);

      const nameInput = document.getElementById('edit-name');
      const dueDateInput = document.getElementById('edit-date');
      const priorityInput = document.getElementById('edit-priority');
      const projectInput = document.getElementById('edit-project');
      const descInput = document.getElementById('edit-description');

      nameInput.value = item._name;
      dueDateInput.value = item._dueDate;
      priorityInput.value = item._priority;
      projectInput.value = item._project;
      descInput.value = item._desc;

      onEdit();
    });

    const iconTwo = document.createElement('div');
    iconTwo.classList.add('icontwo');

    const favorite = document.createElement('iconify-icon');
    editIcon(favorite, 'bi:star', 20);

    const favoriteActive = document.createElement('iconify-icon');
    editIcon(favoriteActive, 'bi:star-fill', 20);
    favoriteActive.classList.add('star');

    // Favorite or unfavorite onclick
    iconTwo.addEventListener('click', e => {
      e.stopPropagation();
      if (iconTwo.contains(favorite)) {
        iconTwo.removeChild(favorite);
        iconTwo.appendChild(favoriteActive);
        toggleFavorite();
      } else if (iconTwo.contains(favoriteActive)) {
        iconTwo.removeChild(favoriteActive);
        iconTwo.appendChild(favorite);
        toggleFavorite();
      }
      writeToLocal('all.tasks', ToDo);
      writeToLocal('all.projects', project);
      checkForFavoriteProject();

      function checkForFavoriteProject() {
        const favoriteOpt = document.querySelector('.icons .favorite');
        const favoriteProjectID = favoriteOpt.id.substr(
          favoriteOpt.id.indexOf('_')
        );

        const target = project.filter(
          projct => projct._Id === favoriteProjectID
        );

        if (item.favorite) {
          target[0]._projectTasks.push(item._Id);
        } else {
          target[0]._projectTasks.splice(
            target[0]._projectTasks.indexOf(item._Id),
            1
          );

          if (favoriteOpt.classList.contains('current')) {
            getProjectTasks(favoriteProjectID);
          }
        }
        writeToLocal('all.projects', project);
      }
    });

    function toggleFavorite() {
      item.favorite = !item.favorite;
      getProjectTasks(currentProjectSelected());
    }

    const priorityDiv = document.createElement('select');
    priorityDiv.classList.add('priority');
    priorityDiv.classList.add(`${item._priority}`);

    const option1 = document.createElement('option');
    option1.textContent = 'Low';
    option1.value = 'low';

    const option2 = document.createElement('option');
    option2.textContent = 'Normal';
    option2.value = 'normal';

    const option3 = document.createElement('option');
    option3.textContent = 'Important';
    option3.value = 'important';

    priorityDiv.appendChild(option1);
    priorityDiv.appendChild(option2);
    priorityDiv.appendChild(option3);

    // Set default priority when tasks update
    if (priorityDiv.classList.contains('low')) {
      option1.setAttribute('selected', 'selected');
    } else if (priorityDiv.classList.contains('normal')) {
      option2.setAttribute('selected', 'selected');
    } else if (priorityDiv.classList.contains('important')) {
      option3.setAttribute('selected', 'selected');
    }

    // Priority onchange functionality
    priorityDiv.addEventListener('click', e => {
      e.stopPropagation();
      priorityDiv.addEventListener('change', e => {
        if (e.target.value === 'low') {
          priorityDiv.classList.add('low');
          priorityDiv.classList.remove('normal');
          priorityDiv.classList.remove('important');
          item._priority = 'low';
        } else if (e.target.value === 'normal') {
          priorityDiv.classList.add('normal');
          priorityDiv.classList.remove('low');
          priorityDiv.classList.remove('important');
          item._priority = 'normal';
        } else if (e.target.value === 'important') {
          priorityDiv.classList.add('important');
          priorityDiv.classList.remove('low');
          priorityDiv.classList.remove('normal');
          item._priority = 'important';
        }
        getProjectTasks(currentProjectSelected());
        writeToLocal('all.tasks', ToDo);
      });
    });

    const iconThree = document.createElement('div');
    iconThree.classList.add('iconthree');

    const deleteBtn = document.createElement('iconify-icon');
    editIcon(deleteBtn, 'clarity:trash-line', 20);
    deleteBtn.classList.add('deleteToDo');

    const infoCont = document.createElement('div');
    infoCont.classList.add('information');
    infoCont.id = `information${item._Id}`;

    const dueDate = document.createElement('div');
    dueDate.classList.add('due-date');

    const dateTitle = document.createElement('p');
    dateTitle.textContent = 'Due-date:';

    const dateInfo = document.createElement('p');
    dateInfo.textContent = `${item._dueDate}`;

    const desc = document.createElement('div');
    desc.classList.add('description');

    const descTitle = document.createElement('p');
    descTitle.textContent = 'Description:';

    const descInfo = document.createElement('p');
    descInfo.textContent = `${item._desc}`;

    infoCont.appendChild(dueDate);

    dueDate.appendChild(dateTitle);
    dueDate.appendChild(dateInfo);

    infoCont.appendChild(desc);

    desc.appendChild(descTitle);
    desc.appendChild(descInfo);

    right.appendChild(iconOne);
    right.appendChild(iconTwo);
    right.appendChild(priorityDiv);
    right.appendChild(iconThree);

    iconOne.appendChild(edit);
    iconTwo.appendChild(favorite);
    iconThree.appendChild(deleteBtn);

    newTask.appendChild(left);
    newTask.appendChild(right);

    const arrowDiv = document.createElement('div');
    arrowDiv.classList.add('arrow');

    arrowDiv.addEventListener('click', () => {
      arrowIcon.classList.toggle('active');
    });

    const arrowIcon = document.createElement('iconify-icon');
    editIcon(arrowIcon, 'material-symbols:keyboard-arrow-down-rounded', 30);

    taskContainer.appendChild(newTask);

    newTask.appendChild(arrowDiv);
    arrowDiv.appendChild(arrowIcon);

    taskContainer.appendChild(infoCont);

    // Delete tasks onclick functionality
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      onDelete(item, infoCont);
    });

    // domHelper
    function editIcon(el, attr, size) {
      el.setAttribute('icon', `${attr}`);
      el.setAttribute('width', `${size}`);
      el.setAttribute('height', `${size}`);
    }

    // Get values of tasks (checked, favorite) on update
    ifChecked(check, checkActive, item);
    ifFavorite(favorite, favoriteActive, iconTwo, item);

    // Return task container
    return taskContainer;
  }

  function manageFromTodayProject() {
    const minDate = format(new Date(), 'yyyy-MM-dd');

    const todayOpt = document.querySelector('.icons .today');
    const todayProjectID = todayOpt.id.substr(todayOpt.id.indexOf('_'));

    const target = project.filter(projct => projct._Id === todayProjectID);

    ToDo.forEach(toDo => {
      if (
        toDo._dueDate === minDate &&
        !target[0]._projectTasks.includes(toDo._Id)
      ) {
        target[0]._projectTasks.push(toDo._Id);
      } else if (
        toDo._dueDate !== minDate &&
        target[0]._projectTasks.includes(toDo._Id)
      ) {
        ToDo.forEach(todo => {
          target[0]._projectTasks.splice(
            target[0]._projectTasks.indexOf(todo._Id),
            1
          );
        });
      }
      if (todayOpt.classList.contains('current')) {
        getProjectTasks(todayProjectID);
      }
    });
    writeToLocal('all.projects', project);
  }

  // Add defined task id to project
  function addTaskToProject(item) {
    const taskProjectOpt = document.querySelectorAll('#task-project option');

    let lastItem = ToDo[ToDo.length - 1];

    taskProjectOpt.forEach(taskOption => {
      if (taskOption.selected === true) {
        project.forEach(projct => {
          if (taskOption.dataset.id === projct._Id) {
            if (!projct._projectTasks.includes(lastItem)) {
              if (lastItem === item) {
                projct._projectTasks.push(item._Id);
              }
            }
          }
        });
      }
    });
  }

  function ifChecked(checkBtn, checkActive, item) {
    if (item.checked === false) {
      checkBtn.classList.remove('active');
      if (checkBtn.hasChildNodes()) {
        checkBtn.removeChild(checkActive);
      }
    } else if (item.checked === true) {
      checkBtn.classList.add('active');
      checkBtn.appendChild(checkActive);
    }
  }

  function ifFavorite(favorite, favoriteActive, container, item) {
    if (item.favorite === false) {
      if (container.contains(favoriteActive)) {
        container.removeChild(favoriteActive);
      }
      container.appendChild(favorite);
    } else if (item.favorite === true) {
      if (container.contains(favorite)) {
        container.removeChild(favorite);
      }
      container.appendChild(favoriteActive);
    }
  }

  function onDelete(itm, infoCont) {
    const delYes = document.querySelector('.delYes');

    let item = itm;
    WarningModal().openWarningModal();

    delYes.addEventListener('click', () => {
      if (infoCont.classList.contains('active')) {
        infoCont.classList.remove('active');
      }
      deleteTask(item);
      WarningModal().closeWarningIfYes();
    });
  }

  function onEdit() {
    const editTaskForm = document.getElementById('editCont');

    TasksModal().openEditTaskModal();

    editTaskForm.addEventListener('submit', e => {
      e.preventDefault();
      e.stopPropagation();
      editTask();
      TasksModal().closeOnEditTask();
    });
  }

  function deleteTask(item) {
    try {
      const targetNode = document.querySelector(`#toDo${item._Id}`);

      targetNode.parentNode.removeChild(targetNode);
    } catch (err) {}

    for (let i = 0; i < ToDo.length; i++) {
      if (ToDo[i]._Id === item._Id) {
        // Delete from allTasks array
        ToDo.splice(i, 1);
        // Delete id from defined project
        project.forEach(projct => {
          if (
            projct._name === item._project ||
            projct._name === 'today' ||
            projct._name === 'favorite'
          ) {
            if (projct._projectTasks.includes(item._Id)) {
              projct._projectTasks.splice(
                projct._projectTasks.indexOf(item._Id),
                1
              );
            }
          }
        });
        break;
      }
    }
    writeToLocal('all.tasks', ToDo);
    writeToLocal('all.projects', project);
  }

  function editTask() {
    const editTaskForm = document.getElementById('editCont');
    const editID = editTaskForm.getAttribute('data-id');

    const nameInput = document.getElementById('edit-name');
    const dueDateInput = document.getElementById('edit-date');
    const priorityInput = document.getElementById('edit-priority');
    const projectInput = document.getElementById('edit-project');
    const descInput = document.getElementById('edit-description');

    ToDo.forEach(task => {
      if (task._Id === editID) {
        // Remove from current project
        project.forEach(projct => {
          if (projct._name === task._project) {
            if (projct._projectTasks.includes(task._Id)) {
              projct._projectTasks.splice(
                projct._projectTasks.indexOf(task._Id),
                1
              );
              writeToLocal('all.projects', project);
            }
          }

          const editProjectOpt = document.querySelectorAll(
            '#edit-project option'
          );

          // Add to new project
          editProjectOpt.forEach(editOption => {
            if (editOption.selected === true) {
              if (editOption.dataset.id === projct._Id) {
                if (!projct._projectTasks.includes(task._Id)) {
                  projct._projectTasks.push(task._Id);
                  writeToLocal('all.projects', project);
                }
              }
            }
          });
        });
        // Rename
        task._name = nameInput.value;
        task._dueDate = dueDateInput.value;
        task._priority = priorityInput.value;
        task._project = projectInput.value;
        task._desc = descInput.value;
      }
    });

    // Update
    getProjectTasks(currentProjectSelected());
    manageFromTodayProject();
    writeToLocal('all.tasks', ToDo);
  }

  return { createToDo };
}

function saveProjectToLocal() {
  writeToLocal('all.projects', project);
}

// Add default id to project on load
function defaultID([inbox, today, favorite]) {
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
    targetNode.parentNode.removeChild(targetNode);

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
    if (targetNode.classList.contains('current')) {
      const inboxOpt = document.querySelector('.icons .inbox');
      const inboxProjectID = inboxOpt.id.substr(inboxOpt.id.indexOf('_'));
      const pageName = document.querySelector('.main p');

      project.forEach(prjct => {
        prjct._current = false;
        if (inboxProjectID === prjct.id) {
          prjct._current = true;
          if (!inboxOpt.classList.contains('current')) {
            inboxOpt.classList.add('current');
          }
          pageName.textContent = 'Inbox';
        }
      });

      // Duplicated functions to prevent duplicate task bug due to taskFunctionality loop

      let target = project.filter(projct => projct._Id === inboxProjectID);

      const projectTasks = ToDo.filter(task =>
        target[0]._projectTasks.includes(task._Id)
      );

      LoopTasks(projectTasks);
    }

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
          option.textContent = projct._name;
          option.value = projct._name;
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

function getFromLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}

function writeToLocal(name, dataToWrite) {
  localStorage.setItem(name, JSON.stringify(dataToWrite));
}
