import {
  addProjectCount,
  addTaskCount,
  getProjectIndex,
} from '../functions/helpers';

test('Expect addProjectCount to increase project count by 1', () => {
  localStorage.setItem('projectCounter', '0');

  expect(addProjectCount()).toEqual(1);
});

test('Expect addTaskCount to increase task count by 1', () => {
  localStorage.setItem('taskCounter', '0');

  expect(addTaskCount()).toEqual(1);
});

test('Expect getProjectIndex to get the project ID from project element', () => {
  const fakeElement = { dataset: 5 };

  expect(getProjectIndex(fakeElement)).toEqual(5);
});
