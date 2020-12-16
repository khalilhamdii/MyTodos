// import start

import "./assets/css/styles.min.css";
import TodoList from "./assets/js/todolist";

const importAll = (r) => r.keys().map(r);
importAll(require.context("./assets/js/", true, /\.js$/));

const images = importAll(
  require.context("./assets/img/", false, /\.(png|jpe?g|svg)$/)
);

// import end

// Set project counter in local storage start

if (localStorage.length === 0) {
  localStorage.setItem("projectCounter", "0");
}

// Set project counter in local storage end

const bodyBg = () => {
  document.body.style.background = `linear-gradient(rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%), url(${images[0]}) no-repeat`;
  document.body.style.backgroundSize = "auto, cover";
};

document.addEventListener("DOMContentLoaded", () => {
  bodyBg();
  const projectBtn = document.getElementById("project-btn");
  const projectInput = document.getElementById("project-input");
  const taskBtn = document.getElementById("task-btn");
  projectBtn.addEventListener("click", TodoList.renderProjectInput);
  taskBtn.addEventListener("click", TodoList.renderTaskInput);
  projectInput.addEventListener("click", (e) => {
    if (e.target.id == "project-remove") {
      TodoList.removeProjectInput();
    }
  });
  projectInput.addEventListener("click", (e) => {
    if (e.target.id == "project-check") {
      TodoList.addProject();
      TodoList.removeProjectInput();
    }
  });
});
