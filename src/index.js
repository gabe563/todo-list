import { changeToDoPages, menuToggle } from './Modules/UI';
import { TasksModal, ProjectsModal } from './Modules/getModal';
import { tasksFunctionality } from './Modules/taskFunctionality';

import { projectFunctionality } from './Modules/projectFunctionality';

tasksFunctionality();
projectFunctionality();

changeToDoPages();
menuToggle();

TasksModal();
ProjectsModal();
