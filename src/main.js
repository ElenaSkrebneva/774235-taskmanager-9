// imports
import {getTask} from '../src/components/data.js';
import {filters} from '../src/components/filters.js';
import {createMenu} from '../src/components/menu.js';
import {createSearch} from '../src/components/search.js';
import {createFilter} from '../src/components/filter.js';
import {createEditCardForm} from '../src/components/editCard.js';
import {createUsualCard} from '../src/components/usualCard.js';
import {createLoadMoreBtn} from '../src/components/loadMoreBtn.js';


// Necessary markup elements
const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

// Task count
const TASK_COUNT = 20;

// create task array
const tasksArray = [];
for (let i = 0; i < TASK_COUNT; i++) {
  tasksArray.push(getTask());
}

// count for filters
for (let i = 0; i < tasksArray.length; i++) {
  if (tasksArray[i].dueDate < Date.now()) {
    filters.find((filter) => filter.title === `overdue`).count++;
  }
  if (tasksArray[i].isFavorite) {
    filters.find((filter) => filter.title === `favorites`).count++;
  }
  if (tasksArray[i].isArchived) {
    filters.find((filter) => filter.title === `archive`).count++;
  }
  if (Object.keys(tasksArray[i].repeatingDays) == true))) {
    filters.find((filter) => filter.title === `repeating`).count++;
  }
}
// Render functions
const render = (element, parent, place) => {
  parent.insertAdjacentHTML(place, element);
  return ``;
};
// filters renderer
const renderFilters = (parent) => {
  let container = document.createElement(`section`);
  container.classList.add(`main__filter`, `filter`, `container`);
  for (let i = 0; i < filters.length; i++) {
    container.innerHTML += createFilter(filters[i].title, filters[i].count);
  }
  parent.appendChild(container);
};
// Render menu, search and filters
render(createMenu(), mainControl, `beforeend`);
render(createSearch(), main, `beforeend`);
renderFilters(main, `beforeend`);
// render board and board tasks
const board = document.createElement(`section`);
board.classList.add(`board`, `container`);
main.appendChild(board);
const boardTasks = document.createElement(`div`);
boardTasks.classList.add(`board__tasks`);
board.appendChild(boardTasks);
render(createEditCardForm(getTask()), boardTasks, `beforeend`);

// render usual cards
for (let i = 0; i < tasksArray.length; i++) {
  render(createUsualCard(tasksArray[i]), boardTasks, `beforeend`);
}
render(createLoadMoreBtn(), board, `beforeend`);
