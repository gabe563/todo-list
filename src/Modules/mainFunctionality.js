// Don't select text when double clicking
document.addEventListener('mousedown', event => {
  if (event.detail > 1) {
    event.preventDefault();
  }
});

// Manage Local Storage
export function getFromLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function writeToLocal(name, dataToWrite) {
  localStorage.setItem(name, JSON.stringify(dataToWrite));
}
