import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.mapping';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interfaces';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
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
    console.log('adios');
    console.log(accessToken);
    console.log('adios');
    return { accessToken };
  }
}
