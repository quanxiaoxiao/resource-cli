const { fetchData } = require('@quanxiaoxiao/about-http');
const config = require('../config');
const {
  Resources: ResourceModel,
} = require('../models');


module.exports = async (ctx) => {
  const resource = ResourceModel().find({
    id: ctx.matchs[1],
  }).value();
  if (!resource) {
    ctx.throw(404);
  }
  ResourceModel()
    .remove({
      id: ctx.matchs[1],
    }).write();
  const href = `${config.server.schema}://${config.server.hostname}:${config.server.port}`;
  await fetchData({
    url: `${href}/${ctx.matchs[1]}`,
    method: 'DELETE',
  });
  return resource;
};
