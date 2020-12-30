import * as project from '../functions/project_manipulation';

describe('Testing project manipulation functions', () => {
  test('Expect function to add project to local storage', () => {
    project.addProjectToLocalStorage('Project 1', 1);
    const projectName = localStorage.getItem('Project-1');
    const parsedProject = JSON.parse(projectName);
    expect(parsedProject.name).toEqual('Project 1');
  });

  beforeEach(() => {
    project.addProjectToLocalStorage('Project 1', 1);
  });

  test('Expect function to edit project in local storage', () => {
    const fakeElement = { dataset: { index: 1 } };
    project.editProject(fakeElement, 'Project 11');
    const localproject = localStorage.getItem('Project-1');
    const parsedProject = JSON.parse(localproject);
    expect(parsedProject.name).toEqual('Project 11');
  });

  test('Expect function to delete project', () => {
    project.clickProjectRemove(1);
    expect(localStorage.length).toEqual(0);
  });
});
