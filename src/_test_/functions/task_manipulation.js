import { Task } from './constructors'
export const addTask = (obj, index, counter) => {
  const title = obj.title;
  const priority = obj.priority;
  const date = obj.date;
  const taskCounter = counter;
  const id = [index, taskCounter];
  const taskObj = new Task(title, priority, date, id);
  const lsProject = localStorage.getItem(`Project-${index}`);
  const parsedLsProject = JSON.parse(lsProject);
  parsedLsProject.tasks.push(taskObj);
  localStorage[`Project-${index}`] = JSON.stringify(parsedLsProject);
};

export const removeTask = (taskId, element) => {
  element.remove();
  const pid = taskId.split(",")[0];
  const project = localStorage.getItem(`Project-${pid}`);
  const parsedProject = JSON.parse(project);
  parsedProject.tasks.forEach((task, index) => {
    if (task.id == taskId) {
      parsedProject.tasks.splice(index, 1);
    }
  });
  localStorage[`Project-${pid}`] = JSON.stringify(parsedProject);
};

export const editTask = (element, obj) => {
  const taskId = element.dataset.id;
  const pid = taskId.split(",")[0];

  if (obj.title.length > 3 && obj.priority && obj.date) {
    const project = localStorage.getItem(`Project-${pid}`);
    const parsedProject = JSON.parse(project);
    parsedProject.tasks.forEach((task) => {
      if (task.id == taskId) {
        task.title = obj.title;
        task.priority = obj.priority;
        task.date = obj.date;
      }
    });
    localStorage[`Project-${pid}`] = JSON.stringify(parsedProject);
    element.innerHTML = "";
    obj.id = taskId;
    renderTask(element, obj);
    const tmp = element.cloneNode(true);
    element.outerHTML = tmp.children[0].outerHTML;
  } else {
    renderProjectInput(element);
  }
};

export const showTasks = (index) => {
  const tasks = document.getElementById("tasks");
  tasks.innerHTML = "";
  const value = localStorage.getItem(`Project-${index}`);
  const project = JSON.parse(value);
  for (let i = 0; i < project.tasks.length; i += 1) {
    renderTask(tasks, project.tasks[i]);
  }
};

export const showAllTasks = () => {
  const header = document.getElementById("header").querySelector("h3");
  header.innerHTML = "MyTodos | Home";
  const taskArr = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key.startsWith("Project-")) {
      const value = JSON.parse(localStorage[key]);
      value.tasks.forEach((task) => taskArr.push(task));
    }
  }
  const tasks = document.getElementById("tasks");
  tasks.innerHTML = "";

  for (let i = 0; i < taskArr.length; i += 1) {
    renderTask(tasks, taskArr[i]);
  }
};

export const renderLineThrough = (taskId, element) => {
  const pid = taskId.split(",")[0];
  const project = localStorage.getItem(`Project-${pid}`);
  const parsedProject = JSON.parse(project);
  parsedProject.tasks.forEach((task, index) => {
    if (task.id == taskId) {
      task.status = !task.status;
      parsedProject.tasks[index] = task;
      strikeThrough(task, element);
    }
  });
  localStorage[`Project-${pid}`] = JSON.stringify(parsedProject);
};
