// All stuff related with modals
function TasksModal() {
  const taskForm = document.getElementById('modalCont');
  const taskModal = document.querySelector('.task-modal');

  openTasksModal();
  closeTasksModal();
  manageOnSubmit(taskForm, taskModal);
  minDate();

  function openTasksModal() {
    const mainAdd = document.querySelector('.main iconify-icon');
    const taskModal = document.querySelector('.task-modal');

    mainAdd.addEventListener('click', () => {
      taskModal.classList.add('active');
      manageOverlay().openOverlay();
    });
  }

  function closeTasksModal() {
    const taskModal = document.querySelector('.task-modal');
    manageOverlay().closeOverlay(taskModal);
  }
}

function ProjectsModal() {
  const projectForm = document.getElementById('projectCont');
  const projectModal = document.querySelector('.project-modal');

  openProjectsModal();
  closeProjectsModal();
  manageOnSubmit(projectForm, projectModal);

  function openProjectsModal() {
    const addProject = document.querySelector('.projects-header iconify-icon');
    const projectModal = document.querySelector('.project-modal');

    addProject.addEventListener('click', () => {
      projectModal.classList.add('active');
      manageOverlay().openOverlay();
    });
  }

  function closeProjectsModal() {
    const projectModal = document.querySelector('.project-modal');
    manageOverlay().closeOverlay(projectModal);
  }
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
  const dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  const year = dtToday.getFullYear();
  if (month < 10) month = '0' + month.toString();
  if (day < 10) day = '0' + day.toString();

  const minDate = year + '-' + month + '-' + day;

  const datePicker = document
    .querySelector(`input[type='date']`)
    .setAttribute('min', minDate);
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
