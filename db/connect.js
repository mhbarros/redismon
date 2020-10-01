const redis = require('redis');

const connectRedisDB = (host, port, onConnect, onError) => {
  const client = redis.createClient(port, host)

  if(onConnect){
    client.on('connect', onConnect)
  }

  if(onError){
    client.on('error', onError)
  }

  return client;
}

module.exports = {
  connectRedisDB
}