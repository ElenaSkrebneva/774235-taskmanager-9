//  Фильтры
export const createFilter = (name) => `
      <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count"></span></label
    >
  `;
