import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const dbConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRETKEY || dbConfig.secret,
      signOptions: {
        expiresIn: dbConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
