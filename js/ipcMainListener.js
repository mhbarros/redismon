const {ipcMain} = require('electron');
const {createClient} = require('./Redis');

ipcMain.on('connectToRedis', (listener, args) => {
  const client = createClient(args.port, args.host);
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