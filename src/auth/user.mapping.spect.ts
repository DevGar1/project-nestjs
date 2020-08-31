import { User } from './user.mapping';
import * as bcrypt from 'bcrypt';

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    bcrypt.hash = jest.fn();
  });
  describe('Validar la contraseña', () => {
    it('retornar contraseña como valida', async () => {
      bcrypt.hash.mockResolvedValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('123456');
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
      expect(result).toEqual(true);
    });
    it('retornar contraseña como invalida', async () => {
      bcrypt.hash.mockResolvedValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('wrong');
      expect(bcrypt.hash).toHaveBeenCalledWith('wrong', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
