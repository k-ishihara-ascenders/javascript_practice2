'use strict';

//----------------------------------------
// 定数
//----------------------------------------
const TYPE = {
  ALL: '全て',
  DOING: '作業中',
  DONE: '完了'
};

//----------------------------------------
// ●createStatusBtn●
// statusBtnを生成する関数
// [引数]
//   todoInstance : Todoクラスのインスタンス
//   index : 選択されたタスクのインデックス
// [戻り値]
//   statusBtn：タスクの作業中と完了を切り替えるボタン
//----------------------------------------
const createStatusBtn = (todoInstance, index) => {
  //ボタンを生成
  const statusBtn = document.createElement('button');
  statusBtn.textContent = todoInstance.getTodoStatus(index);

  //イベントを追加
  statusBtn.addEventListener('click', () => {

    todoInstance.changeTodoStatus(index);

    //todosを再表示
    displayTodos(todo);
  });

  return statusBtn;
}


//----------------------------------------
// ●createRemoveBtn●
// removeBtnを生成する関数
// [引数]
//   todoInstance : Todoクラスのインスタンス
//   index : 選択されたタスクのインデックス
// [戻り値]
//   removeBtn：タスクを削除するボタン
//----------------------------------------
const createRemoveBtn = (todoInstance, index) => {
  //ボタンを生成
  const removeBtn = document.createElement('button');
  removeBtn.textContent = `削除`;

  //イベントを追加
  removeBtn.addEventListener('click', () => {
    todoInstance.removeTodo(index);

    //todosを再表示
    displayTodos(todo);
  });

  return removeBtn;
}

//----------------------------------------
// ●displayTodos●
// タスクの表示を切り替える関数
// [引数]
//   todoInstance ：Todoクラスのインスタンス
// [戻り値]
//   なし（表示を切り替え）
//----------------------------------------
const displayTodos = todoInstance => {

  //選択されているラジオボタンに応じてtodosをフィルタリング
  const todos = todoInstance.getTodos();

  //tbodyタグを取得
  const todoList = document.getElementById('todo-list');

  //初期化
  todoList.textContent = '';

  todos.forEach(todo => {
    //todo表示用tr要素を生成
    const taskElement = document.createElement('tr');

    //ID表示用td要素を生成
    const idElement = document.createElement('td');
    const taskId = todo.id;
    idElement.textContent = taskId;

    //task表示用td要素を生成
    const commentElement = document.createElement('td');
    commentElement.textContent = todo.task;

    //statusBtn表示用td要素を生成
    const statusBtnElement = document.createElement('td');
    const statusBtn = createStatusBtn(todoInstance, taskId - 1);
    statusBtnElement.appendChild(statusBtn);

    //deleteBtn表示用td要素を生成
    const removeBtnElement = document.createElement('td');
    const removeBtn = createRemoveBtn(todoInstance, taskId - 1);
    removeBtnElement.appendChild(removeBtn);

    //生成したtdをtrにセット
    taskElement.appendChild(idElement);
    taskElement.appendChild(commentElement);
    taskElement.appendChild(statusBtnElement);
    taskElement.appendChild(removeBtnElement);

    todoList.appendChild(taskElement);
  })
}
