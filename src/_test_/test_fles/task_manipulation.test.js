import * as task from "../functions/task_manipulation";
import { addProjectToLocalStorage } from "../functions/project_manipulation";

describe("Testing addTask function", () => {
  addProjectToLocalStorage("Project 1", 1);
  const obj = { title: "working out", priority: "High", date: "12/13/2020" };
  task.addTask(obj, 1, 1);
  const firstProject = localStorage.getItem("Project-1");
  const parsedProject = JSON.parse(firstProject);

  test("Expect tasks array to increase by 1", () => {
    expect(parsedProject.tasks.length).toEqual(1);
  });

  test("Expect tasks array not to be empty", () => {
    expect(parsedProject.tasks.length).not.toEqual(0);
  });

  test("Expect addTask function to fill task with privided data", () => {
    expect(parsedProject.tasks[0].title).toEqual("working out");
    expect(parsedProject.tasks[0].priority).toEqual("High");
    expect(parsedProject.tasks[0].date).toEqual("12/13/2020");
  });
});

describe("Testing removeTask function", () => {
  addProjectToLocalStorage("Project 1", 1);
  const obj = { title: "working out", priority: "High", date: "12/13/2020" };
  task.addTask(obj, 1, 1);
  task.removeTask("1,1");
  const firstProject = localStorage.getItem("Project-1");
  const parsedProject = JSON.parse(firstProject);

  test("expect removeTask to remove the task", () => {
    expect(parsedProject.tasks.length).toEqual(0);
  });

  test("expect tasks length to be 1", () => {
    expect(parsedProject.tasks.length).not.toEqual(1);
  });
});
