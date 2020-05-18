const path = require('path');

module.exports = {
  server: {
    schema: 'http',
    hostname: 'localhost',
    port: 4022,
    // port: 3003,
  },
  dist: {
    projects: {
      resource: {
        key: 'sj41dmatWlNFGK67',
        pathList: [
          '/:project?',
        ],
        staticPath: '/static/resource/(.*)',
      },
    },
    dbPathName: path.resolve(__dirname, '..', 'dist.json'),
    staticPath: path.resolve(__dirname, '..', 'dist'),
  },
  serverPort: 3096,
  networkInterface: 'wlp58s0',
};
