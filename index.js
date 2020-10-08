const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const redis = require('redis');
require('electron-reload')(__dirname);

const start = () => {
  const w = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'img', 'redis.png')
  });

  w.loadFile('pages/index.html');
  // w.webContents.openDevTools();

}
app.whenReady().then(start);

ipcMain.on('connectToRedis', (listener, args) => {
  const client = redis.createClient(args.port, args.host);
  client.on('connect', () => {
    console.log('Conectado');
    listener.reply('redisConnected', 'Conectado com sucesso');
  })

  global.RedisClient = client;
})

ipcMain.on('logout', (listener, args) => {
  global.RedisClient = undefined;
  listener.reply('logout');
});
