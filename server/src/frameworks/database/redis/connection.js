import Redis from 'ioredis';

export default function connection(config) {
  const redisConnection = new Redis({
    port: config.redis.port,
    host: config.redis.host
  })

  // redisConnection.ping((err, result) => {
  //   if (err) {
  //     console.error('Unable to connect to Redis:', err);
  //   } else {
  //     console.log('Connected to Redis. PING result:', result);
  //   }
  // });

  redisConnection.on('connect', () => {
    console.log('Connected to Redis!');
  });

  redisConnection.on('error', (err) => {
    console.log(`Error  ${err}`);
  });

  return {
    redisConnection
  };
}

