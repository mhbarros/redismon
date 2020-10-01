const {ipcRenderer, remote} = require('electron');

const DEFAULT_HOST        = '127.0.0.1';
const DEFAULT_PORT        = 6379;
const GLOBAL_REDIS_CLIENT = 'RedisClient';

let client = remote.getGlobal(GLOBAL_REDIS_CLIENT);

const connectToRedis = () => {
  let host = document.getElementById('host').value;
  let port = document.getElementById('port').value;

  if(!host) host = DEFAULT_HOST;
  if(!port) port = DEFAULT_PORT;

  ipcRenderer.send('connectToRedis', {host, port});
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
}

module.exports = {
  connectToRedis,
  getRedisClient,
  getAllKeys,
  addKey,
  getKey,
  deleteKey,
  deleteAllKeys
}
