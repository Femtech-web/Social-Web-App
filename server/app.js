import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import config from './src/config';
import expressConfig from './src/frameworks/webserver/express';
import serverConfig from './src/frameworks/webserver/server';
import routes from './src/frameworks/webserver/routes';
import mongoDbConnection from './src/frameworks/database/mongoDB/connection';
import redisConnection from './src/frameworks/database/redis/connection';
// middlewares
import errorHandlingMiddleware from './src/frameworks/webserver/middlewares/errorHandlingMiddleware';

const app = express();
const server = http.createServer(app);
dotenv.config();

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig( server, config);

// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 10000,
  keepAlive: 120,
  connectTimeoutMS: 1000
}).connectToMongo();

const redisClient = redisConnection(Redis, config).createRedisClient();

// routes for each endpoint
routes(app, express, redisClient);

// error handling middleware
app.use(errorHandlingMiddleware);

// Expose app
export default app;
