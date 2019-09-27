const todoListElement = document.getElementsByTagName('tbody')[0];
const textBox = document.getElementById('input_todo_box');
const addBtn = document.getElementById('add_btn');
const radioForm = document.getElementById('radio_form');
const radioNodeList = radioForm.todo;

//Todoクラス
class Todo {
  constructor(id, comment, status = 0) {
    this.id = id;
    this.comment = comment;
    this.status = status;
  }
}

//todoタスクの配列
const todos = [];

/**
 * todoタスク表示の関数
 */
function showTodo() {
  'use strict';

  //todoタスクの初期化
  while(todoListElement.firstChild.nextElementSibling) {
    todoListElement.removeChild(todoListElement.firstChild.nextElementSibling);
  }

  //todoタスクの表示
  for(let i=0; i<todos.length; i++) {
    const tableRow = document.createElement('tr');
    const id = document.createElement('td');
    id.textContent = todos[i].id;
    const comment = document.createElement('td');
    comment.textContent = todos[i].comment;
    const statusTableData = document.createElement('td');
    statusTableData.innerHTML = '<button class="status-btn"></button>';
    const statusBtn = statusTableData.firstElementChild;
    if(todos[i].status === 0) {
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
    tableRow.setAttribute('data-status', todos[i].status);
    tableRow.setAttribute('class', 'todo-task');
    todoListElement.appendChild(tableRow);
    filterTodo();
  }

  const statusBtns = document.getElementsByClassName('status-btn');
  const deleteBtns = document.getElementsByClassName('delete-btn');
  for(let i=0; i<todos.length; i++) {
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

/**
 * todoタスク追加の関数
 */
function addTodo() {
  'use strict';
  if(!(textBox.value === '')) {
    const todo = new Todo(todoId, textBox.value);
    todos.push(todo);
    textBox.value = '';
    todoId++;
  }
  showTodo();
}

/**
 * todoステータス変更の関数
 */
function changeStatus(index) {
  if(todos[index].status === 0) {
    todos[index].status = 1;
  } else {
    todos[index].status = 0;
  }
  showTodo();
}

/**
 * todoタスク削除の関数
 */
function deleteTodo(index) {
  todos.splice(index, 1);
  showTodo();
}

/**
 * todoタスク絞り込み関数
 */
function filterTodo() {
  const todoValue = parseInt(radioNodeList.value, 10);
  const todoTasks = Array.from(document.getElementsByClassName('todo-task'));
  function showAllTodo() {
    for(let i = 0; i<todoTasks.length; i++) {
      todoTasks[i].style.display = 'table-row';
    };
  }
  function filterTask(value) {
    return (parseInt(value.getAttribute('data-status'), 10) !== todoValue);
  }

  if(todos[0] !== undefined) {
    switch (todoValue) {
      case 0:
        const hideTasks0 = todoTasks.filter(filterTask);
        showAllTodo();
        for(let i = 0; i<hideTasks0.length; i++) {
          hideTasks0[i].style.display = 'none';
        };
        break;
      case 1:
        const hideTasks1 = todoTasks.filter(filterTask);
        showAllTodo();
        for(let i = 0; i<hideTasks1.length; i++) {
          hideTasks1[i].style.display = 'none';
        };
        break;
      default:
        showAllTodo();
        break;
    }
  }
}

/**
 * todoタスク追加イベント
 */
let todoId = 0;
addBtn.addEventListener('click', function() {
  addTodo();
});
