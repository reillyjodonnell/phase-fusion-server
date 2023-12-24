import { describe, expect, it } from 'bun:test';
import { UserService } from './user-service';
import { UserRepository } from './user-repository';

describe('user service', () => {
  const userRepository = new UserRepository();
  it('should create new user', () => {
    const userService = new UserService(userRepository);
    userService.createUser({
      id: '0',
      name: 'John Doe',
    });
    expect(userService.getUser('0')).toStrictEqual({
      id: '0',
      name: 'John Doe',
    });
  });
  it('should edit existing user', () => {
    const userService = new UserService(userRepository);
    userService.createUser({
      id: '0',
      name: 'John Doe',
    });
    userService.editUser('0', { name: 'Jane Doe' });
    expect(userService.getUser('0')).toStrictEqual({
      id: '0',
      name: 'Jane Doe',
    });
  });
  it('should fail when editing non existing user', () => {
    const userService = new UserService(userRepository);
    userService.createUser({
      id: '0',
      name: 'John Doe',
    });
    expect(userService.editUser('1', { name: 'Jane Doe' })).toStrictEqual({
      error: 'User does not exist',
    });
  });
  // ...
});
