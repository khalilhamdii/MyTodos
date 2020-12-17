// import start

import "./assets/css/styles.min.css";
import TodoList from "./assets/js/render_todolist";

const importAll = (r) => r.keys().map(r);
importAll(require.context("./assets/js/", true, /\.js$/));

const images = importAll(
  require.context("./assets/img/", false, /\.(png|jpe?g|svg)$/)
);

// import end

// Set project counter in local storage start

if (localStorage.length === 0) {
  localStorage.setItem("projectCounter", "0");
  localStorage.setItem("taskCounter", "0");
}

// Set project counter in local storage end

const bodyBg = () => {
  document.body.style.background = `linear-gradient(rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%), url(${images[0]}) no-repeat`;
  document.body.style.backgroundSize = "auto, cover";
};

TodoList.clickCheckBox();

document.addEventListener("DOMContentLoaded", () => {
  bodyBg();
  TodoList.showAllTasks();
  TodoList.showProjects();
  const projectBtn = document.getElementById("project-btn");
  const projectInput = document.getElementById("project-input");
  const taskInput = document.getElementById("new-task-input");
  const home = document.getElementById("home");
  home.addEventListener("click", () => {
    const btn = document.getElementById("taskDivBtn");
    btn.innerHTML = ``;
    home.classList.add("active");
    const projectLis = document.querySelectorAll(".project-li");
    projectLis.forEach((item) => item.classList.remove("active"));
    TodoList.showAllTasks();
  });

  projectBtn.addEventListener("click", TodoList.renderProjectInput);

  projectInput.addEventListener("click", (e) => {
    if (e.target.id == "project-check") {
      TodoList.addProjectToLocalStorage();
      TodoList.removeProjectInput();
    } else if (e.target.id == "project-remove") {
      TodoList.removeProjectInput();
    }
  });

  taskInput.addEventListener("click", (e) => {
    if (e.target.id == "task-check") {
      const index = document.querySelector(".active").dataset.index;
      TodoList.addTask(index);
      TodoList.removeTaskInput();
    } else if (e.target.id == "task-remove") {
      TodoList.removeTaskInput();
    }
  });

  const ul = document.getElementById("project-list");
  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const index = TodoList.getProjectIndex(e.target);
      TodoList.activeProject(e.target);
      TodoList.renderHeader(index);
      TodoList.showTasks(index);
      TodoList.addTaskBtn();
      const taskBtn = document.getElementById("task-btn");
      taskBtn.addEventListener("click", TodoList.renderTaskInput);
    }
  });
});
