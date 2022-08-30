// All stuff related with modals

function TasksModal() {
  const taskForm = document.getElementById('modalCont');
  const taskModal = document.querySelector('.task-modal');

  openTasksModal();
  closeTasksModal();
  manageOnSubmit(taskForm, taskModal);

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

export { TasksModal, ProjectsModal };
