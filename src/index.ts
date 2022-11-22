import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './migrations/data-source';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { Error } from './interfaces/error';
import routes from './routes';
import logger from './utils';

AppDataSource.initialize()
  .then(() => {
    logger.info('db connection complete');
  })
  .catch((error: object) => {
    logger.error(error);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

// Route
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Hello World!');
});

app.use((req: Request, res: Response) => {
  return res.status(404).send('API 주소를 확인해주세요.');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.status).send({
    message: error.message,
    data: {
      errorCode: error.code,
    },
  });
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  logger.info(`server ${port} connection complete`);
});
