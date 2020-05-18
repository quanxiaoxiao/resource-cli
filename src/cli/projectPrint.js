const os = require('os');
const qrcode = require('qrcode-terminal');
const { Projects: ProjectModel } = require('../models');
const { generateIDByName } = require('../utils');
const config = require('../config');

const getHostIP = () => {
  const list = os.networkInterfaces()[config.networkInterface];
  if (!list) {
    return null;
  }
  return list.find((item) => item.family === 'IPv4').address;
};

module.exports = (name, isQRCodeType) => {
  const id = generateIDByName(name);
  const project = ProjectModel()
    .find({
      id,
    })
    .value();
  if (project) {
    const hostIP = getHostIP();
    const href = `http://${hostIP}:${config.serverPort}/${id}`;
    if (isQRCodeType) {
      qrcode.generate(href);
    } else {
      console.log(href);
    }
  }
};
