import { Project } from "../functions/constructors";

export const addProjectToLocalStorage = (name, count) => {
  const project = new Project(name);
  const counter = count;
  localStorage.setItem(`Project-${counter}`, JSON.stringify(project));
};

export const clickProjectRemove = () => {
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

export const editProject = (element, name) => {
  const id = element.dataset.index;
  if (name.length > 3) {
    const project = localStorage.getItem(`Project-${id}`);
    const parsedProject = JSON.parse(project);
    parsedProject.name = name;
    localStorage[`Project-${id}`] = JSON.stringify(parsedProject);
    location.reload();
  } else {
    renderProjectInput(element);
  }
};
