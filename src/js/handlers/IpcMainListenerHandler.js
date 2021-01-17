const Redis = require('../services/Redis.js');

class IpcMainListenerHandler {
  connectToRedis = (listener, args) => {
    const {port, host} = args;

    const newClient = new Redis({host, port});

    newClient.setListener('connect', () => {
      listener.reply('redisConnection', {ok: true});
    });

    global.Clients = [
      newClient
    ];
  }

  logout(listener, args){
    global.Clients = [];
    listener.reply('logout');
  }
}

module.exports = IpcMainListenerHandler;
