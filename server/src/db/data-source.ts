import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: 'seiriprod',
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/db/migrations/*js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
