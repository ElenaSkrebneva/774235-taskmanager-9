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

// Task count and render task count
const TASK_COUNT = 20;
const RENDER_TASK_COUNT = 8;

// create task array ans slices
const tasksArray = [];
for (let i = 0; i < TASK_COUNT; i++) {
  tasksArray.push(getTask());
}
const taskSlices = [];
for (let i = 0; i < TASK_COUNT / RENDER_TASK_COUNT; i++) {
  taskSlices.push(tasksArray.slice(i * RENDER_TASK_COUNT, (i + 1) * RENDER_TASK_COUNT));
}

// counts for filters
for (let i = 0; i < tasksArray.length; i++) {
  filters.find((filter) => filter.title === `all`).count++;
  if (tasksArray[i].dueDate >= Date.now()) {
    filters.find((filter) => filter.title === `today`).count++;
  }
  if (tasksArray[i].dueDate < Date.now()) {
    filters.find((filter) => filter.title === `overdue`).count++;
  }
  if (tasksArray[i].isFavorite) {
    filters.find((filter) => filter.title === `favorites`).count++;
  }
  if (tasksArray[i].isArchived) {
    filters.find((filter) => filter.title === `archive`).count++;
  }
  let booleans = Object.values(tasksArray[i].repeatingDays);
  if (booleans.some((bool) => bool === true)) {
    filters.find((filter) => filter.title === `repeating`).count++;
  }
  if (tasksArray[i].tags.size > 0) {
    filters.find((filter) => filter.title === `tags`).count++;
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

// render 8 first usual cards
render(createEditCardForm(taskSlices[0][0]), boardTasks, `beforeend`);
for (let i = 1; i < taskSlices[0].length; i++) {
  render(createUsualCard(taskSlices[0][i]), boardTasks, `beforeend`);
}
taskSlices.shift();

// render load-more button and add click event
if (TASK_COUNT > RENDER_TASK_COUNT) {
  render(createLoadMoreBtn(), board, `beforeend`);
  const loadMore = document.querySelector(`.load-more`);
  loadMore.addEventListener(`click`, () => {
    if (Array.isArray(taskSlices) && taskSlices.length) {
      for (let i = 0; i < taskSlices[0].length; i++) {
        render(createUsualCard(taskSlices[0][i]), boardTasks, `beforeend`);
      }
      taskSlices.shift();
      if (taskSlices.length === 0) {
        loadMore.style.display = `none`;
      }
    }
  });
}
