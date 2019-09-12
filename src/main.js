// imports
import {getTaskData} from '../src/components/data.js';
import {render} from '../src/utilFuncs.js';
import {filters} from '../src/components/filters.js';
import {Menu} from '../src/components/menu.js';
import {Search} from '../src/components/search.js';
import {createFilter} from '../src/components/filter.js';
import {EditCardForm} from '../src/components/editCard.js';
import {UsualCard} from '../src/components/usualCard.js';
import {createLoadMoreBtn} from '../src/components/loadMoreBtn.js';


// Necessary markup elements
const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

// Task count and render task count
const TASK_COUNT = 20;
const RENDER_TASK_COUNT = 8;

// create task array and slices for display
const dataAr = [];
for (let i = 0; i < TASK_COUNT; i++) {
  dataAr.push(getTaskData());
}

const dataSlices = [];
for (let i = 0; i < TASK_COUNT / RENDER_TASK_COUNT; i++) {
  dataSlices.push(dataAr.slice(i * RENDER_TASK_COUNT, (i + 1) * RENDER_TASK_COUNT));
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
    container.innerHTML += createFilter(filters[i].title, filters[i].count);
  }
  parent.appendChild(container);
};

// Render menu, search and filters
const menu = new Menu();
const search = new Search();
render(menu.getElement(), mainControl, `beforeend`);
render(search.getElement(), main, `beforeend`);
renderFilters(main);

// render board and board tasks
const board = document.createElement(`section`);
board.classList.add(`board`, `container`);
main.appendChild(board);
const boardTasks = document.createElement(`div`);
boardTasks.classList.add(`board__tasks`);
board.appendChild(boardTasks);

// renderTasks function
const renderTask = (taskMock) => {
  const card = new UsualCard(taskMock);
  const cardEdit = new EditCardForm(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      boardTasks.replaceChild(card.getElement(), cardEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  card.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    boardTasks.replaceChild(cardEdit.getElement(), card.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  cardEdit.getElement().querySelector(`textarea`).addEventListener(`blue`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
    boardTasks.replaceChild(card.getElement(), cardEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(card.getElement(), boardTasks, `beforeend`);
};

// render 8 first usual cards
dataSlices[0].forEach((slice) => {
  renderTask(slice);
});
dataSlices.shift();

// render load-more button and add click event
if (TASK_COUNT > RENDER_TASK_COUNT) {
  const loadMoreElement = createLoadMoreBtn();
  render(loadMoreElement, board, `beforeend`);
  const loadMore = document.querySelector(`.load-more`);
  loadMore.addEventListener(`click`, () => {
    if (Array.isArray(dataSlices) && dataSlices.length) {
      dataSlices[0].forEach((slice) => {
        renderTask(slice);
      });
      dataSlices.shift();
      if (dataSlices.length === 0) {
        loadMore.style.display = `none`;
      }
    }
  });
}
