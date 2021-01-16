const {ipcRenderer} = require('electron');

/*
 message = Message to be shown
 type = 1:success 2:fail
 */
const openMessage = (message, type) => {

  let theme = 'success';
  if(type === 2){
    theme = 'fail';
  }

  const Popover = document.createElement('div');
  Popover.className     = `popover ${theme}`;
  document.body.appendChild(Popover);

  setTimeout(() => {
    Popover.style.opacity = '1';
    Popover.innerText = message;
  }, 20);

  setTimeout(() => {
    Popover.style.opacity = '0';
    setTimeout(() => {
      Popover.remove();
    }, 2000);
  }, 2000);
}

const doLogout = () => {
  ipcRenderer.send('logout');
}

module.exports = {
  openMessage,
  doLogout
}