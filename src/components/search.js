//  Поиск
export class Search {
  getElement() {
    let newDiv = document.createElement(`div`);
    newDiv.innerHTML = this.getTemplate();
    return newDiv.firstChild;
  }
  removeElement() {
    document.querySelector(`.main__search`).remove();
  }
  getTemplate() {
    return `<section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
        `;
  }
}
