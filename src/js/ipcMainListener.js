const {ipcMain} = require('electron');
const redis     = require('redis');

const REPLY_REDIS_CONNECTION = 'redisConnection';

ipcMain.on('connectToRedis', (listener, args) => {
  const {port, host} = args;

  if(!port){
    listener.reply(REPLY_REDIS_CONNECTION, {ok: false, msg: 'Digite uma porta'});
    return;
  }

  if(!host){
    listener.reply(REPLY_REDIS_CONNECTION, {ok: false, msg: 'Digite um endereço de host'});
    return;
  }

  const client = redis.createClient(port, host);
  client.on('connect', () => {

    listener.reply(REPLY_REDIS_CONNECTION, {ok: true});
  })

  global.RedisClient = client;
})

ipcMain.on('logout', (listener, args) => {
  global.RedisClient = undefined;
  listener.reply('logout');
});
