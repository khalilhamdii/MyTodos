import ProjectManipulation from "../assets/js/project_manipulation";
import $ from "jquery";

describe("Testing project manipulation functions", () => {
  document.body.innerHTML = `<input type="text" id="input" value="Project 1">
  <ul class="list-unstyled" id="project-list">
  </ul>
  <div id="project-input" class="mb-3"></div>
  `;

  test("Expect function to add project to local storage", () => {
    ProjectManipulation.addProjectToLocalStorage();
    const projectName = localStorage.getItem("Project-1");
    const parsedProject = JSON.parse(projectName);
    expect(parsedProject.name).toEqual("Project 1");
  });

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("projectCounter", "0");
    ProjectManipulation.addProjectToLocalStorage("Project 1");
  });

  test("Expect function to edit project in local storage", () => {
    document.body.innerHTML += `<li class="test-edit" data-index="1">
    <input type="text" value="Project 11">
    </li>`;
    const fakeElement = document.querySelector(".test-edit");
    ProjectManipulation.editProject(fakeElement);
    const localproject = localStorage.getItem("Project-1");
    const parsedProject = JSON.parse(localproject);
    expect(parsedProject.name).toEqual("Project 11");
  });

  test("Expect function to delete project", () => {
    ProjectManipulation.addProjectToLocalStorage("Project 1");
    ProjectManipulation.clickProjectRemove();
    $(".fa-trash").click();
    expect(localStorage.length).toEqual(1);
  });
});
