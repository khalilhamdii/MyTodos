import * as task from '../functions/task_manipulation';
import { addProjectToLocalStorage } from '../functions/project_manipulation'

describe("task manipulation", ()=> {
  localStorage.setItem("projectCounter", "0");
  addProjectToLocalStorage("Project 1", 1);

  test("expects function to add a task", () => {
    localStorage.setItem("taskCounter", "0");
    const obj = {title: "working out", priority: 2, date: "12/13/2020"};
    task.addTask(obj, 1, 1)
    const firstProj = localStorage.getItem("Project-1")
    const parsedProject = JSON.parse(firstProj)
    expect(parsedProject.tasks.length).toEqual(1)
});
})
