const redis = require('redis');

class IpcMainListenerHandler {
  connectToRedis = (listener, args) => {
    const {port, host} = args;

    if(!port){
      listener.reply('redisConnection', {ok: false, msg: 'Digite uma porta'});
      return;
    }

    if(!host){
      listener.reply('redisConnection', {ok: false, msg: 'Digite um endereço de host'});
      return;
    }

    const newClient = redis.createClient(port, host);

    newClient.on('connect', () => {
      listener.reply('redisConnection', {ok: true});
    })

    global.RedisClient = newClient;
  }

  logout(listener, args){
    global.RedisClient = undefined;
    listener.reply('logout');
  }
}

module.exports = IpcMainListenerHandler;
