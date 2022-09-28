// Task class

export default class Task {
  constructor(name, dueDate, priority, project, desc) {
    this._name = name;
    this._dueDate = dueDate;
    this._priority = priority;
    this._project = project;
    this._desc = desc;
    this._Id = makeID();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value) {
      this._name = value;
    }
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    if (value) {
      this._dueDate = value;
    }
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    if (value) {
      this._priority = value;
    }
  }

  get project() {
    return this._project;
  }

  set project(value) {
    if (value) {
      this._project = value;
    }
  }

  get description() {
    return this._desc;
  }

  set description(value) {
    if (value) {
      this._desc = value;
    }
  }

  get Id() {
    return this._Id;
  }
}

function makeID() {
  return '_' + Math.floor(Math.random() * 1000000) + 1;
}
