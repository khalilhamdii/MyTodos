import * as task from '../functions/task_manipulation';
import { addProjectToLocalStorage } from '../functions/project_manipulation';

describe('Testing addTask function', () => {
  addProjectToLocalStorage('Project 1', 1);
  const obj = { title: 'working out', priority: 'High', date: '12/13/2020' };
  task.addTask(obj, 1, 1);
  const firstProject = localStorage.getItem('Project-1');
  const parsedProject = JSON.parse(firstProject);

  test('Expect tasks array to increase by 1', () => {
    expect(parsedProject.tasks.length).toEqual(1);
  });

  test('Expect tasks array not to be empty', () => {
    expect(parsedProject.tasks.length).not.toEqual(0);
  });

  test('Expect addTask function to fill task with privided data', () => {
    expect(parsedProject.tasks[0].title).toEqual('working out');
    expect(parsedProject.tasks[0].priority).toEqual('High');
    expect(parsedProject.tasks[0].date).toEqual('12/13/2020');
  });
});

describe('Testing removeTask function', () => {
  addProjectToLocalStorage('Project 1', 1);
  const obj = { title: 'working out', priority: 'High', date: '12/13/2020' };
  task.addTask(obj, 1, 1);
  task.removeTask('1,1');
  const firstProject = localStorage.getItem('Project-1');
  const parsedProject = JSON.parse(firstProject);

  test('expect removeTask to remove the task', () => {
    expect(parsedProject.tasks.length).toEqual(0);
  });

  test('expect tasks length to be 1', () => {
    expect(parsedProject.tasks.length).not.toEqual(1);
  });
});

describe('Testing editTask function', () => {
  addProjectToLocalStorage('Project 1', 1);
  const obj = { title: 'working out', priority: 'High', date: '12/13/2020' };
  const newObj = {
    title: 'Running',
    priority: 'Very High',
    date: '12/15/2020',
  };
  const fakeElement = { dataset: { id: '1,1' } };
  task.addTask(obj, 1, 1);
  task.editTask(fakeElement, newObj);
  const firstProject = localStorage.getItem('Project-1');
  const parsedProject = JSON.parse(firstProject);

  test('Expect edited task to contain the new data', () => {
    expect(parsedProject.tasks[0].title).toEqual('Running');
    expect(parsedProject.tasks[0].priority).toEqual('Very High');
    expect(parsedProject.tasks[0].date).toEqual('12/15/2020');
  });

  test('Expect task data no to stay the same', () => {
    expect(parsedProject.tasks[0].title).not.toEqual('working out');
    expect(parsedProject.tasks[0].priority).not.toEqual('High');
    expect(parsedProject.tasks[0].date).not.toEqual('12/13/2020');
  });
});

describe('Test render line through', () => {
  addProjectToLocalStorage('Project 1', 1);
  const obj = { title: 'working out', priority: 'High', date: '12/13/2020' };
  task.addTask(obj, 1, 1);
  task.renderLineThrough('1,1');
  const firstProject = localStorage.getItem('Project-1');
  const parsedProject = JSON.parse(firstProject);

  test('Expect edited task to be false', () => {
    expect(parsedProject.tasks[0].status).toEqual(false);
  });

  test('Expect edited task to not be true', () => {
    expect(parsedProject.tasks[0].status).not.toEqual(true);
  });
});

describe('show tasks of a project', () => {
  addProjectToLocalStorage('Project 1', 1);
  const obj = { title: 'working out', priority: 'High', date: '12/13/2020' };
  const obj1 = { title: 'running', priority: 'High', date: '12/13/2020' };
  const obj2 = { title: 'jumping', priority: 'High', date: '12/13/2020' };
  task.addTask(obj, 1, 1);
  task.addTask(obj1, 1, 2);
  task.addTask(obj2, 1, 3);
  const projectTasks = task.showTasks(1);
  test('expect size of array to be three', () => {
    expect(projectTasks.length).toEqual(3);
  });
});
