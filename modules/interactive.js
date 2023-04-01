const getStorage = JSON.parse(localStorage.getItem('list')) || [];

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

export default domLoaded;
