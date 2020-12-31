import DomManipulation from "./dom_manipulation";
import * as constructors from "./constructors";
import { addProjectCount } from "./helpers";

const ProjectManipulation = (() => {
  const removeProjectInput = () => {
    const inputDiv = document.getElementById("project-input");
    inputDiv.innerHTML = ``;
  };

  const addProjectToLocalStorage = () => {
    const name = document.getElementById("input").value;
    if (name.length > 3) {
      const project = new constructors.Project(name);
      const counter = addProjectCount();
      localStorage.setItem(`Project-${counter}`, JSON.stringify(project));
      DomManipulation.renderProject(name, counter);
      removeProjectInput();
    } else {
      const projectInput = document.getElementById("project-input");
      DomManipulation.renderProjectInput(projectInput);
    }
  };

  const showProjects = () => {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key.startsWith("Project-")) {
        const value = JSON.parse(localStorage[key]);
        const index = key.valueOf().replace(/\D/g, "");
        DomManipulation.renderProject(value.name, index);
      }
    }
  };

  const editProject = (element) => {
    const id = element.dataset.index;
    const projectName = element.querySelector("input").value;
    if (projectName.length > 3) {
      const project = localStorage.getItem(`Project-${id}`);
      const parsedProject = JSON.parse(project);
      parsedProject.name = projectName;
      localStorage[`Project-${id}`] = JSON.stringify(parsedProject);
      // location.reload();
    } else {
      DomManipulation.renderProjectInput(element);
    }
  };

  const clickProjectEdit = () => {
    const projectList = document.querySelector("#project-list");
    projectList.addEventListener("click", (e) => {
      if (e.target.className.includes("fa-edit")) {
        const element = e.target.closest(".project-li");
        const tmp = element.innerHTML;
        DomManipulation.renderProjectInput(element);
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
        const index = element.dataset.index;
        localStorage.removeItem(`Project-${index}`);
        element.remove();
        // location.reload();
      }
    });
  };

  return {
    removeProjectInput,
    addProjectToLocalStorage,
    showProjects,
    editProject,
    clickProjectEdit,
    clickProjectRemove,
  };
})();

export default ProjectManipulation;
