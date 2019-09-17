import {UsualCard} from './components/usualCard.js';
import {EditCardForm} from './components/editCard.js';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
const render = (element, parent, place) => {
  if (place === `afterbegin`) {
    parent.prependChild(element);
  } else {
    parent.appendChild(element);
  }
};
const renderCard = (obj) => {
  const card = new UsualCard(obj);
  const cardEdit = new EditCardForm(obj);
  const container = document.querySelector(`.board__tasks`);
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      container.replaceChild(card.getElement(), cardEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  card.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    container.replaceChild(cardEdit.getElement(), card.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  cardEdit.getElement().querySelector(`textarea`).addEventListener(`blue`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
    container.replaceChild(card.getElement(), cardEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(card.getElement(), container, `beforeend`);
};
export {createElement, render, renderCard};
