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
  const href = `${config.server.schema}://${config.server.hostname}:${config.server.port}`;
  return {
    url: `${href}/download/${ctx.matchs[1]}`,
  };
};
