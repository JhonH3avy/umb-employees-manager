import mariadb from 'mariadb';

export class DbContext {

  private pool: mariadb.Pool;

  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionLimit: 5
    });
  }

  async getConnectionFromPool(): Promise<mariadb.PoolConnection> {
    return await this.pool.getConnection();
  }
}