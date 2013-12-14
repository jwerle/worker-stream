worker-stream
=====

Stream interface for web workers

## install

Install with [component(1)](http://component.io):

```sh
$ component install jwerle/worker-stream
```

## usage

***main.js***

```js
var node = document.getElementById('node');
var WorkerStream = require('worker-stream');
var wstream = WorkerStream('worker.js');

wstream.on('data', function (chunk) {
  console.log(chunk)
});

wstream.write('biz')
```

***worker.js***

```js
// import somefile to provide `WorkerStream'
importScripts(
  'path/to/worker-stream/build.js'
);

var WorkerStream = require('worker-stream');
var stream = WorkerStream(self);

stream.on('data', function (chunk) {
  console.log('worker: '+  chunk)
});

stream.write('foo');
```

## api

#### WorkerStream(/*String|Worker*/ worker [, /*Object*/ opts])

* `worker` - A string path to a worker or an instance of a `Worker`
* `opts` - Stream options (optional)

## License

MIT
