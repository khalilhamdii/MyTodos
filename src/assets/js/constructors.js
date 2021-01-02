function Project(name) {
  this.name = name;
  this.tasks = [];
}

function Task(title, priority, date, id) {
  this.title = title;
  this.priority = priority;
  this.date = date;
  this.id = id;
  this.status = true;
}

export { Project, Task };
