const open = require('open');
const { Resources: ResourceModel } = require('../models');
const config = require('../config');


module.exports = (id) => {
  if (ResourceModel().find({ id }).value()) {
    const href = `${config.server.schema}://${config.server.hostname}:${config.server.port}/preview/${id}`;
    open(href);
  }
};
