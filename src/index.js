import './style.css';
import { addList, displayList } from '../modules/addRemove.js';

const form = document.querySelector('.form');
const enterBtn = document.querySelector('.enter-btn');
const getStorage = JSON.parse(localStorage.getItem('list')) || [];
// const addText = document.querySelector('.to-do-add-text');

// Submit the form
form.addEventListener('submit', () => addList(getStorage));
enterBtn.addEventListener('click', () => addList(getStorage));

displayList();
