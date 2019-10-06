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
// グローバル変数
//----------------------------------------
let selectedRadioType = TYPE.ALL; //選択されているラジオボタンのタイプ

//----------------------------------------
// Todoクラス
//----------------------------------------
class Todo {
  constructor() {
    this.todos = []; //タスク格納用配列
  }

  //----------------------------------------
  // ●taskAdd●
  // タスクを追加する関数
  // [引数]
  //   なし
  // [戻り値]
  //   なし（配列にタスクを追加）
  //----------------------------------------
  taskAdd() {

    //<iuput>タグに入力された値を取得
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value

    //タスクを追加
    // if(task) this.createTodos(task);
    if(task) {
      todoTask.createTodos(task);
    }

    //タスクを表示
    todoTask.displayTodos(selectedRadioType);

    //inputを初期化
    taskInput.value = '';
  }

  //----------------------------------------
  // ●createStatusBtn●
  // statusBtnを生成する関数
  // [引数]
  //   index : 選択されたタスクのインデックス
  // [戻り値]
  //   statusBtn：タスクの作業中と完了を切り替えるボタン
  //----------------------------------------
  createStatusBtn(index) {

    //ボタンを生成
    const statusBtn = document.createElement('button');
    statusBtn.textContent = todoTask.todos[index].status;

    //イベントを追加
    statusBtn.addEventListener('click', () => {
      //statusを変更
      todoTask.todos[index].status =
      todoTask.todos[index].status === TYPE.DOING
          ? TYPE.DONE
          : TYPE.DOING;

      //todosを再表示
      todoTask.displayTodos(selectedRadioType);
    });

    return statusBtn;
  }

  //----------------------------------------
  // ●createRemoveBtn●
  // removeBtnを生成する関数
  // [引数]
  //   index : 選択されたタスクのインデックス
  // [戻り値]
  //   removeBtn：タスクを削除するボタン
  //----------------------------------------
  createRemoveBtn(index) {

    //ボタンを生成
    const removeBtn = document.createElement('button');
    removeBtn.textContent = `削除`;

    //イベントを追加
    removeBtn.addEventListener('click', () => {
      //選択されたタスクを削除
      todoTask.todos.splice(index, 1);

      //todosを再生成
      todoTask.createTodos();

      //todosを再表示
      todoTask.displayTodos(selectedRadioType);
    });

    return removeBtn;
  }

  //----------------------------------------
  // ●createTodos●
  // taskエレメントを生成する関数
  // [引数]
  //   task：フォームに入力されたtaskの内容
  // [戻り値]
  //   なし（todosプロパティにデータを追加）
  //----------------------------------------
  createTodos(task) {

    //タスクが指定された場合はタスクを追加
    if (task) {
      const todo = {task, status: TYPE.DOING };
      todoTask.todos.push(todo);
    }

    //タスクのIDを定義
    todoTask.todos.forEach((todo, index) => {
      todo.id = index + 1;
    })
  }

  //----------------------------------------
  // ●displayTodos●
  // タスクを表示する関数
  // [引数]
  //   radioType：選択されているラジオボタンのタイプ
  // [戻り値]
  //   なし（タスクを表示）
  //----------------------------------------
  displayTodos(radioType) {

    //選択されているラジオボタンに応じてtodosをフィルタリング
    const filteredTodos = todoTask.filterTodos(radioType);

    //tbodyタグを取得
    const todoList = document.getElementById('todo-list');

    //初期化
    todoList.textContent = '';

    filteredTodos.forEach((filteredTodo, index) => {
      //todo表示用tr要素を生成
      const taskElement = document.createElement('tr');

      //ID表示用td要素を生成
      const idElement = document.createElement('td');
      const taskId = filteredTodo.id;
      idElement.textContent = taskId;

      //task表示用td要素を生成
      const commentElement = document.createElement('td');
      commentElement.textContent = filteredTodo.task;

      //statusBtn表示用td要素を生成
      const statusBtnElement = document.createElement('td');
      const statusBtn = todoTask.createStatusBtn(taskId - 1);

      statusBtnElement.appendChild(statusBtn);

      //deleteBtn表示用td要素を生成
      const removeBtnElement = document.createElement('td');
      const removeBtn = todoTask.createRemoveBtn(taskId - 1);
      removeBtnElement.appendChild(removeBtn);

      //生成したtdをtrにセット
      taskElement.appendChild(idElement);
      taskElement.appendChild(commentElement);
      taskElement.appendChild(statusBtnElement);
      taskElement.appendChild(removeBtnElement);

      todoList.appendChild(taskElement);
    })
  }

  //----------------------------------------
  // ●filterTodos●
  // ラジオボタンに応じてタスクをフィルタリングする関数
  // [引数]
  //   radioType：選択されているラジオボタンのタイプ
  // [戻り値]
  //   フィルタリング後のタスク配列
  //----------------------------------------
  filterTodos(radioType) {

    //「全て」が選択されているときはそのまま
    if (radioType === TYPE.ALL) {
      return todoTask.todos.slice();
    }

    //それ以外の時はフィルタリング
    return todoTask.todos.filter(todo => {
      return todo.status === radioType;
    });
  }

  //----------------------------------------
  // ●changeRadio●
  // ラジオボタンに応じてタスクをフィルタリングする関数
  // [引数]
  //   なし
  // [戻り値]
  //   なし（表示を切り替え）
  //----------------------------------------
  changeRadio() {

    selectedRadioType = radioNodeList.value; // 選択状態の値(value)を取得

    switch (selectedRadioType) {
      case TYPE.ALL:
        todoTask.displayTodos(selectedRadioType);
        break;

      case TYPE.DOING:
        todoTask.displayTodos(selectedRadioType);
        break;

      case TYPE.DONE:
        todoTask.displayTodos(selectedRadioType);
        break;

      default:
        break;
    }
  }
}

const todoTask = new Todo(); //todoオブジェクトを作成

//----------------------------------------
// 追加ボタンを押下したときの処理
//----------------------------------------
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', todoTask.taskAdd);

//----------------------------------------
// ラジオボタンを押下したときの処理
//----------------------------------------
const radioForm = document.getElementById('radio-form'); // form要素を取得
const radioNodeList = radioForm.swich_display; // form要素内のラジオボタングループ(name="swich_display")を取得
radioForm.addEventListener('change', todoTask.changeRadio);
