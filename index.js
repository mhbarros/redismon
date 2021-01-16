const path = require('path');
const {app, BrowserWindow} = require('electron');

const {WINDOW_CONFIG} = require('./config');

require('./js/ipcMainListener');
require('electron-reload')(__dirname);

const start = () => {
  const mainWindow = new BrowserWindow(WINDOW_CONFIG);
  mainWindow.loadFile(path.resolve(__dirname, 'pages', 'index.html'));
}
app.whenReady().then(start);
