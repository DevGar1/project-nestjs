import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serveConfig = config.get('s' +
    'erver');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  console.log(serveConfig);
  console.log(config.get('db'));
  const port =  process.env.DB_PORT || serveConfig.port;
  await app.listen(port);
  logger.log(`Aplication listening on port ${port}`);
}
bootstrap();
