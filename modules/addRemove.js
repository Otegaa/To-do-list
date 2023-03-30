const list = document.querySelector('.to-do-list');
const addText = document.querySelector('.to-do-add-text');
const form = document.querySelector('.form');

const wholeList = function () {
  let getStorage = JSON.parse(localStorage.getItem('list')) || [];
  const setStorage = function () {
    localStorage.setItem('list', JSON.stringify(getStorage));
  };

  const displayList = function () {
    list.innerHTML = '';
    getStorage.forEach((item) => {
      list.innerHTML += `
         <li class="list-task">
            <div class="to-do-list-task">
              <input type="checkbox" class="to-do-input" />
              <p class="to-do-text">${item.desc}</p>
            </div>
            <div class="to-do-btn-del">
              <i class="fas fa-ellipsis-v fa-2x remove-list" id= ${item.index}  ></i>
              <i class='fa-solid fa-trash-can fa-2x hidden add-trash' id= ${item.index}></i>
            </div>
          </li>`;
    });
  };

  const getList = function (e) {
    e.preventDefault();
    const objList = {};
    objList.index = getStorage.length + 1;
    objList.desc = addText.value;
    objList.completed = false;

    if (objList.desc) {
      getStorage.push(objList);
      setStorage();
      displayList();
    }
    addText.value = '';
  };

  // Press the enter key since there is no submit button
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && addText.value) {
      form.addEventListener('submit', getList);
    }
  });

  // Function for deleting the button
  const removeListIndex = (index) => {
    getStorage = getStorage.filter((item) => item.index !== Number(index));
    displayList();
    setStorage();
  };

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

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.remove-list');

    if (!target) return;
    if (target) {
      editList(target);
      console.log(target);
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.add-trash');
    if (!target) return;
    removeListIndex(target.id);
    console.log(target.id);
  });

  displayList();
};

export default wholeList;
