const {ipcRenderer} = require('electron');
const IpcRendererListenerHandler = require('./handler/IpcRendererListenerHandler');

const ipcRendererListenerHandler = new IpcRendererListenerHandler();

ipcRenderer.on('redisConnection', ipcRendererListenerHandler.redisConnectionHandler);
