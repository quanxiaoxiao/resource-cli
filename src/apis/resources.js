const {
  Resources: ResourceModel,
} = require('../models');
const { generateIDByName } = require('../utils');


module.exports = async (ctx) => {
  const list = ResourceModel().filter({
    project: ctx.matchs[1] || generateIDByName(''),
  }).value();
  return list.sort((a, b) => b.timeCreate - a.timeCreate);
};
