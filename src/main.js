// imports
import {getTaskData} from '../src/components/data.js';
import {render, renderCard} from '../src/utilFuncs.js';
import {filters} from '../src/components/filters.js';
import {Menu} from '../src/components/menu.js';
import {Search} from '../src/components/search.js';
import {Filter} from '../src/components/filter.js';
import {LoadMoreBtn} from '../src/components/loadMoreBtn.js';
import {Board, BoardTasks} from '../src/components/board.js';


// Necessary markup elements
const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

// Task count and render task count
const TASK_COUNT = 1;
const RENDER_TASK_COUNT = 8;

// create a task array
const dataAr = [];
for (let i = 0; i < TASK_COUNT; i++) {
  dataAr.push(getTaskData());
}
// and slices for display
const dataSlices = [];
if (dataAr.length > 0) {
  for (let i = 0; i < TASK_COUNT / RENDER_TASK_COUNT; i++) {
    dataSlices.push(dataAr.slice(i * RENDER_TASK_COUNT, (i + 1) * RENDER_TASK_COUNT));
  }
}

// counts for filters
for (let i = 0; i < dataAr.length; i++) {
  filters.find((filter) => filter.title === `all`).count++;
  if (dataAr[i].dueDate >= Date.now()) {
    filters.find((filter) => filter.title === `today`).count++;
  }
  if (dataAr[i].dueDate < Date.now()) {
    filters.find((filter) => filter.title === `overdue`).count++;
  }
  if (dataAr[i].isFavorite) {
    filters.find((filter) => filter.title === `favorites`).count++;
  }
  if (dataAr[i].isArchived) {
    filters.find((filter) => filter.title === `archive`).count++;
  }
  let booleans = Object.values(dataAr[i].repeatingDays);
  if (booleans.some((bool) => bool === true)) {
    filters.find((filter) => filter.title === `repeating`).count++;
  }
  if (dataAr[i].tags.size > 0) {
    filters.find((filter) => filter.title === `tags`).count++;
  }
}

// filters renderer
const renderFilters = (parent) => {
  let container = document.createElement(`section`);
  container.classList.add(`main__filter`, `filter`, `container`);
  for (let i = 0; i < filters.length; i++) {
    let newFilter = new Filter();
    container.innerHTML += newFilter.getTemplate(filters[i].title, filters[i].count);
  }
  parent.appendChild(container);
};

// Render menu, search and filters
const menu = new Menu().getElement();
const search = new Search().getElement();
render(menu, mainControl, `beforeend`);
render(search, main, `beforeend`);
renderFilters(main);

// render board and boardTasks
const board = new Board().getElement();
const boardTasks = new BoardTasks().getElement();
render(board, main, `beforeend`);
render(boardTasks, board, `beforeend`);

// render 8 first usual cards
if (dataSlices.length > 0) {
  dataSlices[0].forEach((slice) => {
    renderCard(slice);
  });
  dataSlices.shift();
}

// render load-more button and add click event
if (TASK_COUNT > RENDER_TASK_COUNT) {
  const loadMore = new LoadMoreBtn().getElement();
  render(loadMore, board, `beforeend`);
  loadMore.addEventListener(`click`, () => {
    if (Array.isArray(dataSlices) && dataSlices.length) {
      dataSlices[0].forEach((slice) => {
        renderCard(slice);
      });
      dataSlices.shift();
      if (dataSlices.length === 0) {
        loadMore.style.display = `none`;
      }
    }
  });
}

// if boardTasks is empty
if (boardTasks.children.length === 0) {
  boardTasks.remove();
  board.innerHTML = `<p class="board__no-tasks">
    Congratulations, all tasks were completed! To create a new click on
    «add new task» button.
  </p>`;
}
