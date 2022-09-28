// All UI or animation related js

export function changeToDoPages() {
  const mainAdd = document.querySelector('.main iconify-icon');

  const pageName = document.querySelector('.main > p');

  const options = document.querySelectorAll('div .option');

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(option => {
        removeCurrent(option);
      });

      if (
        option.classList.contains('today') ||
        option.classList.contains('favorite')
      ) {
        pageName.style.marginBottom = '35px';
        mainAdd.classList.add('disabled');
      } else {
        if (mainAdd.classList.contains('disabled')) {
          pageName.style.marginBottom = '0px';
          mainAdd.classList.remove('disabled');
        }
      }

      pageName.textContent = option.querySelector('p').textContent;
      addCurrent(option);
    });
  });

  function addCurrent(el) {
    el.classList.add('current');
    return el;
  }

  function removeCurrent(el) {
    el.classList.remove('current');
  }
}

export function menuToggle() {
  const menuBtn = document.querySelector('.header-txt iconify-icon');
  menuBtn.addEventListener('click', () => {
    document.querySelector('.main').classList.toggle('toggle');
    document.querySelector('.opt').classList.toggle('toggle');
  });
}
