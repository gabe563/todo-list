import { changeToDoPages, menuToggle } from './UI';
import { TasksModal, ProjectsModal } from './getModal';
import { tasksFunctionality, projectFunctionality } from './functionality';

tasksFunctionality();
projectFunctionality();

changeToDoPages();
menuToggle();

TasksModal();
ProjectsModal();
