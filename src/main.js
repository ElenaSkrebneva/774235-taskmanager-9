// imports
import {createMenu} from '../src/components/menu.js';
import {createSearch} from '../src/components/search.js';
import {createFilters} from '../src/components/filters.js';
import {createEditCardForm} from '../src/components/editCard.js';
import {createUsualCard} from '../src/components/usualCard.js';

// Necessary markup elements
const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

// Render function
const render = (markup, container, classes, parent) => {
  for (let i = 0; i < classes.length; i++) {
    container.classList.add(classes[i]);
  }
  container.innerHTML = markup;
  parent.appendChild(container);
  return ``;
};

// Render
render(createMenu(), document.createElement(`section`), [`control__btn-wrap`], mainControl);
render(createSearch(), document.createElement(`section`), [`main__search`, `search`, `container`], main);
render(createFilters(), document.createElement(`section`), [`main__filter`, `filter`, `container`], main);
const board = document.createElement(`section`);
board.classList.add(`board`, `container`);
main.appendChild(board);
const boardTasks = document.createElement(`div`);
boardTasks.classList.add(`board__tasks`);
board.appendChild(boardTasks);
render(createEditCardForm(), document.createElement(`article`), [`card`, `card--black`, `card--edit`, `card--repeat`], boardTasks);
render(createUsualCard(), document.createElement(`article`), [`card`, `card--yellow`], boardTasks);
render(createUsualCard(), document.createElement(`article`), [`card`, `card--yellow`], boardTasks);
render(createUsualCard(), document.createElement(`article`), [`card`, `card--yellow`], boardTasks);
render(``, document.createElement(`button`), [`load-more`], board);
document.querySelector(`.load-more`).type = `button`;
