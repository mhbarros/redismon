const {ipcRenderer} = require('electron');

ipcRenderer.on('redisConnection', (listener, t) => {
  const {ok, msg} = t;
  if(!ok){
    alert(msg);
    return;
  }

  console.log('Redis conectado!');
  document.location = 'list.html';
})
