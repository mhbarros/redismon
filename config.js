const path = require('path');

const WINDOW_CONFIG = {
  width: 1280,
  height: 720,
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true
  },
  icon: path.join(__dirname, 'img', 'redis.png')
}

module.exports = {
  WINDOW_CONFIG
}
