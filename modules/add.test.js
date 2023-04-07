/**
 * @jest-environment jsdom
 */
import {
  getList, removeListIndex, editList, delBtn, checkComplete, getLocalStorage, } from './addRemove';

describe('todoAdder', () => {
  document.body.innerHTML = `
  <div class="container">
  <div class="to-do-body">
    <div class="to-do-heading-container">
      <h1 class="to-do-heading">Today's To Do</h1>
      <i class="fa fa-refresh fa-2x"></i>
    </div>
    <div class="to-do-add">
      <form class="form">
        <input
          value="test"
          type="text"
          class="to-do-add-text"
          placeholder="Add to your list..."
        />
      </form>
      <i class="fas fa-rotate-90 enter-btn">&#xf3be;</i>
    </div>

    <ul class="to-do-list"></ul>
  </div>
  <button class="to-do-clear">Clear all completed</button>
</div>`;

  test('todoAdder', () => {
    const task = document.getElementsByClassName('to-do-text');
    getList('learn code');
    expect(task.length).toBe(1);
    expect(task[0].textContent).toBe('learn code');
  });

  test('todoAdder', () => {
    const task = document.getElementsByClassName('to-do-text');
    getList('complete task');
    expect(task.length).toBe(2);
    expect(task[1].textContent).toBe('complete task');
  });

  test('remove task', () => {
    const task = document.getElementsByClassName('to-do-text');
    removeListIndex('1');
    expect(task.length).toBe(1);
    expect(task[0].textContent).toBe('complete task');
  });

  test('edit task', () => {
    const editedTask = document.getElementsByClassName('remove-list');
    editList(editedTask[0]);

    const bgColorSet = editedTask[0].parentElement.parentElement.classList.contains('bg-color');

    expect(bgColorSet).toBe(true);
  });

  test('check task', () => {
    const uniqueTarget = document.getElementsByClassName('to-do-text');
    const target = uniqueTarget[0];
    const targetID = 0;
    target.checked = true;
    const text = {
      style: { textDecoration: 'none' },
    };

    checkComplete(target, text, targetID);
    const getStorage = getLocalStorage();
    expect(getStorage[0].completed).toBe(true);
  });

  
});