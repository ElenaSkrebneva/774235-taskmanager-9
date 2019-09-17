import {Component} from './component.js';
class Board extends Component {
  constructor() {
    super();
  }
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
class BoardTasks extends Component {
  constructor() {
    super();
  }
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}

export {Board, BoardTasks};
