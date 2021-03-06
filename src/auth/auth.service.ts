import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interfaces';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository, private jwtService: JwtService
  ) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.singUp(authCredentialsDto);
  }



  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validatePassword(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('No es la contraseña valida');
    }
    const payLoad: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payLoad);
    return { accessToken };
  }
}
