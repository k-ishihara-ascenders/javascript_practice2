'use strict';

class Todo{
  constructor() {
    this._todos = [];
    this._radioType = TYPE.ALL;
  }

  //タスクを追加するメソッド
  addTodo(task) {
    const todo = { task, status: TYPE.DOING };
    this._todos.push(todo);
  }

  // 選択されたタスクを削除
  removeTodo(index) {
    this._todos.splice(index, 1);
  }

  //タスクの状態を変更するメソッド
  changeTodoStatus(index) {
    this._todos[index].status =
      this._todos[index].status === TYPE.DOING
        ? TYPE.DONE
        : TYPE.DOING;
  }

  //選択されたタスクの状態を取得するメソッド
  getTodoStatus(index) {
    return this._todos[index].status;
  }

  //選択されているラジオボタンのタイプを変更するメソッド
  changeRadioType(radioType) {
    this._radioType = radioType;
  }

  //todo一覧を取得するメソッド
  getTodos() {
    const todos = this._todos.slice();
    todos.forEach((todo, index) => {
      todo.id = index + 1;
    });

    //タイプが全て以外の時はフィルタリング
    if(this._radioType !== TYPE.ALL) {
      return todos.filter(todo => {
        return todo.status === this._radioType;
      });
    }

    return todos;
  }
}
