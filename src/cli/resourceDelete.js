const { fetchData } = require('@quanxiaoxiao/about-http');
const { Resources: ResourceModel } = require('../models');
const config = require('../config');

module.exports = async (id) => {
  const resource = ResourceModel().find({
    id,
  }).value();
  if (resource) {
    ResourceModel().remove({ id }).write();
    const href = `${config.server.schema}://${config.server.hostname}:${config.server.port}`;
    await fetchData({
      url: `${href}/${id}`,
      method: 'DELETE',
    });
  }
};
