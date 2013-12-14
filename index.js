
var through = require('through')

/**
 * `WorkerStream' constructor
 *
 * @api public
 * @param {String|Worker} path
 * @param {Object} opts
 */

module.exports = WorkerStream;
function WorkerStream (path, opts) {
  var stream = null;
  var worker = null;
  var isWorker = false;

  stream = through(write, end, opts);

  if ('object' == typeof path && 'function' == typeof path.postMessage) {
    isWorker = true;
    worker = path;
  } else {
    worker = new Worker(path);
  }

  stream._worker = worker;
  worker.onmessage = message;
  stream.lastEvent = null;

  function write (chunk) {
    worker.postMessage(chunk);
  }

  function end () {
    if (true == this.paused) {
      this.queue(null);
    } else {
      this.emit('end');
    }
  }

  function message (e) {
    var data = e.data;
    var buf = null;

    stream.lastEvent = e;

    if ('object' == typeof data) {
      buf = JSON.stringify(data);
    } else if ('string' == typeof data) {
      buf = data;
    }

    if (true == stream.paused) {
      stream.queue(buf);
    } else if (null == buf) {
      stream.queue(null);
    } else {
      stream.emit('data', buf);
    }
  }

  return stream;
}
