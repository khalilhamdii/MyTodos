import * as constructors from '../assets/js/constructors';

test('Expect Project constructor to create a new project object', () => {
  const newProject = new constructors.Project('Some Project');
  expect(newProject).toEqual({ name: 'Some Project', tasks: [] });
});

test('Expect Task constructor to create a new task object', () => {
  const newTask = new constructors.Task('Task 1', 'High', '30-12-2020', [1, 1]);
  expect(newTask).toEqual({
    title: 'Task 1',
    priority: 'High',
    date: '30-12-2020',
    id: [1, 1],
    status: true,
  });
});
