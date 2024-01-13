import express from 'express';

import ticket from './routes/ticket.js';

const router = app => {
  app.use('/ticket', ticket);

  // Static files to serve react app
  app.use(express.static('client/build'));
};

export default router;
