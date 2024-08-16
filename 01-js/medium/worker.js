const { parentPort } = require('worker_threads');

parentPort.on('message', (data) => {
  const { start, end } = data;
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += i;
  }
  parentPort.postMessage(sum);
});
