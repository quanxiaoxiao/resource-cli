const moment = require('moment');
const array = require('d3-array');
const {
  Resources: ResourceModel,
  Projects: ProjectModel,
} = require('../models');


module.exports = () => {
  const rows = ProjectModel()
    .value()
    .sort((a, b) => b.timeCreate - a.timeCreate)
    .map((item) => [
      item.id,
      moment(item.timeCreate).format('YYYY-MM-DD HH:mm'),
      ResourceModel()
        .filter({
          project: item.id,
        })
        .value().length,
      item.name,
    ]);

  if (rows.length > 0) {
    const sizeList = rows[0].map((column, i) => array.max(rows, (columns) => `${columns[i]}`.length));
    rows.forEach((columns) => {
      process.stdout.write(`${columns.map((column, i) => `${column}`.padEnd(sizeList[i])).join(' ')}\n`);
    });
  }
};
