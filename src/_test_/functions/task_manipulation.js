/* eslint-disable eqeqeq */
import * as constructors from "../../assets/js/constructors";

export const addTask = (obj, index, counter) => {
  const { title } = obj;
  const { priority } = obj;
  const { date } = obj;
  const taskCounter = counter;
  const id = [index, taskCounter];
  const taskObj = new constructors.Task(title, priority, date, id);
  const lsProject = localStorage.getItem(`Project-${index}`);
  const parsedLsProject = JSON.parse(lsProject);
  parsedLsProject.tasks.push(taskObj);
  localStorage[`Project-${index}`] = JSON.stringify(parsedLsProject);
};

export const removeTask = (taskId) => {
  const pid = taskId[0];
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
  const pid = taskId[0];

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
  }
};

export const showTasks = (index) => {
  const value = localStorage.getItem(`Project-${index}`);
  const project = JSON.parse(value);
  const arr = [];
  for (let i = 0; i < project.tasks.length; i += 1) {
    arr.push(project.tasks[i]);
  }
  return arr;
};

export const renderLineThrough = (taskId) => {
  const pid = taskId.split(",")[0];
  const project = localStorage.getItem(`Project-${pid}`);
  const parsedProject = JSON.parse(project);
  parsedProject.tasks.forEach((task, index) => {
    if (task.id == taskId) {
      task.status = !task.status;
      parsedProject.tasks[index] = task;
    }
  });
  localStorage[`Project-${pid}`] = JSON.stringify(parsedProject);
};
