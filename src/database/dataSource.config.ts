import { DataSourceOptions } from 'typeorm';

export function getConfigDataSource() {
  return {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '11111111',
    database: 'car_rent',
    synchronize: false,
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*.{ts,js}'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    migrationsTableName: 'migrations',
  } as DataSourceOptions;
}
