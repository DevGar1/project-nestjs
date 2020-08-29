import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'losangeles17',
  database: 'tasks',
  entities: [__dirname + '/../**/*.mapping{.ts,.js}'],
  synchronize: false,
  timezone: 'UTC',
};
