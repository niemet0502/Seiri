import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: 'thot',
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/db/migrations/*js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
