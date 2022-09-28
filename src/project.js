// Project class

export default class Project {
  constructor(name, current) {
    this._name = name;
    this._projectTasks = [];
    this._current = current || false;
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

  get projectTasks() {
    return this._projectTasks;
  }

  set projectTasks(value) {
    if (value) {
      this._projectTasks.push(value);
    }
  }

  get current() {
    return this._current;
  }

  set current(value) {
    if (value) {
      this._current = value;
    }
  }

  get id() {
    return this._Id;
  }

  set id(value) {
    if (value) {
      this._Id = value;
    }
  }
}

function makeID() {
  return '_' + Math.floor(Math.random() * 1000000) + 1;
}
