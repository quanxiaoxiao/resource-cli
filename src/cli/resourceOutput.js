const { httpConnect } = require('@quanxiaoxiao/about-http');
const { Resources: ResourceModel } = require('../models');
const config = require('../config');


module.exports = (id) => {
  if (ResourceModel().find({ id }).value()) {
    httpConnect({
      hostname: config.server.hostname,
      port: config.server.port,
      path: `/download/${id}`,
      headers: {
        'accept-encoding': 'default',
      },
    }, {
      onError: () => {
      },
      onResponse: () => {
      },
      onData: (chunk) => {
        process.stdout.write(chunk);
      },
      onEnd: () => {
      },
      onClose: () => {
      },
    });
  }
};
