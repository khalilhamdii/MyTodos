import TaskManipulation from '../assets/js/task_manipulation';
import ProjectManipulation from '../assets/js/project_manipulation';

describe('Testing task manipulation functions', () => {
  document.body.innerHTML = `<input type="text" id="input" value="Project 1">
  <ul class="list-unstyled" id="project-list">
  </ul>
  <div id="project-input" class="mb-3"></div>
  <div id="tasks"></div>

  `;

  describe('Testing addTask function', () => {
    const fakeTaskForm = `
    <div>
    <input id="task_title" value="working out">
    <input id="task_priority" value="High">
    <input id="task_date" value="12/13/2020">
    </div>
    `;
    document.body.innerHTML += fakeTaskForm;
    ProjectManipulation.addProjectToLocalStorage();
    TaskManipulation.addTask(1);
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

  beforeEach(() => {
    const fakeTaskForm = `
    <div>
    <input id="task_title" value="working out">
    <input id="task_priority" value="High">
    <input id="task_date" value="12/13/2020">
    </div>
    `;
    document.body.innerHTML += fakeTaskForm;
    ProjectManipulation.addProjectToLocalStorage();
    TaskManipulation.addTask(1);
  });

  describe('Testing editTask function', () => {
    const fakeElement2 = document.querySelector('.task-target');
    const newObj = {
      title: 'Running',
      priority: 'Very High',
      date: '12/15/2020',
    };
    TaskManipulation.editTask(fakeElement2, newObj);
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
    const fakeElement3 = document.querySelector('.task-target');
    TaskManipulation.renderLineThrough('1,1', fakeElement3);
    const firstProject = localStorage.getItem('Project-1');
    const parsedProject = JSON.parse(firstProject);

    test('Expect edited task to be false', () => {
      expect(parsedProject.tasks[0].status).toEqual(false);
    });

    test('Expect edited task to not be true', () => {
      expect(parsedProject.tasks[0].status).not.toEqual(true);
    });
  });

  describe('Testing removeTask function', () => {
    const fakeElement = document.querySelector('.task-target');
    TaskManipulation.removeTask('1,1', fakeElement);
    const firstProject = localStorage.getItem('Project-1');
    const parsedProject = JSON.parse(firstProject);

    test('expect removeTask to remove the task', () => {
      expect(parsedProject.tasks.length).toEqual(0);
    });

    test('expect tasks length not to be 1', () => {
      expect(parsedProject.tasks.length).not.toEqual(1);
    });
  });

  describe('show tasks of a project', () => {
    TaskManipulation.addTask(1);
    TaskManipulation.addTask(1);
    TaskManipulation.addTask(1);
    TaskManipulation.showTasks(1);
    const tasks = document.querySelectorAll('.task-target');
    test('expect size of array to be three', () => {
      expect(tasks.length).toEqual(3);
    });
  });
});
