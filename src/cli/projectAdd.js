const { Projects: ProjectModel } = require('../models');
const { generateIDByName } = require('../utils');

module.exports = (name) => {
  const id = generateIDByName(name);
  const project = ProjectModel()
    .find({
      id,
    })
    .value();
  if (!project) {
    ProjectModel().push({
      id,
      name,
      timeCreate: Date.now(),
    }).write();
  } else {
    console.log(`project: \`${name}\` exist`);
  }
};
