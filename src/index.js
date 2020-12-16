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

const getProjectIndex = (item) => {
  const index = item.dataset.index;
  console.log(index);
  alert(index);
};

document.addEventListener("DOMContentLoaded", () => {
  bodyBg();
  TodoList.showProjects();
  const projectBtn = document.getElementById("project-btn");
  const taskBtn = document.getElementById("task-btn");
  const projectInput = document.getElementById("project-input");
  const taskInput = document.getElementById("new-task-input");

  projectBtn.addEventListener("click", TodoList.renderProjectInput);
  taskBtn.addEventListener("click", TodoList.renderTaskInput);

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
      TodoList.addTask();
      TodoList.removeTaskInput();
    } else if (e.target.id == "task-remove") {
      TodoList.removeTaskInput();
    }
  });

  // var elements = document.querySelectorAll(".active-project");
  // console.log(elements);
  // for (var i = 0; i < elements.length; i++) {
  //   elements[i].addEventListener(
  //     "click",
  //     function () {
  //       getProjectIndex(elements[i]);
  //     },
  //     false
  //   );
  // }
  const ul = document.getElementById("add-project")
  ul.addEventListener('click', (e) => {
    if(e.target.tagName === "LI") {
      getProjectIndex(e.target)
    }
  })
});
