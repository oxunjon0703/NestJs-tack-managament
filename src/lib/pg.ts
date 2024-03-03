import { Pool } from 'pg';
import { config } from '../common/config/index';

const pool = new Pool({
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
  user: config.dbUser,
});

export class Postgres {
  async fetch<ResponseType, TArg>(
    SQL: string,
    ...args: Array<TArg>
  ): Promise<ResponseType> {
    const clien = await pool.connect();
    try {
      const {
        rows: [row],
      } = await clien.query(SQL, args);
      return row;
    } finally {
      clien.release();
    }
  }

  async fetchAll<ResponseType, TArg = undefined>(
    SQL: string,
    ...args: Array<TArg>
  ): Promise<Array<ResponseType>> {
    const clien = await pool.connect();
    try {
      const { rows } = await clien.query(SQL, args);
      return rows;
    } finally {
      clien.release();
    }
  }

  get getPool(): Pool {
    return pool;
  }
}

module.exports = { Postgres };
