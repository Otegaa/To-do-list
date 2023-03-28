import './style.css';

const list = document.querySelector('.to-do-list');

const toDoList = [
  {
    index: 1,
    desc: 'Washing dishes',
    completed: false,
  },
  {
    index: 2,
    desc: 'Doing laundry',
    completed: false,
  },
  {
    index: 3,
    desc: 'Shopping',
    completed: false,
  },
];

const getList = function () {
  list.innerHTML = '';
  toDoList.forEach((item) => {
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

window.addEventListener('load', getList);
