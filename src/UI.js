// All UI or animation related js

export default function changeToDoPages() {
  const inboxBtn = document.querySelector('.inbox');
  const todayBtn = document.querySelector('.today');
  const favoriteBtn = document.querySelector('.favorite');

  const mainName = document.querySelector('.main > p');

  inboxBtn.addEventListener('click', () => {
    addCurrent(inboxBtn);
    removeCurrent(todayBtn);
    removeCurrent(favoriteBtn);
    mainName.textContent = 'Inbox';
  });

  todayBtn.addEventListener('click', () => {
    addCurrent(todayBtn);
    removeCurrent(inboxBtn);
    removeCurrent(favoriteBtn);
    mainName.textContent = 'Today';
  });

  favoriteBtn.addEventListener('click', () => {
    addCurrent(favoriteBtn);
    removeCurrent(todayBtn);
    removeCurrent(inboxBtn);
    mainName.textContent = 'Favorite';
  });

  function addCurrent(el) {
    el.classList.add('current');
    return el;
  }

  function removeCurrent(el) {
    el.classList.remove('current');
  }
}
