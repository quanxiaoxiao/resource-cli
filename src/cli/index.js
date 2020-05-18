const yargs = require('yargs');
const addProject = require('./projectAdd');
const printProject = require('./projectPrint');
const listResources = require('./resourceList');
const listProject = require('./projectList');
const previewResource = require('./resourcePreview');
const outputResource = require('./resourceOutput');
const printResource = require('./resourcePrint');
const addResource = require('./resourceAdd');
const deleteResource = require('./resourceDelete');


yargs // eslint-disable-line
  .command(
    'print',
    'show project qrcode or url',
    (ys) => ys.options({
      type: {
        alias: 't',
        describe: 'project or resource',
        choices: ['project', 'resource'],
        default: 'project',
        demandOption: true,
      },
      name: {
        alias: 'n',
        describe: 'project name',
        demandOption: true,
        type: 'string',
      },
      qrcode: {
        alias: 'c',
        describe: 'print with qrcode',
        type: 'boolean',
        default: true,
      },
    }),
    (argv) => {
      if (argv.type === 'project') {
        printProject(argv.name, argv.qrcode);
      } else if (argv.type === 'resource') {
        printResource(argv.name, argv.qrcode);
      }
    },
  )
  .command(
    'project',
    'project operation [action](add|ls|print)',
    {
      name: {
        alias: 'n',
        describe: 'project name',
        type: 'string',
      },
      qrcode: {
        alias: 'c',
        describe: 'print with qrcode',
        type: 'boolean',
      },
    },
    (argv) => {
      const [, action] = argv._;
      if (action === 'add') {
        addProject(argv.name);
      } else if (action === 'ls') {
        listProject();
      } else if (action === 'print') {
        printProject(argv.name, argv.qrcode);
      }
    },
  )
  .command(
    'resource',
    'project operation [action](preview|out|ls|add|delete)',
    {
      id: {
        describe: 'resource id',
        type: 'string',
      },
      project: {
        describe: 'project name',
        type: 'string',
      },
      path: {
        type: 'string',
      },
      qrcode: {
        alias: 'c',
        describe: 'print with qrcode',
        type: 'boolean',
      },
    },
    (argv) => {
      const [, action] = argv._;
      if (action === 'preview') {
        previewResource(argv.id);
      } else if (action === 'out') {
        outputResource(argv.id);
      } else if (action === 'ls') {
        listResources(argv.project);
      } else if (action === 'add') {
        addResource(argv.project, argv.path, argv.qrcode);
      } else if (action === 'delete') {
        deleteResource(argv.id);
      }
    },
  )
  .argv;
