'use strict';

function TaskPool({ maxConcurrent = 5 } = {}) {
  const waiting = [];
  let locked = 0;
  const wait = () => {
    if (locked >= maxConcurrent) {
      return new Promise(resolve => {
        waiting.push(resolve);
      });
    }

    locked++;
  }

  const release = () => {
    if (waiting.length > 0) {
      const resume = waiting.shift();
      return resume();
    }
    --locked;
  }

  return {
    async forEach(array, callback) {
      let done;
      const complete = new Promise(resolve => {
        let count = 0;
        done = () => {
          if (++count >= array.length) {
            resolve();
          }
        }
      });

      for (let i = 0; i < array.length; ++i) {
        await wait();

        callback(array[i], i)
          .catch(ex => console.error(ex))
          .then(release)
          .then(done)
      }

      return complete;
    }
  }
}

module.exports = { create: TaskPool };
