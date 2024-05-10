import Redis from "ioredis";

export default function connection(config) {
  const redisConnection = new Redis({
    port: config.redis.port,
    host: config.redis.host,
  });

  redisConnection.on("connect", () => {
    console.log("Connected to Redis!");
  });

  redisConnection.on("error", (err) => {
    console.log(`Error  ${err}`);
  });

  return {
    redisConnection,
  };
}
