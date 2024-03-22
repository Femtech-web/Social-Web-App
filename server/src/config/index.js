require("dotenv").config();
export default {
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URL
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  },
  jwtSecret: process.env.JWT_SECRET
};
