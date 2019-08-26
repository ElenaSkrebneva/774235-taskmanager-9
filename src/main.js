// imports
import {createMenu} from `components/menu.js`;
import {createSearch} from `components/search.js`;
import {createFilters} from `components/filters.js`;
import {createEditCardForm} from `components/editCard.js`;
import {createUsualCard} from `components/usualCard.js`;

// Necessary markup elements
const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);
const board = document.createElement(`section`);
board.classList.add(`board`, `container`);
main.appendChild(board);
const boardTasks = document.createElement(`div`);
boardTasks.classList.add(`board__tasks`);
board.appendChild(boardTasks);

// Render function
const render = (markup, container, classes, parent) => {
  for (let i=0; i<classes.length; i++) {
    container.classList.add(classes[i]);
  }
  container.innerHTML = markup;
  parent.appendChild(container);
  return ``;
};

//Render
render(createMenu(), document.createElement(`section`), [`control__btn-wrap`], mainControl);
render(createSearch(), document.createElement(`section`), [`main__search`, `search`, `container`], main);
render(createFilters(), document.createElement(`section`), [`main__filter`, `filter`, `container`], main);
render(createEditCardForm(), document.createElement(`article`), [`card`, `card--black`, `card--edit`, `card--repeat`], boardTasks);
render(createUsualCard(), document.createElement(`article`), [`card`, `card--yellow`], boardTasks);
render(createUsualCard(), document.createElement(`article`), [`card`, `card--yellow`], boardTasks);
render(createUsualCard(), document.createElement(`article`), [`card`, `card--yellow`], boardTasks);
render(``, document.createElement(`button`), [`load-more`], board);
document.querySelector(".load-more").type = `button`;
