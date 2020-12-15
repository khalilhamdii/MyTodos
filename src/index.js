import "./assets/css/styles.min.css";
import TodoList from './assets/js/todolist'

const importAll = (r) => r.keys().map(r);
importAll(require.context("./assets/js/", true, /\.js$/));

const images = importAll(
  require.context("./assets/img/", false, /\.(png|jpe?g|svg)$/)
);

document.addEventListener('DOMContentLoaded', () => {
  const projectBtn = document.getElementById('project-btn')
  projectBtn.addEventListener('click', TodoList.renderProjectInput)
})
