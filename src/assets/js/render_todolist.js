const TodoList = (() => {
  // Constructors start
  function Project(name) {
    this.name = name;
    this.tasks = [];
  }

  function Task(title, priority, date, id) {
    this.title = title;
    this.priority = priority;
    this.date = date;
    this.id = id;
    this.status = true
  }
  // Constructors end

  // Helpers start
  const addProjectCount = () => {
    const value = localStorage.getItem("projectCounter");
    const counter = JSON.parse(value) + 1;
    localStorage.projectCounter = JSON.stringify(counter);
    return counter;
  };

  const addTaskCount = () => {
    const value = localStorage.getItem("taskCounter");
    const counter = JSON.parse(value) + 1;
    localStorage.taskCounter = JSON.stringify(counter);
    return counter;
  };

  const getProjectIndex = (item) => {
    const index = item.dataset.index;
    return index;
  };

  const activeProject = (item) => {
    const projectLis = document.querySelectorAll(".project-li");
    projectLis.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  };
  // Helpers end

  // Render methods start
  const renderProjectInput = () => {
    const inputDiv = document.getElementById("project-input");
    inputDiv.innerHTML = `
          <div data-bs-hover-animate="pulse" style="font-size: 20px;color: rgb(255,255,255);margin-left: -15px;padding-left: 20px;">
          <div><input type="text" id="input" style="width: 120px;border-style: none;border-radius: 15px;margin-right: 10px;font-size: 12px;height: 35px;padding: 0 6px;" placeholder="Enter project name..."><i class="fa fa-check" id="project-check" style="margin-right: 7px;color: rgb(255,193,7);"></i><i class="fa fa-remove" id="project-remove" style="color: rgb(255,193,7);"></i></div>
          </div>
          `;
  };

  const renderTaskInput = () => {
    const taskInput = document.getElementById("new-task-input");
    taskInput.innerHTML = `
      <div class="row no-gutters d-flex flex-row"
      style="margin: 5px;margin-top: 15px;color: rgb(255,255,255);background: rgba(23,162,184,0.5);border: 0.5px solid rgb(255,193,7) ;border-bottom-style: solid;border-bottom-color: rgb(255,193,7);">
      <div class="col-4 col-sm-5 col-md-6 col-lg-5 d-flex justify-content-start align-items-center"><input id="task_title"
          type="text" class="w-100"
          style="border-style: none;padding-left: 20px;border-radius: 15px;line-height: 30px;background: rgb(255,193,7);height: 32px;"
          placeholder="Enter task name..."></div>
      <div
        class="col-2 col-sm-2 col-md-2 col-lg-2 d-flex d-md-flex d-lg-flex justify-content-sm-center justify-content-md-center justify-content-lg-center"
        style="padding-right: 5px;padding-left: 5px;"><select id="task_priority" class="w-100"
          style="background: transparent;color: rgb(255,193,7);border-style: none;">
          <option  value="undefined">Priority</option>
          <option value="Very High">Very High</optionvalue=>
          <option value="High">High</option>
          <option  value="Medium">Medium</option>
          <option  value="Low">Low</option>
        </select></div>
      <div class="col-4 col-sm-3 col-md-3 col-lg-4 d-md-flex d-lg-flex align-items-lg-center"
        style="padding-right: 10px;padding-left: 10px;border-style: none;"><input class="d-lg-flex w-100"
          type="date" id="task_date"
          style="border-style: none;padding-right: 20px;padding-left: 20px;border-radius: 15px;line-height: 30px;color: rgb(0,0,0);background: rgb(255,193,7);height: 32px;">
      </div>
      <div
        class="col-2 col-md-1 col-lg-1 d-flex d-md-flex d-lg-flex justify-content-center align-items-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center">
        <i id="task-check" class="fa fa-check" style="color: rgb(255,193,7);"></i><i id="task-remove" class="fa fa-remove"
          style="color: rgb(255,193,7);margin-left: 10px;"></i>
      </div>
    </div>
          `;
  };

  const renderHeader = (index) => {
    const value = localStorage.getItem(`Project-${index}`);
    const project = JSON.parse(value);
    const header = document.getElementById("header");
    header.innerHTML = `
      <h3 class="text-left"
          style="border-bottom-style: none;background: #17a2b8;color: rgb(255,255,255);padding-top: 10px;padding-bottom: 10px;padding-left: 10px;border-top-left-radius: 15px;border-bottom-right-radius: 15px;">
          MyTodos | ${project.name}</h3>
      `;
  };

  const renderTask = (obj) => {
    const tasks = document.getElementById("tasks");
    tasks.innerHTML += `
      <div data-id="${obj.id}" class="task-target row no-gutters d-flex flex-row" data-bs-hover-animate="pulse"
  style="margin: 5px;margin-top: 15px;color: rgb(255,255,255);border-width: 0.5px;border-style: none;border-bottom-style: solid;border-bottom-color: rgb(255,193,7);">
  <div class="col-4 col-sm-5 col-md-6 col-lg-5 d-flex justify-content-start align-items-center">
    <div class="form-check"><input class="form-check-input d-lg-flex align-items-lg-center" type="checkbox"
        id="formCheck-6" style="border-radius: 0px;"><label
        class="form-check-label d-lg-flex align-items-lg-center" for="formCheck-1"><strong>${obj.title}</strong></label></div>
  </div>
  <div
    class="col-2 col-sm-2 col-md-2 col-lg-2 d-flex d-md-flex d-lg-flex justify-content-sm-center justify-content-md-center justify-content-lg-center">
    <span class="d-sm-flex">${obj.priority}</span>
  </div>
  <div
    class="col-4 col-sm-3 col-md-3 col-lg-4 d-md-flex d-lg-flex justify-content-md-center justify-content-lg-center">
    <span class="d-flex justify-content-center align-items-center">${obj.date}</span>
  </div>
  <div
    class="col-2 col-md-1 col-lg-1 d-flex d-md-flex d-lg-flex justify-content-center align-items-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center">
    <i class="fa fa-edit" style="color: rgb(255,193,7);"></i><i class="fa fa-trash"
      style="color: rgb(255,193,7);"></i>
  </div>
  </div>
  `;
  };

  const renderProject = (value, index) => {
    const ul = document.getElementById("project-list");
    ul.innerHTML += `
          <li class="font-weight-bold project-li cursor-pointer" data-bs-hover-animate="pulse" data-index="${index}"
                style="font-size: 20px;margin-left: -15px;padding-left: 20px;">${value}</li>
          `;
  };

  const addTaskBtn = () => {
    const div = document.getElementById("taskDivBtn");
    div.innerHTML = `
    <button id="task-btn" class="btn btn-warning btn-sm float-right" type="button" style="margin-top: 30px;"><i
            class="fa fa-plus"></i><span>Add a new task</span></button>
    `;
  };

  // Render methods end

  // Dom and localstorage manipulation start
  const removeProjectInput = () => {
    const inputDiv = document.getElementById("project-input");
    const div = inputDiv.children[Array.from(inputDiv.children).length - 1];
    inputDiv.removeChild(div);
  };

  const removeTaskInput = () => {
    const taskInput = document.getElementById("new-task-input");
    taskInput.innerHTML = ``;
  };

  const addProjectToLocalStorage = () => {
    const name = document.getElementById("input").value;
    const project = new Project(name);
    let counter = addProjectCount();
    localStorage.setItem(`Project-${counter}`, JSON.stringify(project));
    renderProject(name, counter);
  };

  const addTask = (index) => {
    const title = document.getElementById("task_title").value;
    const priority = document.getElementById("task_priority").value;
    const date = document.getElementById("task_date").value;
    let taskCounter = addTaskCount();
    const id = [index, taskCounter.toString()];
    const taskObj = new Task(title, priority, date, id);
    const lsProject = localStorage.getItem(`Project-${index}`);
    const parsedLsProject = JSON.parse(lsProject);
    parsedLsProject.tasks.push(taskObj);
    localStorage[`Project-${index}`] = JSON.stringify(parsedLsProject);
    renderTask(taskObj);
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
    tasks.innerHTML = ``;
    const value = localStorage.getItem(`Project-${index}`);
    const project = JSON.parse(value);
    for (let i = 0; i < project.tasks.length; i += 1) {
      renderTask(project.tasks[i]);
    }
  };

  const clickCheckBox = ()=> {
    const check = document.querySelector("#tasks")
    check.addEventListener('click', (e)=> {
        if(e.target.className.includes("form-check-input")) {
          const idArr = e.target.closest(".task-target").dataset.id
          renderLineThrough(idArr, e.target.closest(".task-target"))
        }
    })
  }

  const renderLineThrough = (id, obj)=> {
    const pid = id.split(',')[1]
    const project = localStorage.getItem(`Project-${pid}`)
    const parsedProject = JSON.parse(project)
    parsedProject.tasks.map((task) => {
      if(JSON.stringify(task.id) == JSON.stringify(id.split(','))) {
        let index = parsedProject.tasks.indexOf(task)
        task.status = !task.status
        parsedProject.tasks[index] = task
        strikeThrough(task, obj)
      }
    })
    localStorage[`Project-${pid}`] = JSON.stringify(parsedProject)
  }

  const strikeThrough = (task, obj)=> {
    if(task.status == false) {
      obj.style.textDecoration = "line-through"
    }
    else {
      obj.style.textDecoration = "none"
    }
  }

  // Dom and localstorage manipulation end

  return {
    renderProjectInput,
    renderTaskInput,
    renderHeader,
    removeProjectInput,
    removeTaskInput,
    addProjectToLocalStorage,
    addTask,
    addTaskBtn,
    showProjects,
    showTasks,
    getProjectIndex,
    activeProject,
    clickCheckBox
  };
})();

export default TodoList;
