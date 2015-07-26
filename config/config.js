var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mulab-www'
    },
    port: 3002,
    db: 'mongodb://localhost/mulab-www-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'mulab-www'
    },
    port: 3002,
    db: 'mongodb://localhost/mulab-www-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'mulab-www'
    },
    port: 3002,
    db: 'mongodb://localhost/mulab-www-production'
  }
};

module.exports = config[env];
