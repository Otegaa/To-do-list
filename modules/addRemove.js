const list = document.querySelector('.to-do-list');
const addText = document.querySelector('.to-do-add-text');
const form = document.querySelector('.form');

const wholeList = function () {
  const getStorage = JSON.parse(localStorage.getItem('list')) || [];
  const setStorage = function () {
    localStorage.setItem('list', JSON.stringify(getStorage));
  };

  const displayList = function () {
    list.innerHTML = '';
    getStorage.forEach((item) => {
      list.innerHTML += `
         <li>
            <div class="to-do-list-task">
              <input type="checkbox" class="to-do-input" />
              <p class="to-do-text">${item.desc}</p>
            </div>
            <div class="to-do-btn-del">
              <i class="fas fa-ellipsis-v fa-2x"></i>
            </div>
          </li>`;
    });
  };

  const getList = function (e) {
    e.preventDefault();
    const objList = {};
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

  displayList();
};

export default wholeList;
