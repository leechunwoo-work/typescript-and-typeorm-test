import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '0'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Test',
  logging: ['warn', 'error'],
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  // FIXME: 절대 상의없이 키지 말 것
  // synchronize: true,
});
