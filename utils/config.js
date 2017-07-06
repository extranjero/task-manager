'use strict';

var nconf = require('nconf');

var configDir = '.';
var configFile =  "config.json"

 nconf
  .file({
    file: configFile,
    dir: configDir,
    // Search from base directory if not found in given dir
    search: true,
  })
  .defaults({
    port: 4000,
    logger: {
        error_file_name: '/var/log/task_manager/error.log',
        info_file_name: '/var/log/task_manager/info.log'
    }
  })
  .required(['db_uri', 'secret']);

module.exports = nconf
