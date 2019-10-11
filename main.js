'use strict';

//----------------------------------------
// グローバル変数
//----------------------------------------
const todos = []; //todoタスクの配列
let todoId = 0; //todoタスク配列のIDプロパティの値の初期値
const radioForm = document.getElementById('radio_form'); //ラジオボタンのformの取得
const radioNodeList = radioForm.status; //「すべて」のラジオボタンを取得

//----------------------------------------
// ●showTodo●
// タスクの表示を切り替える関数
// [引数]
//   なし
// [戻り値]
//   なし（表示を切り替え）
//----------------------------------------
function showTodo() {
  const todoListElement = document.getElementById('table_body');

  //todoタスクの初期化
  while(todoListElement.firstChild) {
    todoListElement.removeChild(todoListElement.firstChild);
  }

  //todoタスクの表示
  for(let i = 0; i < todos.length; i++) {
    const tableRow = document.createElement('tr');
    const id = document.createElement('td');
    id.textContent = todos[i].id;
    const comment = document.createElement('td');
    comment.textContent = todos[i].comment;
    const statusTableData = document.createElement('td');
    statusTableData.innerHTML = '<button class="status-btn"></button>';
    const statusBtn = statusTableData.firstElementChild;
    if(todos[i].compFlag === false) {
      statusBtn.textContent = '作業中';
    } else {
      statusBtn.textContent = '完了';
    }
    const deleteTableData = document.createElement('td');
    deleteTableData.innerHTML = '<button class="delete-btn">削除</button>';

    tableRow.appendChild(id);
    tableRow.appendChild(comment);
    tableRow.appendChild(statusTableData);
    tableRow.appendChild(deleteTableData);
    tableRow.setAttribute('data-status', todos[i].compFlag);
    tableRow.setAttribute('class', 'todo-task');
    todoListElement.appendChild(tableRow);
    filterTodo();
  }

  const statusBtns = document.getElementsByClassName('status-btn');
  const deleteBtns = document.getElementsByClassName('delete-btn');
  for(let i = 0; i < todos.length; i++) {
    // ステータス更新イベント
    statusBtns[i].addEventListener("click", function() {
      changeStatus(i);
    });

    // todoタスク削除イベント
    deleteBtns[i].addEventListener("click", function() {
      deleteTodo(i);
    });
  }

  // todoタスク絞り込みイベント
  radioForm.addEventListener('change', function() {
    filterTodo();
  });
}

//----------------------------------------
// ●addTodo●
// タスクを追加する関数
// [引数]
//   なし
// [戻り値]
//   なし（グローバル変数を操作）
//----------------------------------------
function addTodo() {
  const textBox = document.getElementById('input_todo_box');

  if(!(textBox.value === '')) {
    const todo = {
      id: todoId,
      comment: textBox.value,
      compFlag: false
    };
    todos.push(todo);
    textBox.value = '';
    todoId++;
  }
  showTodo();
}

//----------------------------------------
// ●changeStatus●
// ステータスを変更する関数
// [引数]
//   index : 選択されたタスクのインデックス
// [戻り値]
//   なし（グローバル変数を操作）
//----------------------------------------
function changeStatus(index) {
  if(!(todos[index].compFlag)) {
    todos[index].compFlag = true;
  } else {
    todos[index].compFlag = false;
  }
  showTodo();
}

//----------------------------------------
// ●deleteTodo●
// タスクを削除する関数
// [引数]
//   index : 選択されたタスクのインデックス
// [戻り値]
//   なし（グローバル変数を操作）
//----------------------------------------
function deleteTodo(index) {
  todos.splice(index, 1);
  showTodo();
}

//----------------------------------------
// ●filterTodo●
// タスクをフィルタリングする関数
// [引数]
//   なし
// [戻り値]
//   なし（ステータス以外のDOMを非表示）
//----------------------------------------
function filterTodo() {
  const todoValue = radioNodeList.value;
  const todoTasks = Array.from(document.getElementsByClassName('todo-task'));
  function showAllTodo() {
    for(let i = 0; i < todoTasks.length; i++) {
      todoTasks[i].style.display = 'table-row';
    };
  }

  if(todos[0]) {
    switch (todoValue) {
      case 'wip':
        const hideTasksFix = todoTasks.filter(function(value) {
          return value.getAttribute('data-status') !== 'false';
        });
        showAllTodo();
        for(let i = 0; i < hideTasksFix.length; i++) {
          hideTasksFix[i].style.display = 'none';
        };
        break;
      case 'fix':
        const hideTasksWip = todoTasks.filter(function(value) {
          return value.getAttribute('data-status') !== 'true';
        });
        showAllTodo();
        for(let i = 0; i < hideTasksWip.length; i++) {
          hideTasksWip[i].style.display = 'none';
        };
        break;
      default:
        showAllTodo();
        break;
    }
  }
}

//----------------------------------------
// タスク追加イベント
// [引数]
//   addTodo関数
// [戻り値]
//   なし（タスク追加）
//----------------------------------------
const addBtn = document.getElementById('add_btn');
addBtn.addEventListener('click', addTodo);
