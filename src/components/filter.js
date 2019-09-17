//  Фильтры
import {Component} from './component.js';
export class Filter extends Component {
  getTemplate(name, count) {
    return `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`;
  }
  removeFilter(name) {
    document.getElementById(`filter__${name}`).remove();
    document.querySelector(`label[for="filter__${name}"]`).remove();
  }
}
