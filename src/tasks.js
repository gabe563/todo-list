import { WarningModal } from './getModal';

export default function tasksFunctionality() {
  makeToDo();

  let ToDo = [];

  class Task {
    constructor(name, dueDate, priority, project, desc) {
      this.name = name;
      this.dueDate = dueDate;
      this.priority = priority;
      this.project = project;
      this.desc = desc;
      this.Id = makeID();

      this.addTask = function () {
        ToDo.push({
          name: `${name}`,
          date: `${dueDate}`,
          priority: `${priority}`,
          project: `${project}`,
          description: `${desc}`,
          id: `${this.Id}`,
          checked: false,
          favorite: false,
        });
      };
    }
  }

  function makeID() {
    return '_' + Math.floor(Math.random() * 100000) + 1;
  }

  function LoopTasks() {
    const tasksCont = document.querySelector('.tasks');
    tasksCont.innerHTML = '';
    for (const obj of ToDo) {
      createToDo(obj);
    }
  }

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
      currTask.addTask();

      LoopTasks();
    });
  }

  const delYes = document.querySelector('.delYes');

  function createToDo(item) {
    const tasksCont = document.querySelector('.tasks');

    const taskContainter = document.createElement('div');
    taskContainter.classList.add('task-container');

    const newTask = document.createElement('div');
    newTask.classList.add(`toDo`);
    newTask.id = `toDo${item.id}`;

    newTask.addEventListener('click', e => {
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
    });

    function toggleChecked() {
      item.checked = !item.checked;
      LoopTasks();
    }

    const taskName = document.createElement('p');
    taskName.textContent = item.name;

    left.appendChild(check);
    left.appendChild(taskName);

    const right = document.createElement('div');
    right.classList.add('right');

    const iconOne = document.createElement('div');
    iconOne.classList.add('iconone');

    const edit = document.createElement('iconify-icon');
    editIcon(edit, 'clarity:note-edit-line', 20);

    const iconTwo = document.createElement('div');
    iconTwo.classList.add('icontwo');

    const favorite = document.createElement('iconify-icon');
    editIcon(favorite, 'bi:star', 20);

    const favoriteActive = document.createElement('iconify-icon');
    editIcon(favoriteActive, 'bi:star-fill', 20);
    favoriteActive.classList.add('star');

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
    });

    function toggleFavorite() {
      item.favorite = !item.favorite;
      LoopTasks();
    }

    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('priority');
    priorityDiv.classList.add(`${item.priority}`);

    const iconThree = document.createElement('div');
    iconThree.classList.add('iconthree');

    const deleteBtn = document.createElement('iconify-icon');
    editIcon(deleteBtn, 'clarity:trash-line', 20);
    deleteBtn.classList.add('deleteToDo');

    const infoCont = document.createElement('div');
    infoCont.classList.add('information');
    infoCont.id = `information${item.id}`;

    const dueDate = document.createElement('div');
    dueDate.classList.add('due-date');

    const dateTitle = document.createElement('p');
    dateTitle.textContent = 'Due-date:';

    const dateInfo = document.createElement('p');
    dateInfo.textContent = `${item.date}`;

    const desc = document.createElement('div');
    desc.classList.add('description');

    const descTitle = document.createElement('p');
    descTitle.textContent = 'Description:';

    const descInfo = document.createElement('p');
    descInfo.textContent = `${item.description}`;

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

    tasksCont.appendChild(taskContainter);

    const arrowDiv = document.createElement('div');
    arrowDiv.classList.add('arrow');

    arrowDiv.addEventListener('click', () => {
      arrowIcon.classList.toggle('active');
    });

    const arrowIcon = document.createElement('iconify-icon');
    editIcon(arrowIcon, 'material-symbols:keyboard-arrow-down-rounded', 40);

    taskContainter.appendChild(newTask);

    newTask.appendChild(arrowDiv);
    arrowDiv.appendChild(arrowIcon);

    taskContainter.appendChild(infoCont);

    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      onDelete(item, infoCont);
    });

    function editIcon(el, attr, size) {
      el.setAttribute('icon', `${attr}`);
      el.setAttribute('width', `${size}`);
      el.setAttribute('height', `${size}`);
    }

    ifChecked(check, checkActive, item);
    ifFavorite(favorite, favoriteActive, iconTwo, item);
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
      container.removeChild(favoriteActive);
      container.appendChild(favorite);
    } else if (item.favorite === true) {
      container.removeChild(favorite);
      container.appendChild(favoriteActive);
    }
  }

  function onDelete(itm, infoCont) {
    let item = itm;
    WarningModal().openWarningModal();

    delYes.addEventListener('click', () => {
      if (infoCont.classList.contains('active')) {
        infoCont.classList.remove('active');
      }
      deleteTask(item);
      item = undefined;
      WarningModal().closeWarningIfYes();
    });
  }

  function deleteTask(item) {
    const targetNode = document.querySelector(`#toDo${item.id}`);
    targetNode.parentNode.removeChild(targetNode);

    for (let i = 0; i < ToDo.length; i++) {
      if (ToDo[i].id == item.id) {
        ToDo.splice(i, 1);
        break;
      }
    }
  }
}
