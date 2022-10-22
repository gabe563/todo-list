import { format } from 'date-fns';

// All stuff related with modals
function TasksModal() {
  const taskForm = document.getElementById('modalCont');
  const taskModal = document.querySelector('.task-modal');

  openTasksModal();
  closeTasksModal();
  closeEditTaskModal();
  manageOnSubmit(taskForm, taskModal);
  minDate();

  const options = document.querySelectorAll('div .option');
  const taskProjectOpt = document.querySelectorAll('#task-project option');

  function currProjectSelected() {
    options.forEach(option => {
      if (option.classList.contains('current')) {
        let optionID = option.id.substr(option.id.indexOf('_'));
        taskProjectOpt.forEach(task => {
          if (optionID === task.dataset.id) {
            task.selected = true;
          }
        });
      }
    });
  }

  function openTasksModal() {
    const mainAdd = document.querySelector('.main iconify-icon');

    mainAdd.addEventListener('click', () => {
      taskModal.classList.add('active');
      manageOverlay().openOverlay();
      currProjectSelected();
    });
  }

  function openEditTaskModal() {
    const editTaskModal = document.querySelector('.task-edit');
    editTaskModal.classList.add('active');
    manageOverlay().openOverlay();
  }

  function closeTasksModal() {
    const taskModal = document.querySelector('.task-modal');
    manageOverlay().closeOverlay(taskModal);
  }

  function closeOnEditTask() {
    const editTaskModal = document.querySelector('.task-edit');
    const overlay = document.querySelector('.overlay');

    editTaskModal.classList.remove('active');

    setTimeout(() => {
      overlay.classList.add('fade');
      overlay.addEventListener('animationend', () => {
        overlay.classList.remove('active');
      });
    }, 200);
  }

  function closeEditTaskModal() {
    const editTaskModal = document.querySelector('.task-edit');
    manageOverlay().closeOverlay(editTaskModal);
  }

  return { openEditTaskModal, closeOnEditTask, currProjectSelected };
}

function ProjectsModal() {
  const projectForm = document.getElementById('projectCont');
  const projectModal = document.querySelector('.project-modal');

  openProjectsModal();
  closeProjectsModal();
  closeEditProjectModal();
  manageOnSubmit(projectForm, projectModal);

  TasksModal().currProjectSelected();

  function openProjectsModal() {
    const addProject = document.querySelector('.projects-header iconify-icon');
    const projectModal = document.querySelector('.project-modal');

    addProject.addEventListener('click', () => {
      projectModal.classList.add('active');
      manageOverlay().openOverlay();
    });
  }

  function openEditProjectModal() {
    const editProjectModal = document.querySelector('.project-edit');
    editProjectModal.classList.add('active');
    manageOverlay().openOverlay();
  }

  function closeProjectsModal() {
    const projectModal = document.querySelector('.project-modal');
    manageOverlay().closeOverlay(projectModal);
  }

  function closeOnEditProject() {
    const editProjectModal = document.querySelector('.project-edit');
    const overlay = document.querySelector('.overlay');

    editProjectModal.classList.remove('active');

    setTimeout(() => {
      overlay.classList.add('fade');
      overlay.addEventListener('animationend', () => {
        overlay.classList.remove('active');
      });
    }, 200);
  }

  function closeEditProjectModal() {
    const editProjectModal = document.querySelector('.project-edit');
    manageOverlay().closeOverlay(editProjectModal);
  }

  return { openEditProjectModal, closeOnEditProject };
}

function manageOnSubmit(form, modal) {
  const overlay = document.querySelector('.overlay');

  form.addEventListener('submit', e => {
    e.preventDefault();
    modal.classList.remove('active');
    setTimeout(() => {
      overlay.classList.add('fade');
      overlay.addEventListener('animationend', () => {
        overlay.classList.remove('active');
        form.reset();
      });
    }, 200);
  });
}

function minDate() {
  const minDate = format(new Date(), 'yyyy-MM-dd');

  const datePicker = document.querySelectorAll(`input[type='date']`);

  datePicker.forEach(date => {
    date.setAttribute('min', minDate);
  });
}

function manageOverlay() {
  const overlay = document.querySelector('.overlay');

  function openOverlay() {
    overlay.classList.add('active');
    overlay.classList.remove('fade');
  }

  function closeOverlay(el) {
    overlay.addEventListener('click', () => {
      el.classList.remove('active');
      setTimeout(() => {
        overlay.classList.add('fade');
        overlay.addEventListener('animationend', () => {
          overlay.classList.remove('active');
        });
      }, 200);
    });
  }

  return { openOverlay, closeOverlay };
}

function WarningModal() {
  const warningModal = document.querySelector('.warning-modal');
  const overlay = document.querySelector('.overlay');

  closeWarningModal();

  function openWarningModal() {
    warningModal.classList.add('active');
    manageOverlay().openOverlay();
  }

  function closeWarningIfYes() {
    warningModal.classList.remove('active');
    setTimeout(() => {
      overlay.classList.add('fade');
      overlay.addEventListener('animationend', () => {
        overlay.classList.remove('active');
      });
    }, 200);
  }

  function closeWarningModal() {
    const delNo = document.querySelector('.delNo');
    manageOverlay().closeOverlay(warningModal);

    delNo.addEventListener('click', () => {
      warningModal.classList.remove('active');
      setTimeout(() => {
        overlay.classList.add('fade');
        overlay.addEventListener('animationend', () => {
          overlay.classList.remove('active');
        });
      }, 200);
    });
  }

  return { openWarningModal, closeWarningIfYes };
}

export { TasksModal, ProjectsModal, WarningModal };
