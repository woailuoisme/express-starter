// 获取服务器 ip、hostname
const os = require('os');

exports.hostname = () => {
  return os.hostname();
};

exports.getIPAddress = () => {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let face = interfaces[devName];

    for (let i = 0; i < face.length; i++) {
      let alias = face[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) return alias.address;
    }
  }
  return '0.0.0.0';
};
