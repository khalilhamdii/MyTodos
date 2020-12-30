import * as project from "../functions/project_manipulation";

test("Expect function to add project to local storage", () => {
  localStorage.setItem("projectCounter", "0");
  project.addProjectToLocalStorage("Project 1", 1);
  const projectName = localStorage.getItem("Project-1");
  const parsedProject = JSON.parse(projectName);
  expect(parsedProject.name).toEqual("Project 1");
});

test("Expect function to edit project in local storage", ()=>{
  localStorage.setItem("projectCounter", "0");
  project.addProjectToLocalStorage("Project 1", 1);
  const fakeElement = { dataset: {index: 1} }
  project.editProject(fakeElement, "Project 11")
  const localproject = localStorage.getItem("Project-1");
  const parsedProject = JSON.parse(localproject)
  expect(parsedProject.name).toEqual("Project 11")  
})

test("Expects function to delete project", ()=> {
  localStorage.setItem("projectCounter", "0");
  project.addProjectToLocalStorage("Project 1", 1);
  project.clickProjectRemove(1)
  expect(localStorage.length).toEqual(1)
})
