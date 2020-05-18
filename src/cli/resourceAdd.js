const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require('path');
const { fetchData } = require('@quanxiaoxiao/about-http');
const {
  Projects: ProjectModel,
  Resources: ResourceModel,
} = require('../models');
const config = require('../config');
const { getHostIP, generateIDByName } = require('../utils');

module.exports = async (projectName, filePath) => {
  const project = ProjectModel()
    .find({
      id: generateIDByName(projectName || ''),
    })
    .value();
  if (project) {
    try {
      const target = path.resolve(process.cwd(), filePath);
      const stats = fs.statSync(target);
      if (stats.isFile()) {
        const retBuf = await fetchData({
          url: `${config.server.schema}://${config.server.hostname}:${config.server.port}/upload?name=${encodeURIComponent(path.basename(target))}`,
          method: 'POST',
          body: fs.createReadStream(target),
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
          qrcode.generate(`http://${getHostIP()}:${config.server.port}/download/${resource.id}`);
        }
      }
    } catch (error) {
      // eg
    }
  }
};
