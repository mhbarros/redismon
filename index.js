const {app, BrowserWindow} = require('electron');
const path = require('path');

require('./js/ipcMainListener');

require('electron-reload')(__dirname);

const start = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'img', 'redis.png')
  });

  mainWindow.loadFile('pages/index.html');

}
app.whenReady().then(start);
