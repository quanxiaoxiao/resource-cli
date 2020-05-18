const qrcode = require('qrcode-terminal');
const {
  Resources: ResourceModel,
} = require('../models');
const { getHostIP } = require('../utils');
const config = require('../config');

module.exports = (id, isQRCodeType) => {
  const resource = ResourceModel()
    .find({
      id,
    })
    .value();
  if (resource) {
    const hostIP = getHostIP();
    const href = `http://${hostIP}:${config.serverPort}/download/${id}`;
    if (isQRCodeType) {
      qrcode.generate(href);
    } else {
      console.log(href);
    }
  }
};
