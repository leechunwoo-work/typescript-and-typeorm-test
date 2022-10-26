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

export default app;
