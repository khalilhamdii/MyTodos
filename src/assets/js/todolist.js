const TodoList = (() => {
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
      <div class="col-4 col-sm-5 col-md-6 col-lg-5 d-flex justify-content-start align-items-center"><input id="task_name"
          type="text" class="w-100"
          style="border-style: none;padding-left: 20px;border-radius: 15px;line-height: 30px;background: rgb(255,193,7);height: 32px;"
          placeholder="Enter task name..." required="" minlength="3" maxlength="15"></div>
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

  const renderTask = () => {
    const taskName = document.getElementById("task_name").value;
    const taskPriority = document.getElementById("task_priority").value;
    const taskDate = document.getElementById("task_date").value;
    const task = `
      <div class="row no-gutters d-flex flex-row" data-bs-hover-animate="pulse"
  style="margin: 5px;margin-top: 15px;color: rgb(255,255,255);border-width: 0.5px;border-style: none;border-bottom-style: solid;border-bottom-color: rgb(255,193,7);">
  <div class="col-4 col-sm-5 col-md-6 col-lg-5 d-flex justify-content-start align-items-center">
    <div class="form-check"><input class="form-check-input d-lg-flex align-items-lg-center" type="checkbox"
        id="formCheck-6" style="border-radius: 0px;"><label
        class="form-check-label d-lg-flex align-items-lg-center" for="formCheck-1"><strong>${taskName}</strong></label></div>
  </div>
  <div
    class="col-2 col-sm-2 col-md-2 col-lg-2 d-flex d-md-flex d-lg-flex justify-content-sm-center justify-content-md-center justify-content-lg-center">
    <span class="d-sm-flex">${taskPriority}</span>
  </div>
  <div
    class="col-4 col-sm-3 col-md-3 col-lg-4 d-md-flex d-lg-flex justify-content-md-center justify-content-lg-center">
    <span class="d-flex justify-content-center align-items-center">${taskDate}</span>
  </div>
  <div
    class="col-2 col-md-1 col-lg-1 d-flex d-md-flex d-lg-flex justify-content-center align-items-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center">
    <i class="fa fa-edit" style="color: rgb(255,193,7);"></i><i class="fa fa-trash"
      style="color: rgb(255,193,7);"></i>
  </div>
  </div>
  `;
    return task;
  };

  const removeProjectInput = () => {
    const inputDiv = document.getElementById("project-input");
    const div = inputDiv.children[Array.from(inputDiv.children).length - 1];
    inputDiv.removeChild(div);
  };

  const removeTaskInput = () => {
    const taskInput = document.getElementById("new-task-input");
    taskInput.innerHTML = ``;
  };

  const addProject = () => {
    const ul = document.getElementById("add-project");
    const input = document.getElementById("input").value;
    ul.innerHTML += `
          <li data-bs-hover-animate="pulse"
                style="font-size: 20px;color: rgb(255,255,255);margin-left: -15px;padding-left: 20px;"><strong>${input}</strong></li>
          `;
  };

  const addTask = () => {
    const tasks = document.getElementById("tasks");
    tasks.innerHTML += renderTask();
  };

  return {
    renderProjectInput,
    renderTaskInput,
    addProject,
    addTask,
    removeProjectInput,
    removeTaskInput,
  };
})();

export default TodoList;
