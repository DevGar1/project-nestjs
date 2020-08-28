import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'losangeles17',
  database: 'tasks',
  entities: [__dirname + '/../**/*.mapping{.ts,.js}'],
  synchronize: false,
  timezone: 'UTC',
};
