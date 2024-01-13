import pino from 'pino';
import pinoHttp from 'pino-http';

import config from './config/config.js';

export const logger = pinoHttp({
  logger: pino({
    transport: config.is_dev
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : {},
  }),
});
