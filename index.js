const {app, BrowserWindow} = require('electron');
const path = require('path');
require('electron-reload')(__dirname);

require('./js/ipcMainListener');

const startMainApp = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'img', 'redis.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'pages', 'index.html'));
}
app.whenReady().then(startMainApp);