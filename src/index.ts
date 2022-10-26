import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './migrations/data-source';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

// TODO: error 객체 인터페이스 생성 필요
// app.use((err: , req: Request, res: Response) => {
//   return res.status(err.status).send({
//     message: err.message,
//     data: {
//       errorCode: err.errorCode
//     }
//   });
// });

app.listen(3005);

export default app;
