const {ipcMain} = require('electron');
const IpcMainListenerHandler = require('./handler/IpcMainListenerHandler');

const ipcMainListenerHandler = new IpcMainListenerHandler();

ipcMain.on('connectToRedis', ipcMainListenerHandler.connectToRedis);
ipcMain.on('logout', ipcMainListenerHandler.logout);
