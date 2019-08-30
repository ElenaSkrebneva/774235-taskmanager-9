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
const TASK_COUNT = 3;

// Render functions
const render = (element, parent, place) => {
  parent.insertAdjacentHTML(place, element);
  return ``;
};
const renderTasks = (parent, howMany) => {
  for (let i = 0; i < howMany; i++) {
    let element = createUsualCard(getTask());
    parent.innerHTML += element;
  }
};
// filters renderer
const renderFilters = (parent, place) => {
  let container = document.createElement(`section`);
  container.classList.add(`main__filter`, `filter`, `container`);
  for (let i = 0; i < filters.length; i++) {
    container.innerHTML += createFilter(filters[i].title);
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
renderTasks(boardTasks, TASK_COUNT);
render(createLoadMoreBtn(), board, `beforeend`);
