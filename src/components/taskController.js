import {UsualCard} from './usualCard.js';
import {EditCardForm} from './editCard.js';
export class TaskController {
  constructor(data, parent, onDataChange, onChangeView) {
    this._data = data;
    this._parent = parent;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._card = new UsualCard(this._data);
    this._cardEdit = new EditCardForm(this._data);
    this.renderCard();
  }
  renderCard() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._parent.replaceChild(this._card.getElement(), this._cardEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    this._card.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onChangeView();
      this._parent.replaceChild(this._cardEdit.getElement(), this._card.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._cardEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._cardEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._cardEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._cardEdit.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: formData.get(`date`),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false,
        }),
        isFavorite: Boolean(Math.round(Math.random())),
        isArchived: Boolean(Math.round(Math.random()))
      };
      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    this._parent.appendChild(this._card.getElement());
  }
  setDefaultView() {
    if (this._parent.contains(this._cardEdit.getElement())) {
      this._parent.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }
}
