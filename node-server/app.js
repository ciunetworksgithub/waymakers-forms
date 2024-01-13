/* eslint-disable no-console */
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import { createHttpTerminator } from 'http-terminator';

import config from './src/config/config.js';
import router from './src/router.js';
import { logger } from './src/logger.js';

// defining the port to run the server
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV;

// Load environment variables from .env file
dotenv.config();

// Create Express server
const app = express();

// Hook up request logging
app.use(logger);

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// middleware
app.use(compression());

// x-powered-by header banner
app.disable('x-powered-by');

// cors configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.cors_whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new createError(403, 'Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

router(app);

// running express application on the port defined in env or 8000
const server = app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in ${ENV} mode`);
  console.log('Press CTRL-C to stop');
});

// 404 handler
app.use((req, res, next) => {
  next(new createError.NotFound());
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    status_code: status,
    data: {},
  });
});

// Graceful shutdown
// implements logic for gracefully terminating an express.js server.
const httpTerminator = createHttpTerminator({ server });

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await httpTerminator.terminate();
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await httpTerminator.terminate();
});
