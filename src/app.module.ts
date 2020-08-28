import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [
    //   //Esto se hace con el env, ignora el archivo confi
    //   ConfigModule.forRoot({ isGlobal: true }),
    //   TypeOrmModule.forRoot({
    //     type: 'mysql',
    //     host: process.env.DB_HOST,
    //     port: parseInt(process.env.DB_PORT),
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_DATABASE,
    //     entities: [__dirname + '/**/*.mapping{.ts,.js}'],
    //     timezone: 'UTC'
    //   }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {
}


