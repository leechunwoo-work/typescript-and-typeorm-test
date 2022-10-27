import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './migrations/data-source';
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { Error } from './interfaces/error';

AppDataSource.initialize()
  .then(() => {
    console.log('db connection complete');
  })
  .catch((error: object) => {
    console.error('db connection failed', error);
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
// TODO: routes 폴더 생성 필요
// app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Hello World!');
});

app.use((req: Request, res: Response) => {
  return res.status(404).send('API 주소를 확인해주세요.');
});

app.use((error: Error, req: Request, res: Response) => {
  return res.status(error.status).send({
    message: error.message,
    data: {
      errorCode: error.code,
    },
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log('server connection complete');
});

export default app;
