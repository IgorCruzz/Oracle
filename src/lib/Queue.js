import Queue from 'bull';

import RecoverPassword from '../data/jobs/RecoverPassword';

const queuesArr = [RecoverPassword];

const queues = queuesArr.map(job => ({
  bull: new Queue(job.key, {
    redis: {
      path:
        'redis://:k1fe4qef3c5ycrb7bns7xbxgg6z5pjhr@smart-rose-f1a0e7fe4f.redisgreen.net:11042/',
    },
  }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('completed', job => {
        console.log(`A tarefa ${job.queue.name} saiu na fila`);
        console.log('Job completed', job.queue.name);
        console.log(job.data);
        console.log('====================');
        job.progress(100);
      });

      queue.bull.on('failed', job => {
        console.log(`A tarefa ${job.queue.name} saiu na fila`);
        console.log('Job failed', job.queue.name);
        console.log(job.data);
        console.log('====================');
        job.progress(50);
      });
    });
  },
};
