import { IConfig } from '../interfaces/interface';
import * as dotenv from 'dotenv';
dotenv.config();

export const config: IConfig = {
  serverPort: Number(process.env.PORT),
  jwtSecretKey: process.env.JWT_KEY,
  jwtExpiredIn: process.env.JWT_EXPIRED_IN,
  dbName: process.env.DB_NAME || '',
  dbPort: Number(process.env.DB_PORT),
  dbHost: process.env.DB_HOST || '',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
};
