
var node = document.getElementById('node');
var WorkerStream = require('worker-stream');
var wstream = WorkerStream('test-worker.js');

wstream.on('data', function (chunk) {
  console.log('main:', chunk);
  node.innerHTML = String(chunk);
});

wstream.write('biz')
