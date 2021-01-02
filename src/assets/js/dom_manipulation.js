const DomManipulation = (() => {
  const renderProjectInput = (element) => {
    element.innerHTML = `
          <div data-bs-hover-animate="pulse" style="font-size: 20px;color: rgb(255,255,255);margin-left: -15px;padding-left: 20px;">
          <div><input type="text" id="input" style="width: 120px;border-style: none;border-radius: 15px;margin-right: 10px;font-size: 12px;height: 35px;padding: 0 6px;" placeholder="Enter project name..."><i class="fa fa-check" style="margin-right: 7px;color: rgb(255,193,7);"></i><i class="fa fa-remove" style="color: rgb(255,193,7);"></i></div>
          </div>
          `;
  };

  const renderTaskInput = (element) => {
    element.innerHTML = `
      <div class="row no-gutters d-flex flex-row w-100"
      style="color: rgb(255,255,255);background: rgba(23,162,184,0.5);border: 0.5px solid rgb(255,193,7) ;border-bottom-style: solid;border-bottom-color: rgb(255,193,7);">
      <div class="col-4 col-sm-5 col-md-6 col-lg-5 d-flex justify-content-start align-items-center"><input id="task_title"
          type="text" class="w-100"
          style="border-style: none;padding-left: 20px;border-radius: 15px;line-height: 30px;background: rgb(255,193,7);height: 32px;"
          placeholder="Enter task name..."></div>
      <div
        class="col-2 col-sm-2 col-md-2 col-lg-2 d-flex d-md-flex d-lg-flex justify-content-sm-center justify-content-md-center justify-content-lg-center"
        style="padding-right: 5px;padding-left: 5px;"><select id="task_priority" class="w-100"
          style="background: transparent;color: rgb(255,193,7);border-style: none;">
          <option  value="undefined">Priority</option>
          <option value="Very High">Very High</option>
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
    const header = document.getElementById('header').querySelector('h3');
    header.innerHTML = `MyTodos | ${project.name}`;
  };

  const renderTask = (element, obj) => {
    const checkBox = () => {
      if (obj.status === false) {
        return 'checked';
      }
      return '';
    };
    const lineThroughstyle = () => {
      if (obj.status === false) {
        return 'text-decoration: line-through;opacity: 0.5;';
      }
      return '';
    };
    element.innerHTML += `
      <div data-id="${
  obj.id
  }" class="task-target row no-gutters d-flex flex-row w-100"
  style="color: rgb(255,255,255);border-width: 0.5px;border-style: none;border-bottom-style: solid;border-bottom-color: rgb(255,193,7);${lineThroughstyle()}">
  <div class="col-4 col-sm-5 col-md-6 col-lg-5 d-flex justify-content-start align-items-center">
    <div class="form-check"><input class="form-check-input d-lg-flex align-items-lg-center" type="checkbox"
        id="formCheck-6" style="border-radius: 0px;" ${checkBox()} ><label
        class="form-check-label d-lg-flex align-items-lg-center" for="formCheck-1"><strong>${
  obj.title
  }</strong></label></div>
  </div>
  <div
    class="col-2 col-sm-2 col-md-2 col-lg-2 d-flex d-md-flex d-lg-flex justify-content-sm-center justify-content-md-center justify-content-lg-center">
    <span class="d-sm-flex">${obj.priority}</span>
  </div>
  <div
    class="col-4 col-sm-3 col-md-3 col-lg-4 d-md-flex d-lg-flex justify-content-md-center justify-content-lg-center">
    <span class="d-flex justify-content-center align-items-center">${
  obj.date
  }</span>
  </div>
  <div
  class="col-2 col-md-1 col-lg-1 d-flex d-md-flex d-lg-flex justify-content-center align-items-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center">
  <i class="fa fa-edit" style="color: rgb(255,193,7);"></i><i class="fa fa-trash"
    style="color: rgb(255,193,7);"></i>
</div>
  </div>
  `;
  };

  const renderProject = (projectName, index) => {
    const ul = document.getElementById('project-list');
    ul.innerHTML += `
          <li class="font-weight-bold project-li cursor-pointer" data-bs-hover-animate="pulse" data-index="${index}"
                style="font-size: 20px;margin-left: -15px;padding-left: 20px;">${projectName} <i class="fa fa-edit fa-xs ml-2" style="color: rgb(255,193,7);"></i><i class="fa fa-trash fa-xs"
                style="color: rgb(255,193,7);"></i></li>
          `;
  };

  const addTaskBtn = () => {
    const div = document.getElementById('taskDivBtn');
    div.innerHTML = `
    <button id="task-btn" class="btn btn-warning btn-sm float-right" type="button" style="margin-top: 30px;"><i
            class="fa fa-plus"></i><span>Add a new task</span></button>
    `;
  };

  return {
    renderProjectInput,
    renderTaskInput,
    renderHeader,
    renderProject,
    renderTask,
    addTaskBtn,
  };
})();

export default DomManipulation;
