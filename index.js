var chokidar = require('chokidar');


var config = require('config.json');

var watcher = chokidar.watch('', {ignored: /^\./, persistent: true});
