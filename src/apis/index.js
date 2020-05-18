module.exports = {
  '/resources': {
    get: {
      body: require('./resources'),
    },
  },
  '/:project/resources': {
    get: {
      body: require('./resources'),
    },
  },
  '/resource/:resource': {
    delete: {
      body: require('./removeResource'),
    },
  },
  '/upload/:project?': {
    post: {
      body: require('./upload'),
    },
  },
  '/download/:id': {
    get: {
      proxy: require('./downloadResource'),
    },
  },
};
