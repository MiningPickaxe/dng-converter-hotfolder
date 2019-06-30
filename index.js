var chokidar = require('chokidar');
var execFile = require('child_process').execFile;
var perf = require('perf_hooks');
var fs = require('fs');

var config = require(__dirname + '/config.json');

const watcher = chokidar.watch(config.watchPath, {
  ignored: /^\./,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: config.chokidarStabilityThreshold,
    pollInterval: config.chokidarPollIntervall
  }
});

watcher
  .on('add', path => convert(path));

function convert(path) {
  if (config.verbose) console.log("Starting conversion of: " + path);
  newArgs = ["-d", config.resultPath, path];
  var t0 = perf.performance.now();
  execFile(config.dngConverterBin, config.dngConverterArgs.concat(newArgs), (error, stdout, stderr) => {
    if (error) {
      console.error('stderr', stderr);
    }
  }).on('exit', function(code, signal) {
    var t1 = perf.performance.now();
    if (config.verbose) console.log("Conversion of " + path + " took "+ (t1-t0) + " milliseconds.");
    if (config.deleteConverted) {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return
        }
        console.log("Deleting file: " + path);
      })
    } else {
      fs.rename(path, config.originalsPath + "/" + path.replace(/^.*[\\\/]/, ''), (err) => {
        if (err) console.log(err);
        if (config.verbose) console.log("Moved converted file to the originals path.");
      });
    }
  });

}
