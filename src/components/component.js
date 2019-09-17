export class Component {
  constructor() {
    this._element = null;
  }
  getElement() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.getTemplate();
    this._element = newElement.firstChild;
    return this._element;
  }
  getTemplate() {
    throw Error(`Cannot implement abstract method`);
  }
  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }
}
