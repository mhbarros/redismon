const {ipcMain} = require('electron');
const IpcMainListenerHandler = require('./handlers/IpcMainListenerHandler');

const ipcMainListenerHandler = new IpcMainListenerHandler();

ipcMain.on('connectToRedis', ipcMainListenerHandler.connectToRedis);
ipcMain.on('logout', ipcMainListenerHandler.logout);
