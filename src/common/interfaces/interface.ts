export interface IConfig {
  serverPort: number;
  jwtSecretKey: string;
  jwtExpiredIn: string;
  dbName: string;
  dbPort: number;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
}
