const { Worker } = require('worker_threads');
const numWorkers = 2; // Number of workers to run in parallel

function createWorker(start, end, callback) {
  const worker = new Worker('./worker.js');

  worker.on('message', (result) => {
    callback(result);
    worker.terminate();
  });

  worker.postMessage({ start, end });
}

function calculateTime(n) {
  const segmentSize = Math.floor(n / numWorkers);
  let sum = 0;
  let completed = 0;
  const timeBefore = new Date().getTime();

  for (let i = 0; i < numWorkers; i++) {
    const start = i * segmentSize;
    const end = (i === numWorkers - 1) ? n : (i + 1) * segmentSize;

    createWorker(start, end, (result) => {
      sum += result;
      completed += 1;
      if (completed === numWorkers) {
        const timeAfter = new Date().getTime();
        console.log(`Sum from 1 to ${n}: ${sum}`);
        console.log(`Time Difference: ${timeAfter - timeBefore} ms`);
      }
    });
  }
}

calculateTime(100);
calculateTime(10000);
calculateTime(10000000);
calculateTime(1000000000);
calculateTime(100000000000);
calculateTime(1000000000000000);
calculateTime(1000000000000000000);

