const os = require('os');
const crypto = require('crypto');
const config = require('./config');


const generateIDByName = (name) => {
  const hash = crypto.createHash('sha1');
  hash.update(name.trim());
  return hash.digest('hex');
};

const getHostIP = () => {
  const list = os.networkInterfaces()[config.networkInterface];
  if (!list) {
    return null;
  }
  return list.find((item) => item.family === 'IPv4').address;
};

exports.generateIDByName = generateIDByName;

exports.getHostIP = getHostIP;
