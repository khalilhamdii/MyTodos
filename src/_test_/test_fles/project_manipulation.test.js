import * as project from "../functions/project_manipulation";

test("Expect function to add project to local storage", () => {
  localStorage.setItem("projectCounter", "0");
  project.addProjectToLocalStorage("Project 1", 1);
  const projectName = localStorage.getItem("Project-1");
});
