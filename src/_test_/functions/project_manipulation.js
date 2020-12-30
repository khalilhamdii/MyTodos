const removeProjectInput = () => {
  const inputDiv = document.getElementById("project-input");
  const div = inputDiv.children[Array.from(inputDiv.children).length - 1];
  inputDiv.removeChild(div);
};

const removeTaskInput = () => {
  const taskInput = document.getElementById("new-task-input");
  taskInput.innerHTML = "";
};

const addProjectToLocalStorage = () => {
  const name = document.getElementById("input").value;
  if (name.length > 3) {
    const project = new Project(name);
    const counter = addProjectCount();
    localStorage.setItem(`Project-${counter}`, JSON.stringify(project));
    renderProject(name, counter);
    removeProjectInput();
  } else {
    const projectInput = document.getElementById("project-input");
    renderProjectInput(projectInput);
  }
};

const addTask = (index) => {
  const title = document.getElementById("task_title").value;
  const priority = document.getElementById("task_priority").value;
  const date = document.getElementById("task_date").value;
  const taskCounter = addTaskCount();
  const id = [index, taskCounter.toString()];
  const taskObj = new Task(title, priority, date, id);
  const lsProject = localStorage.getItem(`Project-${index}`);
  const parsedLsProject = JSON.parse(lsProject);
  parsedLsProject.tasks.push(taskObj);
  localStorage[`Project-${index}`] = JSON.stringify(parsedLsProject);
  const tasks = document.getElementById("tasks");
  renderTask(tasks, taskObj);
};

const showProjects = () => {
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key.startsWith("Project-")) {
      const value = JSON.parse(localStorage[key]);
      const index = key.valueOf().replace(/\D/g, "");
      renderProject(value.name, index);
    }
  }
};

const showTasks = (index) => {
  const tasks = document.getElementById("tasks");
  tasks.innerHTML = "";
  const value = localStorage.getItem(`Project-${index}`);
  const project = JSON.parse(value);
  for (let i = 0; i < project.tasks.length; i += 1) {
    renderTask(tasks, project.tasks[i]);
  }
};

const strikeThrough = (task, element) => {
  if (task.status === false) {
    element.style.textDecoration = "line-through";
    element.style.opacity = "0.5";
    element.querySelector(".form-check-input").checked = true;
  } else {
    element.style.textDecoration = "none";
    element.style.opacity = "1";
    element.querySelector(".form-check-input").checked = false;
  }
};

const renderLineThrough = (taskId, element) => {
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

const clickCheckBox = () => {
  const check = document.querySelector("#tasks");
  check.addEventListener("click", (e) => {
    if (e.target.className.includes("form-check-input")) {
      const idArr = e.target.closest(".task-target").dataset.id;
      renderLineThrough(idArr, e.target.closest(".task-target"));
    }
  });
};

const showAllTasks = () => {
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

const editTask = (element, obj) => {
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

const clickTaskEdit = () => {
  const taskList = document.querySelector("#tasks");
  taskList.addEventListener("click", (e) => {
    if (e.target.className.includes("fa-edit")) {
      const element = e.target.closest(".task-target");
      const tmp = element.cloneNode(true);
      element.style.textDecoration = "none";
      element.style.opacity = "1";
      renderTaskInput(element);
      element.addEventListener("click", (e) => {
        if (e.target.className.includes("fa-check")) {
          const title = element.querySelector("#task_title").value;
          const priority = element.querySelector("#task_priority").value;
          const date = element.querySelector("#task_date").value;
          const obj = { title, priority, date };
          editTask(element, obj);
        } else if (e.target.className.includes("fa-remove")) {
          element.style.opacity = tmp.style.opacity;
          element.style.textDecoration = tmp.style.textDecoration;
          element.innerHTML = tmp.innerHTML;
        }
      });
    }
  });
};

const removeTask = (taskId, element) => {
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

const clickTaskRemove = () => {
  const check = document.querySelector("#tasks");
  check.addEventListener("click", (e) => {
    if (e.target.className.includes("fa-trash")) {
      const idArr = e.target.closest(".task-target").dataset.id;
      removeTask(idArr, e.target.closest(".task-target"));
    }
  });
};

const editProject = (element) => {
  const id = element.dataset.index;
  const projectName = element.querySelector("input").value;
  if (projectName.length > 3) {
    const project = localStorage.getItem(`Project-${id}`);
    const parsedProject = JSON.parse(project);
    parsedProject.name = projectName;
    localStorage[`Project-${id}`] = JSON.stringify(parsedProject);
    location.reload();
  } else {
    renderProjectInput(element);
  }
};

const clickProjectEdit = () => {
  const projectList = document.querySelector("#project-list");
  projectList.addEventListener("click", (e) => {
    if (e.target.className.includes("fa-edit")) {
      const element = e.target.closest(".project-li");
      const tmp = element.innerHTML;
      renderProjectInput(element);
      element.addEventListener("click", (e) => {
        if (e.target.className.includes("fa-check")) {
          editProject(element);
        } else if (e.target.className.includes("fa-remove")) {
          element.innerHTML = tmp;
        }
      });
    }
  });
};

const clickProjectRemove = () => {
  const check = document.querySelector("#project-list");
  check.addEventListener("click", (e) => {
    if (e.target.className.includes("fa-trash")) {
      const element = e.target.closest(".project-li");
      const { index } = element.dataset;
      localStorage.removeItem(`Project-${index}`);
      element.remove();
      location.reload();
    }
  });
};
