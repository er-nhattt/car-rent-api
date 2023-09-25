import { DataSourceOptions } from 'typeorm';

export function getConfig() {
  return {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '11111111',
    database: 'car_rent',
    synchronize: false,
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    migrations: [
      __dirname + './migrations/*{.ts,.js}',
      __dirname + 'dist/migrations/*{.ts,.js}',
    ],
  } as DataSourceOptions;
}
