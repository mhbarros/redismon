const {app, BrowserWindow, ipcMain} = require('electron');
const redis = require('redis');
require('electron-reload')(__dirname);

const start = () => {
  const w = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
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