const list = document.querySelector('.to-do-list');
const addText = document.querySelector('.to-do-add-text');
const form = document.querySelector('.form');
const enterBtn = document.querySelector('.enter-btn');
const clearBtn = document.querySelector('.to-do-clear');

const getLocalStorage = () => JSON.parse(localStorage.getItem('list')) || [];

const displayList = () => {
  document.querySelector('.to-do-list').innerHTML = '';
  const getStorage = getLocalStorage();
  getStorage.forEach((item) => {
    document.querySelector('.to-do-list').innerHTML += `
      <li class="list-task">
          <div class="to-do-list-task">
            <input type="checkbox" class="to-do-input" id= ${
  item.index - 1
} />
            <p class="to-do-text" id= ${item.index - 1} >${item.desc}</p>
          </div>
          <div class="to-do-btn-del">
            <i class="fas fa-ellipsis-v fa-2x remove-list" id= ${
  item.index
}  ></i>
            <i class="fa-solid fa-trash-can fa-2x hidden add-trash" id="${
  item.index
}"></i>
          </div>
        </li>`;
  });
  // return getStorage;
};

const setStorage = (data) => {
  localStorage.setItem('list', JSON.stringify(data));
};

const getList = (task) => {
  const getStorage = getLocalStorage();
  const objList = {};
  objList.index = getStorage.length + 1;
  objList.desc = task;
  objList.completed = false;

  if (objList.desc) {
    getStorage.push(objList);
    setStorage(getStorage);
    displayList();
  }
};

// Function for deleting the button
const removeListIndex = (index) => {
  let getStorage = getLocalStorage();
  getStorage = getStorage.filter((item) => item.index !== Number(index));
  setStorage(getStorage);
  displayList();
};

// Function for editing the list
const editList = (target) => {
  target.parentElement.previousElementSibling.children[1].setAttribute(
    'contenteditable',
    'true',
  );

  target.parentElement.previousElementSibling.children[1].focus();
  target.parentElement.parentElement.classList.add('bg-color');
  target.classList.toggle('hidden');
  target.nextElementSibling.classList.toggle('hidden');
};

// Function to delete all completed tasks.
const delBtn = () => {
  let getStorage = getLocalStorage();
  getStorage = getStorage.filter((item) => item.completed === false);
  getStorage.forEach((item, i) => {
    item.index = i + 1;
  });
  setStorage(getStorage);
  displayList();
};

// checked function

const checkComplete = (target, text, targetID) => {
  if (target.checked) {
    const getStorage = getLocalStorage();
    text.style.textDecoration = 'line-through';
    getStorage[targetID].completed = true;
    setStorage(getStorage);
  } else {
    const getStorage = getLocalStorage();
    text.style.textDecoration = 'none';
    getStorage[targetID].completed = false;
    setStorage(getStorage);
  }
};

const wholeList = () => {
  // let getStorage = JSON.parse(localStorage.getItem('list')) || [];

  // Submit the form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    getList(addText.value);
    addText.value = '';
  });

  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getList(addText.value);
    addText.value = '';
  });

  list.addEventListener('click', (e) => {
    const getStorage = getLocalStorage();
    const target = e.target.closest('.add-trash');
    if (!target) return;
    removeListIndex(target.id);
    getStorage.forEach((item, i) => {
      item.index = i + 1;
    });
    setStorage(getStorage);
  });

  list.addEventListener('click', (e) => {
    const target = e.target.closest('.remove-list');
    if (!target) return;
    editList(target);
  });

  // Function to implement when focused out on list

  list.addEventListener('focusout', (e) => {
    const target = e.target.closest('.to-do-text');
    const targetID = Number(e.target.id);
    if (!target) return;
    if (target) {
      const getStorage = getLocalStorage();
      getStorage[targetID].desc = target.textContent;
      target.parentElement.parentElement.classList.remove('bg-color');
      setStorage(getStorage);
      window.location.reload();
    }
  });

  // Function to check box
  list.addEventListener('change', (e) => {
    const target = e.target.closest('.to-do-input');
    const text = e.target.nextElementSibling;
    const targetID = Number(e.target.id);
    if (!target) return;
    checkComplete(target, text, targetID);
  });

  const domLoaded = () => {
    const getStorage = getLocalStorage();
    const text = document.querySelectorAll('.to-do-text');
    const checkbox = [...document.querySelectorAll('.to-do-input')];
    getStorage.forEach((item, i) => {
      if (item.completed === true) {
        checkbox[i].checked = true;
        text[i].style.textDecoration = 'line-through';
      }
    });
  };

  window.addEventListener('DOMContentLoaded', domLoaded);

  clearBtn.addEventListener('click', delBtn);

  displayList();
};

export {
  getList, removeListIndex, editList, delBtn, checkComplete, getLocalStorage,
};

export default wholeList;