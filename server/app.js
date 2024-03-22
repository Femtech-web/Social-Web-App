import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import io from 'socket.io';
import config from './src/config';
import expressConfig from './src/frameworks/webserver/express';
import serverConfig from './src/frameworks/webserver/server';
import socketConfig from './src/frameworks/webserver/socket/socket';
import routes from './src/frameworks/webserver/routes/index';
import mongoDbConnection from './src/frameworks/database/mongoDB/connection';
import redisConnection from './src/frameworks/database/redis/connection';
// MIDDLEWARES
import errorHandlingMiddleware from './src/frameworks/webserver/middlewares/errorHandlingMiddleware';
import incorrectRoutesMiddleware from './src/frameworks/webserver/middlewares/incorrectRoutesMiddleware';

const app = express();
const server = http.createServer(app);
// const ioInstance = io(server, );

// EXPRESS.JS CONFIGURATION (middlewares etc.)
expressConfig(app, cors);

// SERVER CONFIGURATION
serverConfig(server, config);

// DB CONFIGURATION AND CONNECTION
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useNewUrlParser: true,
  connectTimeoutMS: 1000
}).connectToMongo();

// REDIS CONFIG
const redisClient = redisConnection(config).redisConnection;

// SOCKET.IO CONFIG
socketConfig(server, io, cors).startSocket();

// ROUTES FOR EACH ENDPOINT
routes(app, express, redisClient);

// HANDLE INCORRECT ROUTES
app.use('/api', incorrectRoutesMiddleware);

// HANDLE ALL ERRORS
app.use(errorHandlingMiddleware);

// EXPOSE APP
export default app;
