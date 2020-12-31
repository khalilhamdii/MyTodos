// import start

import "./assets/css/styles.min.css";
import DomManipulation from "./assets/js/dom_manipulation";
import ProjectManipulation from "./assets/js/project_manipulation";
import TaskManipulation from "./assets/js/task_manipulation";
import { getProjectIndex, activeProject } from "./assets/js/helpers";
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

document.addEventListener("DOMContentLoaded", () => {
  bodyBg();
  TaskManipulation.clickCheckBox();
  ProjectManipulation.clickProjectEdit();
  ProjectManipulation.clickProjectRemove();
  TaskManipulation.clickTaskEdit();
  TaskManipulation.clickTaskRemove();
  TaskManipulation.showAllTasks();
  ProjectManipulation.showProjects();

  const projectBtn = document.getElementById("project-btn");
  const projectInput = document.getElementById("project-input");
  const taskInput = document.getElementById("new-task-input");
  const home = document.getElementById("home");
  home.classList.add("active");
  home.addEventListener("click", () => {
    const btn = document.getElementById("taskDivBtn");
    btn.innerHTML = "";
    home.classList.add("active");
    const projectList = document.querySelectorAll(".project-li");
    projectList.forEach((item) => item.classList.remove("active"));
    TaskManipulation.showAllTasks();
  });

  projectBtn.addEventListener("click", () => {
    DomManipulation.renderProjectInput(projectInput);
  });

  projectInput.addEventListener("click", (e) => {
    if (e.target.className.includes("fa-check")) {
      ProjectManipulation.addProjectToLocalStorage();
    } else if (e.target.className.includes("fa-remove")) {
      ProjectManipulation.removeProjectInput();
    }
  });

  taskInput.addEventListener("click", (e) => {
    if (e.target.className.includes("fa-check")) {
      const { index } = document.querySelector(".active").dataset;
      TaskManipulation.addTask(index);
      TaskManipulation.removeTaskInput();
    } else if (e.target.className.includes("fa-remove")) {
      TaskManipulation.removeTaskInput();
    }
  });

  const ul = document.getElementById("project-list");
  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const index = getProjectIndex(e.target);
      activeProject(e.target);
      DomManipulation.renderHeader(index);
      TaskManipulation.showTasks(index);
      DomManipulation.addTaskBtn();
      const taskBtn = document.getElementById("task-btn");
      const newTaskInput = document.getElementById("new-task-input");
      taskBtn.addEventListener("click", () => {
        DomManipulation.renderTaskInput(newTaskInput);
      });
    }
  });
});
