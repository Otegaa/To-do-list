const list = document.querySelector('.to-do-list');
const addText = document.querySelector('.to-do-add-text');
const clearBtn = document.querySelector('.to-do-clear');

let getStorage = JSON.parse(localStorage.getItem('list')) || [];
const setStorage = function (arr) {
  localStorage.setItem('list', JSON.stringify(arr));
};

export const displayList = function () {
  list.innerHTML = '';
  getStorage.forEach((item) => {
    list.innerHTML += `
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
              <i class="fa-solid fa-trash-can fa-2x hidden add-trash" id= ${
  item.index
}></i>
            </div>
          </li>`;
  });
};

export const addList = function (arr) {
  const objList = {};
  objList.index = arr.length + 1;
  objList.desc = addText.value;
  objList.completed = false;

  if (objList.desc) {
    arr.push(objList);
    setStorage(arr);
    displayList();
  }

  addText.value = '';
};

// Function for deleting the button
const removeListIndex = (index) => {
  getStorage = getStorage.filter((item) => item.index !== Number(index));
  displayList();
  setStorage(getStorage);
};

list.addEventListener('click', (e) => {
  const target = e.target.closest('.add-trash');
  if (!target) return;
  removeListIndex(target.id);
  getStorage.forEach((item, i) => {
    item.index = i + 1;
  });
  setStorage(getStorage);
});

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
  if (target.checked) {
    text.style.textDecoration = 'line-through';
    getStorage[targetID].completed = true;
    setStorage(getStorage);
  } else {
    text.style.textDecoration = 'none';
    getStorage[targetID].completed = false;
    setStorage(getStorage);
  }
});

const domLoaded = () => {
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

// Function to delete all completed tasks.
const delBtn = () => {
  getStorage = getStorage.filter((item) => item.completed === false);
  getStorage.forEach((item, i) => {
    item.index = i + 1;
  });
  setStorage(getStorage);
  displayList();
};

clearBtn.addEventListener('click', delBtn);
