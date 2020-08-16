import { EntityRepository, Repository } from 'typeorm/index';
import { User } from './user.mapping';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;
    const user = new User();
    user.salt = await bcrypt.genSalt();
    user.username = userName;
    user.password = await UserRepository.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Usuario existente');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { userName, password } = authCredentialsDto;
    const user = await this.findOne({ username: userName });
    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
