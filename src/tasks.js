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
        });
      };
    }
  }

  function makeID() {
    return '_' + Math.floor(Math.random() * 100000) + 1;
  }

  function LoopTasks() {
    const tasksCont = document.querySelector('.tasks');
    const tasks = document.querySelectorAll('.toDo');
    tasks.forEach(task => tasksCont.removeChild(task));
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

    const newTask = document.createElement('div');
    newTask.classList.add(`toDo`);
    newTask.id = `toDo${item.id}`;

    const left = document.createElement('div');
    left.classList.add('left');

    const check = document.createElement('div');
    check.classList.add('check');

    const taskName = document.createElement('p');
    taskName.textContent = item.name;

    left.appendChild(check);
    left.appendChild(taskName);

    const right = document.createElement('div');
    right.classList.add('right');

    const iconOne = document.createElement('div');
    iconOne.classList.add('iconone');

    const edit = document.createElement('iconify-icon');
    editIcon(edit, 'clarity:note-edit-line');

    const iconTwo = document.createElement('div');
    iconTwo.classList.add('icontwo');

    const favorite = document.createElement('iconify-icon');
    editIcon(favorite, 'bi:star');

    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('priority');
    priorityDiv.classList.add(`${item.priority}`);

    const iconThree = document.createElement('div');
    iconThree.classList.add('iconthree');

    const deleteBtn = document.createElement('iconify-icon');
    editIcon(deleteBtn, 'clarity:trash-line');
    deleteBtn.classList.add('deleteToDo');

    right.appendChild(iconOne);
    right.appendChild(iconTwo);
    right.appendChild(priorityDiv);
    right.appendChild(iconThree);

    iconOne.appendChild(edit);
    iconTwo.appendChild(favorite);
    iconThree.appendChild(deleteBtn);

    newTask.appendChild(left);
    newTask.appendChild(right);

    tasksCont.appendChild(newTask);

    deleteBtn.addEventListener('click', () => {
      checkIf(item);
    });

    function editIcon(el, attr) {
      el.setAttribute('icon', `${attr}`);
      el.setAttribute('width', '20');
      el.setAttribute('height', '20');
    }
  }

  function checkIf(itm) {
    let item = itm;
    WarningModal().openWarningModal();

    delYes.addEventListener('click', () => {
      deleteTask(item);
      item = undefined;
      WarningModal().closeWarningIfYes();
    });
  }

  function deleteTask(item) {
    const targetNode = document.querySelector(`#toDo${item.id}`);
    targetNode.parentNode.removeChild(targetNode);
    ToDo.splice(ToDo.indexOf(item), 1);
  }
}
