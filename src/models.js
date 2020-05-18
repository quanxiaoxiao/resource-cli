const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');

const adapter = new FileSync(path.resolve(__dirname, '..', 'db.json'));
const db = low(adapter);

db
  .defaults({
    projects: [],
    resources: [],
  })
  .write();


const Projects = () => db.get('projects');

const Resources = () => db.get('resources');


exports.Projects = Projects;
exports.Resources = Resources;
