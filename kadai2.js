'use strict';

//----------------------------------------
// グローバル変数
//----------------------------------------

const todo = new Todo();

//----------------------------------------
// 追加ボタンを押下したときの処理
//----------------------------------------
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {

  //<iuput>タグに入力された値を取得
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value

  //タスクを追加
  if(task) todo.addTodo(task);

  //タスクを表示
  displayTodos(todo);

  //inputを初期化
  taskInput.value = '';
});

//----------------------------------------
// ラジオボタンを押下したときの処理
//----------------------------------------
const radioForm = document.getElementById('radio-form');
const radioNodeList = radioForm.swich_display;

radioForm.addEventListener('change', () => {
  const radioVal = radioNodeList.value;
  switch (radioVal) {
    case 'radio-all':
      todo.changeRadioType(TYPE.ALL);
      break;
    case 'radio-doing':
      todo.changeRadioType(TYPE.DOING);
      break;
    case 'radio-complete':
      todo.changeRadioType(TYPE.DONE);
      break;
    default:
      break;
  }

  displayTodos(todo);
})
