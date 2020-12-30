import { Project } from "../functions/constructors";

export const addProjectToLocalStorage = (name, count) => {
  const project = new Project(name);
  const counter = count;
  localStorage.setItem(`Project-${counter}`, JSON.stringify(project));
};

export const clickProjectRemove = (index) => {
  localStorage.removeItem(`Project-${index}`);
};

export const editProject = (element, name) => {
  const id = element.dataset.index;
  if (name.length > 3) {
    const project = localStorage.getItem(`Project-${id}`);
    const parsedProject = JSON.parse(project);
    parsedProject.name = name;
    localStorage[`Project-${id}`] = JSON.stringify(parsedProject);
  }
};
