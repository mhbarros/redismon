const {ipcRenderer, remote} = require('electron');
const RedisDatabase = require('redis');

class Redis {
  client = null;

  DEFAULT_HOST = '127.0.0.1';
  DEFAULT_PORT = 6379;

  constructor({client, host, port}) {
    if(client){
      this.client = client;
      return;
    }

    if(!host) host = this.DEFAULT_HOST;
    if(!port) port = this.DEFAULT_PORT;

    this.client = RedisDatabase.createClient({
      host,
      port
    });
  }

  setListener(type, callback){
    this.client.on(type, callback);
  }

  getAllKeys(){
    const $this = this;

    return new Promise((resolve, reject) => {
      $this.client.keys('*', (error, keys) => {
        resolve(keys);
      });
    })
  }

  getKey(key){
    const $this = this;

    return new Promise((resolve, reject) => {
      $this.client.get(key, (err, value) => {
        resolve(value);
      });
    })
  }

  addKey(key, value){
    this.client.set(key, value);
  }

  removeKey(key){
    const $this = this;

    return new Promise((resolve, reject) => {
      $this.client.del(key, (err, response) => {
        resolve(response);
      });
    });
  }

  removeAllKeys(){
    const $this = this;

    return new Promise((resolve, reject) => {
      $this.client.flushdb(() => {
        resolve(true);
      })
    })
  }
}

/*const DEFAULT_HOST        = '127.0.0.1';
const DEFAULT_PORT        = 6379;
const GLOBAL_REDIS_CLIENT = 'RedisClient';

let client = null;

if(remote && remote.getGlobal){
  client = remote.getGlobal(GLOBAL_REDIS_CLIENT);

}

const connectToRedis = () => {
  let host = document.getElementById('host').value;
  let port = document.getElementById('port').value;

  if(!host) host = DEFAULT_HOST;
  if(!port) port = DEFAULT_PORT;

  ipcRenderer.send('connectToRedis', {host, port});
}

const createClient = (host, port) => {
  return RedisDatabase.createClient(port, host);
}



const getRedisClient = () => {
  if(client !== null) return client;

  client = remote.getGlobal(GLOBAL_REDIS_CLIENT);
  return client;
}

const getAllKeys = () => {
  return new Promise((resolve, reject) => {
    client.keys('*', (error, keys) => {
      resolve(keys);
    });
  })
}

const addKey = (key,value) => {
  client.set(key, value);
}

const getKey = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      resolve(value);
    });
  })
}

const deleteKey = key => {
  return new Promise((resolve, reject) => {
    client.del(key, (err, response) => {
      console.log(err);
      resolve(response);
    });
  });
}

const deleteAllKeys = () => {
  return new Promise((resolve, reject) => {
    client.flushdb(() => {
      resolve(true);
    })
  })
}*/
module.exports = Redis;
/*module.exports = {
  /!*connectToRedis,
  getRedisClient,
  getAllKeys,
  addKey,
  getKey,
  deleteKey,
  deleteAllKeys,
  createClient*!/
  Redis
}*/
