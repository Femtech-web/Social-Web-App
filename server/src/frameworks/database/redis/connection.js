export default function connection(Redis, config) {
  const createRedisClient = function createRedisClient() {
    return new Redis({
      port: config.redis.port,
      host: config.redis.host
    })
  };

  createRedisClient.ping((err, result) => {
    if (err) {
      console.error('Unable to connect to Redis:', err);
    } else {
      console.log('Connected to Redis. PING result:', result);
    }
  });

  return {
    createRedisClient
  };
}

