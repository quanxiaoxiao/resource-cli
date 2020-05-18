const moment = require('moment');
const array = require('d3-array');
const {
  Resources: ResourceModel,
  Projects: ProjectModel,
} = require('../models');
const { generateIDByName } = require('../utils');

module.exports = (projectName) => {
  const query = {};
  if (projectName != null) {
    query.project = generateIDByName(projectName);
  }
  const projects = ProjectModel()
    .value()
    .reduce((acc, cur) => ({
      ...acc,
      [cur.id]: cur,
    }), {});
  const list = ResourceModel()
    .filter(query)
    .sort((a, b) => b.timeCreate - a.timeCreate).value();
  const rows = list
    .map((item) => [
      item.id,
      moment(item.timeCreate).format('YYYY-MM-DD HH:mm'),
      projects[item.project].name,
      item.size,
      item.name,
    ]);
  if (rows.length > 0) {
    const sizeList = rows[0].map((column, i) => array.max(rows, (columns) => `${columns[i]}`.length));
    rows.forEach((columns) => {
      process.stdout.write(`${columns.map((column, i) => `${column}`.padEnd(sizeList[i])).join(' ')}\n`);
    });
  }
};
