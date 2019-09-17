import {Component} from './component.js';
export class LoadMoreBtn extends Component {
  constructor() {
    super();
  }
  getElement() {
    const btn = document.createElement(`button`);
    btn.classList.add(`load-more`);
    btn.type = `button`;
    btn.innerHTML = `Load More`;
    this._element = btn;
    return this._element;
  }
  removeElement() {
    document.querySelector(`.load-more`).remove();
  }
}
