const addProjectCount = () => {
  const value = localStorage.getItem('projectCounter');
  const counter = JSON.parse(value) + 1;
  localStorage.projectCounter = JSON.stringify(counter);
  return counter;
};

const addTaskCount = () => {
  const value = localStorage.getItem('taskCounter');
  const counter = JSON.parse(value) + 1;
  localStorage.taskCounter = JSON.stringify(counter);
  return counter;
};

const getProjectIndex = (item) => {
  const index = item.dataset;
  return index;
};

export { addProjectCount, addTaskCount, getProjectIndex };
