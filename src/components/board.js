import {Component} from './component.js';
import {render} from '../utilFuncs.js';
import {Sorter} from './sort.js';
import {LoadMoreBtn} from './loadMoreBtn.js';
import {TaskController} from './TaskController.js';

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

export class BoardController {
  constructor(tasks, container, renderTaskCount) {
    this._board = new Board();
    this._boardTasks = new BoardTasks();
    this._sorter = new Sorter();
    this._tasks = tasks;
    this._container = container;
    this._renderTaskCount = renderTaskCount;
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }
  init() {
    const board = this._board.getElement();
    const boardTasks = this._boardTasks.getElement();
    const sorter = this._sorter.getElement();
    render(board, this._container, `beforeend`);
    render(sorter, board, `afterbegin`);
    render(boardTasks, board, `beforeend`);
    if (this._tasks.length <= this._renderTaskCount) {
      this._tasks.forEach((task) => {
        this._renderTask(task);
      });

      // if boardTasks is empty
      if (this._tasks.length === 0) {
        boardTasks.remove();
        this._boardTasks.removeElement();
        board.innerHTML = `<p class="board__no-tasks">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
        </p>`;
      }
    } else {
      for (let i = 0; i < this._renderTaskCount; i++) {
        this._renderTask(this._tasks[i]);
      }
      // render load-more button
      const loadMore = new LoadMoreBtn().getElement();
      render(loadMore, board, `beforeend`);
      loadMore.addEventListener(`click`, () => {
        let loadMoreCounter = document.querySelectorAll(`.card`).length;
        if (loadMoreCounter + this._renderTaskCount > this._tasks.length) {
          for (let i = loadMoreCounter; i < this._tasks.length; i++) {
            this._renderTask(this._tasks[i]);
          }
          loadMore.style.display = `none`;
        }
        else {
          for (let i = loadMoreCounter; i < loadMoreCounter + this._renderTaskCount; i++) {
            this._renderTask(this._tasks[i]);
          }
        }
      });
    }
  }
  _renderBoard() {
    const board = this._board.getElement();
    this._boardTasks.getElement().remove();
    this._boardTasks.removeElement();
    const boardTasks = this._boardTasks.getElement();
    render(boardTasks, board, `beforeend`);
    if (this._tasks.length <= this._renderTaskCount) {
      this._tasks.forEach((task) => {
        this._renderTask(task);
      });

      // if boardTasks is empty
      if (this._tasks.length === 0) {
        boardTasks.remove();
        this._boardTasks.removeElement();
        board.innerHTML = `<p class="board__no-tasks">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
        </p>`;
      }
    } else {
      for (let i = 0; i < this._renderTaskCount; i++) {
        this._renderTask(this._tasks[i]);
      }
      // render load-more button and add click event
      const loadMore = new LoadMoreBtn().getElement();
      render(loadMore, board, `beforeend`);
      loadMore.addEventListener(`click`, () => {
        let loadMoreCounter = document.querySelectorAll(`.card`).length;
        if (loadMoreCounter + this._renderTaskCount > this._tasks.length) {
          for (let i = loadMoreCounter; i < this._tasks.length; i++) {
            this._renderTask(this._tasks[i]);
          }
          loadMore.style.display = `none`;
        }
        else {
          for (let i = loadMoreCounter; i < loadMoreCounter + this._renderTaskCount; i++) {
            this._renderTask(this._tasks[i]);
          }
        }
      });
    }
  }
  _renderTask(obj) {
    const taskController = new TaskController(obj, document.querySelector(`.board__tasks`), this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }
  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard();
  }
  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}
