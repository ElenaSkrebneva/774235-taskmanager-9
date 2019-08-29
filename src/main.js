// imports
import {createMenu} from '../src/components/menu.js';
import {createSearch} from '../src/components/search.js';
import {createFilters} from '../src/components/filters.js';
import {createEditCardForm} from '../src/components/editCard.js';
import {createUsualCard} from '../src/components/usualCard.js';
import {createLoadMoreBtn} from '../src/components/loadMoreBtn.js';

// Necessary markup elements
const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

// Render function
const render = (element, parent, place) => {
  parent.insertAdjacentHTML(place, element);
  return ``;
};

// Render
render(createMenu(), mainControl, `beforeend`);
render(createSearch(), main, `beforeend`);
render(createFilters(), main, `beforeend`);
const board = document.createElement(`section`);
board.classList.add(`board`, `container`);
main.appendChild(board);
const boardTasks = document.createElement(`div`);
boardTasks.classList.add(`board__tasks`);
board.appendChild(boardTasks);
render(createEditCardForm(), boardTasks, `beforeend`);
render(createUsualCard(), boardTasks, `beforeend`);
render(createUsualCard(), boardTasks, `beforeend`);
render(createUsualCard(), boardTasks, `beforeend`);
render(createLoadMoreBtn(), board, `beforeend`);
