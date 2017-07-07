'use strict';

const app = require('./app');
const config = require('./utils/config');
const log = require('./utils/logger')(__filename);

app.listen(config.get('port'), () => {
    log.info("task manager started at " + config.get('port'));
});

