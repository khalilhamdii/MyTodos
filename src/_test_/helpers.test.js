import * as helpers from '../assets/js/helpers';

test('Expect addProjectCount to increase project count by 1', () => {
  localStorage.setItem('projectCounter', '0');

  expect(helpers.addProjectCount()).toEqual(1);
});

test('Expect addTaskCount to increase task count by 1', () => {
  localStorage.setItem('taskCounter', '0');

  expect(helpers.addTaskCount()).toEqual(1);
});

test('Expect getProjectIndex to get the project ID from project element', () => {
  const fakeElement = { dataset: { index: 5 } };

  expect(helpers.getProjectIndex(fakeElement)).toEqual(5);
});
