const { fetchData } = require('@quanxiaoxiao/about-http');
const { generateIDByName } = require('../utils');
const config = require('../config');
const {
  Projects: ProjectModel,
  Resources: ResourceModel,
} = require('../models');

module.exports = async (ctx) => {
  const project = ProjectModel().find({
    id: ctx.matchs[1] || generateIDByName(''),
  }).value();
  if (!project) {
    ctx.throw(404);
  }
  const href = `${config.server.schema}://${config.server.hostname}:${config.server.port}`;
  const retBuf = await fetchData({
    url: `${href}/upload?name=${encodeURIComponent(ctx.query.name) || ''}`,
    method: 'POST',
    body: ctx.req,
  });
  const data = JSON.parse(retBuf.toString());
  if (data.completed) {
    const resource = {
      project: project.id,
      id: data._id,
      name: data.name,
      size: data.size,
      mime: data.mime,
      ext: data.ext,
      encoding: data.encoding,
      timeCreate: data.timeCreate,
    };
    ResourceModel().push(resource).write();
    return resource;
  }
  return null;
};
