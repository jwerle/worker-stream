
/**
 * Worker dependencies
 */

importScripts(
  'build/build.js'
);

var WorkerStream = require('worker-stream');
var stream = WorkerStream(self);

stream.on('data', function (chunk) {
  console.log('worker: '+  chunk)
});

stream.write('foo');
