const {ipcRenderer} = require('electron');
const IpcRendererListenerHandler = require('./handlers/IpcRendererListenerHandler');

const ipcRendererListenerHandler = new IpcRendererListenerHandler();

ipcRenderer.on('redisConnection', ipcRendererListenerHandler.redisConnectionHandler);
